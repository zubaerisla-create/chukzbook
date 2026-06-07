"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type Message = {
  from: "user" | "assistant";
  text: string;
};

interface UseWebSocketChatProps {
  initialMessage?: Message;
}

// Reconnect schedule: delays in ms for attempts 0..N, then cap at MAX_DELAY
const BASE_DELAY = 3_000;   // 3 s first retry
const MAX_DELAY  = 60_000;  // 60 s ceiling
const MAX_RETRIES = 8;       // give up after 8 consecutive failures (~4 min total)

export function useWebSocketChat({ initialMessage }: UseWebSocketChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);   // consecutive failure counter
  const didConnectRef = useRef(false); // true once at least one successful open

  // ── Load persisted sessionId ──────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chukzbook_chat_session_id");
      if (saved) {
        setSessionId(saved);
        sessionIdRef.current = saved;
      }
    }
  }, []);

  // ── Persist sessionId whenever it changes ─────────────────────────────────
  const updateSessionId = useCallback((id: string) => {
    setSessionId(id);
    sessionIdRef.current = id;
    if (typeof window !== "undefined") {
      localStorage.setItem("chukzbook_chat_session_id", id);
    }
  }, []);

  // ── WebSocket URL — always the production endpoint per spec ──────────────
  const getWebSocketUrl = useCallback((): string => {
    return "wss://harmonypublishing.net/openclaw-ws/";
  }, []);

  // ── Schedule the next reconnect attempt (exponential backoff) ─────────────
  const scheduleReconnect = useCallback(() => {
    if (!isMountedRef.current) return;

    const attempt = retryCountRef.current;
    if (attempt >= MAX_RETRIES) {
      // Exhausted retries — show the persistent error state and stop.
      console.warn(`[WS] Giving up after ${MAX_RETRIES} failed attempts.`);
      setConnectionError(true);
      return;
    }

    // Exponential back-off: 3s, 6s, 12s, 24s, 48s, 60s, 60s, 60s …
    const delay = Math.min(BASE_DELAY * Math.pow(2, attempt), MAX_DELAY);
    console.log(`[WS] Reconnect attempt ${attempt + 1}/${MAX_RETRIES} in ${delay / 1000}s…`);

    reconnectTimeoutRef.current = setTimeout(() => {
      retryCountRef.current += 1;
      connect(); // eslint-disable-line no-use-before-define
    }, delay);
  }, []); // connect is declared below; safe because scheduleReconnect is only
           // called from inside connect's closure (which captures the latest ref)

  // ── Main connect function ─────────────────────────────────────────────────
  const connect = useCallback(() => {
    if (!isMountedRef.current) return;
    // Don't open a second connection while one is already alive/connecting
    const state = wsRef.current?.readyState;
    if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) return;

    const wsUrl = getWebSocketUrl();
    console.log(`[WS] Connecting to ${wsUrl} (attempt ${retryCountRef.current + 1})`);

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);
    } catch (e) {
      // URL is malformed or WebSocket is not supported — don't retry.
      console.error("[WS] Failed to create WebSocket:", e);
      setConnectionError(true);
      return;
    }
    wsRef.current = ws;

    // ── onopen ──
    ws.onopen = () => {
      console.log("[WS] Connected.");
      retryCountRef.current = 0;   // reset backoff counter on success
      didConnectRef.current = true;
      setIsConnected(true);
      setConnectionError(false);

      // Fetch history + sessionId
      const payload: Record<string, unknown> = { cmd: "chat.history" };
      if (sessionIdRef.current) {
        payload.data = { sessionId: sessionIdRef.current };
      }
      ws.send(JSON.stringify(payload));
    };

    // ── onmessage ──
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string);

        const payloadType: string = data.type ?? "";
        const payloadData: Record<string, unknown> = data.data ?? {};

        // 1. Chat history response
        if (payloadType === "chat.history") {
          const receivedSessionId = payloadData.sessionId as string | undefined;
          if (receivedSessionId) updateSessionId(receivedSessionId);

          const rawHistory = (payloadData.messages as unknown[]) ?? [];
          if (Array.isArray(rawHistory) && rawHistory.length > 0) {
            const normalized: Message[] = rawHistory.map((m: unknown) => {
              const msg = m as Record<string, unknown>;
              const role = String(msg.role ?? msg.from ?? msg.sender ?? msg.type ?? "").toLowerCase();
              const from: "user" | "assistant" =
                role === "user" || role === "client" || role === "me" ? "user" : "assistant";
              const text = String(msg.text ?? msg.message ?? msg.content ?? msg.payload ?? "");
              return { from, text };
            });
            setMessages(normalized);
          } else {
            setMessages(initialMessage ? [initialMessage] : []);
          }
          setIsTyping(false);
        }

        // 2. Streamed partial reply
        else if (payloadType === "chat.agent") {
          setIsTyping(true);
          const delta = String(payloadData.delta ?? "");
          setMessages((prev) => {
            if (prev.length === 0) return [{ from: "assistant", text: delta }];
            const last = prev[prev.length - 1];
            if (last?.from === "assistant") {
              return [...prev.slice(0, -1), { from: "assistant", text: last.text + delta }];
            }
            return [...prev, { from: "assistant", text: delta }];
          });
        }

        // 3. Reply complete
        else if (payloadType === "chat.finish") {
          setIsTyping(false);
          const receivedSessionId = payloadData.sessionId as string | undefined;
          if (receivedSessionId) updateSessionId(receivedSessionId);
        }
      } catch (err) {
        console.error("[WS] Failed to parse message:", err);
      }
    };

    // ── onerror ──
    // The WebSocket error event carries no useful diagnostic info in the browser
    // (by spec, for security reasons). The real close code is in onclose below.
    // We deliberately suppress the raw event log to avoid console spam.
    ws.onerror = () => {
      // Only set the error UI flag once we've exhausted retries (handled in onclose).
      // Logging a one-time warning on first failure is enough.
      if (!didConnectRef.current && retryCountRef.current === 0) {
        console.warn(
          "[WS] Could not establish initial connection. " +
          "Will retry with exponential back-off. " +
          `URL: ${wsUrl}`
        );
      }
    };

    // ── onclose ──
    ws.onclose = (event) => {
      setIsConnected(false);
      setIsTyping(false);

      // Log meaningful close info (not spam)
      if (event.code !== 1000) {
        console.log(`[WS] Closed — code: ${event.code}, clean: ${event.wasClean}`);
      }

      scheduleReconnect();
    };
  }, [getWebSocketUrl, updateSessionId, initialMessage, scheduleReconnect]);

  // ── Mount / unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    isMountedRef.current = true;
    retryCountRef.current = 0;
    connect();

    return () => {
      isMountedRef.current = false;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close(1000, "component unmounted");
    };
  }, [connect]);

  // ── sendMessage ───────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
      setIsTyping(true);

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        // Attach stored lead info if available
        let name: string | undefined;
        let email: string | undefined;
        if (typeof window !== "undefined") {
          try {
            const leadStr = localStorage.getItem("harmony_chatbot_lead");
            if (leadStr) {
              const lead = JSON.parse(leadStr) as { name?: string; email?: string };
              name = lead.name;
              email = lead.email;
            }
          } catch {
            // ignore parse errors
          }
        }

        const payload: Record<string, unknown> = {
          cmd: "chat.send",
          data: { text: trimmed, sessionId: sessionIdRef.current ?? "" },
        };
        if (name)  (payload.data as Record<string, unknown>).name  = name;
        if (email) (payload.data as Record<string, unknown>).email = email;

        wsRef.current.send(JSON.stringify(payload));
      } else {
        // Socket not open — trigger a reconnect; message will be lost but user
        // sees a system bubble so they can re-send after reconnect.
        setMessages((prev) => [
          ...prev,
          { from: "assistant", text: "Connection lost. Reconnecting…" },
        ]);
        setIsTyping(false);
        retryCountRef.current = 0; // reset backoff so reconnect is immediate
        connect();
      }
    },
    [connect]
  );

  // ── abortReply ────────────────────────────────────────────────────────────
  const abortReply = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ cmd: "chat.abort", data: { sessionId: sessionIdRef.current ?? "" } })
      );
    }
    setIsTyping(false);
  }, []);

  // ── clearHistory ──────────────────────────────────────────────────────────
  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("chukzbook_chat_session_id");
    }
    setSessionId(null);
    sessionIdRef.current = null;
    setMessages(initialMessage ? [initialMessage] : []);
    setIsTyping(false);
    // Close current socket; onclose will trigger a fresh reconnect (new session)
    wsRef.current?.close(1000, "history cleared");
  }, [initialMessage]);

  return {
    messages,
    isTyping,
    isConnected,
    connectionError,
    sessionId,
    sendMessage,
    abortReply,
    clearHistory,
  };
}

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useCaptureChatbotLeadMutation } from "@/redux/api/authApi";
import { useWebSocketChat } from "@/hooks/useWebSocketChat";

/* ─── Suggested quick-starters ─── */
const SUGGESTED = [
  "Printing Cost Estimate",
  "Package Recommendations",
  "Publishing Timeline",
  "Distribution Options",
];

/* ════════════════════════════════════════════════════════════
   FloatingChat — global floating chat button + panel
   Implements the full Folio WebSocket spec from the integration doc.
   ════════════════════════════════════════════════════════════ */
export default function FloatingChat() {
  /* ── panel open/close ── */
  const [isOpen, setIsOpen] = useState(false);

  /* ── lead capture gate ── */
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadError, setLeadError] = useState("");
  const [captureChatbotLead, { isLoading: isSubmittingLead }] =
    useCaptureChatbotLeadMutation();

  /* ── text input ── */
  const [input, setInput] = useState("");

  /* ── scroll ref ── */
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── unread badge ── */
  const [unreadCount, setUnreadCount] = useState(0);
  const prevMsgCountRef = useRef(0);

  /* ── WebSocket hook ── */
  const { messages, isTyping, isConnected, connectionError, sendMessage, abortReply, clearHistory } =
    useWebSocketChat({
      initialMessage: {
        from: "assistant",
        text: "Hi There 👋\nI'm Folio, your AI Publishing Assistant.\nHow can I help you today?",
      },
    });

  /* ─── on mount: decide whether to show lead gate ─── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("harmony_chatbot_lead");
      setShowLeadForm(!saved);
    }
  }, []);

  /* ─── calculator handoff: listen for events from Estimator ─── */
  useEffect(() => {
    // Open the floating widget when triggered externally
    const openWidget = () => {
      setIsOpen(true);
      setUnreadCount(0);
    };
    window.addEventListener("open_chat_widget", openWidget);
    return () => window.removeEventListener("open_chat_widget", openWidget);
  }, []);

  useEffect(() => {
    const doHandoff = () => {
      if (typeof window === "undefined") return;
      const handoff = localStorage.getItem("harmony_calculator_handoff");
      if (!handoff) return;
      if (showLeadForm) return; // wait until lead is captured
      if (!isConnected) return;
      localStorage.removeItem("harmony_calculator_handoff");
      sendMessage(handoff);
      setIsOpen(true);
    };

    const timeout = setTimeout(doHandoff, 800);
    window.addEventListener("harmony_calculator_handoff_trigger", doHandoff);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("harmony_calculator_handoff_trigger", doHandoff);
    };
  }, [isConnected, showLeadForm, sendMessage]);

  /* ─── auto-scroll on new messages ─── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ─── unread badge: count new assistant messages while closed ─── */
  useEffect(() => {
    if (!isOpen && messages.length > prevMsgCountRef.current) {
      const newMsgs = messages.slice(prevMsgCountRef.current);
      const fromAssistant = newMsgs.filter((m) => m.from === "assistant").length;
      if (fromAssistant > 0) setUnreadCount((c) => c + fromAssistant);
    }
    prevMsgCountRef.current = messages.length;
  }, [messages, isOpen]);

  /* ─── clear badge on open ─── */
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  /* ─── lead form submit ─── */
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError("");
    if (!leadName.trim() || !leadEmail.trim()) {
      setLeadError("Please fill out all fields.");
      return;
    }
    try {
      await captureChatbotLead({
        name: leadName.trim(),
        email: leadEmail.trim(),
      }).unwrap();

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "harmony_chatbot_lead",
          JSON.stringify({ name: leadName.trim(), email: leadEmail.trim() })
        );
      }
      setShowLeadForm(false);

      /* after lead unlock, check for pending calculator handoff */
      setTimeout(() => {
        const handoff = localStorage.getItem("harmony_calculator_handoff");
        if (handoff && isConnected) {
          localStorage.removeItem("harmony_calculator_handoff");
          sendMessage(handoff);
        }
      }, 500);
    } catch (err: any) {
      console.error("Chatbot lead capture failed:", err);
      setLeadError(
        err.data?.detail || err.message || "Failed to start session. Please try again."
      );
    }
  };

  /* ─── send message ─── */
  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text ?? input).trim();
      if (!msg) return;
      sendMessage(msg);
      if (!text) setInput("");
    },
    [input, sendMessage]
  );

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        id="harmony-chat-trigger"
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label={isOpen ? "Close chat" : "Open Folio AI chat"}
        className={`
          fixed bottom-6 right-6 z-[9999]
          w-14 h-14 rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          focus:outline-none
          ${
            isOpen
              ? "bg-[#0B132B] rotate-0 scale-95"
              : "bg-gradient-to-br from-[#B89C72] to-[#9a7e55] hover:scale-110 hover:shadow-[0_8px_30px_rgba(184,156,114,0.55)]"
          }
        `}
      >
        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
        {/* Connection dot */}
        {!isOpen && (
          <span
            className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white ${
              isConnected ? "bg-green-400" : "bg-orange-400"
            }`}
          />
        )}
        {/* Icon — toggle between chat bubble and X */}
        {isOpen ? (
          /* X close icon */
          <svg className="w-6 h-6 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Chat bubble icon */
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.253 2 11.5c0 2.388.898 4.566 2.373 6.22L3 22l4.573-1.5A10.12 10.12 0 0 0 12 21c5.523 0 10-4.253 10-9.5S17.523 2 12 2z" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        role="dialog"
        aria-label="Folio AI Chat"
        aria-modal="true"
        className={`
          fixed bottom-24 right-6 z-[9998]
          w-[360px] sm:w-[400px]
          rounded-2xl shadow-[0_24px_80px_rgba(11,19,43,0.22)]
          border border-[#EBE5D6]
          bg-white overflow-hidden
          flex flex-col
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}
        `}
        style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#0B132B] to-[#162040] flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#B89C72]/20 border border-[#B89C72]/40 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Folio AI</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-orange-400 animate-pulse"}`} />
                <span className="text-[11px] text-gray-300">
                  {isConnected ? "Online · Harmony Publishing" : "Connecting…"}
                </span>
              </div>
            </div>
          </div>
          {/* Clear history button */}
          <button
            onClick={clearHistory}
            title="Clear chat history"
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>

        {/* ── Lead capture gate (overlay) ── */}
        {showLeadForm && (
          <div className="absolute inset-0 z-30 bg-white/97 backdrop-blur-sm flex flex-col items-center justify-center p-7 text-center" style={{ top: "65px" }}>
            <div className="w-12 h-12 mb-4 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center text-[#B89C72]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B132B] mb-1">Unlock AI Chat</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-5 max-w-xs">
              Enter your name and email to start chatting with Folio, your AI Publishing Specialist.
            </p>
            {leadError && (
              <div className="w-full mb-3 p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold">
                {leadError}
              </div>
            )}
            <form onSubmit={handleLeadSubmit} className="w-full space-y-3 text-left">
              <div>
                <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1">
                  Your Name
                </label>
                <input
                  id="fc-lead-name"
                  type="text"
                  placeholder="John Doe"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  disabled={isSubmittingLead}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl text-sm text-[#0c1424] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  id="fc-lead-email"
                  type="email"
                  placeholder="john@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                  disabled={isSubmittingLead}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl text-sm text-[#0c1424] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                />
              </div>
              <button
                type="submit"
                id="fc-lead-submit"
                disabled={isSubmittingLead}
                className="w-full py-3 bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingLead ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting…
                  </>
                ) : (
                  "Start Chatting →"
                )}
              </button>
            </form>
          </div>
        )}

        {/* ── Suggested pills ── */}
        {!showLeadForm && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#EBE5D6] bg-[#FAF8F5] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-shrink-0">
            <span className="text-[10px] font-bold text-[#B89C72] uppercase tracking-wide flex-shrink-0">Ask:</span>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                disabled={!isConnected}
                className="text-[10px] border border-[#EBE5D6] rounded-full px-2.5 py-1 text-gray-500 hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-white transition-colors flex-shrink-0 cursor-pointer disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ── Messages area ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-white to-[#FAF8F5]/30" style={{ minHeight: 0 }}>
          {/* Connection error fallback */}
          {connectionError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs text-center font-semibold">
              Chat is briefly unavailable —{" "}
              <a href="mailto:publish@harmonypublishing.net" className="underline hover:text-[#9a7e55] font-bold">
                email us
              </a>
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
              {/* Bot avatar */}
              {msg.from === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-[#0B132B] flex items-center justify-center flex-shrink-0 mb-0.5">
                  <svg className="w-3 h-3 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
              )}
              <div
                className={`
                  max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                  ${
                    msg.from === "user"
                      ? "bg-[#B89C72] text-white rounded-br-sm font-medium shadow-sm"
                      : "bg-white border border-[#EBE5D6] text-[#0B132B] rounded-bl-sm shadow-sm"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-[#0B132B] flex items-center justify-center flex-shrink-0 mb-0.5">
                <svg className="w-3 h-3 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </div>
              <div className="bg-white border border-[#EBE5D6] px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="px-4 py-3 border-t border-[#EBE5D6] bg-white flex-shrink-0">
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl px-3.5 py-1.5 focus-within:border-[#B89C72] transition-colors">
            <input
              id="fc-message-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isConnected ? "Type a message…" : "Connecting…"}
              disabled={!isConnected || showLeadForm}
              className="flex-1 text-sm bg-transparent border-none py-2 text-[#0B132B] placeholder-gray-400 focus:outline-none focus:ring-0 disabled:opacity-50"
            />
            {/* Abort / Send button */}
            {isTyping ? (
              <button
                id="fc-abort-btn"
                onClick={abortReply}
                title="Stop generating"
                className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors flex-shrink-0 cursor-pointer animate-pulse"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.621 0-1.125.504-1.125 1.125v4.25c0 .621.504 1.125 1.125 1.125h5.25c.621 0 1.125-.504 1.125-1.125v-4.25c0-.621-.504-1.125-1.125-1.125h-5.25Z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                id="fc-send-btn"
                onClick={() => handleSend()}
                disabled={!isConnected || !input.trim() || showLeadForm}
                title="Send message"
                className="w-8 h-8 flex items-center justify-center bg-[#B89C72] hover:bg-[#9a7e55] text-white rounded-full transition-colors flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              </button>
            )}
          </div>
          {/* Branding footer */}
          <p className="text-center text-[9px] text-gray-300 mt-2 tracking-wide">
            Powered by{" "}
            <span className="font-bold text-[#B89C72]">Harmony Publishing</span> · Folio AI
          </p>
        </div>
      </div>
    </>
  );
}

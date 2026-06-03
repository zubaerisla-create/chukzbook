"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  FileText,
  Send,
  Sparkles,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

type Message = {
  from: "user" | "assistant";
  text: string | React.ReactNode;
  showButton?: boolean;
};

const SUGGESTED = [
  "Printing Cost Estimate",
  "Package Recommendations",
  "Publishing Timeline",
  "Distribution Options",
];

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "assistant",
      text: (
        <>
          <span className="text-[#B89C72] font-bold">Hi There</span>
          <br />
          I&apos;m Your AI Publishing Assistant.
          <br />
          How Can I Help You Today?
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes("print") || lower.includes("cost") || lower.includes("200")) {
      return {
        text: (
          <>
            Based On Your Book Details, The Estimated Printing Cost For 200 Copies Is{" "}
            <span className="text-[#B89C72] font-bold">$2,184 ($10.92 Per Book)</span>
            <br />
            This Includes Premium Materials, Printing, Binding, And Quality Checks. Would You
            Like Me To Recommend The Best Package For Your Book?
          </>
        ),
        showButton: true,
      };
    }
    if (lower.includes("package") || lower.includes("plan")) {
      return {
        text: "We offer 5 publishing packages ranging from $499 (Starter) to $4,999 (Legend). The most popular is our Premium package at $1,499. Would you like details on a specific package?",
        showButton: false,
      };
    }
    if (lower.includes("timeline") || lower.includes("time") || lower.includes("long")) {
      return {
        text: "A typical publishing timeline usually takes 8-12 weeks, including editorial review (2-3 weeks), book cover design (2 weeks), formatting (1 week), and global distribution setup (1-2 weeks).",
        showButton: false,
      };
    }
    return {
      text: "Thank you for your question! Our publishing team will review your book requirements and guide you shortly. You can also explore our cost estimator for instant quotes.",
      showButton: false,
    };
  };

  const handleSend = (text?: string) => {
    const userMsg = text ?? input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          from: "assistant",
          text: response.text,
          showButton: response.showButton,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Top Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
          🪶
        </div>
        <div className="relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
            AI Publishing Assistant
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Get Instant Answers About Publishing, Packages, Timelines, And Your Book Project.
          </p>
        </div>
      </div>

      {/* Chat Widget Wrapper */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm overflow-hidden flex flex-col h-[650px] relative">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-[#FAF8F5]/10">
          {messages.map((msg, i) => (
            <div key={i} className="space-y-4">
              <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-[#FFF5E6] border border-[#FFE0B2] flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-[#B89C72]" />
                  </div>
                )}
                <div
                  className={`max-w-md md:max-w-lg px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm border ${
                    msg.from === "user"
                      ? "bg-[#FDF4EA] border-[#F5E6D3] text-[#0B132B] rounded-tr-none font-medium"
                      : "bg-white border-[#EBE5D6] text-[#0B132B] rounded-tl-none"
                  }`}
                >
                  {msg.text}

                  {msg.from === "assistant" && msg.showButton && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleSend("Package Recommendations")}
                        className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        Show Recommended Package
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider and suggested pills (only after welcome message) */}
              {i === 0 && messages.length === 1 && (
                <div className="space-y-5 py-4">
                  {/* Divider line */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px bg-gray-200 flex-1 max-w-[150px]" />
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#B89C72] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      You Can Ask Me About
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="h-px bg-gray-200 flex-1 max-w-[150px]" />
                  </div>

                  {/* Suggestions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {SUGGESTED.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (s === "Printing Cost Estimate") {
                            handleSend("How Much Will It Cost To Print 200 Copies Of My Book?");
                          } else {
                            handleSend(s);
                          }
                        }}
                        className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EBE5D6] hover:border-[#B89C72] hover:bg-[#FFF9F2] px-4 py-3.5 rounded-xl text-xs font-bold text-[#0B132B] text-left transition-all shadow-sm cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white border border-[#EBE5D6] flex items-center justify-center flex-shrink-0 shadow-sm text-gray-500">
                          <FileText className="w-4 h-4 text-gray-500" />
                        </div>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FFF5E6] border border-[#FFE0B2] flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                <Bot className="w-5 h-5 text-[#B89C72]" />
              </div>
              <div className="bg-white border border-[#EBE5D6] px-5 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Send Bar */}
        <div className="p-4 border-t border-[#EBE5D6] bg-white relative z-10">
          <div className="flex items-center gap-3 bg-[#FFF3E0]/30 border border-[#F5E6D3] rounded-2xl px-4 py-1.5 max-w-4xl mx-auto shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type Your Message..."
              className="flex-1 text-sm bg-transparent border-none py-3 text-[#0B132B] placeholder-gray-400 focus:outline-none focus:ring-0"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 flex items-center justify-center bg-[#B89C72] hover:bg-[#9a7e55] text-white rounded-full transition-colors duration-200 flex-shrink-0 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 transform rotate-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = { from: "user" | "assistant"; text: string };

const SUGGESTED = [
  "Printing Cost Estimate",
  "Package Recommendations",
  "Publishing Timeline",
  "Distribution Options",
];

const RESPONSES: Record<string, string> = {
  default:
    "Thank you for your question! Our team will be happy to assist you with all your publishing needs. You can also explore our packages or use our cost estimator for instant answers.",
  "printing cost":
    "Based on your book details, I can calculate a printing cost estimate. For 200 copies of a 200-page paperback with black & white interior, the estimated cost is approximately $2,184 ($10.92 per book). Would you like a detailed breakdown?",
  package:
    "We offer 5 publishing packages ranging from $499 (Starter) to $4,999 (Legend). The most popular is our Premium package at $1,499, which includes editing, cover design, formatting, and marketing support. Would you like details on a specific package?",
  timeline:
    "A typical publishing timeline depends on your manuscript's status. From manuscript to published book usually takes 8-12 weeks, including editing (2-3 weeks), design (2 weeks), formatting (1 week), and distribution setup (1-2 weeks).",
  distribution:
    "We distribute to all major platforms including Amazon KDP, Apple Books, Barnes & Noble, Kobo, Google Play Books, IngramSpark, and more than 50 countries worldwide.",
};

const getResponse = (msg: string) => {
  const lower = msg.toLowerCase();
  if (lower.includes("print")) return RESPONSES["printing cost"];
  if (lower.includes("package") || lower.includes("plan")) return RESPONSES["package"];
  if (lower.includes("timeline") || lower.includes("time") || lower.includes("long")) return RESPONSES["timeline"];
  if (lower.includes("distribut") || lower.includes("platform") || lower.includes("amazon")) return RESPONSES["distribution"];
  return RESPONSES["default"];
};

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "assistant", text: "Hi There 👋\nI'm your AI Publishing Assistant.\nHow Can I Help You Today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const userMsg = text ?? input.trim();
    if (!userMsg) return;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "assistant", text: getResponse(userMsg) }]);
    }, 800);
  };

  return (
    <section id="assistant" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">AI Publishing Assistant</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] leading-tight">
            Helping Authors<br />Turn Ideas Into<br />
            <span className="text-[#B89C72]">Published Success.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Chat Widget */}
          <div className="w-full lg:flex-1 bg-[#FAF8F5] rounded-2xl border border-[#EBE5D6] shadow-sm overflow-hidden flex flex-col" style={{ minHeight: "520px" }}>
            
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBE5D6] bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B132B] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B132B]">Harmony Publishing</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#0B132B] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>

            {/* Suggested Pills */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#EBE5D6] bg-white flex-wrap">
              <span className="text-xs font-semibold text-[#B89C72] mr-1">You Can Ask Me About →</span>
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs border border-[#EBE5D6] rounded-full px-3 py-1 text-gray-600 hover:border-[#B89C72] hover:text-[#B89C72] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#0B132B] flex items-center justify-center mr-2.5 flex-shrink-0 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-[#B89C72] text-white rounded-br-none"
                        : "bg-white border border-[#EBE5D6] text-[#0B132B] rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-5 py-4 border-t border-[#EBE5D6] bg-white flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type Your Message..."
                className="flex-1 text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72]"
              />
              <button
                onClick={() => send()}
                className="w-10 h-10 flex items-center justify-center bg-[#B89C72] hover:bg-[#9a7e55] text-white rounded-xl transition-colors duration-200 flex-shrink-0 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hello Author Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-5">
            
            {/* Hello Card */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE5D6] p-7 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-b from-[#B89C72] to-[#9a7e55] flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">Hello, Author!</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                I&apos;m here to make your publishing journey simple and successful.
              </p>

              <div className="flex items-center gap-2 mt-5 justify-center">
                <div className="h-px bg-[#B89C72]/30 flex-1" />
                <span className="text-[#B89C72] text-xs font-bold">You Can Ask Me About →</span>
                <div className="h-px bg-[#B89C72]/30 flex-1" />
              </div>

              <ul className="mt-4 space-y-3 text-left">
                {[
                  { title: "Instant Answers", desc: "Get Quick Answers to Your Publishing Questions." },
                  { title: "Expert Guidance", desc: "Trusted Advice From Publishing Experts." },
                  { title: "100% Secure", desc: "Your Information Is Always Safe With Us." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B132B] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B132B]">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Human Help */}
            <div className="bg-gradient-to-br from-[#0B132B] to-[#162040] rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Need Human Help?</p>
              <p className="text-xs text-gray-400 mb-4">Talk To Our Publishing Specialist</p>
              <button className="w-full py-3 bg-[#B89C72] hover:bg-[#a08660] text-white text-sm font-bold rounded-xl transition-colors duration-200 cursor-pointer">
                Talk To A Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assistant;

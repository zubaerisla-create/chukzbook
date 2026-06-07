"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import hero5 from "@/assets/images/hero5-left.png";
import { useWebSocketChat } from "@/hooks/useWebSocketChat";
import { useCaptureChatbotLeadMutation } from "@/redux/api/authApi";

const SUGGESTED = [
  "Printing Cost Estimate",
  "Package Recommendations",
  "Publishing Timeline",
  "Distribution Options",
];

const Assistant = () => {
  const [captureChatbotLead, { isLoading: isSubmittingLead }] = useCaptureChatbotLeadMutation();

  const {
    messages,
    isTyping,
    isConnected,
    connectionError,
    sendMessage,
    abortReply,
    clearHistory,
  } = useWebSocketChat({
    initialMessage: {
      from: "assistant",
      text: "Hi There 👋\nI'm your AI Publishing Assistant.\nHow Can I Help You Today?",
    },
  });

  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Lead capture states
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [chatbotError, setChatbotError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLead = localStorage.getItem("harmony_chatbot_lead");
      if (!savedLead) {
        setShowLeadForm(true);
      }
    }
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const send = (text?: string) => {
    const userMsg = text ?? input.trim();
    if (!userMsg) return;
    sendMessage(userMsg);
    if (!text) {
      setInput("");
    }
  };

  // Listen for calculator handoff and send quote if WebSocket is connected and lead form is unlocked
  useEffect(() => {
    const checkHandoff = () => {
      if (typeof window !== "undefined" && isConnected && !showLeadForm) {
        const handoff = localStorage.getItem("harmony_calculator_handoff");
        if (handoff) {
          send(handoff);
          localStorage.removeItem("harmony_calculator_handoff");
        }
      }
    };

    // Check with a slight delay after mount or when connection/lead state changes
    const timeout = setTimeout(checkHandoff, 1000);

    window.addEventListener("harmony_calculator_handoff_trigger", checkHandoff);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("harmony_calculator_handoff_trigger", checkHandoff);
    };
  }, [isConnected, showLeadForm]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChatbotError("");

    if (!leadName.trim() || !leadEmail.trim()) {
      setChatbotError("Please fill out all fields.");
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
          JSON.stringify({ name: leadName, email: leadEmail })
        );
      }

      setShowLeadForm(false);

      // Check for calculator handoff message immediately after lead unlock
      setTimeout(() => {
        const handoff = localStorage.getItem("harmony_calculator_handoff");
        if (handoff) {
          send(handoff);
          localStorage.removeItem("harmony_calculator_handoff");
        }
      }, 500);
    } catch (err: any) {
      console.error("Chatbot lead capture failed:", err);
      setChatbotError(err.data?.detail || err.message || "Failed to start chat session. Please try again.");
    }
  };

  return (
    <section id="assistant" className="py-24 bg-white font-sans">
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
            Helping Authors | Turn Ideas Into<br />
            <span className="text-[#B89C72]">Published Success.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Chat Widget */}
          <div
            className="w-full lg:flex-1 relative rounded-2xl border border-[#EBE5D6] shadow-sm overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
            style={{
              height: "580px",
              backgroundImage: `url(${hero5.src})`,
            }}
          >
            {/* Light overlay to keep text readable and image visible */}
            <div className="absolute inset-0 bg-white/45 pointer-events-none z-0" />

            {/* Chatbot lead capture gate overlay */}
            {showLeadForm && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-8 text-center">
                <div className="max-w-sm space-y-6 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center text-[#B89C72] shadow-sm">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0B132B]">Unlock AI Assistant</h3>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed mt-2">
                      Please enter your name and email to start your conversation with our AI Publishing Specialist.
                    </p>
                  </div>

                  {chatbotError && (
                    <div className="w-full p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold">
                      {chatbotError}
                    </div>
                  )}

                  <form onSubmit={handleLeadSubmit} className="w-full space-y-4 text-left">
                    <div>
                      <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        required
                        disabled={isSubmittingLead}
                        className="w-full pl-4 pr-4 py-3 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl text-sm text-[#0c1424] placeholder-gray-400 focus:outline-none focus:border-[#B89C72]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        required
                        disabled={isSubmittingLead}
                        className="w-full pl-4 pr-4 py-3 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl text-sm text-[#0c1424] placeholder-gray-400 focus:outline-none focus:border-[#B89C72]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-3.5 bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Connecting...
                        </>
                      ) : (
                        "Start Chatting"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBE5D6] bg-white relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B132B] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B132B]">Harmony Publishing</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-orange-400"} inline-block animate-pulse`}></span>
                    <span className="text-xs text-gray-400">{isConnected ? "Online" : "Connecting..."}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={clearHistory}
                title="Clear Chat History"
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>

            {/* Suggested Pills */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#EBE5D6] bg-white overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
              <span className="text-xs font-semibold text-[#B89C72] mr-2 flex-shrink-0">You Can Ask Me About:</span>
              <div className="flex gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={!isConnected}
                    className="text-xs border border-[#EBE5D6] rounded-full px-3 py-1.5 text-gray-600 hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-[#FAF7F2] transition-colors flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-5 py-5 space-y-4 relative z-10"
            >
              {connectionError && (
                <div className="p-3.5 bg-red-50/95 border border-red-200 text-red-800 rounded-xl text-xs text-center font-semibold mb-2 relative z-20">
                  Chat is briefly unavailable — email <a href="mailto:publish@harmonypublishing.net" className="underline hover:text-[#9a7e55] font-bold">publish@harmonypublishing.net</a>
                </div>
              )}
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
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="w-7 h-7 rounded-full bg-[#0B132B] flex items-center justify-center mr-2.5 flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </div>
                  <div className="bg-white border border-[#EBE5D6] text-[#0B132B] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#B89C72] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="px-5 py-4 border-t border-[#EBE5D6] bg-white flex items-center gap-3 relative z-10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type Your Message..."
                disabled={!isConnected}
                className="flex-1 text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] disabled:opacity-50"
              />
              {isTyping ? (
                <button
                  onClick={abortReply}
                  title="Stop generating"
                  className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200 flex-shrink-0 cursor-pointer animate-pulse"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.621 0-1.125.504-1.125 1.125v4.25c0 .621.504 1.125 1.125 1.125h5.25c.621 0 1.125-.504 1.125-1.125v-4.25c0-.621-.504-1.125-1.125-1.125h-5.25Z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => send()}
                  disabled={!isConnected || !input.trim()}
                  title="Send message"
                  className="w-10 h-10 flex items-center justify-center bg-[#B89C72] hover:bg-[#9a7e55] text-white rounded-xl transition-colors duration-200 flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                  </svg>
                </button>
              )}
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

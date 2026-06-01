"use client";

import React, { useState } from "react";
import faqBg from "@/assets/images/frequently-asked.png";
import faqFooterBg from "@/assets/images/frequently-asked-footer.png";

const faqData = [
  {
    question: "How long does the publishing process take?",
    answerBold: "The Timeline Depends On The Type Of Book And Services You Choose.",
    answerDesc: "On Average, The Complete Process Takes 4 To 8 Weeks From Manuscript Submission To Publication.",
  },
  {
    question: "Will my book be available on amazon and other platforms?",
    answerBold: "Yes, we handle distribution across all major retail platforms.",
    answerDesc: "Your book will be available in paperback, hardcover, and eBook formats on Amazon, Barnes & Noble, Apple Books, Kobo, and major global distributors.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
  {
    question: "Do i keep 100% ownership of my book?",
    answerBold: "Absolutely. You retain 100% of the rights and ownership of your work.",
    answerDesc: "Harmony Publishing acts as your publishing service provider. You maintain all intellectual property rights and can distribute or sell your book elsewhere at any time.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${faqBg.src})` }}
    >
      {/* Light subtle overlay to blend background image leaves */}
      <div className="absolute inset-0 bg-[#FAF8F5]/30 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white border border-[#EBE5D6] rounded-full px-4 py-1.5 shadow-sm">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B89C72] text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z" />
              </svg>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#B89C72] uppercase">
              FAQ
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4">
            Frequently AskD <span className="text-[#B89C72]">Questions</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed">
            Everything You Need To Know About Our Book Publishing Process. Can&apos;t Find The Answer You&apos;re Looking For? We&apos;re Here To Help!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#B89C72]">
            <span className="w-8 h-px bg-[#B89C72]/45"></span>
            <span className="text-xs">✦</span>
            <span className="w-8 h-px bg-[#B89C72]/45"></span>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-16">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-[#FAF5EE] border-[#B89C72]/50 shadow-sm"
                    : "bg-white border-[#e8dfc8]/40 shadow-sm hover:border-[#B89C72]/30"
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    {/* Left Icon (Clock/Info depending on open/closed state) */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? "bg-[#B89C72]/15 text-[#B89C72]" : "bg-gray-50 text-[#B89C72]"
                      }`}
                    >
                      {isOpen ? (
                        <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      )}
                    </div>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#0B132B] tracking-wide">
                      {item.question}
                    </span>
                  </div>

                  {/* Right Arrow */}
                  <span className={`text-[#B89C72] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 border-t border-[#B89C72]/20" : "max-h-0"
                  }`}
                >
                  <div className="p-5 pl-19 bg-[#FAF5EE]/40 text-[#0B132B]">
                    <p className="text-xs sm:text-sm font-bold text-gray-700 leading-relaxed mb-1.5">
                      {item.answerBold}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                      {item.answerDesc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          className="rounded-3xl bg-cover bg-center overflow-hidden border border-[#B89C72]/30 shadow-lg py-8 px-6 sm:px-10 relative z-10"
          style={{ backgroundImage: `url(${faqFooterBg.src})` }}
        >
          {/* Dark Overlay inside the banner */}
          <div className="absolute inset-0 bg-[#0B132B]/85 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left section: Headphone + title + button */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#B89C72] shadow-md flex-shrink-0">
                <svg className="w-8 h-8 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Still have questions?</h3>
                <button className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow transition-all duration-300">
                  Talk to Specialist
                </button>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-16 bg-white/20" />

            {/* Right section: Support & Trust bullets */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-6 md:gap-4 w-full md:w-auto justify-between">
              
              {/* Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#B89C72] flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#B89C72] uppercase tracking-wider">Friendly Support</h4>
                  <p className="text-[10px] text-white/80 mt-0.5">Get answers from real publishing experts.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#B89C72] flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#B89C72] uppercase tracking-wider">Trusted By Authors</h4>
                  <p className="text-[10px] text-white/80 mt-0.5">Hundreds Of Authors Trust Our Guidance.</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;

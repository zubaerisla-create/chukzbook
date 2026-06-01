"use client";

import React, { useState } from "react";
import contactBg from "@/assets/images/contact-us.png";

const Contact = () => {
  const [message, setMessage] = useState("");
  const charLimit = 600;

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBg.src})` }}
    >
      {/* Light overlay to blend the background graphics cleanly */}
      <div className="absolute inset-0 bg-[#FAF8F5]/35 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Contact Details & Social Box */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Let's Connect Badge */}
            <div className="flex">
              <div className="flex items-center gap-2 bg-white border border-[#EBE5D6] rounded-full px-4 py-1.5 shadow-sm">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B89C72] text-white">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z" />
                  </svg>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#B89C72] uppercase">
                  Let&apos;s Connect
                </span>
              </div>
            </div>

            {/* Title & Desc */}
            <div>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold text-[#0B132B] mb-6 leading-tight">
                Contact <span className="text-[#B89C72]">Us</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-md">
                We&apos;re Here To Help You Bring Your Story To Life. Reach Out To Our Team—We&apos;d Love To Hear From You.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-6">
              {[
                { label: "Contact", val: "+88 01405366393", isPhone: true },
                { label: "Office Hours", val: "+88 01405366393", isPhone: false },
                { label: "Office Hours", val: "+88 01405366393", isPhone: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#0c1424] flex items-center justify-center text-white flex-shrink-0 shadow">
                    {item.isPhone ? (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 4.25 1.21 1 1 0 0 1 .91 1V21a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .91 11.36 11.36 0 0 0 1.21 4.25 1 1 0 0 1-.27 1.11l-2.22 2.22z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">{item.label}</h4>
                    <p className="text-base font-bold text-[#0B132B] mt-0.5">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Widget Card */}
            <div className="bg-[#0B132B] rounded-2xl p-6 border border-[#B89C72]/30 max-w-xs relative overflow-hidden shadow-lg">
              {/* Gold wavy decorations in background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B89C72]/10 to-transparent rounded-full blur-xl pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#B89C72]/45"></span>
                <span className="font-serif italic text-sm font-medium text-[#B89C72] tracking-wider">Social</span>
                <span className="w-6 h-px bg-[#B89C72]/45"></span>
              </div>

              {/* Icons Row */}
              <div className="flex items-center justify-center gap-3 relative z-10">
                {[
                  { icon: "facebook", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                  { icon: "twitter", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                  { icon: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                  { icon: "linkedin", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                  { icon: "youtube", path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#B89C72]/50 hover:border-[#B89C72] flex items-center justify-center text-[#B89C72] hover:bg-[#B89C72]/10 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: White Card Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(11,19,43,0.08)] border border-[#e8dfc8]/50 max-w-2xl mx-auto">
              
              {/* Form Logo & Header */}
              <div className="text-center mb-8 flex flex-col items-center">
                {/* Logo H */}
                <div className="flex flex-col items-center gap-1.5 mb-4">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#0B132B]" fill="currentColor">
                    <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
                    <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
                    <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
                    <path d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z" fill="#FAF8F5" stroke="#0B132B" strokeWidth="2.5" />
                  </svg>
                  <span className="font-serif text-[10px] tracking-[0.25em] font-bold text-[#0B132B] uppercase">Harmony</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#0B132B] mb-3">
                  Send Us A <span className="text-[#B89C72]">Message</span>
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-md">
                  Have a question or ready to start your publishing journey? fill out the form below and we&apos;ll get back to you soon.
                </p>
              </div>

              {/* Form Inputs Grid */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* First Name */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#B89C72]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#e8dfc8]/60 rounded-xl text-[#0c1424] text-sm placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#B89C72]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#e8dfc8]/60 rounded-xl text-[#0c1424] text-sm placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#B89C72]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#e8dfc8]/60 rounded-xl text-[#0c1424] text-sm placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#B89C72]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#e8dfc8]/60 rounded-xl text-[#0c1424] text-sm placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none text-[#B89C72]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Have A Question For Us ? Ask Away"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, charLimit))}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#FAF8F5] border border-[#e8dfc8]/60 rounded-xl text-[#0c1424] text-sm placeholder-gray-400 focus:outline-none focus:border-[#B89C72] transition-colors resize-none"
                  />
                  {/* Counter */}
                  <div className="text-[10px] text-gray-400 text-right font-medium mt-1 pr-1">
                    {message.length}of {charLimit} Max Characters
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0B132B] hover:bg-[#16213F] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

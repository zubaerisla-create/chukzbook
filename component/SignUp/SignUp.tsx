"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import signupBg from "@/assets/images/signup.png";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering user:", {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      goal,
      agreeTerms,
    });
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-cover bg-center bg-no-repeat transition-all duration-500 selection:bg-[#b89c72]/30 selection:text-[#0c1424]"
      style={{ backgroundImage: `url(${signupBg.src})` }}
    >
      {/* Background soft overlay for depth */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[580px] flex flex-col items-center pt-8 pb-12 px-4 sm:px-6">
        
        {/* Logo and Brand Section */}
        <div className="flex flex-col items-center mb-1.5 animate-fade-in">
          <div className="relative w-14 h-14 mb-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
            {/* Elegant Serif H with Bookmark logo */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#B89C72] drop-shadow-sm" fill="currentColor">
              <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
              <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
              <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
              <path d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z" fill="#0B132B" stroke="#B89C72" strokeWidth="2.5" />
            </svg>
          </div>
          <span className="font-serif text-[18px] tracking-[0.3em] font-semibold text-[#0B132B] uppercase">
            Harmony
          </span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-6 max-w-md px-4">
          <h1 className="font-serif text-3xl sm:text-[40px] font-bold text-[#0B132B] mb-2 leading-tight">
            Create Your <span className="text-[#B89C72]">Author Account</span>
          </h1>
          <p className="text-[14px] text-gray-500 font-medium leading-relaxed font-sans max-w-[340px] mx-auto">
            Start Your Publishing With Harmony Publishing
          </p>
        </div>

        {/* Star Separator */}
        <div className="flex items-center justify-center mb-7 w-full max-w-[380px]">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b89c72]/30 to-[#b89c72]/60 flex-1"></div>
          <div className="mx-3.5 text-[#B89C72]">
            <svg className="w-3.5 h-3.5 fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
            </svg>
          </div>
          <div className="h-[1px] bg-gradient-to-l from-transparent via-[#b89c72]/30 to-[#b89c72]/60 flex-1"></div>
        </div>

        {/* Signup Form Card */}
        <div className="w-full bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(184,156,114,0.06)] p-6 sm:p-10 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(184,156,114,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                  First Name
                </label>
                <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {/* User Icon */}
                    <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    required
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                  Last Name
                </label>
                <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {/* User Icon */}
                    <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    required
                    placeholder="Enter Your Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                Email Address
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Mail Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                Phone Number
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Phone Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password font-sans" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                Password
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Eye/Toggle Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                Confirm Password
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Eye/Toggle Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder="Confirm Your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans"
                />
              </div>
            </div>

            {/* Publishing Goal Select */}
            <div className="space-y-2">
              <label htmlFor="goal" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                What&apos;s Your Publishing Goal?
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Goal Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21m-9-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                  </svg>
                </div>
                <select
                  id="goal"
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="block w-full pl-12 pr-10 py-3.5 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] appearance-none focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans cursor-pointer"
                >
                  <option value="" disabled>Select Your Primary Goal</option>
                  <option value="publish-first">Publish My First Book</option>
                  <option value="grow-audience">Grow My Reader Audience</option>
                  <option value="marketing">Learn Marketing & Sales</option>
                  <option value="editing">Professional Writing & Editing Help</option>
                  <option value="other">Other Goals</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
                  {/* Select Chevron Icon */}
                  <svg className="w-4 h-4 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Terms and Privacy Policy */}
            <div className="flex items-start text-xs sm:text-sm font-sans pt-1">
              <label className="flex items-start cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 mr-3 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${agreeTerms ? 'border-[#B89C72] bg-[#B89C72]' : 'border-[#EBE5D6] bg-white'}`}>
                  {agreeTerms && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-500 font-medium leading-relaxed">
                  I Agree To The{" "}
                  <a href="#terms" className="text-[#B89C72] hover:text-[#9a7e55] font-semibold transition-colors">
                    Terms Of Services
                  </a>{" "}
                  And{" "}
                  <a href="#privacy" className="text-[#B89C72] hover:text-[#9a7e55] font-semibold transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 px-6 bg-[#0B132B] hover:bg-[#16213F] text-white text-sm font-semibold rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer font-sans"
            >
              {/* Log In Icon */}
              <svg className="w-5 h-5 mr-2 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Create account
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center py-1">
              <div className="h-[1px] bg-gray-200 flex-1"></div>
              <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest font-sans">
                Or
              </span>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-4 px-6 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-semibold rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer font-sans"
            >
              {/* Google Icon */}
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            {/* Already have account footer */}
            <div className="text-center text-sm font-sans pt-1">
              <span className="text-gray-500 font-medium">Already have an account? </span>
              <Link
                href="/login"
                className="text-[#B89C72] hover:text-[#9a7e55] font-bold transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>

          </form>
        </div>
      </div>

      {/* Footer Banner */}
      <footer className="w-full bg-[#0B132B] text-[#A2B2C8] py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm font-sans space-y-4 md:space-y-0 border-t border-[#182647] relative z-10">
        <div>
          <span>© 2026 Harmony Publishing LLC. All Rights Reserved.</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 text-[#A2B2C8]">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-[#1D2E55]">|</span>
          <a href="#terms" className="hover:text-white transition-colors">Terms Of Service</a>
          <span className="text-[#1D2E55]">|</span>
          <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
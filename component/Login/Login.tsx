"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import loginBg from "@/assets/images/login.png";
import { useLoginMutation, useGoogleLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const [login, { isLoading, error }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const result = await login({ email, password }).unwrap();
      
      let accessToken = "";
      let refreshToken = "";
      
      if (result.tokens && typeof result.tokens === "object") {
        accessToken = (result.tokens as any).access || "";
        refreshToken = (result.tokens as any).refresh || "";
      } else if (typeof result.tokens === "string") {
        accessToken = result.tokens;
      }
      
      dispatch(
        setCredentials({
          user: result.user || email,
          accessToken,
          refreshToken: refreshToken || undefined,
        })
      );
      
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      const msg = err?.data?.detail || err?.data?.message || "Invalid credentials. Please try again.";
      setLocalError(msg);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    try {
      const result = await googleLogin({ token: "mock-google-id-token" }).unwrap();
      
      let accessToken = "";
      let refreshToken = "";
      
      if (result.tokens && typeof result.tokens === "object") {
        accessToken = (result.tokens as any).access || "";
        refreshToken = (result.tokens as any).refresh || "";
      } else if (typeof result.tokens === "string") {
        accessToken = result.tokens;
      }
      
      dispatch(
        setCredentials({
          user: result.user || "Google User",
          accessToken,
          refreshToken: refreshToken || undefined,
        })
      );
      
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Google sign in failed:", err);
      setLocalError("Google sign in failed. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-cover bg-center bg-no-repeat transition-all duration-500 selection:bg-[#b89c72]/30 selection:text-[#0c1424]"
      style={{ backgroundImage: `url(${loginBg.src})` }}
    >
      {/* Background soft overlay for depth */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[540px] flex flex-col items-center">
        
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
            Welcome Back, <span className="text-[#B89C72]">Author!</span>
          </h1>
          <p className="text-[14px] text-gray-500 font-medium leading-relaxed font-sans max-w-[340px] mx-auto">
            Sign in to your account and continue your publishing journey with harmony publishing.
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

        {/* Login Form Card */}
        <div className="w-full bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(184,156,114,0.06)] p-6 sm:p-10 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(184,156,114,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error alerts */}
            {localError && (
              <div className="p-4 bg-red-50 text-red-500 border border-red-200 rounded-[12px] text-xs font-sans font-semibold text-center leading-relaxed">
                ⚠️ {localError}
              </div>
            )}

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
                  disabled={isLoading || isGoogleLoading}
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-[#0B132B] tracking-wide">
                Password
              </label>
              <div className="relative rounded-[12px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* Lock Icon */}
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  disabled={isLoading || isGoogleLoading}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#FAF7F2] border border-[#EBE5D6] rounded-[12px] text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-[#FAF7F2] transition-colors duration-300 font-sans disabled:opacity-50"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-sans pt-1">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  disabled={isLoading || isGoogleLoading}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 mr-2 rounded border flex items-center justify-center transition-all duration-200 ${rememberMe ? 'border-[#B89C72] bg-[#B89C72]' : 'border-[#EBE5D6] bg-white'}`}>
                  {rememberMe && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-600 font-medium">Remember Me</span>
              </label>

              <Link
                href="/password-reset"
                className="text-[#E0533C] hover:text-[#c4432d] font-semibold transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center py-4 px-6 bg-[#0B132B] hover:bg-[#16213F] text-white text-sm font-semibold rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  {/* Log In Icon */}
                  <svg className="w-5 h-5 mr-2 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Sign in to Your account
                </>
              )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center py-2">
              <div className="h-[1px] bg-gray-200 flex-1"></div>
              <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest font-sans">
                Or
              </span>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center py-4 px-6 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-semibold rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  {/* Google Icon */}
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            {/* Create Account footer */}
            <div className="text-center text-sm font-sans pt-2">
              <span className="text-gray-500 font-medium">Don&apos;t have an account? </span>
              <Link
                href="/signup"
                className="text-[#B89C72] hover:text-[#9a7e55] font-bold transition-colors duration-200"
              >
                Create Account
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
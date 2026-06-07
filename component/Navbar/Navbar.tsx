"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";
import { useLogoutMutation, useGetProfileQuery } from "@/redux/api/authApi";
import jamesCerter from "@/assets/images/james_certer.png";

const getProfilePicture = (pic: string | null | undefined) => {
  if (!pic) return jamesCerter;
  if (pic === "string" || pic.trim() === "") return jamesCerter;
  return pic;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthenticated });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleLogout = async () => {
    try {
      const savedRefreshToken = typeof window !== "undefined" 
        ? localStorage.getItem("harmony_auth_refresh_token") 
        : null;
      if (savedRefreshToken) {
        await logout({ refresh: savedRefreshToken }).unwrap();
      }
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      dispatch(logOut());
      router.push("/");
    }
  };

  return (
    <header
      className={`fixed z-50 top-0 left-1/2 -translate-x-1/2 transition-all duration-500 ${
        scrolled
          ? "w-[calc(100%-2rem)] max-w-6xl mt-0 rounded-b-2xl shadow-[0_8px_32px_rgba(11,19,43,0.12)] py-2.5 px-6"
          : "w-full max-w-7xl py-5 px-6"
      }`}
      style={{
        backgroundColor: scrolled ? "#F9F6F2" : "transparent",
        border: scrolled ? "1px solid rgba(232,223,200,0.6)" : "none",
      }}
    >
      <div className="relative w-full">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2.5 group">
            <svg
              viewBox="0 0 100 100"
              className={`text-[#B89C72] drop-shadow-sm transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "w-6 h-6" : "w-8 h-8"
              }`}
              fill="currentColor"
            >
              <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
              <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
              <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
              <path
                d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z"
                fill="#0B132B"
                stroke="#B89C72"
                strokeWidth="2.5"
              />
            </svg>
            <span className={`font-serif font-bold text-[#0B132B] tracking-wide transition-all duration-300 group-hover:text-[#B89C72] ${
              scrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
            }`}>
              Harmony Publishing
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-0">
            {[
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "#estimator", label: "Calculator" },
              { href: "#packages", label: "Packages" },
              { href: "#assistant", label: "AI Assistant" },
              { href: "#books", label: "Books" },
              { href: "#process", label: "Process" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-bold tracking-normal uppercase text-gray-500 hover:text-[#0B132B] rounded-full hover:bg-[#B89C72]/10 transition-all duration-300 group ${
                  scrolled
                    ? "text-[8px] xl:text-[10px] px-1.5 xl:px-2.5 py-1"
                    : "text-[9px] xl:text-xs px-2 xl:px-3 py-1.5"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0.5 h-px bg-[#B89C72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full ${
                  scrolled ? "left-1.5 xl:left-2.5 right-1.5 xl:right-2.5" : "left-2 xl:left-3 right-2 xl:right-3"
                }`} />
              </a>
            ))}
          </nav>

          {/* CTA / Profile Buttons */}
          <div className="hidden sm:flex items-center space-x-1.5">
            {isAuthenticated ? (
              /* ================= AUTHENTICATED USER DROPDOWN ================= */
              <div className="relative group flex items-center">
                <button
                  onClick={() => router.push("/dashboard")}
                  className={`flex items-center gap-2 rounded-full bg-[#B89C72]/10 hover:bg-[#B89C72]/20 border border-[#B89C72]/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                    scrolled ? "px-2.5 py-1.5" : "px-3.5 py-2"
                  }`}
                >
                  <div className="relative w-5.5 h-5.5 rounded-full overflow-hidden bg-[#0B132B] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {profile?.profile_picture && profile.profile_picture !== "string" ? (
                      <Image
                        src={getProfilePicture(profile.profile_picture)}
                        alt="User Profile Pic"
                        layout="fill"
                        objectFit="cover"
                        unoptimized
                      />
                    ) : (
                      user ? user.substring(0, 2).toUpperCase() : "U"
                    )}
                  </div>
                  <span className="text-[10px] xl:text-xs font-bold text-[#0B132B] max-w-[100px] truncate">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : (user || "Author")}
                  </span>
                  <svg className="w-3 h-3 text-gray-500 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-[calc(100%+8px)] right-0 w-48 bg-white border border-[#EBE5D6] rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top-right z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#FAF7F2] hover:text-[#B89C72] transition-colors"
                  >
                    Author Dashboard
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#FAF7F2] hover:text-[#B89C72] transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer border-t border-gray-100 mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* ================= GUEST SIGN IN / SIGN UP ================= */
              <>
                <Link
                  href="/login"
                  className={`font-bold tracking-normal uppercase text-[#0B132B] hover:text-[#B89C72] transition-colors duration-200 ${
                    scrolled
                      ? "text-[9px] xl:text-[10px] px-2 py-1 xl:px-3 py-1.5"
                      : "text-[10px] xl:text-xs px-3 py-1.5 xl:px-3.5 py-2"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`font-bold tracking-normal uppercase text-white rounded-full bg-gradient-to-r from-[#B89C72] to-[#9a7e55] hover:from-[#cbb28a] hover:to-[#b89c72] shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.4)] transition-all duration-300 hover:-translate-y-0.5 ${
                    scrolled
                      ? "text-[9px] xl:text-[10px] px-3 py-1.5"
                      : "text-[10px] xl:text-xs px-3.5 py-2 xl:px-4 py-2"
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="text-[#0B132B] hover:text-[#B89C72] p-2 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+10px)] left-0 right-0 bg-[#faf8f3]/95 backdrop-blur-xl border border-[#e8dfc8]/60 rounded-2xl shadow-[0_12px_40px_rgba(11,19,43,0.14)] p-5 space-y-4 animate-fade-in mx-2">
          <nav className="flex flex-col space-y-0.5">
            {[
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "#estimator", label: "Calculator" },
              { href: "#packages", label: "Packages" },
              { href: "#assistant", label: "AI Assistant" },
              { href: "#books", label: "Books" },
              { href: "#process", label: "Process" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-[#0B132B] hover:bg-[#B89C72]/10 px-4 py-2.5 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#e8dfc8]/50">
            {isAuthenticated ? (
              /* ================= MOBILE AUTH VIEW ================= */
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-[#B89C72]/10 rounded-xl border border-[#B89C72]/30 mb-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#0B132B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {profile?.profile_picture && profile.profile_picture !== "string" ? (
                      <Image
                        src={getProfilePicture(profile.profile_picture)}
                        alt="User Profile Pic"
                        layout="fill"
                        objectFit="cover"
                        unoptimized
                      />
                    ) : (
                      user ? user.substring(0, 2).toUpperCase() : "U"
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-[#0B132B] truncate">
                      {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : (user || "Author")}
                    </p>
                    <p className="text-[10px] text-gray-400">Author Account</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold tracking-wide uppercase text-white py-3.5 rounded-xl bg-gradient-to-r from-[#B89C72] to-[#9a7e55] shadow-sm"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center text-xs font-bold tracking-wide uppercase text-red-500 py-3.5 rounded-xl border border-red-200 hover:bg-red-50 transition-all cursor-pointer bg-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* ================= MOBILE GUEST VIEW ================= */
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold tracking-wide uppercase text-[#0B132B] py-3.5 rounded-xl border border-[#0B132B]/10 hover:border-[#B89C72] hover:text-[#B89C72] transition-all bg-white"
                >
                  Author Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-bold tracking-wide uppercase text-white py-3.5 rounded-xl bg-gradient-to-r from-[#B89C72] to-[#9a7e55] shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
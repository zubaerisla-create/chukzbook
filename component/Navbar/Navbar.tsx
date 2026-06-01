"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 top-0 left-1/2 -translate-x-1/2 transition-all duration-500 ${
        scrolled
          ? "w-[calc(100%-2rem)] max-w-6xl mt-3 rounded-2xl shadow-[0_8px_32px_rgba(11,19,43,0.12)] py-2.5 px-6"
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
          <Link href="/" className="flex items-center space-x-2.5 group">
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
          <nav className="hidden lg:flex items-center space-x-0.5">
            {[
              { href: "#about", label: "About Us" },
              { href: "#services", label: "Services" },
              { href: "#estimator", label: "Book Calculator" },
              { href: "#packages", label: "Publishing Packages" },
              { href: "#books", label: "Books Published" },
              { href: "#process", label: "How It Works" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-bold tracking-wide uppercase text-gray-500 hover:text-[#0B132B] rounded-full hover:bg-[#B89C72]/10 transition-all duration-300 group ${
                  scrolled ? "text-[10px] px-2.5 py-1" : "text-xs px-3.5 py-1.5"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0.5 h-px bg-[#B89C72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full ${
                  scrolled ? "left-2.5 right-2.5" : "left-3.5 right-3.5"
                }`} />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-1.5">
            <Link
              href="/login"
              className={`font-bold tracking-wide uppercase text-[#0B132B] hover:text-[#B89C72] transition-colors duration-200 ${
                scrolled ? "text-[10px] px-3 py-2" : "text-xs px-4 py-2.5"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`font-bold tracking-wider uppercase text-white rounded-full bg-gradient-to-r from-[#B89C72] to-[#9a7e55] hover:from-[#cbb28a] hover:to-[#b89c72] shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.4)] transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled ? "text-[10px] px-4 py-2" : "text-xs px-5 py-2.5"
              }`}
            >
              Get Started
            </Link>
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
              { href: "#about", label: "About Us" },
              { href: "#services", label: "Services" },
              { href: "#estimator", label: "Book Calculator" },
              { href: "#packages", label: "Publishing Packages" },
              { href: "#books", label: "Books Published" },
              { href: "#process", label: "How It Works" },
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
          <div className="flex flex-col gap-2 pt-4 border-t border-[#e8dfc8]/50">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-bold tracking-wide uppercase text-[#0B132B] py-3 rounded-xl border border-[#0B132B]/10 hover:border-[#B89C72] hover:text-[#B89C72] transition-all bg-white"
            >
              Author Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-bold tracking-wide uppercase text-white py-3 rounded-xl bg-gradient-to-r from-[#B89C72] to-[#9a7e55] shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
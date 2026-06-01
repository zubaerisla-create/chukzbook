"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B89C72] drop-shadow-sm transition-transform duration-300 group-hover:scale-105" fill="currentColor">
              <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
              <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
              <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
              <path d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z" fill="#0B132B" stroke="#B89C72" strokeWidth="2.5" />
            </svg>
            <span className="font-serif text-xl font-bold text-[#0B132B] tracking-wide">
              Harmony Publishing
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#about" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              About Us
            </a>
            <a href="#services" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              Services
            </a>
            <a href="#estimator" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              Book Calculator
            </a>
            <a href="#packages" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              Publishing Packages
            </a>
            <a href="#books" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              Books Published
            </a>
            <a href="#process" className="text-sm font-semibold text-gray-600 hover:text-[#0B132B] transition-colors">
              How It Works
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-bold text-[#0B132B] px-5 py-2.5 rounded-[10px] border border-[#0B132B]/10 hover:border-[#0B132B] bg-white transition-all duration-200 cursor-pointer"
            >
              Author Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-bold text-white px-5 py-2.5 rounded-[10px] bg-[#0B132B] hover:bg-[#16213F] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="text-[#0B132B] hover:text-[#B89C72] p-2 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-3 px-2">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              Services
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              Book Calculator
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              Publishing Packages
            </a>
            <a
              href="#books"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              Books Published
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#0B132B]"
            >
              How It Works
            </a>
          </nav>
          <div className="flex flex-col sm:hidden pt-4 border-t border-gray-100 space-y-3 px-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-bold text-[#0B132B] py-3 rounded-[10px] border border-[#0B132B]/10 bg-white"
            >
              Author Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm font-bold text-white py-3 rounded-[10px] bg-[#0B132B]"
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

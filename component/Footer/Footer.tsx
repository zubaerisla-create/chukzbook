"use client";

import React from "react";
import Link from "next/link";
import footerBg from "@/assets/images/footer.png";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat pt-20 overflow-hidden"
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      {/* Soft light overlay to blend background asset graphics */}
      <div className="absolute inset-0 bg-[#FAF8F5]/30 pointer-events-none z-0" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-10">
            <h3 className="font-serif text-3xl font-bold text-[#0B132B] mb-5 tracking-wide">
              Harmony Publishing
            </h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mb-6">
              A premium US-based self-publishing and book printing platform dedicated to bringing your story to the world with elegance and precision.
            </p>
            {/* Height Spacer to account for the background book/quill graphic on the left bottom side */}
            <div className="hidden lg:block h-36" />
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[#B89C72] font-serif text-sm font-bold tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#packages" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="#estimator" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[#B89C72] font-serif text-sm font-bold tracking-wider uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Editing
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Cover Design
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Formatting
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Printing
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Distribution
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[#B89C72] font-serif text-sm font-bold tracking-wider uppercase mb-5">
              Resources
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#publishing-guide" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Publishing Guide
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-[#0B132B] transition-colors">
                  Author Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Update Column */}
          <div className="lg:col-span-2 flex flex-col space-y-5">
            <div>
              <h4 className="text-[#B89C72] font-serif text-sm font-bold tracking-wider uppercase mb-4">
                STAY UPDATE
              </h4>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">
                Subscribe to get publishing tips, author stories & exclusive updates.
              </p>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white border border-[#e8dfc8] rounded-lg px-4 py-2.5 pr-12 text-xs placeholder-gray-400 text-[#0c1424] focus:outline-none focus:border-[#B89C72] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 w-10 bg-[#B89C72] hover:bg-[#9a7e55] rounded-md text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="m2.01 21 22.58-9L2.01 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </form>

            {/* Social Icons row */}
            <div className="flex items-center gap-2">
              {[
                { icon: "facebook", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                { icon: "twitter", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                { icon: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { icon: "member", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" },
                { icon: "rss", path: "M4 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-8c5.523 0 10 4.477 10 10h-2c0-4.418-3.582-8-8-8v-2zm0-8c9.941 0 18 8.059 18 18h-2c0-8.837-7.163-16-16-16V3z" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#B89C72] flex items-center justify-center text-gray-500 hover:text-[#B89C72] hover:bg-[#B89C72]/5 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar copyright container */}
      <div className="bg-[#0B132B] py-5 border-t border-[#B89C72]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs font-medium">
            © 2024 Harmony Publishing LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-white/60 text-xs font-medium">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms Of Service
            </Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms Of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

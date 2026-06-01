import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0B132B] text-[#A2B2C8]">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B89C72]" fill="currentColor">
                <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
                <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
                <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
                <path d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z" fill="#162040" stroke="#B89C72" strokeWidth="2.5" />
              </svg>
              <span className="font-serif text-xl font-bold text-white tracking-wide">Harmony Publishing</span>
            </div>
            <p className="text-sm leading-relaxed text-[#7A8FA8] mb-6 max-w-xs">
              Helping authors transform their ideas into professionally published books that inspire the world.
            </p>
            <div className="flex gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-[#1D2E55] flex items-center justify-center hover:border-[#B89C72] hover:text-[#B89C72] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Our Services", "Book Calculator", "Publishing Packages", "Books Published", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#7A8FA8] hover:text-[#B89C72] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide">Our Services</h4>
            <ul className="space-y-3 text-sm">
              {["Editing & Proofreading", "Cover Design", "Interior Formatting", "Book Printing", "Marketing Services", "Global Distribution"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#7A8FA8] hover:text-[#B89C72] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm text-[#7A8FA8]">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#B89C72] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                support@harmonypublishing.com
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#B89C72] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#B89C72] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                123 Publishing Ave, New York, NY 10001
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#B89C72] hover:bg-[#9a7e55] text-white text-sm font-bold rounded-xl transition-all duration-200"
              >
                Start Publishing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1D2E55]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4D6280]">
          <p>© 2026 Harmony Publishing LLC. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#B89C72] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#B89C72] transition-colors">Terms Of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-[#B89C72] transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

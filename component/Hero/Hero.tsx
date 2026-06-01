"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroBg from "@/assets/images/hero1.png";
import heroRight from "@/assets/images/hero1-right-side.png";

const stats = [
  { value: "10,000", label: "Books Published" },
  { value: "8,500+", label: "Happy Authors" },
  { value: "15+", label: "Years Of Excellence" },
  { value: "50+", label: "Countries Served" },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 pt-36 pb-16 flex-1">
        
        {/* Left content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-6 text-left">
          
          {/* Trust Badge */}
          <div className="flex items-center gap-2 bg-white/80 border border-[#EBE5D6] rounded-full px-4 py-2 shadow-sm">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B89C72] text-white">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">
              Trusted By 10,000+ Authors Worldwide
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[64px] font-bold text-[#0B132B] leading-[1.1] tracking-tight">
              Your Story
              <br />
              Our Expertise
              <br />
              <span className="text-[#B89C72]">Extraordinary</span>
              <br />
              <span className="text-[#B89C72]">Results</span>
            </h1>
          </div>

          {/* Sub-copy */}
          <p className="text-base text-gray-500 font-medium leading-relaxed max-w-md">
            From Idea To Bestseller. We Provide End-To-End Publishing Solutions With Premium Editing, Stunning Design, Global Printing And Powerful Marketing.
          </p>

          {/* Feature bullets */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Premium Quality", "Global Printing", "Author Success"].map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-7 py-4 text-sm font-bold text-white bg-[#0B132B] rounded-[12px] hover:bg-[#16213F] shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Start your Publishing Journey
            </Link>
            <a
              href="#estimator"
              className="inline-flex items-center justify-center px-7 py-4 text-sm font-bold text-[#0B132B] bg-white border border-[#EBE5D6] rounded-[12px] hover:border-[#B89C72] hover:-translate-y-0.5 shadow transition-all duration-300"
            >
              Calculate Printing Cost
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right side image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0 lg:justify-end">
          <div className="relative w-full max-w-[500px]">
            <Image
              src={heroRight}
              alt="Beyond the Horizon book showcase"
              className="w-full h-auto drop-shadow-2xl object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative z-10 w-full bg-white/80 backdrop-blur-sm border-t border-[#EBE5D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#EBE5D6]">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-8 px-4 text-center">
                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-[#FAF7F2] rounded-full border border-[#EBE5D6]">
                  <svg className="w-6 h-6 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-[#0B132B]">{stat.value}</span>
                <span className="text-sm text-gray-500 font-medium mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

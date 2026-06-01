"use client";

import React from "react";
import readyBg from "@/assets/images/ready_to_publish.png";

const ReadyToPublish = () => {
  return (
    <section
      id="ready-to-publish"
      className="relative py-28 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${readyBg.src})` }}
    >
      {/* Dark overlay to match the deep gothic/moonlight ambience and guarantee readability */}
      <div className="absolute inset-0 bg-[#0B132B]/60 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Title */}
        <h2 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight tracking-wide">
          Ready To Publish <br />
          <span className="text-[#B89C72]">Your Book</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto mb-10">
          Join Thousands Of Authors Who Turned Their Ideas Into Published Books. We Handle Everything You Take The Credit.
        </p>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#signup"
            className="w-full sm:w-auto px-8 py-4 bg-[#F2A33A] hover:bg-[#d88f2b] text-[#0B132B] font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Start your Publishing Journey
          </a>
          <a
            href="#estimator"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-100 text-[#0B132B] font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
          >
            Calculate Printing Cost
            {/* Calculator Icon */}
            <svg className="w-4.5 h-4.5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <rect width="14" height="18" x="5" y="3" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h2m3 0h2m-8 4h2m3 0h2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadyToPublish;

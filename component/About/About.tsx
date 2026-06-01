import React from "react";
import Image from "next/image";
import heroAbout from "@/assets/images/hero7.png";
import hero6 from "@/assets/images/hero6.png";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero6.src})` }}
    >
      {/* Light overlay to keep text readable and image visible */}
      <div className="absolute inset-0 bg-white/45 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] leading-tight mb-6">
              Helping Authors<br />Turn Ideas Into<br />
              <span className="text-[#B89C72]">Published Success.</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg">
              Harmony Publishing Is A Full-Service Publishing Company Dedicated To Helping Authors Transform Their Ideas Into Professionally Published Books That Inspire, Educate, And Connect With Readers Worldwide. From Manuscript Development And Editing To Custom Book Design, Formatting, Publishing, And Global Distribution, We Provide End-To-End Publishing Solutions Tailored To Each Author&apos;s Unique Vision.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-lg">
              Our Mission Is To Make The Publishing Journey Simple, Creative, And Rewarding By Combining Expert Guidance, Innovative Strategies, And Personalized Support. Whether You Are A First-Time Writer Or An Experienced Author, Harmony Publishing Is Committed To Bringing Your Story To The World.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#process"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#0B132B] hover:bg-[#16213F] text-white font-bold text-sm rounded-[12px] shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                Our Story
              </a>
              <a
                href="#assistant"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[#EBE5D6] hover:border-[#B89C72] text-[#0B132B] font-bold text-sm rounded-[12px] hover:-translate-y-0.5 transition-all duration-300"
              >
                Talk to our publishing Expert
                <svg className="w-4 h-4 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              </a>
            </div>
          </div>

       
        </div>
      </div>
    </section>
  );
};

export default About;

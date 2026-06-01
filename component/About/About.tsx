import React from "react";
import Image from "next/image";
import heroAbout from "@/assets/images/hero7.png";

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src={heroAbout}
                alt="Author with published book"
                fill
                className="object-cover"
              />
              {/* Overlay card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm border border-[#EBE5D6] rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B89C72]/20 border border-[#B89C72]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0B132B]">Harmony Publishing</p>
                    <p className="text-xs text-gray-400">Your Story, Your Purpose, A Lasting Impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

"use client";

import React from "react";
import Image from "next/image";
import jamesAvatar from "@/assets/images/james_certer.png";
import bookCover from "@/assets/images/leaders_blueprint.png";

const testimonials = [
  {
    id: 1,
    name: "James Certer",
    role: "Business Author",
    stars: 5,
    quote:
      "Professional Service, Clear Communication, And Outstanding Quality. The Team Made My Publishing Journey Smooth And Stress-Free.",
    bookTitle: "The Leader's Blueprint",
    bookDate: "Published March 2024",
    isActive: false,
  },
  {
    id: 2,
    name: "James Certer",
    role: "Business Author",
    stars: 5,
    quote:
      "Professional Service, Clear Communication, And Outstanding Quality. The Team Made My Publishing Journey Smooth And Stress-Free.",
    bookTitle: "The Leader's Blueprint",
    bookDate: "Published March 2024",
    isActive: true,
  },
  {
    id: 3,
    name: "James Certer",
    role: "Business Author",
    stars: 5,
    quote:
      "Professional Service, Clear Communication, And Outstanding Quality. The Team Made My Publishing Journey Smooth And Stress-Free.",
    bookTitle: "The Leader's Blueprint",
    bookDate: "Published March 2024",
    isActive: false,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white border border-[#EBE5D6] rounded-full px-4 py-1.5 shadow-sm">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#B89C72] text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.09 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L14.91 8.26L12 2Z" />
              </svg>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#B89C72] uppercase">
              Published Excellence
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4">
            What Our Authors <span className="text-[#B89C72]">Are Saying</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Real Experiences From Authors Who Trusted Harmony Publishing To Bring Their Books Life
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#B89C72]">
            <span className="w-8 h-px bg-[#B89C72]/45"></span>
            <span className="text-xs">✦</span>
            <span className="w-8 h-px bg-[#B89C72]/45"></span>
          </div>
        </div>

        {/* Ratings Summary Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16">
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0B132B] leading-none">4.9/5</div>
              <div className="text-xs text-gray-500 mt-1 font-semibold">Average Rating</div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-px h-10 bg-[#EBE5D6]" />

          {/* Happy Authors */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0B132B]/5 rounded-full flex items-center justify-center text-[#0B132B]">
              <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m0 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 003 16.273a3.001 3.001 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0B132B] leading-none">2,000+</div>
              <div className="text-xs text-gray-500 mt-1 font-semibold">Happy Authors</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-sm relative ${
                t.isActive
                  ? "bg-[#8d652b] text-white shadow-xl scale-[1.03] z-10 border border-[#8d652b]"
                  : "bg-white text-gray-700 border border-[#e8dfc8]/50 hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#EBE5D6]/60 bg-gray-100 flex-shrink-0">
                    <Image
                      src={jamesAvatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-serif text-lg font-bold ${t.isActive ? "text-white" : "text-[#0B132B]"}`}>
                      {t.name}
                    </h3>
                    <p className={`text-xs ${t.isActive ? "text-amber-100/90" : "text-[#B89C72]"} font-medium`}>
                      {t.role}
                    </p>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {[...Array(t.stars)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-amber-500" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Double Quote Graphic */}
                <div className={`mb-4 select-none ${t.isActive ? "text-amber-200/20" : "text-gray-200"}`}>
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Quote */}
                <p className={`text-sm leading-relaxed mb-8 ${t.isActive ? "text-white/95" : "text-gray-600"} font-medium`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Book promo subcard */}
              <div
                className={`rounded-2xl p-4 flex items-center gap-4 border transition-colors ${
                  t.isActive
                    ? "bg-white/10 border-white/20 hover:bg-white/15"
                    : "bg-[#FAF8F5] border-[#e8dfc8]/40 hover:bg-gray-50"
                }`}
              >
                <div className="relative w-12 h-16 rounded-md overflow-hidden shadow flex-shrink-0">
                  <Image
                    src={bookCover}
                    alt={t.bookTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-serif text-sm font-bold truncate ${t.isActive ? "text-white" : "text-[#0B132B]"}`}>
                    {t.bookTitle}
                  </h4>
                  <p className={`text-[10px] ${t.isActive ? "text-white/80" : "text-gray-500"} mt-0.5`}>
                    {t.bookDate}
                  </p>
                  <button
                    className={`mt-2 text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-lg transition-all ${
                      t.isActive
                        ? "bg-[#0B132B] text-white hover:bg-[#16213F]"
                        : "bg-white text-[#B89C72] border border-[#B89C72] hover:bg-[#B89C72] hover:text-white"
                    }`}
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

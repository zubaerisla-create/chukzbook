import React from "react";
import hero2 from "@/assets/images/hero2.png";

const features = [
  {
    title: "Editing & Proofreading",
    desc: "Polished, Professional Content That Readers Love.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    title: "Cover Design",
    desc: "Stunning Covers That Capture Attention.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Formatting",
    desc: "Perfect Interior Formatting For Print & EBook.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    title: "Printing",
    desc: "High-Quality Printing With Global Delivery.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Marketing",
    desc: "Promote Your Book And Reach More Readers.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 1 8.835-2.535m0 0A23.74 23.74 0 0 1 18 4.5c0 2.31-.16 4.585-.465 6.817m-9.195-6.817a23.75 23.75 0 0 1 9.195 0m0 0c.316 2.232.465 4.507.465 6.817 0 1.134-.067 2.25-.202 3.347m0 0a23.848 23.848 0 0 1-8.835 2.535" />
      </svg>
    ),
  },
  {
    title: "Distribution",
    desc: "Get Your Book On Major Retailers Worldwide.",
    icon: (
      <svg className="w-8 h-8 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero2.src})` }}
    >
      {/* Light overlay to keep text readable and image visible */}
      <div className="absolute inset-0 bg-white/45 pointer-events-none" />

      {/* Decorative background watermark */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-[#B89C72]/10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-[#B89C72]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">All In One Publishing Solutions</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4 leading-tight">
            Everything You Need To{" "}
            <br />
            <span className="text-[#B89C72]">Publish</span> Successfully
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            We Handle The Details So You Can Focus On Your Story.
          </p>

          {/* Star Separator */}
          <div className="flex items-center justify-center mt-6 max-w-[200px] mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent to-[#b89c72]/50 flex-1" />
            <svg className="mx-3 w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
            </svg>
            <div className="h-px bg-gradient-to-l from-transparent to-[#b89c72]/50 flex-1" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-[#EBE5D6] p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B89C72]/10 transition-colors duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0B132B] mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B89C72] hover:text-[#0B132B] transition-colors mt-auto"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

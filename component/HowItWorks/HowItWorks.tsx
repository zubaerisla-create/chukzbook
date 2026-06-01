import React from "react";
import hero8 from "@/assets/images/hero8.png";
import hero9 from "@/assets/images/hero9.png";

const steps = [
  {
    num: "01",
    title: "Submit Manuscript",
    desc: "Upload your manuscript securely through our platform. Share your vision and publishing goals with us.",
    badge: "Secure & Confidential",
    icon: (
      <svg className="w-10 h-10 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Consultation",
    desc: "Our Publishing Experts Review Your Manuscript And Discuss The Best Strategy For Your Book's Success.",
    badge: "Expert Guidance",
    icon: (
      <svg className="w-10 h-10 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Editing & Design",
    desc: "We Refine Your Content Through Professional Editing And Design A Cover That Captures Your Story.",
    badge: "Premium Quality",
    icon: (
      <svg className="w-10 h-10 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Publishing",
    desc: "Your Book Is Professionally Formatted And Published In Print, EBook, And Audiobook Formats.",
    badge: "All Formats",
    icon: (
      <svg className="w-10 h-10 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Distribution",
    desc: "We Distribute Your Book Globally To Major Stores, Libraries, And Retailers To Reach More Readers.",
    badge: "Global Reach",
    icon: (
      <svg className="w-10 h-10 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const platforms = [
  { name: "Amazon", color: "text-[#FF9900]", desc: "Reach millions of readers worldwide on the largest book marketplace." },
  { name: "Apple Books", color: "text-[#FC3C44]", desc: "Get your book on iPhone, iPad, Mac, and Apple devices." },
  { name: "Barnes & Noble", color: "text-[#1B5E20]", desc: "Be discovered by millions of readers in-store and online." },
  { name: "Kobo", color: "text-[#E32D24]", desc: "Available to a global audience through Kobo's reading app." },
  { name: "Google Play Books", color: "text-[#4285F4]", desc: "Publish on Google Play and connect with readers worldwide." },
  { name: "Smashwords", color: "text-[#6B3FA0]", desc: "Distribute to libraries, bookstores, and global retailers." },
  { name: "IngramSpark", color: "text-[#F4A020]", desc: "Global print distribution with the world's largest wholesaler." },
  { name: "Draft2Digital", color: "text-[#C0392B]", desc: "Aggregate and distribute your eBook to hundreds of stores." },
  { name: "OverDrive", color: "text-[#2980B9]", desc: "Get your book into thousands of libraries worldwide." },
  { name: "Spotify", color: "text-[#1DB954]", desc: "Reach audiobook listeners on the world's leading audio platform." },
];

const HowItWorks = () => {
  return (
    <>
      {/* How It Works */}
      <section
        id="process"
        className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero8.src})` }}
      >
        {/* Light overlay to keep text readable and image visible */}
        <div className="absolute inset-0 bg-white/45 pointer-events-none z-0" />

        <div className="absolute top-0 right-0 w-72 h-72 rounded-full border border-[#B89C72]/10 -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full border border-[#B89C72]/10 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
              <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
                <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
              </svg>
              <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">Our Simple Process</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4 leading-tight">
              How It <span className="text-[#B89C72]">Works</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              We Turn Your Manuscript Into A Professionally Published Book With A Proven Process Trusted By Thousands Of Authors.
            </p>
            <div className="flex items-center justify-center mt-5 max-w-[120px] mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent to-[#b89c72]/50 flex-1" />
              <svg className="mx-2 w-2.5 h-2.5 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
                <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
              </svg>
              <div className="h-px bg-gradient-to-l from-transparent to-[#b89c72]/50 flex-1" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group flex flex-col items-center text-center p-6 bg-[#FAF8F5] rounded-2xl border border-[#EBE5D6] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                {/* Step number */}
                <span className="absolute top-4 right-4 font-serif text-4xl font-bold text-[#B89C72]/10 select-none">
                  {step.num}
                </span>
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#EBE5D6] flex items-center justify-center mb-5 shadow-sm group-hover:bg-[#B89C72]/5 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0B132B] mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{step.desc}</p>
                <div className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#B89C72]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {step.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section
        className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero9.src})` }}
      >
        {/* Light overlay to keep text readable and image visible */}
        <div className="absolute inset-0 bg-[#FAF8F5]/45 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
              <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
                <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
              </svg>
              <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">Publish Everywhere</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4 leading-tight">
              We Publish On All<br />Major Plaforms
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Your Book Will Be Available Globally On The World&apos;s Leading Platforms, Reaching Millions Of Readers Across The Globe.
            </p>
            <div className="flex items-center justify-center mt-5 max-w-[120px] mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent to-[#b89c72]/50 flex-1" />
              <svg className="mx-2 w-2.5 h-2.5 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
                <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
              </svg>
              <div className="h-px bg-gradient-to-l from-transparent to-[#b89c72]/50 flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {platforms.map((p, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-[#EBE5D6] p-5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EBE5D6] flex items-center justify-center mb-3 group-hover:bg-[#B89C72]/5">
                  <span className={`text-lg font-black ${p.color}`}>{p.name.charAt(0)}</span>
                </div>
                <p className="text-sm font-bold text-[#0B132B] mb-1">{p.name}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{p.desc}</p>
                <div className="mt-3 w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;

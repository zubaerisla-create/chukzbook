import React from "react";
import Link from "next/link";
import hero4 from "@/assets/images/hero4.png";

const packages = [
  {
    name: "Starter",
    price: "$499",
    tag: null,
    features: [
      "Professional Editing",
      "Basic Cover Design",
      "Standard Formatting",
      "Print-Ready Files",
      "1 Revision",
    ],
    cta: "Start Publishing",
    highlight: false,
  },
  {
    name: "Complete",
    price: "$950",
    tag: null,
    features: [
      "Advanced Editing",
      "Custom Cover Design",
      "Interior Author Photo",
      "Print & eBook Formatting",
      "3 Revisions",
      "Amazon KDP Setup",
    ],
    cta: "Start Publishing",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$1,499",
    tag: "Most Popular",
    features: [
      "Complete Editing Suite",
      "Premium Cover Design",
      "Interior Layout & Design",
      "All Format Publishing",
      "Author Branding Package",
      "Video Book Trailer",
      "Author Website",
      "5 Revisions",
    ],
    cta: "Start Publishing",
    highlight: true,
  },
  {
    name: "Rockstar",
    price: "$2,499",
    tag: null,
    features: [
      "Everything in Premium",
      "Ghostwriting Support",
      "Advanced Marketing Plan",
      "Social Media Graphics",
      "Press Release",
      "Priority Support",
      "Unlimited Revisions",
    ],
    cta: "Start Publishing",
    highlight: false,
  },
  {
    name: "Legend",
    price: "$4,999",
    tag: "Elite",
    features: [
      "Everything in Rockstar",
      "Executive Manuscript Edit",
      "Dedicated Account Manager",
      "Retail Distribution Setup",
      "PR Campaign",
      "Audiobook Production",
      "TV & Print Media Mentions",
      "Lifetime Support",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const Packages = () => {
  return (
    <section
      id="packages"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero4.src})` }}
    >
      {/* Light overlay to keep text readable and image visible */}
      <div className="absolute inset-0 bg-[#FAF8F5]/45 pointer-events-none" />

      {/* Decorative */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full border border-[#B89C72]/10 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-[#B89C72]/10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
            </svg>
            <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">Book Printing Calculator</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] leading-tight mb-4">
            Instant Book Printing<br />
            <span className="text-[#B89C72]">Cost Estimator</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Choose the publishing package that&apos;s right for your book and budget.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-6 flex flex-col shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                pkg.highlight
                  ? "bg-gradient-to-b from-[#B89C72] to-[#9a7e55] text-white border-0"
                  : "bg-white border border-[#EBE5D6] text-[#0B132B]"
              }`}
            >
              {/* Tag Badge */}
              {pkg.tag && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-4 py-1 rounded-full ${pkg.highlight ? "bg-[#0B132B] text-white" : "bg-[#B89C72] text-white"}`}>
                  {pkg.tag}
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-6 pt-3">
                <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${pkg.highlight ? "bg-white/20" : "bg-[#FAF7F2] border border-[#EBE5D6]"}`}>
                  <svg className={`w-5 h-5 ${pkg.highlight ? "text-white" : "text-[#B89C72]"}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className={`font-serif text-xl font-bold mb-1 ${pkg.highlight ? "text-white" : "text-[#0B132B]"}`}>{pkg.name}</h3>
                <div className={`font-serif text-3xl font-bold ${pkg.highlight ? "text-white" : "text-[#B89C72]"}`}>{pkg.price}</div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-6">
                {pkg.features.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2 text-xs leading-relaxed ${pkg.highlight ? "text-white/90" : "text-gray-600"}`}>
                    <svg className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pkg.highlight ? "text-white" : "text-[#B89C72]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/signup"
                className={`block text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  pkg.highlight
                    ? "bg-white text-[#B89C72] hover:bg-gray-50"
                    : "bg-[#0B132B] text-white hover:bg-[#16213F]"
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;

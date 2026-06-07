"use client";

import React, { useState } from "react";
import hero3 from "@/assets/images/hero3.png";

const INTERIOR_PRICES: Record<string, number> = {
  "Black & White": 0.013,
  "Standard Color": 0.07,
  "Premium Color": 0.085,
};

const BINDING_PRICES: Record<string, number> = {
  "Perfect Bound": 1.5,
  "Saddle Stitch": 0.8,
  "Case Bound (Hardcover)": 3.5,
};

const TRIM_SIZES = ["4x6", "5x8", "5.5x8.5", "6x9", "8x10", "8.5x11"];
const PAPER_TYPES = ["White", "Cream", "Gloss"];

const SERVICE_PRICES: Record<string, number> = {
  Editing: 299,
  Formatting: 199,
  "Cover Budge": 249,
  Distribution: 149,
};

const premiumFeatures = [
  "Personalized Author Branding Package",
  "Video Book Trailer",
  "Author Website",
  "Social Media Graphics",
  "Marketing Toolkit",
  "Priority Support",
  "5 Revisions",
];

const Estimator = () => {
  const [bookType, setBookType] = useState("Paperback");
  const [interiorType, setInteriorType] = useState("Black & White");
  const [bindingType, setBindingType] = useState("Perfect Bound");
  const [trimSize, setTrimSize] = useState("6x9");
  const [pageCount, setPageCount] = useState(200);
  const [quantity, setQuantity] = useState(200);
  const [paperType, setPaperType] = useState("White");
  const [paperWeight, setPaperWeight] = useState(60);
  const [coverFinish, setCoverFinish] = useState("Glossy");
  const [services, setServices] = useState<Record<string, boolean>>({
    Editing: false,
    Formatting: false,
    "Cover Budge": false,
    Distribution: false,
  });

  const toggleService = (s: string) =>
    setServices((prev) => ({ ...prev, [s]: !prev[s] }));

  const printingCostPerCopy =
    INTERIOR_PRICES[interiorType] * pageCount +
    BINDING_PRICES[bindingType] +
    (bookType === "Hardcover" ? 2 : 0);

  const printingCost = printingCostPerCopy * quantity;
  const serviceCost = Object.entries(services)
    .filter(([, v]) => v)
    .reduce((acc, [k]) => acc + SERVICE_PRICES[k], 0);
  const totalCost = printingCost + serviceCost;

  const handleTalkToSpecialist = () => {
    const quoteMessage = `Hi, I just calculated a printing estimate. 
Specs: 
- Book Type: ${bookType}
- Interior: ${interiorType}
- Binding: ${bindingType}
- Trim Size: ${trimSize}
- Page Count: ${pageCount}
- Quantity: ${quantity} copies
- Paper Type: ${paperType}
- Paper Weight: ${paperWeight}lb
- Cover Finish: ${coverFinish}

Total Estimated Cost: $${totalCost.toFixed(2)}

I would like to talk to a specialist about this quote.`;

    if (typeof window !== "undefined") {
      localStorage.setItem("harmony_calculator_handoff", quoteMessage);
      // Trigger the floating chat widget to open and send the quote
      window.dispatchEvent(new CustomEvent("harmony_calculator_handoff_trigger"));
      window.dispatchEvent(new CustomEvent("open_chat_widget"));
    }
  };

  return (
    <section
      id="estimator"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero3.src})` }}
    >
      {/* Light overlay to keep text readable and image visible */}
      <div className="absolute inset-0 bg-white/45 pointer-events-none" />

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
            Get An Instant Premium Publishing Quote With Professional Print Options Tailored For Your Book Project
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">

          {/* Left: Calculator Form */}
          <div className="flex-1 bg-[#FAF8F5] rounded-2xl border border-[#EBE5D6] p-7 space-y-7">
            
            {/* Book Specs */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B132B] mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Book Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Book Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Book Type</label>
                  <select value={bookType} onChange={(e) => setBookType(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    <option>Paperback</option>
                    <option>Hardcover</option>
                  </select>
                </div>

                {/* Interior Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Interior Type</label>
                  <select value={interiorType} onChange={(e) => setInteriorType(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    {Object.keys(INTERIOR_PRICES).map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>

                {/* Binding Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Binding Type</label>
                  <select value={bindingType} onChange={(e) => setBindingType(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    {Object.keys(BINDING_PRICES).map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>

                {/* Trim Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Trim Size</label>
                  <select value={trimSize} onChange={(e) => setTrimSize(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    {TRIM_SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {/* Page Count */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Page Count</label>
                  <input type="number" min={24} max={800} value={pageCount} onChange={(e) => setPageCount(+e.target.value)}
                    className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]" />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Quantity</label>
                  <input type="number" min={1} max={10000} value={quantity} onChange={(e) => setQuantity(+e.target.value)}
                    className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]" />
                </div>

                {/* Cover Finish */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Cover Finish</label>
                  <select value={coverFinish} onChange={(e) => setCoverFinish(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    <option>Glossy</option>
                    <option>Matte</option>
                    <option>Soft Touch</option>
                  </select>
                </div>

                {/* Paper Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Paper Type</label>
                  <select value={paperType} onChange={(e) => setPaperType(e.target.value)} className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]">
                    {PAPER_TYPES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                {/* Paper Weight */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Paper Weight (lb)</label>
                  <input type="number" min={50} max={100} value={paperWeight} onChange={(e) => setPaperWeight(+e.target.value)}
                    className="w-full border border-[#EBE5D6] rounded-lg px-3 py-2.5 text-sm bg-white text-[#0B132B] focus:outline-none focus:border-[#B89C72]" />
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B132B] mb-4">Additional Services</h3>
              <p className="text-xs text-gray-400 mb-4">Select The Services You Need (Optional)</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(services).map((s) => (
                  <label key={s} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${services[s] ? "border-[#B89C72] bg-[#B89C72]/5" : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50"}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${services[s] ? "border-[#B89C72] bg-[#B89C72]" : "border-gray-300"}`}
                      onClick={() => toggleService(s)}>
                      {services[s] && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#0B132B] block">{s}</span>
                      <span className="text-xs text-gray-400">${SERVICE_PRICES[s]}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white border border-[#EBE5D6] rounded-xl p-5">
              <h4 className="font-semibold text-[#0B132B] mb-4 text-sm">Cost Breakdown</h4>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Printing Cost ({quantity} copies)</span>
                  <span className="font-semibold text-[#0B132B]">${printingCost.toFixed(2)}</span>
                </div>
                {Object.entries(services).filter(([, v]) => v).map(([k]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}</span>
                    <span className="font-semibold text-[#0B132B]">${SERVICE_PRICES[k].toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#EBE5D6] pt-4 flex items-center justify-between">
                <span className="font-bold text-[#0B132B]">Total Estimated Cost</span>
                <span className="font-serif text-3xl font-bold text-[#B89C72]">${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 bg-[#0B132B] hover:bg-[#16213F] text-white font-bold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              Calculate Printing Cost
            </button>
          </div>

          {/* Right: Recommended Package Sidebar */}
          <div className="w-full xl:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-gradient-to-br from-[#0B132B] to-[#162040] rounded-2xl p-7 text-white shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1 bg-[#B89C72]/20 rounded-full px-3 py-1 mb-3">
                  <svg className="w-3 h-3 text-[#B89C72] fill-current rotate-45" viewBox="0 0 24 24">
                    <path d="M12 0l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" />
                  </svg>
                  <span className="text-xs font-bold text-[#B89C72]">Recommended Package</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Premium</h3>
                <div className="mt-2">
                  <span className="font-serif text-4xl font-bold text-[#B89C72]">$1,499</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-[#B89C72] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3.5 bg-[#B89C72] hover:bg-[#a08660] text-white text-sm font-bold rounded-xl transition-colors duration-300 cursor-pointer">
                Get This Package
              </button>
              <button 
                onClick={handleTalkToSpecialist}
                className="w-full text-center text-xs text-gray-400 hover:text-white mt-4 underline cursor-pointer bg-transparent border-0 transition-colors"
              >
                Talk to a Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimator;

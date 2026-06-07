"use client";

import React, { useState, useEffect } from "react";
import superAdminDashboardBg from "@/assets/images/super-admin-dashboard-bg.png";
import superAdminBgHeader from "@/assets/images/super-admin-bg-header.png";

// Option lists matching screenshots and design specs
const TRIM_SIZES = [
  { name: "Pocket book", size: "5 × 8 in", quoteLabel: "Pocket book (5 × 8 In)" },
  { name: "Digest", size: "5.5 × 8.5 in", quoteLabel: "Digest (5.5 × 8.5 In)" },
  { name: "A5", size: "5.8 × 8.3 in", quoteLabel: "A5 (5.8 × 8.3 In)" },
  { name: "Us trade", size: "5.8 × 8.3 in", quoteLabel: "US Trade (6 × 9 In)", default: true },
  { name: "Royal", size: "6.1 × 9.2 in", quoteLabel: "Royal (6.1 × 9.2 In)" },
  { name: "Small square", size: "7.5 × 7.5 in", quoteLabel: "Small square (7.5 × 7.5 In)" },
  { name: "Square", size: "8.5 × 8.5 in", quoteLabel: "Square (8.5 × 8.5 In)" },
  { name: "Comic", size: "6.625 × 10.25 in", quoteLabel: "Comic (6.625 × 10.25 In)" },
  { name: "Medium Trade", size: "7 × 10 in", quoteLabel: "Medium Trade (7 × 10 In)" },
  { name: "Executive", size: "7 × 10 in", quoteLabel: "Executive (7 × 10 In)" },
  { name: "Us letter", size: "8.5 × 11 in", quoteLabel: "Us letter (8.5 × 11 In)" },
  { name: "A4", size: "8.3 × 11.7 in", quoteLabel: "A4 (8.3 × 11.7 In)" },
  { name: "US Letter Landscape", size: "11 × 8.5 in", quoteLabel: "US Letter Landscape (11 × 8.5 In)" },
  { name: "Large portrait", size: "9 × 12 in", quoteLabel: "Large portrait (9 × 12 In)" },
  { name: "Large landscape", size: "12 × 9 in", quoteLabel: "Large landscape (12 × 9 In)" },
  { name: "Large square", size: "10 × 10 in", quoteLabel: "Large square (10 × 10 In)" }
];

const COVER_STYLES = [
  { name: "Softcover", desc: "Standard Flexible Paperback Cover." },
  { name: "Softcover With Interior Cover Printing", desc: "Softcover with printed inside cover flaps." },
  { name: "Hardcover", desc: "Premium Hard Case Binding." }
];

const COVER_FINISHES = [
  { name: "Gloss Cover Finish", desc: "Shiny, reflective coating that enhances colors." },
  { name: "Matte Cover Finish", desc: "Smooth, non-glare finish with a modern look." },
  { name: "Soft Touch Cover Finish", desc: "Velvety, premium texture with a luxurious feel." }
];

const PRINT_TYPES = [
  { name: "Black Interior Printing", desc: "Classic Black And White Interior" },
  { name: "Color Interior Printing", desc: "Full Colour Interior Throughout" }
];

const PAPER_STOCKS = [
  { name: "60lb Natural", desc: "Creamy Off-White Paper. Perfect For Books. 60lb White" },
  { name: "60lb White", desc: "Bright White Paper. Crisp And Clean Look." },
  { name: "70lb Natural", desc: "Thicker Creamy Paper. Rich Quality Feel." },
  { name: "80lb Natural", desc: "Thick And Sturdy. Premium Quality." },
  { name: "80lb White", desc: "Very Thick Bright White. Maximum Quality." }
];

const steps = [
  { id: 1, label: "Trim Size", sub: "Choose Your Book Size" },
  { id: 2, label: "Cover Style", sub: "Choose Cover Style" },
  { id: 3, label: "Cover Finish", sub: "Choose Cover Finish" },
  { id: 4, label: "Print Type", sub: "Choose Interior Print" },
  { id: 5, label: "Paper Stock", sub: "Choose Paper Type" },
  { id: 6, label: "Quantity & Pages", sub: "Enter Quantity & Pages" },
  { id: 7, label: "Summary", sub: "Review & Confirm" }
];

export default function SuperAdminDashboard() {
  const [activeStep, setActiveStep] = useState(1);

  // Specifications state variables
  const [selectedTrim, setSelectedTrim] = useState(TRIM_SIZES[3]); // Us trade default
  const [coverStyle, setCoverStyle] = useState("Softcover");
  const [coverFinish, setCoverFinish] = useState("Gloss Cover Finish");
  const [printType, setPrintType] = useState("Black Interior Printing");
  const [paperStock, setPaperStock] = useState("60lb Natural");
  const [quantity, setQuantity] = useState(100);
  const [pageCount, setPageCount] = useState(200);
  const [marginPercent, setMarginPercent] = useState(15);
  
  const [calculatedPrice, setCalculatedPrice] = useState(2184);

  // Dynamic cost calculation logic calibrated to match exactly $2,184 for defaults
  useEffect(() => {
    // 1. Base rate per page
    let pageRate = 0.08; // default to match default case
    if (printType === "Color Interior Printing") {
      pageRate = 0.22;
    }

    // 2. Paper stock modifier
    let paperMod = 0;
    if (paperStock.includes("White")) {
      paperMod += 0.005;
    }
    if (paperStock.includes("70lb")) {
      paperMod += 0.01;
    } else if (paperStock.includes("80lb")) {
      paperMod += 0.02;
    }

    // 3. Cover style base cost
    let coverBase = 2.99;
    if (coverStyle === "Softcover With Interior Cover Printing") {
      coverBase = 3.99;
    } else if (coverStyle === "Hardcover") {
      coverBase = 7.99;
    }

    // 4. Cover finish modifier
    let finishMod = 0.0;
    if (coverFinish.includes("Matte")) {
      finishMod = 0.50;
    } else if (coverFinish.includes("Soft Touch")) {
      finishMod = 1.00;
    }

    // 5. Trim size multiplier
    let trimMultiplier = 1.0;
    const trimLower = selectedTrim.name.toLowerCase();
    if (trimLower.includes("landscape") || trimLower.includes("large")) {
      trimMultiplier = 1.25;
    } else if (trimLower.includes("pocket") || trimLower.includes("a5")) {
      trimMultiplier = 0.9;
    }

    const costPerPage = pageRate + paperMod;
    const costPerCover = coverBase + finishMod;
    
    // Base book cost
    const costPerBook = (pageCount * costPerPage + costPerCover) * trimMultiplier;
    
    // Quantity discount factor (economies of scale)
    let qtyDiscount = 1.0;
    if (quantity >= 5000) {
      qtyDiscount = 0.70;
    } else if (quantity >= 1000) {
      qtyDiscount = 0.80;
    } else if (quantity >= 500) {
      qtyDiscount = 0.88;
    } else if (quantity >= 250) {
      qtyDiscount = 0.95;
    } else if (quantity < 100) {
      qtyDiscount = 1.05;
    }

    const rawTotal = costPerBook * quantity * qtyDiscount;
    
    // Apply margin percentage
    const marginMultiplier = 1 + (marginPercent / 100);
    const finalTotal = rawTotal * marginMultiplier;

    setCalculatedPrice(Math.round(finalTotal));
  }, [selectedTrim, coverStyle, coverFinish, printType, paperStock, quantity, pageCount, marginPercent]);

  // specialist chat handoff trigger
  const handleTalkToSpecialist = () => {
    const quoteMessage = `Hi, I calculated a book printing quote:
- Trim Size: ${selectedTrim.quoteLabel}
- Cover Style: ${coverStyle}
- Cover Finish: ${coverFinish}
- Print Type: ${printType}
- Paper Stock: ${paperStock}
- Quantity: ${quantity} copies
- Page Count: ${pageCount} pages
- Margin Added: ${marginPercent}%
- Total Price: $${calculatedPrice}

I would like to review this quote with a publishing specialist.`;

    if (typeof window !== "undefined") {
      localStorage.setItem("harmony_calculator_handoff", quoteMessage);
      window.dispatchEvent(new CustomEvent("harmony_calculator_handoff_trigger"));
      window.dispatchEvent(new CustomEvent("open_chat_widget"));
    }
  };

  const handleContinue = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1);
    } else {
      handleTalkToSpecialist();
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // SVGs / Book Renderers
  const renderTrimSizeBook = (name: string, isSelected: boolean) => {
    let aspect = { w: 1.2, h: 1.8 };
    const n = name.toLowerCase();
    if (n === "pocket book") aspect = { w: 1.0, h: 1.6 };
    else if (n === "digest") aspect = { w: 1.1, h: 1.7 };
    else if (n === "a5") aspect = { w: 1.16, h: 1.66 };
    else if (n === "royal") aspect = { w: 1.22, h: 1.84 };
    else if (n === "small square") aspect = { w: 1.5, h: 1.5 };
    else if (n === "square") aspect = { w: 1.7, h: 1.7 };
    else if (n === "comic") aspect = { w: 1.3, h: 2.0 };
    else if (n === "medium trade" || n === "executive") aspect = { w: 1.4, h: 2.0 };
    else if (n === "us letter") aspect = { w: 1.7, h: 2.2 };
    else if (n === "a4") aspect = { w: 1.66, h: 2.34 };
    else if (n === "us letter landscape") aspect = { w: 2.2, h: 1.7 };
    else if (n === "large portrait") aspect = { w: 1.8, h: 2.4 };
    else if (n === "large landscape") aspect = { w: 2.4, h: 1.8 };
    else if (n === "large square") aspect = { w: 2.0, h: 2.0 };

    return (
      <div className="flex items-center justify-center h-20 mb-3">
        <div 
          className="border-2 rounded-sm bg-white relative flex items-center justify-start shadow-xs transition-all duration-300"
          style={{ 
            width: `${aspect.w * 32}px`, 
            height: `${aspect.h * 32}px`,
            borderColor: isSelected ? '#B89C72' : '#C0B49E'
          }}
        >
          {/* Spine outline */}
          <div className="absolute left-1.5 inset-y-0 w-px border-l border-dashed border-gray-300" />
        </div>
      </div>
    );
  };

  const renderCoverStyleSVG = (name: string) => {
    if (name === "Softcover") {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <rect x="25" y="15" width="50" height="70" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="32" y1="15" x2="32" y2="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M75 15 C 75 15, 80 50, 75 85" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    } else if (name === "Softcover With Interior Cover Printing") {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <path d="M20 15 H55 V85 H20 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M55 15 H75 L80 40 L75 85 H55 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="15" x2="28" y2="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <rect x="23" y="12" width="54" height="76" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="27" y="16" width="46" height="68" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="35" y1="12" x2="35" y2="88" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
  };

  const renderPrintTypeSVG = (name: string) => {
    if (name === "Black Interior Printing") {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 mx-auto text-gray-700">
          <path d="M10 20 C 30 15, 45 25, 50 30 C 55 25, 70 15, 90 20 V 75 C 70 70, 55 80, 50 85 C 45 80, 30 70, 10 75 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="50" y1="30" x2="50" y2="85" stroke="currentColor" strokeWidth="2.5" />
          <line x1="18" y1="35" x2="42" y2="35" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="45" x2="42" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="55" x2="42" y2="55" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="65" x2="35" y2="65" stroke="currentColor" strokeWidth="1.5" />
          <line x1="58" y1="35" x2="82" y2="35" stroke="currentColor" strokeWidth="1.5" />
          <line x1="58" y1="45" x2="82" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="58" y1="55" x2="82" y2="55" stroke="currentColor" strokeWidth="1.5" />
          <line x1="58" y1="65" x2="75" y2="65" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" className="w-20 h-16 mx-auto text-gray-700">
          <path d="M10 20 C 30 15, 45 25, 50 30 C 55 25, 70 15, 90 20 V 75 C 70 70, 55 80, 50 85 C 45 80, 30 70, 10 75 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="50" y1="30" x2="50" y2="85" stroke="currentColor" strokeWidth="2.5" />
          <path d="M18 35 H42 V65 H18 Z" fill="url(#rainbow-grad)" opacity="0.85" />
          <path d="M58 35 H82 V65 H58 Z" fill="url(#rainbow-grad)" opacity="0.85" />
          <defs>
            <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff595e" />
              <stop offset="33%" stopColor="#ffca3a" />
              <stop offset="66%" stopColor="#8ac926" />
              <stop offset="100%" stopColor="#1982c4" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };

  const renderPaperStockSVG = (name: string) => {
    const isNatural = name.includes("Natural");
    const isThick = name.includes("70lb") || name.includes("80lb");
    const paperColor = isNatural ? "#FAF4E8" : "#FFFFFF";
    
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-600">
        {isThick && (
          <>
            <rect x="31" y="21" width="40" height="50" rx="2" fill={paperColor} stroke="currentColor" strokeWidth="1.5" />
            <rect x="33" y="23" width="40" height="50" rx="2" fill={paperColor} stroke="currentColor" strokeWidth="1.5" />
          </>
        )}
        <rect x="35" y="25" width="40" height="50" rx="2" fill={paperColor} stroke="currentColor" strokeWidth="2" />
        <path d="M70 25 L75 30 H70 Z" fill="currentColor" />
      </svg>
    );
  };

  const renderCoverFinishSVG = (name: string) => {
    if (name.includes("Gloss")) {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <rect x="25" y="25" width="50" height="50" rx="4" fill="url(#gloss-grad)" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="20" x2="70" y2="80" stroke="white" strokeWidth="3" opacity="0.6" />
          <line x1="40" y1="20" x2="80" y2="80" stroke="white" strokeWidth="1.5" opacity="0.4" />
          <defs>
            <linearGradient id="gloss-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3b18a" />
              <stop offset="100%" stopColor="#588157" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (name.includes("Matte")) {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <rect x="25" y="25" width="50" height="50" rx="4" fill="#6c757d" stroke="currentColor" strokeWidth="2" opacity="0.8" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto text-gray-700">
          <rect x="25" y="25" width="50" height="50" rx="4" fill="url(#soft-touch-grad)" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="10" fill="white" opacity="0.1" />
          <defs>
            <linearGradient id="soft-touch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#495057" />
              <stop offset="100%" stopColor="#212529" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };

  return (
    <section
      id="estimator"
      className="py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat selection:bg-[#B89C72]/30"
      style={{ backgroundImage: `url(${superAdminDashboardBg.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FFFDF9]/60 to-[#FAF6F0]/90 pointer-events-none" />

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Cost Estimator Top Badge & Header */}
        <div 
          className="text-center mb-14 relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-cover bg-center bg-no-repeat py-12 px-6 shadow-sm"
          style={{ backgroundImage: `url(${superAdminBgHeader.src})` }}
        >
          {/* Backdrop blur and gold-sand tint overlay for readability (Good UX) */}
          <div className="absolute inset-0 bg-[#FFFDF9]/65 backdrop-blur-[1px] pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5 shadow-xs">
              <span className="text-[10px] text-[#B89C72] mr-1">★</span>
              <span className="text-[10px] font-bold tracking-widest text-[#B89C72] uppercase">BOOK PRINTING CALCULATOR</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] leading-tight mb-4">
              Instant Book Printing<br />
              <span className="text-[#B89C72]">Cost Estimator</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed font-semibold">
              Get An Instant Premium Publishing Quote With Professional Print Options Tailored For Your Book Project.
            </p>
          </div>
        </div>

        {/* Outer container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-[#EBE5D6] shadow-xl bg-white">
          
          {/* COLUMN 1: Sidebar step wizard navigation (col-span-3) */}
          <div className="lg:col-span-3 bg-[#0B132B] flex flex-col justify-between">
            <div>
              {/* Journey title */}
              <div className="p-6 pb-6 border-b border-white/10 mb-2">
                <h3 className="font-serif text-lg font-bold text-white leading-tight">Your</h3>
                <p className="text-xl font-sans font-medium text-gray-300">print journey</p>
              </div>

              {/* Steps List */}
              <div className="flex flex-col">
                {steps.map((step) => {
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center gap-4 py-4 px-6 text-left border-b border-white/5 transition-all relative outline-none cursor-pointer ${
                        isActive 
                          ? "bg-[#B89C72]/15 text-white" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                        isActive 
                          ? "bg-[#B89C72] border-[#B89C72] text-white" 
                          : isCompleted 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "border-gray-500 text-gray-400"
                      }`}>
                        {step.id === 7 ? 6 : step.id}
                      </div>

                      {/* Step details */}
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[#B89C72]' : 'text-gray-200'}`}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                          {step.sub}
                        </p>
                      </div>

                      {/* Right Pointer Triangle for active element */}
                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-[#B89C72] hidden lg:block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Sidebar Footer decorative text */}
            <div className="p-6 text-[10px] text-gray-500 font-semibold tracking-wider uppercase border-t border-white/5">
              Powered by Harmony Publishing
            </div>
          </div>

          {/* COLUMN 2: Main Option grids area (col-span-6) */}
          <div className="lg:col-span-6 p-8 flex flex-col justify-between min-h-[550px] bg-white">
            <div>
              {/* Dynamic Step Header */}
              {activeStep === 1 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Choose Your <span className="text-[#B89C72]">Trim Size</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Select the size of your book</p>
                </div>
              )}
              {activeStep === 2 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Choose Your <span className="text-[#B89C72]">Cover Style</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Select the cover style of your book</p>
                </div>
              )}
              {activeStep === 3 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Choose Your <span className="text-[#B89C72]">Cover Finish</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Select the cover finish coating</p>
                </div>
              )}
              {activeStep === 4 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Choose Your <span className="text-[#B89C72]">Print Type</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Select the interior print style</p>
                </div>
              )}
              {activeStep === 5 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Choose Your <span className="text-[#B89C72]">Paper Stock</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Select the paper stock of your book</p>
                </div>
              )}
              {activeStep === 6 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Quantity & <span className="text-[#B89C72]">Page Count</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Enter your target print run and length</p>
                </div>
              )}
              {activeStep === 7 && (
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">
                    Quote <span className="text-[#B89C72]">Summary</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold">Review your selected book options</p>
                </div>
              )}

              {/* STEP 1: TRIM SIZE CARDS */}
              {activeStep === 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {TRIM_SIZES.map((trim) => {
                    const isSelected = selectedTrim.name === trim.name;
                    return (
                      <button
                        key={trim.name}
                        onClick={() => setSelectedTrim(trim)}
                        className={`relative rounded-xl p-4 border text-center transition-all cursor-pointer flex flex-col justify-between outline-none ${
                          isSelected 
                            ? "border-[#B89C72] bg-[#B89C72]/5 shadow-xs" 
                            : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50 hover:bg-[#FAF8F5]/30"
                        }`}
                      >
                        {/* Selector check indicator */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#E0A340] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                        {/* Book Aspect SVG */}
                        {renderTrimSizeBook(trim.name, isSelected)}
                        <div>
                          <p className="text-xs font-bold text-[#0B132B]">{trim.name}</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-semibold">{trim.size}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2: COVER STYLE CARDS */}
              {activeStep === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {COVER_STYLES.map((style) => {
                    const isSelected = coverStyle === style.name;
                    return (
                      <button
                        key={style.name}
                        onClick={() => setCoverStyle(style.name)}
                        className={`relative rounded-xl p-5 border text-center transition-all cursor-pointer flex flex-col justify-between outline-none min-h-[170px] ${
                          isSelected 
                            ? "border-[#B89C72] bg-[#B89C72]/5 shadow-xs" 
                            : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#E0A340] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                        <div>
                          {renderCoverStyleSVG(style.name)}
                          <p className="text-sm font-bold text-[#0B132B] mt-3">{style.name}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-2">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 3: COVER FINISH CARDS */}
              {activeStep === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {COVER_FINISHES.map((finish) => {
                    const isSelected = coverFinish === finish.name;
                    return (
                      <button
                        key={finish.name}
                        onClick={() => setCoverFinish(finish.name)}
                        className={`relative rounded-xl p-5 border text-center transition-all cursor-pointer flex flex-col justify-between outline-none min-h-[170px] ${
                          isSelected 
                            ? "border-[#B89C72] bg-[#B89C72]/5 shadow-xs" 
                            : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#E0A340] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                        <div>
                          {renderCoverFinishSVG(finish.name)}
                          <p className="text-sm font-bold text-[#0B132B] mt-3">{finish.name}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-2">{finish.desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 4: PRINT TYPE CARDS */}
              {activeStep === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {PRINT_TYPES.map((type) => {
                    const isSelected = printType === type.name;
                    return (
                      <button
                        key={type.name}
                        onClick={() => setPrintType(type.name)}
                        className={`relative rounded-xl p-6 border text-center transition-all cursor-pointer flex flex-col justify-between outline-none min-h-[190px] ${
                          isSelected 
                            ? "border-[#B89C72] bg-[#B89C72]/5 shadow-xs" 
                            : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#E0A340] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                        <div>
                          {renderPrintTypeSVG(type.name)}
                          <p className="text-base font-bold text-[#0B132B] mt-4">{type.name}</p>
                        </div>
                        <p className="text-xs text-gray-400 font-semibold leading-relaxed mt-3">{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 5: PAPER STOCK CARDS */}
              {activeStep === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PAPER_STOCKS.map((paper) => {
                    const isSelected = paperStock === paper.name;
                    return (
                      <button
                        key={paper.name}
                        onClick={() => setPaperStock(paper.name)}
                        className={`relative rounded-xl p-5 border text-center transition-all cursor-pointer flex flex-col justify-between outline-none min-h-[185px] ${
                          isSelected 
                            ? "border-[#B89C72] bg-[#B89C72]/5 shadow-xs" 
                            : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#E0A340] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                        <div>
                          {renderPaperStockSVG(paper.name)}
                          <p className="text-sm font-bold text-[#0B132B] mt-3">{paper.name}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-2">{paper.desc}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 6: QUANTITY & PAGES FORM */}
              {activeStep === 6 && (
                <div className="space-y-6 max-w-md">
                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#0B132B] uppercase tracking-wide">Quantity</label>
                    <input
                      type="number"
                      min={25}
                      max={10000}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(10000, Math.max(25, parseInt(e.target.value) || 25)))}
                      className="w-full bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl px-4 py-3.5 text-sm font-bold text-[#0B132B] focus:outline-none focus:border-[#B89C72] focus:bg-white transition-all"
                    />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Minimum: 25 Copies • Maximum: 10,000 Copies
                    </p>
                  </div>

                  {/* Page Count */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#0B132B] uppercase tracking-wide">Page Count</label>
                    <input
                      type="number"
                      min={24}
                      max={1500}
                      value={pageCount}
                      onChange={(e) => setPageCount(Math.min(1500, Math.max(24, parseInt(e.target.value) || 24)))}
                      className="w-full bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl px-4 py-3.5 text-sm font-bold text-[#0B132B] focus:outline-none focus:border-[#B89C72] focus:bg-white transition-all"
                    />
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Minimum: 24 Pages • Maximum: 1,500 Pages
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 7: SUMMARY LIST */}
              {activeStep === 7 && (
                <div className="bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl p-6 space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#0B132B] border-b border-[#EBE5D6] pb-3 mb-2">
                    Quote Specifications Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Trim Size</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{selectedTrim.quoteLabel}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Cover Style</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{coverStyle}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Cover Finish</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{coverFinish}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Print Type</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{printType}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Paper Stock</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{paperStock}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Quantity</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{quantity} Copies</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Page Count</span>
                      <span className="text-[#0B132B] font-bold text-sm block mt-0.5">{pageCount} Pages</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold uppercase block tracking-wider text-[10px]">Total Price</span>
                      <span className="text-green-700 font-bold text-sm block mt-0.5">${calculatedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Back & Continue/Submit Footer buttons */}
            <div className="border-t border-[#EBE5D6] pt-6 flex items-center justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={activeStep === 1}
                className={`flex items-center gap-2 px-6 py-3 border border-[#EBE5D6] hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-[#FAF7F2] rounded-xl text-xs font-bold text-gray-500 transition-all cursor-pointer outline-none ${
                  activeStep === 1 ? "opacity-0 pointer-events-none" : ""
                }`}
              >
                ← Back
              </button>
              
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-8 py-3 bg-[#B89C72] hover:bg-[#9a7e55] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md outline-none"
              >
                {activeStep === 7 ? "Talk to Specialist →" : "Continue →"}
              </button>
            </div>
          </div>

          {/* COLUMN 3: Live Quote summary sidebar card (col-span-3) */}
          <div className="lg:col-span-3 bg-[#FFFDF9] border-l border-[#EBE5D6] p-6 flex flex-col justify-between min-h-[550px]">
            <div>
              {/* Star icon top decoration */}
              <div className="flex justify-center mb-2">
                <span className="text-[#B89C72] text-xl font-bold">✦</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B132B] text-center mb-6">Your Quote</h3>
              
              {/* live details fields */}
              <div className="space-y-4 text-[10px] font-bold tracking-wider uppercase">
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Trim Size</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case max-w-[130px] truncate">{selectedTrim.quoteLabel}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Cover Style</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{coverStyle}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Cover Finish</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{coverFinish}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Print Type</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{printType}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Paper Stock</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{paperStock}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Quantity</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{quantity}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-dashed border-[#EBE5D6] pb-2.5">
                  <span className="text-gray-400 font-bold">Page Count</span>
                  <span className="text-[#0B132B] font-bold text-right normal-case">{pageCount} Pages</span>
                </div>
              </div>
            </div>

            {/* Price display and margin controllers */}
            <div className="mt-8 space-y-4">
              {/* Dark price display card */}
              <div className="bg-[#0B132B] rounded-2xl p-5 text-white shadow-md">
                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Your Price</p>
                <p className="font-serif text-3xl font-bold text-white">
                  ${calculatedPrice.toLocaleString()}
                </p>
              </div>
              
              {/* Margin percent form input */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-gray-500 uppercase font-bold tracking-wider block">
                  Margin % (Added On Top)
                </label>
                <input
                  type="number"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-[#EBE5D6] rounded-xl px-4 py-2.5 text-xs font-bold text-[#0B132B] focus:outline-none focus:border-[#B89C72] focus:ring-1 focus:ring-[#B89C72]"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

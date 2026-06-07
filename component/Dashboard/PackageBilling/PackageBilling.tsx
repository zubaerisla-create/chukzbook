"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  CreditCard, 
  Calendar, 
  RefreshCw, 
  MoreVertical, 
  Lock, 
  FileText, 
  Download, 
  BookOpen, 
  Edit2, 
  Trash2, 
  Check,
  X,
  Crown
} from "lucide-react";
import { 
  useGetMyPackageQuery, 
  useListPackagesQuery, 
  useCheckoutMutation 
} from "@/redux/api/authApi";

export default function PackageBilling() {
  // Queries & Mutations
  const { data: myPackage, isLoading: loadingMyPackage } = useGetMyPackageQuery();
  const { data: packagesList, isLoading: loadingPackages } = useListPackagesQuery();
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

  // Dropdown menus for credit cards
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // State for payment methods list to support interactivity
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "visa", brand: "Visa", last4: "4242", isDefault: true, expiry: "08/28" },
    { id: "mastercard", brand: "MasterCard", last4: "8888", isDefault: false, expiry: "18/27" }
  ]);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(item => ({
      ...item,
      isDefault: item.id === id
    })));
    setActiveMenu(null);
  };

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(prev => prev.filter(item => item.id !== id));
    setActiveMenu(null);
  };

  const handleSelectPackage = async (packageId: number) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await checkout({ package_id: packageId }).unwrap();
      setSuccessMessage("Package purchased successfully!");
      setShowPackageModal(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err: any) {
      console.error("Checkout failed:", err);
      setErrorMessage(err.data?.detail || err.message || "Failed to purchase package. Please try again.");
    }
  };

  // Find active package info from list
  const activePackageDetail = packagesList?.find(p => p.id === myPackage?.package_id);
  const activePackageName = myPackage?.package_name || activePackageDetail?.name || "Legend";
  const activePackageDescription = activePackageDetail?.description || "Full publishing support with global distribution";
  const activePackagePrice = activePackageDetail?.price || "$4,999";
  const formattedDate = myPackage?.created_at 
    ? new Date(myPackage.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) 
    : "May 20, 2025";

  if (loadingMyPackage || loadingPackages) {
    return (
      <div className="flex h-64 bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Loading package details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2 font-sans relative">
      
      {/* Success Alert */}
      {successMessage && (
        <div className="p-4 bg-green-50 text-green-600 border border-green-200 rounded-2xl text-xs font-bold text-center leading-relaxed animate-pulse">
          ✓ {successMessage}
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-xs font-bold text-center leading-relaxed">
          {errorMessage}
        </div>
      )}

      {/* Top Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
          🪶
        </div>
        <div className="relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
            Package & Billing
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage Your Package, Payments And Billing Details.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN: col-span-2 on large screens */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Current Package Description */}
          <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-4">
              Current Package
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              {/* Badge & details */}
              <div className="flex items-start gap-4">
                {/* Gold/Black package card */}
                <div className="w-[100px] h-[100px] rounded-2xl bg-[#0B132B] border border-[#B89C72] flex flex-col items-center justify-center text-center p-2 shadow-inner flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#B89C72]/15 flex items-center justify-center mb-1.5">
                    <BookOpen className="w-5 h-5 text-[#B89C72]" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C72] truncate max-w-full">
                    {activePackageName}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center bg-[#E1F7E3] text-[#2CA943] text-[10px] font-bold px-3 py-1 rounded-full">
                    {myPackage?.status || "Active"}
                  </span>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {activePackageDescription}
                  </p>
                  <button 
                    onClick={() => setShowPackageModal(true)}
                    className="inline-flex items-center text-xs font-bold text-[#B89C72] hover:text-[#9a7e55] transition-colors gap-1 cursor-pointer"
                  >
                    view package details <span className="text-base leading-none">→</span>
                  </button>
                </div>
              </div>

              {/* Status information right alignment */}
              <div className="flex flex-col gap-3.5 self-stretch sm:self-auto justify-between sm:justify-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-[#B89C72] flex-shrink-0" />
                    <span>Active on <strong className="text-[#0B132B]">{formattedDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                    <RefreshCw className="w-4 h-4 text-[#B89C72] flex-shrink-0" />
                    <span>Next billing <strong className="text-[#0B132B]">One time payment</strong></span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPackageModal(true)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-[#EBE5D6] hover:border-[#B89C72] hover:bg-[#FAF7F2] text-[#B89C72] text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer text-center"
                >
                  Change Package
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Payment Methods */}
          <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 relative">
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#0B132B]">
                Payment Methods
              </h3>
              <button className="px-4 py-2 border border-[#EBE5D6] hover:border-[#B89C72] hover:bg-[#FAF7F2] text-[#B89C72] text-xs font-bold rounded-xl transition-all cursor-pointer">
                Manage Payment
              </button>
            </div>


            {/* Secure Footer */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-gray-400 font-medium">
              <Lock className="w-4 h-4 text-[#B89C72] flex-shrink-0" />
              <span>Your Payment Information Is Secure</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: col-span-1 on large screens */}
        <div className="space-y-6">
          
          {/* Card 1: One-time payment summary box */}
          <div className="bg-[#FAF5EE]/75 border border-[#EBE5D6] rounded-2xl p-6 sm:p-7 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#0B132B]">Current Package</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">One-time payment</p>
              <p className="font-serif text-3xl font-extrabold text-[#B89C72]">{activePackagePrice}</p>
              <span className="inline-flex items-center bg-[#E1F7E3] text-[#2CA943] text-[10px] font-bold px-3 py-1 rounded-full mt-1.5">
                Paid
              </span>
            </div>
            
            {/* Styled card icon badge */}
            <div className="w-14 h-14 rounded-full bg-[#FFF5E6] border border-[#FFE0B2] flex items-center justify-center shadow-xs">
              <CreditCard className="w-6 h-6 text-[#B89C72]" />
            </div>
          </div>

          {/* Card 2: Invoices Billing History */}
          <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-3">
              Invoices
            </h3>

            {/* Invoices List */}
            <div className="space-y-3">
              {[
                { id: "Inv-2025-00125", date: formattedDate, amount: activePackagePrice }
              ].map((inv) => (
                <div 
                  key={inv.id} 
                  className="flex items-center justify-between p-3.5 bg-[#FAF8F5]/30 border border-[#EBE5D6]/40 rounded-xl shadow-inner gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#EBE5D6] flex items-center justify-center flex-shrink-0 text-gray-500 shadow-xs">
                      <FileText className="w-4.5 h-4.5 text-[#B89C72]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0B132B]">{inv.id}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{inv.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-[#0B132B]">{inv.amount}</span>
                    <span className="bg-[#E1F7E3] text-[#2CA943] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Paid
                    </span>
                    <button 
                      title="Download Invoice"
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#B89C72] transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Help Banner */}
      <div className="bg-gradient-to-r from-[#FAF8F5] to-[#F5EFE4] border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Custom graphic container */}
          <div className="w-16 h-16 bg-white border border-[#EBE5D6] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#B89C72]">
              {/* Inkpot */}
              <path d="M35 70 L65 70 L60 50 L40 50 Z" fill="currentColor" opacity="0.8" />
              <path d="M42 50 L58 50 L56 44 L44 44 Z" fill="#0B132B" />
              {/* Quill */}
              <path d="M47 44 C 47 44, 55 25, 75 12 C 75 12, 65 30, 52 44" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <line x1="47" y1="44" x2="75" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-serif text-lg font-bold text-[#0B132B]">
              Need Help Or Have A Question?
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              Our publishing specialists are here to guide and support you throughout your publishing journey.
            </p>
          </div>
        </div>

        <button className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex-shrink-0">
          Talk to Specialist
        </button>
      </div>

      {/* Package Selection Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto font-sans">
            <button 
              onClick={() => setShowPackageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B]">Change Your Package</h3>
              <p className="text-xs text-gray-400 mt-1.5">Choose the perfect plan for your publishing goals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packagesList && packagesList.length > 0 ? (
                packagesList.map((pkg) => {
                  const isCurrent = myPackage?.package_id === pkg.id;
                  return (
                    <div 
                      key={pkg.id}
                      className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                        isCurrent 
                          ? "border-[#B89C72] bg-[#FAF5EE]/30 shadow-md ring-2 ring-[#B89C72]/20" 
                          : "border-[#EBE5D6] bg-white hover:border-[#B89C72]/50 shadow-sm"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg font-bold text-[#0B132B] capitalize">{pkg.name}</h4>
                          {isCurrent && (
                            <span className="bg-[#E1F7E3] text-[#2CA943] text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed min-h-[40px]">{pkg.description}</p>
                        <p className="font-serif text-3xl font-extrabold text-[#B89C72]">{pkg.price}</p>
                        
                        <div className="space-y-2.5 border-t border-[#FAF7F2] pt-4">
                          {pkg.features && pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                              <Check className="w-3.5 h-3.5 text-[#B89C72] flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectPackage(pkg.id)}
                        disabled={isCurrent || isCheckingOut}
                        className={`w-full py-3.5 rounded-xl font-bold text-xs mt-6 transition-all duration-300 cursor-pointer text-center ${
                          isCurrent
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent"
                            : "bg-[#0B132B] hover:bg-[#162040] text-white shadow-sm"
                        }`}
                      >
                        {isCurrent ? "Current Plan" : "Choose Plan"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-400 text-xs">
                  No packages available at this time.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
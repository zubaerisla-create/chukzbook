"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  CloudUpload,
  CheckCircle2,
  ShieldCheck,
  FileText,
  BookOpen,
  Search,
  Sparkles,
  Rocket,
  ArrowRight,
  Bookmark,
  RefreshCw,
  Trash2,
  Lock,
} from "lucide-react";

/* ─── Step config ───────────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: "Upload Manuscript" },
  { num: 2, label: "Book Details" },
  { num: 3, label: "Author Information" },
  { num: 4, label: "Publishing Preferences" },
  { num: 5, label: "Review & Submit" },
];

const REQUIREMENTS = [
  "Complete Manuscript Of Your Book",
  "Final Version Preferred",
  "DOCX Or PDF Format Only",
  "All Chapters And Content Included",
  "Remove Draft Notes And Comments",
];

const NEXT_STEPS = [
  {
    num: 1,
    icon: BookOpen,
    label: "Upload Manuscript",
    desc: "You submit your manuscript in a secure and protected environment.",
  },
  {
    num: 2,
    icon: Search,
    label: "Editorial Review",
    desc: "Our team reviews your manuscript and provides valuable feedback.",
  },
  {
    num: 3,
    icon: Sparkles,
    label: "Publishing Preparation",
    desc: "We edit, design and prepare your book for the best reading experience.",
  },
  {
    num: 4,
    icon: Rocket,
    label: "Book Goes Live",
    desc: "Your book is published and distributed to leading platforms worldwide.",
  },
];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function SubmitBook() {
  const [currentStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Simulate upload progress */
  const simulateUpload = (f: File) => {
    setFile(f);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) { clearInterval(interval); return 75; }
        return prev + 5;
      });
    }, 80);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) simulateUpload(f);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) simulateUpload(f);
  };

  const removeFile = () => { setFile(null); setProgress(0); };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="space-y-6 max-w-9xl">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] shadow-sm bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4]"
        style={{ minHeight: "100px" }}
      >
        {/* Decorative feather */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none text-[120px] leading-none">
          🪶
        </div>
        <div className="relative z-10 px-7 py-6">
          <h1 className="font-serif text-3xl font-bold text-[#0B132B] mb-1">
            Upload Your Manuscript
          </h1>
          <p className="text-sm text-gray-500">
            Start Your Publishing Journey By Submitting Your Completed Manuscript.
          </p>
        </div>
      </div>

      {/* ── Step Progress ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm px-6 py-5">
        <div className="flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
          {STEPS.map((step, i) => {
            const done = step.num < currentStep;
            const active = step.num === currentStep;
            return (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      done
                        ? "bg-[#B89C72] border-[#B89C72] text-white"
                        : active
                        ? "bg-[#B89C72] border-[#B89C72] text-white shadow-[0_0_0_4px_rgba(184,156,114,0.2)]"
                        : "bg-white border-[#D8CCBA] text-[#C0B49E]"
                    }`}
                  >
                    {done ? <CheckCircle2 size={18} /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] font-bold text-center leading-tight max-w-[70px] ${
                      active ? "text-[#B89C72]" : done ? "text-[#B89C72]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mb-5 min-w-[16px] ${
                      step.num < currentStep ? "bg-[#B89C72]" : "bg-[#EBE5D6]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Upload + Requirements ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

        {/* Left: Drop zone */}
        <div className="space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-14 px-6 transition-all duration-300 ${
              file
                ? "border-[#B89C72] bg-[#FAF5EE] cursor-default"
                : dragging
                ? "border-[#B89C72] bg-[#FAF5EE] cursor-copy"
                : "border-[#D8CCBA] bg-[#FAF8F5] hover:border-[#B89C72] hover:bg-[#FAF5EE] cursor-pointer"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".doc,.docx,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            {!file ? (
              <>
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center mb-5">
                  <CloudUpload size={30} className="text-[#B89C72]" />
                </div>
                <p className="font-bold text-[#0B132B] text-base mb-1">
                  Drag & Drop Your Manuscript Here
                </p>
                <p className="text-gray-400 text-sm mb-5">or</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className="bg-gradient-to-r from-[#B89C72] to-[#9a7e55] hover:from-[#cbb28a] hover:to-[#b89c72] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-sm hover:shadow-[0_4px_14px_rgba(184,156,114,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Browse Files
                </button>
                <p className="text-xs text-gray-400 mt-5">
                  DOC • DOCX • PDF &nbsp;|&nbsp; Max Size: 100MB
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#B89C72]/20 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-[#B89C72]" />
                </div>
                <p className="font-bold text-[#0B132B]">File Ready to Upload</p>
                <p className="text-xs text-gray-400">{file.name}</p>
              </div>
            )}
          </div>

          {/* Selected File card */}
          {file && (
            <div className="bg-white border border-[#EBE5D6] rounded-2xl p-5 space-y-4 shadow-sm">
              <p className="text-sm font-bold text-[#0B132B]">Selected File</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0B132B] truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs font-bold border border-[#B89C72] text-[#B89C72] hover:bg-[#B89C72] hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <RefreshCw size={12} /> Replace File
                  </button>
                  <button
                    onClick={removeFile}
                    className="flex items-center gap-1.5 text-xs font-bold border border-red-200 text-red-400 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-500">Upload Progress</span>
                  <span className="text-xs font-bold text-[#B89C72]">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#EBE5D6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B89C72] to-[#9a7e55] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-3 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl p-4">
                <div className="w-9 h-9 rounded-full bg-[#F4EFE6] flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-[#B89C72]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B132B]">
                    Your manuscript is secure and confidential.
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Only the Harmony Publishing team can access your files.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Requirements */}
        <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 h-fit">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-[#B89C72]" />
            </div>
            <div>
              <h3 className="font-bold text-[#0B132B] text-sm">Manuscript Requirements</h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                To ensure a smooth review process, please follow our manuscript guidelines.
              </p>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#B89C72] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#0B132B]">{req}</span>
              </li>
            ))}
          </ul>

          {/* Privacy note */}
          <div className="flex items-start gap-3 bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl p-4">
            <ShieldCheck size={18} className="text-[#B89C72] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#0B132B]">We Value Your Privacy.</p>
              <p className="text-xs text-gray-400">Your Manuscript Is Secure And Confidential.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── What Happens Next ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6">
        <h2 className="font-serif text-xl font-bold text-[#0B132B] mb-6">What Happens Next?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {NEXT_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center relative">
                {/* connector arrow */}
                {i < NEXT_STEPS.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute top-5 -right-3 text-[#B89C72]/40 hidden sm:block z-10"
                  />
                )}
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center mb-3 relative">
                  <Icon size={22} className="text-[#B89C72]" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#B89C72] text-white text-[9px] font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0B132B] mb-1">{step.label}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Actions ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pb-4">
        <button
          disabled={!file || progress < 75}
          className={`flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 ${
            file && progress >= 75
              ? "bg-gradient-to-r from-[#B89C72] to-[#9a7e55] text-white shadow-sm hover:shadow-[0_4px_14px_rgba(184,156,114,0.4)] hover:-translate-y-0.5"
              : "bg-[#EBE5D6] text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Book Details <ArrowRight size={16} />
        </button>
        <button className="flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl border border-[#EBE5D6] text-gray-500 hover:border-[#B89C72] hover:text-[#B89C72] transition-all duration-300">
          <Bookmark size={15} /> Save & Continue Later
        </button>
      </div>

    </div>
  );
}
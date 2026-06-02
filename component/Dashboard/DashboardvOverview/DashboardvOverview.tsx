"use client";

import Image from "next/image";
import Link from "next/link";
import overviewHeader from "@/assets/images/overview-header.png";
import leadersBlueprint from "@/assets/images/leaders_blueprint.png";
import { Bell, CheckCircle2, Clock, FileText } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const STEPS = ["Submitted", "Review", "Editing", "Formatting", "Publishing"];

const BOOKS = [
  {
    id: 1,
    title: "The Leader's Blueprint",
    author: "By John Doe",
    status: "Editing In Progress",
    lastUpdate: "May 20, 2025",
    activeStep: 2, // 0-indexed; Editing = index 2
    cover: leadersBlueprint,
  },
  {
    id: 2,
    title: "The Mindset Mastery",
    author: "By John Doe",
    status: "Editing In Progress",
    lastUpdate: "May 20, 2025",
    activeStep: 2,
    cover: leadersBlueprint, // reuse placeholder
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    icon: FileText,
    title: "Your Cover Design Is Ready",
    desc: "Please review and approve",
    time: "2 Hours Ago",
  },
  {
    id: 2,
    icon: FileText,
    title: "Your Manuscript Editing",
    desc: "Our Editor Is Working On Your Book",
    time: "2 Hours Ago",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Formatting Completed",
    desc: "Your Book Has Been Formatted …",
    time: "2 Hours Ago",
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "Formatting Completed",
    desc: "Your Book Has Been Formatted …",
    time: "2 Hours Ago",
  },
  {
    id: 5,
    icon: CheckCircle2,
    title: "Formatting Completed",
    desc: "Your Book Has Been Formatted …",
    time: "2 Hours Ago",
  },
  {
    id: 6,
    icon: CheckCircle2,
    title: "Formatting Completed",
    desc: "Your Book Has Been Formatted …",
    time: "2 Hours Ago",
  },
  {
    id: 7,
    icon: CheckCircle2,
    title: "Formatting Completed",
    desc: "Your Book Has Been Formatted …",
    time: "2 Hours Ago",
  },
];

/* ─── Progress Step Icons ────────────────────────────────────────── */

function StepIcon({ index, active }: { index: number; active: number }) {
  const icons = [
    // Submitted – upload/cloud
    <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4 4 4M4 20h16" />
    </svg>,
    // Review – eye
    <svg key="r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6 12 6s9.75 6 9.75 6-3 6-9.75 6S2.25 12 2.25 12Z" />
      <circle cx="12" cy="12" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Editing – pencil
    <svg key="e" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 1 1 2.97 2.97L7.5 18.81l-4 1 1-4 12.362-12.323Z" />
    </svg>,
    // Formatting – layout
    <svg key="f" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>,
    // Publishing – globe
    <svg key="p" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>,
  ];

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        index < active
          ? "bg-[#B89C72] border-[#B89C72] text-white"
          : index === active
          ? "bg-[#B89C72] border-[#B89C72] text-white shadow-[0_0_0_4px_rgba(184,156,114,0.2)]"
          : "bg-white border-[#D8CCBA] text-[#C0B49E]"
      }`}
    >
      {icons[index]}
    </div>
  );
}

/* ─── Book Card ──────────────────────────────────────────────────── */

function BookCard({ book }: { book: (typeof BOOKS)[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EBE5D6] p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex gap-5">
        {/* Cover */}
        <div className="flex-shrink-0 w-[88px] h-[120px] rounded-xl overflow-hidden shadow-md border border-[#EBE5D6]">
          <Image
            src={book.cover}
            alt={book.title}
            width={88}
            height={120}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-bold text-[#0B132B] leading-tight mb-0.5">
            {book.title}
          </h3>
          <p className="text-sm text-gray-400 mb-3">{book.author}</p>

          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {book.status}
          </span>

          {/* Last Update */}
          <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-4">
            <Clock size={12} className="text-[#B89C72]" />
            Last Update : {book.lastUpdate}
          </p>

          {/* Progress Tracker */}
          <div className="flex items-center gap-0">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <StepIcon index={i} active={book.activeStep} />
                  <span
                    className={`text-[9px] font-semibold mt-1.5 tracking-wide whitespace-nowrap ${
                      i <= book.activeStep ? "text-[#B89C72]" : "text-gray-300"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 mb-4 mx-0.5 transition-colors duration-300 ${
                      i < book.activeStep ? "bg-[#B89C72]" : "bg-[#EBE5D6]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-4 pt-4 border-t border-[#EBE5D6]/60">
        <Link
          href="/dashboard/my-books"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89C72] to-[#9a7e55] hover:from-[#cbb28a] hover:to-[#b89c72] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-[0_4px_14px_rgba(184,156,114,0.4)] transition-all duration-300 hover:-translate-y-0.5"
        >
          View Details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function DashboardvOverview() {
  return (
    <div className="space-y-6">

      {/* ── Welcome Header ───────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] shadow-sm"
        style={{ minHeight: "140px" }}
      >
        {/* Background image */}
        <Image
          src={overviewHeader}
          alt="overview header"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-[#FAF8F5]/30" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-7 gap-4">
          {/* Left: welcome text */}
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#0B132B] mb-1">
              Welcome Back, John! 👋
            </h1>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Track Your Book&apos;s Progress And Stay Updated<br />
              At Every Step Of The Publishing Journey.
            </p>
          </div>

          {/* Right: decorative quote */}
          <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
            <span className="font-serif text-[#B89C72] text-6xl leading-none opacity-60 select-none">"</span>
            <p className="font-serif text-base text-[#0B132B]/70 italic text-right leading-relaxed max-w-[200px]">
              We turn your words into<br />a legacy that inspires the world
            </p>
            <span className="font-serif text-[#B89C72] text-6xl leading-none opacity-60 select-none self-end">"</span>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

        {/* ── Left: Current Books ──────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1 h-5 bg-[#B89C72] rounded-full" />
            <h2 className="font-serif text-xl font-bold text-[#0B132B]">Current Book</h2>
          </div>
          {BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* ── Right: Notifications ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBE5D6]/60">
            <div className="flex items-center gap-2">
              <Bell size={17} className="text-[#B89C72]" />
              <h2 className="font-serif text-lg font-bold text-[#0B132B]">Notifications</h2>
            </div>
            <span className="bg-[#B89C72] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {NOTIFICATIONS.length}
            </span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EBE5D6]/40">
            {NOTIFICATIONS.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#FAF8F5] transition-colors duration-200 cursor-pointer"
                >
                  {/* Icon box */}
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFE6] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#B89C72]" />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0B132B] leading-snug truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{n.desc}</p>
                    <p className="text-[10px] text-[#B89C72] font-semibold mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer button */}
          <div className="px-5 py-4 border-t border-[#EBE5D6]/60">
            <Link
              href="/dashboard/notifications"
              className="w-full block text-center text-sm font-bold text-[#0B132B] border border-[#EBE5D6] hover:border-[#B89C72] hover:text-[#B89C72] rounded-xl py-3 transition-all duration-300"
            >
              View All Notifications
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import overviewHeader from "@/assets/images/overview-header.png";
import supportSpecialist from "@/assets/images/support_specialist.png";
import bookPedestal from "@/assets/images/book_pedestal.png";
import {
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  AlertTriangle,
  Check,
  Edit,
  Rocket,
  Compass,
  FileSpreadsheet,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "2",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "3",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
];

/* ─── Main Component ─────────────────────────────────────────────── */

export default function DashboardvOverview() {
  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2">
      {/* ── Welcome Header ───────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] shadow-sm bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4]"
        style={{ minHeight: "140px" }}
      >
        <Image
          src={overviewHeader}
          alt="overview header"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-[#FAF8F5]/35" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-8 gap-6">
          {/* Left: welcome text */}
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#0B132B] mb-2 leading-tight">
              Welcome Back, John! 👋
            </h1>
            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-md">
              Track Your Book&apos;s Progress And Stay Updated At Every Step Of The Publishing Journey.
            </p>
          </div>

          {/* Right: decorative quote */}
          <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center">
            <span className="font-serif text-[#B89C72] text-5xl leading-none opacity-60 select-none">“</span>
            <p className="font-serif text-sm text-[#0B132B]/80 italic leading-relaxed max-w-[220px]">
              We turn your words into a legacy that inspires the world
            </p>
            <span className="font-serif text-[#B89C72] text-5xl leading-none opacity-60 select-none self-end">”</span>
          </div>
        </div>
      </div>

      {/* ── Row 1: Let's Publish Your Book Card & Rockstar Card ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Let's Publish Your Book Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-4 flex-1">
            <h2 className="font-serif text-2xl font-bold text-[#0B132B]">
              Let&apos;s Publish Your Book
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              You&apos;re just a few steps away from seeing your book published and available worldwide.
            </p>
            
            {/* Progress status */}
            <div className="pt-2">
              <span className="text-sm font-bold text-[#B89C72] mb-2 block">0% Completed</span>
              <div className="w-full h-3 bg-[#FAF7F2] border border-[#EBE5D6] rounded-full overflow-hidden">
                <div className="w-0 h-full bg-[#B89C72] rounded-full" />
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/submit-book"
                className="inline-block bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-[0_4px_14px_rgba(184,156,114,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Submit Your Book
              </Link>
            </div>
          </div>

          {/* Right: Book Pedestal Illustration */}
          <div className="w-48 h-48 relative flex-shrink-0 flex items-center justify-center">
            <Image
              src={bookPedestal}
              alt="Book Pedestal Illustration"
              width={192}
              height={192}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Rockstar Card */}
        <div className="bg-[#0B132B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md border border-[#EBE5D6]/10 text-white min-h-[250px]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full border border-[#B89C72]/30 bg-[#B89C72]/15 flex items-center justify-center text-[#B89C72] flex-shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[#B89C72] text-2xl font-bold tracking-wide">
                Rockstar
              </h3>
              <p className="text-gray-300 text-xs font-semibold mt-1">
                Professional Publishing Package
              </p>
              <p className="text-[#B89C72]/85 text-[10px] font-bold uppercase tracking-wider mt-2.5">
                Purchased On May 20, 2025
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/dashboard/package-billing"
              className="w-full block text-center border border-[#B89C72] hover:bg-[#B89C72] hover:text-[#0B132B] text-[#B89C72] font-bold text-xs py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
            >
              View Package Details
            </Link>
          </div>
        </div>
      </div>

      {/* ── Row 2: Let's Publish Your Book Stepper Timeline Card ── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B]">
            Let&apos;s Publish Your Book
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            You&apos;re just a few steps away from seeing your book published and available worldwide.
          </p>
        </div>

        {/* Stepper progress timeline */}
        <div className="flex items-center justify-between relative max-w-4xl mx-auto py-4">
          <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-[#FAF7F2] -z-0" />
          <div
            className="absolute top-[28px] left-[5%] h-0.5 bg-[#B89C72] transition-all duration-500 -z-0"
            style={{ width: "25%" }} // Active through Step 2 (Review)
          />

          {[
            { num: 1, label: "Submitted", icon: CheckCircle2, completed: true, active: false },
            { num: 2, label: "Review", icon: Compass, completed: true, active: false },
            { num: 3, label: "Editing", icon: Edit, completed: false, active: true },
            { num: 4, label: "Formatting", icon: FileSpreadsheet, completed: false, active: false },
            { num: 5, label: "Publishing", icon: Rocket, completed: false, active: false },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.num} className="flex flex-col items-center relative z-10 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.completed
                      ? "bg-[#B89C72] border-[#B89C72] text-white"
                      : step.active
                      ? "bg-white border-[#B89C72] text-[#B89C72] shadow-[0_0_0_4px_rgba(184,156,114,0.25)]"
                      : "bg-white border-[#D8CCBA] text-gray-400"
                  }`}
                >
                  {step.completed ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4.5 h-4.5" />}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold mt-2 text-center transition-colors ${
                    step.completed || step.active ? "text-[#B89C72]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Warning Alert Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#FFFBF7] border border-[#F5EFE4] rounded-2xl p-5 gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF5E6] border border-[#FFE0B2] flex items-center justify-center flex-shrink-0 text-[#B89C72]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0B132B]">You Haven&apos;t Submitted Your Book Yet.</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">Submit your manuscript to get started on your publishing journey</p>
            </div>
          </div>
          <Link
            href="/dashboard/submit-book"
            className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 text-center flex-shrink-0 cursor-pointer"
          >
            Submit Your Book
          </Link>
        </div>
      </div>

      {/* ── Row 3: Notifications & Support Card ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Notifications Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-3">
              Notifications
            </h2>

            <div className="divide-y divide-[#FAF7F2]">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="flex items-start py-3.5 first:pt-0 last:pb-0 gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-[#EDE7F6]/60 border border-[#D1C4E9]/40 flex items-center justify-center flex-shrink-0 text-[#673AB7]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#0B132B] truncate leading-tight">
                      {notif.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium truncate mt-0.5">
                      {notif.desc}
                    </p>
                    <span className="text-[9px] text-gray-400 font-semibold mt-1 inline-block">
                      {notif.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5">
            <Link
              href="/dashboard/notifications"
              className="w-full block text-center border border-[#EBE5D6] hover:border-[#B89C72] text-[#0B132B] hover:text-[#B89C72] font-bold text-xs py-3 rounded-xl transition-all duration-300 cursor-pointer bg-white"
            >
              View All Notifications
            </Link>
          </div>
        </div>

        {/* Right: Support Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-4 flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B] leading-snug">
              We&apos;re Here To Help<br />You Succeed
            </h2>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm">
              Our dedicated publishing specialists are here to guide you through every stage of your publishing journey, from manuscript preparation and editing to design, distribution, and marketing, ensuring a smooth and successful experience from start to finish.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard/ai-chat"
                className="inline-block bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                Contact Specialist
              </Link>
            </div>
          </div>

          {/* Right: Support Specialist Image */}
          <div className="w-52 h-52 relative flex-shrink-0 flex items-center justify-center self-end sm:self-center">
            <Image
              src={supportSpecialist}
              alt="Support Specialist"
              width={208}
              height={208}
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
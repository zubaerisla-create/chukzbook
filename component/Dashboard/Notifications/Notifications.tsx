"use client";

import React from "react";
import { FileText, Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
}

const NOTIFICATIONS: NotificationItem[] = [
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
  {
    id: "4",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "5",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "6",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "7",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "8",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
  {
    id: "9",
    title: "Welcome To Harmony Publishing!",
    desc: "We're Excited To Help You Publish Your Book ..",
    time: "2 Hours Ago",
  },
];

export default function Notifications() {
  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2">
      {/* Top Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
          🪶
        </div>
        <div className="relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
            Notifications
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Stay update with your publishing journey
          </p>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-4">
          Notifications
        </h2>

        <div className="divide-y divide-[#FAF7F2]">
          {NOTIFICATIONS.map((notif) => (
            <div key={notif.id} className="flex items-start py-4 first:pt-0 last:pb-0 gap-4">
              {/* Lavender icon circular container */}
              <div className="w-10 h-10 rounded-xl bg-[#EDE7F6]/60 border border-[#D1C4E9]/40 flex items-center justify-center flex-shrink-0 text-[#673AB7]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#0B132B] leading-snug">
                  {notif.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">
                  {notif.desc}
                </p>
                <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block">
                  {notif.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
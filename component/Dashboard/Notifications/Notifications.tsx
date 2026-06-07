"use client";

import React from "react";
import { FileText, Bell, Trash2, CheckSquare } from "lucide-react";
import { 
  useListNotificationsQuery, 
  useReadNotificationMutation, 
  useReadAllNotificationsMutation, 
  useDeleteNotificationMutation 
} from "@/redux/api/authApi";

function formatTimeAgo(dateStr: string) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (isNaN(diffMs)) return dateStr;
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } catch (e) {
    return dateStr;
  }
}

export default function Notifications() {
  const { data: notifications, isLoading } = useListNotificationsQuery();
  const [readNotification] = useReadNotificationMutation();
  const [readAllNotifications, { isLoading: isReadingAll }] = useReadAllNotificationsMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleRead = async (id: number) => {
    try {
      await readNotification(id).unwrap();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      await deleteNotification(id).unwrap();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleReadAll = async () => {
    try {
      await readAllNotifications().unwrap();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const unreadNotifications = notifications?.filter(n => !n.is_read) || [];

  if (isLoading) {
    return (
      <div className="flex h-64 bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2 font-sans">
      {/* Top Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
          🪶
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
              Notifications
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Stay updated with your publishing journey
            </p>
          </div>

          {unreadNotifications.length > 0 && (
            <button
              onClick={handleReadAll}
              disabled={isReadingAll}
              className="flex items-center gap-2 bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all cursor-pointer select-none self-start sm:self-center disabled:opacity-50"
            >
              <CheckSquare className="w-4 h-4" /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-4">
          All Notifications
        </h2>

        {!notifications || notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-12 h-12 text-[#EBE5D6] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B]">All caught up!</p>
            <p className="text-xs">No notifications at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#FAF7F2]">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                onClick={() => !notif.is_read && handleRead(notif.id)}
                className={`flex items-start py-4 first:pt-0 last:pb-0 gap-4 group transition-all duration-300 rounded-xl px-2 -mx-2 hover:bg-[#FAF8F5]/60 ${
                  !notif.is_read ? "cursor-pointer font-semibold" : "opacity-80"
                }`}
              >
                {/* Notification icon circular container */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${
                  !notif.is_read 
                    ? "bg-[#EDE7F6] border-[#D1C4E9] text-[#673AB7]" 
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm leading-snug ${!notif.is_read ? "text-[#0B132B] font-bold" : "text-gray-600"}`}>
                      {notif.title}
                    </h3>
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block">
                    {formatTimeAgo(notif.created_at)}
                  </span>
                </div>

                {/* Delete button (displays on hover) */}
                <button
                  onClick={(e) => handleDelete(e, notif.id)}
                  title="Delete Notification"
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
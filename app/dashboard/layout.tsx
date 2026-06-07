'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logOut } from '@/redux/slices/authSlice';
import { useLogoutMutation, useGetUnreadCountQuery, useGetMyPackageQuery, useGetProfileQuery } from '@/redux/api/authApi';
import { 
  Home, 
  BookOpen, 
  PlusCircle, 
  MessageSquare, 
  Bell, 
  CreditCard, 
  Settings, 
  LogOut,
  Crown,
  Menu,
  X 
} from 'lucide-react';
import jamesCerter from "@/assets/images/james_certer.png";

const getProfilePicture = (pic: string | null | undefined) => {
  if (!pic) return jamesCerter;
  if (pic === "string" || pic.trim() === "") return jamesCerter;
  return pic;
};

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Books', href: '/dashboard/my-books', icon: BookOpen },
  { name: 'Submit Book', href: '/dashboard/submit-book', icon: PlusCircle },
  { name: 'AI Chat', href: '/dashboard/ai-chat', icon: MessageSquare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Package & Billing', href: '/dashboard/package-billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const [isClient, setIsClient] = useState(false);

  // Live queries for sidebar indicators
  const { data: unreadData } = useGetUnreadCountQuery(undefined, { skip: !isAuthenticated });
  const { data: myPackage } = useGetMyPackageQuery(undefined, { skip: !isAuthenticated });
  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthenticated });

  const unreadCount = unreadData?.unread_count || 0;
  const activePackageName = myPackage?.package_name || "Premium Package";
  const activePackageStatus = myPackage?.status || "Active";
  
  const renewsOn = myPackage?.created_at
    ? new Date(new Date(myPackage.created_at).setFullYear(new Date(myPackage.created_at).getFullYear() + 1)).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "Dec 2, 2025";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push("/login");
    }
  }, [isClient, isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      const savedRefreshToken = typeof window !== "undefined" 
        ? localStorage.getItem("harmony_auth_refresh_token") 
        : null;
      if (savedRefreshToken) {
        await logout({ refresh: savedRefreshToken }).unwrap();
      }
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      dispatch(logOut());
      router.push("/");
    }
  };

  // Protect client side content and show smooth loader
  if (!isClient || !isAuthenticated) {
    return (
      <div className="flex h-screen bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Authorizing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAF8F5]">
      
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0B132B]/40 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Column */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#EBE5D6]/50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand/Logo Section */}
        <div className="relative flex flex-col items-center pt-8 pb-4">
          {/* Logo symbol */}
          <Link href="/" className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-11 h-11 text-[#B89C72]" fill="currentColor">
              <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
              <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
              <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
              <path d="M 46 35 L 54 35 L 54 62 L 50 58 L 46 62 Z" fill="#FAF8F5" stroke="#B89C72" strokeWidth="2.5" />
            </svg>
            <span className="font-serif text-[13px] tracking-[0.3em] font-semibold text-[#0B132B] uppercase mt-2">
              Harmony
            </span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-[#B89C72] absolute right-4 top-8 p-1.5 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto mt-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 mx-2 rounded-xl border transition-all duration-300 gap-3.5 text-sm font-semibold relative ${
                  isActive
                    ? 'bg-[#FAF5EE] border-[#B89C72] text-[#B89C72] shadow-xs'
                    : 'bg-transparent border-transparent text-gray-700 hover:bg-gray-50 hover:text-[#0B132B]'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} className={isActive ? 'text-[#B89C72]' : 'text-gray-500'} />
                <span className="flex-1">{item.name}</span>
                {item.name === 'Notifications' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Premium Package Status Card */}
        <div className="px-4 py-4 border-t border-[#EBE5D6]/40">
          <div className="bg-white border border-[#EBE5D6] rounded-2xl p-5 text-center shadow-xs flex flex-col items-center">
            {/* Crown icon */}
            <div className="text-[#F2A33A] mb-2 flex justify-center">
              <Crown size={26} className="fill-[#F2A33A]/10" />
            </div>

            <h4 className="font-serif text-sm font-bold text-[#0B132B] mb-1 capitalize">
              {activePackageName}
            </h4>

            {/* Active Badge */}
            <span className="inline-flex items-center bg-[#E1F7E3] text-[#2CA943] text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase">
              {activePackageStatus}
            </span>

            {/* Renews On text */}
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-4">
              Renews On {renewsOn}
            </p>

            {/* View Button */}
            <Link
              href="/dashboard/package-billing"
              className="w-full py-2.5 border border-gray-200 hover:border-[#B89C72] text-[#0c1424] text-xs font-bold rounded-xl transition-all duration-300 bg-white hover:bg-gray-50 shadow-xs"
            >
              View Package
            </Link>
          </div>
        </div>

        {/* User Profile Widget */}
        {profile && (
          <div className="px-4 py-3 mx-4 mb-2 bg-[#FAF8F5] border border-[#EBE5D6]/60 rounded-xl flex items-center gap-3 shadow-xs">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#EBE5D6] bg-[#FAF5EE] flex-shrink-0">
              <Image
                src={getProfilePicture(profile.profile_picture)}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-[#0B132B] truncate">
                {profile.first_name ? `${profile.first_name} ${profile.last_name}` : "Author"}
              </p>
              <p className="text-[10px] text-gray-400 truncate font-medium">
                {profile.email}
              </p>
            </div>
          </div>
        )}

        {/* Log Out Action */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-3.5 border border-red-100 hover:border-red-300 text-red-500 hover:bg-red-50/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xs cursor-pointer bg-transparent"
          >
            <LogOut size={16} className="mr-2" />
            Log Out
          </button>
        </div>

      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Mobile Header Bar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-[#EBE5D6]/40 lg:hidden flex-shrink-0">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="w-7 h-7 text-[#B89C72]" fill="currentColor">
              <path d="M 28 15 L 42 15 L 42 20 L 38 20 L 38 80 L 42 80 L 42 85 L 28 85 L 28 80 L 32 80 L 32 20 L 28 20 Z" />
              <path d="M 58 15 L 72 15 L 72 20 L 68 20 L 68 80 L 72 80 L 72 85 L 58 85 L 58 80 L 62 80 L 62 20 L 58 20 Z" />
              <path d="M 38 47.5 L 68 47.5 L 68 52.5 L 38 52.5 Z" />
            </svg>
            <span className="font-serif text-xs font-bold text-[#0B132B] uppercase tracking-wider">Harmony</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-[#B89C72] p-1.5 focus:outline-none"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
}
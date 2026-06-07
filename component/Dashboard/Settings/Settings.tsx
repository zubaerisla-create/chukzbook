"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  User, 
  Phone, 
  PenTool, 
  Lock, 
  EyeOff, 
  Eye, 
  Mail, 
  Calendar, 
  Camera 
} from "lucide-react";
import jamesCerter from "@/assets/images/james_certer.png";
import { 
  useGetProfileQuery, 
  useUpdateProfileMutation, 
  useGetPresignedUrlMutation 
} from "@/redux/api/authApi";

const getProfilePicture = (pic: string | null | undefined) => {
  if (!pic) return jamesCerter;
  if (pic === "string" || pic.trim() === "") return jamesCerter;
  return pic;
};

export default function Settings() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [getPresignedUrl] = useGetPresignedUrlMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form input states
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Certer");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 019-2834");
  const [penName, setPenName] = useState("J. Certer");
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("mypassword123");

  // Notifications toggle state
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Success indicator on save
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhoneNumber(profile.phone_number || "");
      const savedPenName = localStorage.getItem(`pen_name_${profile.email}`) || "";
      setPenName(savedPenName || (profile.first_name ? `${profile.first_name.charAt(0)}. ${profile.last_name}` : ""));
    }
  }, [profile]);

  const handleSave = async () => {
    setErrorMessage("");
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      }).unwrap();

      if (profile?.email) {
        localStorage.setItem(`pen_name_${profile.email}`, penName);
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      setErrorMessage(err.data?.detail || err.message || "Failed to update profile. Please try again.");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setErrorMessage("");
    try {
      // Get presigned URL from API
      const response = await getPresignedUrl({
        file_name: file.name,
        content_type: file.type || "image/jpeg",
        folder: "profile_pictures",
      }).unwrap();

      console.log("Presigned URL response:", response);
      const uploadUrl = response.url || (response as any).presigned_url || (response as any).upload_url;
      const fields = response.fields;

      if (!uploadUrl) {
        throw new Error("No upload URL returned from presigned-url endpoint");
      }

      // Upload file to storage using presigned URL
      if (fields) {
        // Multipart upload (S3 POST Policy format)
        const formData = new FormData();
        Object.entries(fields).forEach(([key, val]) => {
          formData.append(key, val);
        });
        formData.append("file", file);

        await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
      } else {
        // Direct PUT upload
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
      }

      // Calculate final URL
      let finalUrl = response.public_url || (response as any).public_url || uploadUrl.split("?")[0];
      if (fields && fields.key) {
        const baseUrl = uploadUrl.endsWith("/") ? uploadUrl : uploadUrl + "/";
        finalUrl = baseUrl + fields.key;
      }

      // Update user profile picture URL in backend
      await updateProfile({ profile_picture: finalUrl }).unwrap();
      
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Avatar upload failed:", err);
      const isCors = err?.message?.toLowerCase().includes("fetch") ||
                     err?.message?.toLowerCase().includes("cors") ||
                     err?.name === "TypeError";
      setErrorMessage(
        isCors
          ? "Photo upload failed: the storage bucket is blocking browser uploads (CORS not configured). Please ask your admin to add CORS rules to the R2 bucket, then try again."
          : `Photo upload failed: ${err?.message || "Please try again."}`
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2 font-sans pb-12">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleAvatarUpload}
      />

      {/* Top Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
          🪶
        </div>
        <div className="relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
            Settings
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage Your Package, Payments And Billing Details.
          </p>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-4 bg-green-50 text-green-600 border border-green-200 rounded-2xl text-xs font-bold text-center leading-relaxed animate-pulse">
          ✓ Changes saved successfully!
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-xs font-bold text-center leading-relaxed">
          {errorMessage}
        </div>
      )}

      {/* Card 1: Profile Informations */}
      <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#FAF7F2] pb-4">
          <h3 className="font-serif text-xl font-bold text-[#0B132B]">
            Profile Informations
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Manage Your Personal Information.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar side */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#EBE5D6] shadow-sm">
              <Image 
                src={getProfilePicture(profile?.profile_picture)} 
                alt="Author Avatar" 
                layout="fill" 
                objectFit="cover"
                unoptimized
              />
              
              {/* Camera icon badge */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                title="Upload Photo"
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white border border-[#EBE5D6] hover:border-[#B89C72] hover:text-[#B89C72] flex items-center justify-center shadow-md cursor-pointer transition-colors"
              >
                <Camera className="w-4 h-4 text-gray-600 hover:text-[#B89C72]" />
              </button>

              {uploadingAvatar && (
                <div className="absolute inset-0 bg-[#0B132B]/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 border border-[#EBE5D6] hover:border-[#B89C72] text-[#B89C72] text-xs font-bold rounded-xl transition-all bg-white hover:bg-[#FAF7F2] cursor-pointer"
            >
              Change Photo
            </button>
          </div>

          {/* Form Inputs side */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">First Name</label>
              <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">Last Name</label>
              <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">Phone Number</label>
              <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Phone className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Author Pen Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">Author Pen Name <span className="text-gray-400 font-normal lowercase">(optional)</span></label>
              <div className="relative rounded-xl focus-within:ring-2 focus-within:ring-[#B89C72]/30">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <PenTool className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="text"
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-[#FAF8F5]/50 border border-[#EBE5D6] rounded-xl text-sm text-[#0B132B] placeholder-gray-400 focus:outline-none focus:border-[#B89C72] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Email Address (Read-only) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">Email Address</label>
              <div className="relative rounded-xl bg-gray-50/70 border border-[#EBE5D6] text-gray-500">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="email"
                  value={profile?.email || ""}
                  readOnly
                  className="block w-full pl-12 pr-10 py-3 bg-transparent border-0 rounded-xl text-sm text-gray-500 focus:outline-none cursor-not-allowed select-none"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Account Role (Read-only) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0B132B] uppercase tracking-wider block">Account Role</label>
              <div className="relative rounded-xl bg-gray-50/70 border border-[#EBE5D6] text-gray-500">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-4.5 h-4.5 text-[#B89C72]" />
                </div>
                <input
                  type="text"
                  value={profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Author"}
                  readOnly
                  className="block w-full pl-12 pr-10 py-3 bg-transparent border-0 rounded-xl text-sm text-gray-500 focus:outline-none cursor-not-allowed select-none"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Password */}
      <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-4 mb-6">
          Password
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Key icon background circle */}
            <div className="w-12 h-12 rounded-full bg-[#FFF5E6] border border-[#FFE0B2] flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-[#B89C72]" />
            </div>

            <div className="space-y-1">
              <p className="text-xl font-bold text-[#0B132B] tracking-widest leading-none mt-1">
                {showPassword ? passwordValue : "••••••••••••"}
              </p>
              <p className="text-xs text-gray-400 font-medium">
                For Your Security, Keep Your Password Strong And Secure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="p-2.5 border border-[#EBE5D6] hover:border-[#B89C72] rounded-xl text-gray-500 hover:text-[#0B132B] transition-colors cursor-pointer"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button className="px-4 py-2.5 border border-[#EBE5D6] hover:border-[#B89C72] hover:bg-[#FAF7F2] text-[#B89C72] text-xs font-bold rounded-xl transition-all cursor-pointer">
              Change password
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Notification Preference */}
      <div className="bg-white border border-[#EBE5D6] rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-4 mb-6">
          Notification Preference
        </h3>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Mail icon background circle */}
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#B89C72]" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-[#0B132B]">Email Notifications</p>
              <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-lg">
                Receive updates about your publishing journey, book status, and important announcements.
              </p>
            </div>
          </div>

          {/* Interactive Toggle Switch */}
          <button 
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              emailNotifications ? "bg-[#B89C72]" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                emailNotifications ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card 4: Status summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Package Card */}
        <div className="bg-white border border-[#EBE5D6] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#B89C72]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#0B132B] capitalize">{profile?.role || "Author"} Package</h4>
              <span className="bg-[#E1F7E3] text-[#2CA943] text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">You Are Enjoying All Features.</p>
          </div>
        </div>

        {/* Member Date Card */}
        <div className="bg-white border border-[#EBE5D6] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-[#B89C72]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0B132B]">
              Member Role <strong className="text-gray-600 font-bold ml-1 uppercase">{profile?.role || "Author"}</strong>
            </h4>
            <p className="text-xs text-gray-400 font-medium">Thank You For Being With Us.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-start gap-4 pt-4">
        <button 
          onClick={handleSave}
          disabled={isUpdating}
          className="px-8 py-3.5 bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save & Changes"}
        </button>
        <button 
          onClick={() => {
            if (profile) {
              setFirstName(profile.first_name || "");
              setLastName(profile.last_name || "");
              setPhoneNumber(profile.phone_number || "");
              const savedPenName = localStorage.getItem(`pen_name_${profile.email}`) || "";
              setPenName(savedPenName);
            }
          }}
          className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}
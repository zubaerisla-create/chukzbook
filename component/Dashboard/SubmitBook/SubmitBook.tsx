"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  BadgeCheck,
  CloudUpload,
  RefreshCw,
  Trash2,
  Lock,
  ShieldCheck,
  ChevronDown,
  Edit,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { useCreateBookMutation, useGetPresignedUrlMutation } from "@/redux/api/authApi";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "docx" | "image";
  rawFile: File;
}

export default function SubmitBook() {
  const [createBook] = useCreateBookMutation();
  const [getPresignedUrl] = useGetPresignedUrlMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [replacingFileId, setReplacingFileId] = useState<string | null>(null);

  // Form state pre-populated to match screenshots
  const [formData, setFormData] = useState({
    title: "The Leader Blueprint",
    subtitle: "A Practical Guide To Building Leadership Excellence",
    genre: "Business & Leadership",
    language: "English",
    wordCount: "80000",
    targetAudience: "Adult(18+)",
    description: "A practical guide for current and aspiring leaders who want to build strong teams, inspire action, and achieve sustainable success.",
    keywords: "Leadership, Success, Business, Growth",
  });

  // Start with empty files list for manuscripts
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [coverImage, setCoverImage] = useState<UploadedFile | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  // Handle file drops
  const [dragging, setDragging] = useState(false);
  const [coverDragging, setCoverDragging] = useState(false);

  // Clean up object URLs when coverImage changes or component unmounts
  React.useEffect(() => {
    return () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFilesToList(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFilesToList(selectedFiles);
  };

  const addFilesToList = (fileList: File[]) => {
    const validFiles = fileList.filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      const isValid = ext && ["pdf", "doc", "docx"].includes(ext);
      if (!isValid) {
        alert(`File "${f.name}" is not a valid manuscript. Only PDF, DOC, and DOCX are allowed.`);
      }
      return isValid;
    });

    const newFiles: UploadedFile[] = validFiles.map((f, idx) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      let type: "pdf" | "docx" | "image" = "docx";
      if (ext === "pdf") type = "pdf";

      return {
        id: (Date.now() + idx).toString(),
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
        type,
        rawFile: f
      };
    });
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const triggerReplace = (id: string) => {
    setReplacingFileId(id);
    replaceInputRef.current?.click();
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && replacingFileId) {
      const ext = selected.name.split(".").pop()?.toLowerCase();
      const isValid = ext && ["pdf", "doc", "docx"].includes(ext);
      if (!isValid) {
        alert(`File "${selected.name}" is not a valid manuscript. Only PDF, DOC, and DOCX are allowed.`);
        setReplacingFileId(null);
        return;
      }
      let type: "pdf" | "docx" | "image" = "docx";
      if (ext === "pdf") type = "pdf";

      setFiles((prev) =>
        prev.map((f) =>
          f.id === replacingFileId
            ? {
                ...f,
                name: selected.name,
                size: (selected.size / (1024 * 1024)).toFixed(1) + " MB",
                type,
                rawFile: selected
              }
            : f
        )
      );
    }
    setReplacingFileId(null);
  };

  // Cover image handlers
  const handleCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragging(true);
  };

  const handleCoverDragLeave = () => {
    setCoverDragging(false);
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      addCoverFile(file);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addCoverFile(file);
    }
  };

  const addCoverFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["png", "jpg", "jpeg", "webp"].includes(ext)) {
      alert("Please upload a valid image file (PNG, JPG, or WEBP) for the cover.");
      return;
    }

    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
    }

    const preview = URL.createObjectURL(file);
    setCoverPreviewUrl(preview);
    setCoverImage({
      id: "cover-" + Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      type: "image",
      rawFile: file,
    });
  };

  const handleRemoveCover = () => {
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
      setCoverPreviewUrl(null);
    }
    setCoverImage(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      let coverImageUrl = "";
      const manuscriptUrls: string[] = [];

      // 1. Upload Cover Image if present
      if (coverImage) {
        try {
          const response = await getPresignedUrl({
            file_name: coverImage.name,
            content_type: coverImage.rawFile.type,
            folder: "covers",
          }).unwrap();

          console.log("Cover Presigned URL response:", response);
          const uploadUrl = response.url || (response as any).presigned_url || (response as any).upload_url;
          if (!uploadUrl) {
            throw new Error("No upload URL returned from presigned-url endpoint");
          }

          let finalUrl = response.public_url || uploadUrl.split("?")[0];
          const fields = response.fields;

          // Perform raw file upload
          if (fields) {
            const bodyFormData = new FormData();
            Object.entries(fields).forEach(([k, v]) => {
              bodyFormData.append(k, v);
            });
            bodyFormData.append("file", coverImage.rawFile);
            await fetch(uploadUrl, {
              method: "POST",
              body: bodyFormData,
            });
          } else {
            await fetch(uploadUrl, {
              method: "PUT",
              body: coverImage.rawFile,
              headers: {
                "Content-Type": coverImage.rawFile.type,
              },
            });
          }
          coverImageUrl = finalUrl;
        } catch (uploadError: any) {
          const isCors = uploadError?.message?.toLowerCase().includes("fetch") ||
                         uploadError?.message?.toLowerCase().includes("cors") ||
                         uploadError?.name === "TypeError";
          throw new Error(
            isCors
              ? "Cover image upload failed: the storage bucket is blocking browser uploads (CORS not configured). Please ask your admin to add CORS rules to the R2 bucket, then try again."
              : `Cover image upload failed: ${uploadError?.message || "Unknown error"}`
          );
        }
      }

      // 2. Upload manuscript files to storage
      for (const file of files) {
        try {
          const response = await getPresignedUrl({
            file_name: file.name,
            content_type: file.rawFile.type,
            folder: "manuscripts",
          }).unwrap();

          console.log("Manuscript Presigned URL response:", response);
          const uploadUrl = response.url || (response as any).presigned_url || (response as any).upload_url;
          if (!uploadUrl) {
            throw new Error("No upload URL returned from presigned-url endpoint");
          }

          let finalUrl = response.public_url || uploadUrl.split("?")[0];
          const fields = response.fields;

          // Perform raw file upload
          if (fields) {
            const bodyFormData = new FormData();
            Object.entries(fields).forEach(([k, v]) => {
              bodyFormData.append(k, v);
            });
            bodyFormData.append("file", file.rawFile);
            await fetch(uploadUrl, {
              method: "POST",
              body: bodyFormData,
            });
          } else {
            await fetch(uploadUrl, {
              method: "PUT",
              body: file.rawFile,
              headers: {
                "Content-Type": file.rawFile.type,
              },
            });
          }
          manuscriptUrls.push(finalUrl);
        } catch (uploadError: any) {
          const isCors = uploadError?.message?.toLowerCase().includes("fetch") ||
                         uploadError?.message?.toLowerCase().includes("cors") ||
                         uploadError?.name === "TypeError";
          throw new Error(
            isCors
              ? `Manuscript upload failed for "${file.name}": the storage bucket is blocking browser uploads (CORS not configured). Please ask your admin to add CORS rules to the R2 bucket, then try again.`
              : `Manuscript upload failed for "${file.name}": ${uploadError?.message || "Unknown error"}`
          );
        }
      }

      // 3. Submit the book to backend
      const wordCountNum = parseInt(formData.wordCount) || 0;
      const estimatedPages = Math.max(1, Math.round(wordCountNum / 250)) || 100;

      const result = await createBook({
        title: formData.title,
        subtitle: formData.subtitle,
        genre: formData.genre,
        language: formData.language,
        words: wordCountNum,
        pages: estimatedPages,
        target_audience: formData.targetAudience,
        description: formData.description,
        keywords: formData.keywords,
        manuscript_urls: manuscriptUrls.join(","),
        cover_image_url: coverImageUrl || undefined,
      }).unwrap();

      setSubmissionId(`HP-${new Date().getFullYear()}-${String(result.id).padStart(5, "0")}`);
      setSubmissionDate(new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }));

      // Go to success
      setCurrentStep(4);
    } catch (err: any) {
      console.error("Failed to submit book:", err);
      setSubmitError(err?.message || "Submission failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      subtitle: "",
      genre: "",
      language: "English",
      wordCount: "",
      targetAudience: "Adult(18+)",
      description: "",
      keywords: "",
    });
    setFiles([]);
    if (coverPreviewUrl) {
      URL.revokeObjectURL(coverPreviewUrl);
      setCoverPreviewUrl(null);
    }
    setCoverImage(null);
    setCurrentStep(1);
    setConfirmed(false);
  };

  return (
    <div className="space-y-6 max-w-9xl mx-auto py-2 font-sans">
      {/* Hidden inputs for file operations */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={replaceInputRef}
        type="file"
        className="hidden"
        onChange={handleReplaceFileChange}
      />
      <input
        ref={coverInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleCoverSelect}
      />

      {/* BANNER & STEPPER (hidden in step 4 - Success) */}
      {currentStep < 4 && (
        <>
          {/* Top Banner Header */}
          <div className="relative rounded-2xl overflow-hidden border border-[#EBE5D6] bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE4] px-8 py-8 shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FAF5EE] via-transparent to-transparent pointer-events-none opacity-60" />
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none text-[85px] leading-none">
              🪶
            </div>
            <div className="relative z-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-2 leading-tight">
                Let&apos;s Start Your Book Submission
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                File In Your Book Details To Begin Your Publishing Journey
              </p>
            </div>
          </div>

          {/* Stepper Wizard */}
          <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm px-6 py-6 sm:px-12">
            <div className="flex items-center justify-between relative">
              {/* Desktop Stepper Connections */}
              <div className="absolute top-[22px] left-[5%] right-[5%] h-0.5 bg-[#FAF7F2] -z-0" />
              <div
                className="absolute top-[22px] left-[5%] h-0.5 bg-[#B89C72] transition-all duration-500 -z-0"
                style={{
                  width: `${((currentStep - 1) / 3) * 90}%`,
                }}
              />

              {[
                { num: 1, label: "Book Details", icon: BookOpen },
                { num: 2, label: "Upload Manuscript", icon: FileText },
                { num: 3, label: "Review & Submit", icon: ClipboardCheck },
                { num: 4, label: "Success", icon: BadgeCheck },
              ].map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;
                const Icon = step.icon;

                return (
                  <div key={step.num} className="flex flex-col items-center relative z-10 flex-1">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-[#B89C72] border-[#B89C72] text-white"
                          : isActive
                          ? "bg-white border-[#B89C72] text-[#B89C72] shadow-[0_0_0_4px_rgba(184,156,114,0.25)]"
                          : "bg-white border-[#D8CCBA] text-gray-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 text-center transition-colors ${
                        isActive || isCompleted ? "text-[#0B132B]" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* STEP 1: BOOK DETAILS */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-[#FAF7F2]">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-[#B89C72] w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B132B]">Book Details</h2>
              <p className="text-xs text-gray-400">Provide Basic Information About Your Book</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Title */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Book Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter your book title"
                className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72]"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">
                Subtitle<span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Enter subtitle (if any)"
                className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72]"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Genre</label>
              <div className="relative">
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72] appearance-none cursor-pointer"
                >
                  <option value="">Select genre</option>
                  <option value="Business & Leadership">Business & Leadership</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Mystery">Mystery</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Language</label>
              <div className="relative">
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72] appearance-none cursor-pointer"
                >
                  <option value="English">🇺🇸 English</option>
                  <option value="Spanish">🇪🇸 Spanish</option>
                  <option value="French">🇫🇷 French</option>
                  <option value="German">🇩🇪 German</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>
            </div>

            {/* Word Count */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Word Count</label>
              <input
                type="number"
                value={formData.wordCount}
                onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                placeholder="E.G. 80000"
                className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72]"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Target Audience</label>
              <div className="relative">
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72] appearance-none cursor-pointer"
                >
                  <option value="Adult(18+)">Adult(18+)</option>
                  <option value="Young Adult">Young Adult</option>
                  <option value="Kids">Kids</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">Descriptions</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your book in a few sentences"
                className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72] resize-none"
              />
            </div>

            {/* Key Themes / Keywords */}
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-[#0B132B] mb-2 block">
                Key Themes / Keywords<span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="E.G. leadership, success, motivation"
                className="w-full text-sm bg-[#FAF7F2] border border-[#EBE5D6] rounded-xl px-4 py-3 text-[#0B132B] focus:outline-none focus:border-[#B89C72]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              Continue To Upload <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: UPLOAD MANUSCRIPT */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-[#FAF7F2]">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
              <FileText className="text-[#B89C72] w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B132B]">Upload Your Manuscript</h2>
              <p className="text-xs text-gray-400">Upload your completed manuscript and supporting materials to begin the publishing process</p>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-16 px-6 transition-all duration-300 ${
              dragging
                ? "border-[#B89C72] bg-[#FAF5EE] cursor-copy scale-[0.99]"
                : "border-[#EBE5D6] bg-[#FAF8F5] hover:border-[#B89C72] hover:bg-[#FAF5EE] cursor-pointer"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center mb-4">
              <CloudUpload className="w-7 h-7 text-[#B89C72]" />
            </div>
            <p className="font-bold text-[#0B132B] text-base mb-1 text-center">
              Drag And Drop Files Here
            </p>
            <p className="text-gray-400 text-xs mb-4">Or</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition-all duration-300"
            >
              Browse Files
            </button>
            <p className="text-[10px] text-gray-400 mt-4 tracking-wide text-center">
              DOC, DOCX, PDF, JPG, PNG up to 5MB each
            </p>
          </div>

          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0B132B] border-b border-[#FAF7F2] pb-2">Selected Files</h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-[#EBE5D6] flex-shrink-0 shadow-sm">
                        {file.type === "pdf" && <FileText className="text-red-500 w-5 h-5" />}
                        {file.type === "docx" && <FileText className="text-blue-500 w-5 h-5" />}
                        {file.type === "image" && <FileText className="text-[#B89C72] w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0B132B] truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => triggerReplace(file.id)}
                        className="flex items-center gap-1.5 text-xs font-bold border border-[#EBE5D6] text-gray-600 bg-white hover:border-[#B89C72] hover:text-[#B89C72] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Replace File
                      </button>
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="flex items-center gap-1.5 text-xs font-bold border border-red-100 text-red-500 bg-white hover:bg-red-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Cover Image Upload ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B132B]">Book Cover Image</h3>
                <p className="text-[10px] text-gray-400">Optional — PNG, JPG, or WEBP up to 5 MB</p>
              </div>
            </div>

            {/* Cover preview or upload zone */}
            {coverImage && coverPreviewUrl ? (
              <div className="flex items-center gap-5 p-4 bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl shadow-sm">
                {/* Thumbnail */}
                <div className="w-20 h-28 rounded-xl overflow-hidden border border-[#EBE5D6] flex-shrink-0 shadow-sm bg-white">
                  <img
                    src={coverPreviewUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0B132B] truncate">{coverImage.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{coverImage.size}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs font-bold border border-[#EBE5D6] text-gray-600 bg-white hover:border-[#B89C72] hover:text-[#B89C72] px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Replace
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCover}
                      className="flex items-center gap-1.5 text-xs font-bold border border-red-100 text-red-500 bg-white hover:bg-red-50 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleCoverDragOver}
                onDragLeave={handleCoverDragLeave}
                onDrop={handleCoverDrop}
                onClick={() => coverInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-6 transition-all duration-300 cursor-pointer ${
                  coverDragging
                    ? "border-[#B89C72] bg-[#FAF5EE] scale-[0.99]"
                    : "border-[#EBE5D6] bg-[#FAF8F5] hover:border-[#B89C72] hover:bg-[#FAF5EE]"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <p className="font-bold text-[#0B132B] text-sm mb-1 text-center">Upload Book Cover</p>
                <p className="text-gray-400 text-xs mb-3">Drag & drop or click to browse</p>
                <span className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all">
                  Choose Image
                </span>
                <p className="text-[10px] text-gray-400 mt-3">PNG, JPG, WEBP · Max 5 MB · Recommended 1600×2400px</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl border border-[#EBE5D6] text-gray-600 hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={files.length === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 ${
                files.length > 0
                  ? "bg-[#B89C72] hover:bg-[#9a7e55] text-white shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] hover:-translate-y-0.5 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Review & Submit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & SUBMIT */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-[#FAF7F2]">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="text-[#B89C72] w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B132B]">Review & Submit</h2>
              <p className="text-xs text-gray-400">Please review all the information below, you can edit any section if needed.</p>
            </div>
          </div>

          {/* Section 1: Book Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FAF5EE] text-[#B89C72] font-bold text-xs flex items-center justify-center border border-[#EBE5D6]">
                  1
                </span>
                <h3 className="text-base font-bold text-[#0B132B]">Book Information</h3>
              </div>
              <button
                disabled={submitting}
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#B89C72] border border-[#B89C72]/30 rounded-xl px-3.5 py-2 hover:bg-[#B89C72]/10 transition-colors cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Details
              </button>
            </div>

            <div className="border border-[#EBE5D6] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <tbody>
                  {[
                    { label: "Book Title", val: formData.title },
                    { label: "Subtitle", val: formData.subtitle || "—" },
                    { label: "Genre", val: formData.genre },
                    { label: "Language", val: formData.language },
                    { label: "Target Audience", val: formData.targetAudience },
                    { label: "Keywords", val: formData.keywords || "—" },
                    { label: "Book Description", val: formData.description },
                  ].map((row, idx) => (
                    <tr
                      key={row.label}
                      className={`border-b border-[#FAF7F2] last:border-0 ${
                        idx % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]/40"
                      }`}
                    >
                      <td className="px-6 py-4 font-bold text-[#0B132B] w-1/4 align-top border-r border-[#FAF7F2]">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Cover Image */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#FAF7F2] pb-2">
              <span className="w-6 h-6 rounded-full bg-[#FAF5EE] text-[#B89C72] font-bold text-xs flex items-center justify-center border border-[#EBE5D6]">
                2
              </span>
              <h3 className="text-base font-bold text-[#0B132B]">Book Cover Image</h3>
            </div>

            {coverImage && coverPreviewUrl ? (
              <div className="flex items-center gap-5 p-4 bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl shadow-sm">
                <div className="w-16 h-24 rounded-xl overflow-hidden border border-[#EBE5D6] flex-shrink-0 shadow-sm bg-white">
                  <img src={coverPreviewUrl} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B132B] truncate max-w-xs">{coverImage.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{coverImage.size}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-0.5">
                    <Check className="w-3 h-3" /> Cover uploaded
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-[#FAF8F5] border border-dashed border-[#EBE5D6] rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EBE5D6] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 italic">No cover image uploaded <span className="text-[10px] font-bold text-[#B89C72] not-italic">(Optional)</span></p>
              </div>
            )}
          </div>

          {/* Section 3: Manuscript Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#FAF7F2] pb-2">
              <span className="w-6 h-6 rounded-full bg-[#FAF5EE] text-[#B89C72] font-bold text-xs flex items-center justify-center border border-[#EBE5D6]">
                3
              </span>
              <h3 className="text-base font-bold text-[#0B132B]">Manuscript Details</h3>
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAF8F5] border border-[#EBE5D6] rounded-2xl gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-[#EBE5D6] flex-shrink-0 shadow-sm">
                      {file.type === "pdf" && <FileText className="text-red-500 w-5 h-5" />}
                      {file.type === "docx" && <FileText className="text-blue-500 w-5 h-5" />}
                      {file.type === "image" && <FileText className="text-[#B89C72] w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B132B] truncate max-w-xs">{file.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      disabled={submitting}
                      onClick={() => triggerReplace(file.id)}
                      className="flex items-center gap-1.5 text-xs font-bold border border-[#EBE5D6] text-gray-600 bg-white hover:border-[#B89C72] hover:text-[#B89C72] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Replace File
                    </button>
                    <button
                      disabled={submitting}
                      onClick={() => handleRemoveFile(file.id)}
                      className="flex items-center gap-1.5 text-xs font-bold border border-red-100 text-red-500 bg-white hover:bg-red-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 text-sm font-medium">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-800 flex-shrink-0 mt-0.5 font-bold">
                ⚠️
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-800 mb-0.5">Upload/Submission Failed</p>
                <p className="text-xs text-red-700 leading-relaxed">{submitError}</p>
              </div>
            </div>
          )}

          {/* Declaration check box */}
          <div className="flex items-start gap-3 bg-[#FFFDF9] border border-[#F5EFE4] rounded-2xl p-5 shadow-sm">
            <div className="relative flex items-center mt-0.5">
              <input
                disabled={submitting}
                type="checkbox"
                id="confirm-rights"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 text-[#B89C72] border-[#EBE5D6] rounded focus:ring-[#B89C72] focus:ring-offset-0 cursor-pointer appearance-none checked:bg-[#B89C72] checked:border-[#B89C72] border-2 transition-all relative flex items-center justify-center"
              />
              {confirmed && (
                <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none stroke-[3]" />
              )}
            </div>
            <label htmlFor="confirm-rights" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none font-medium">
              I confirm that all information provided is accurate and that I own the rights to this manuscript. I understand that Harmony Publishing will begin the publishing process after submission.
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
            <button
              disabled={submitting}
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl border border-[#EBE5D6] text-gray-600 hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!confirmed || submitting}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 ${
                confirmed && !submitting
                  ? "bg-[#B89C72] hover:bg-[#9a7e55] text-white shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] hover:-translate-y-0.5 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit My Book <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS */}
      {currentStep === 4 && (
        <div className="relative bg-white border border-[#EBE5D6] rounded-2xl shadow-md p-8 sm:p-12 text-center overflow-hidden max-w-3xl mx-auto my-4">
          {/* Decorative floating shapes in background */}
          <div className="absolute top-8 left-12 opacity-30 select-none text-2xl animate-pulse">🧡</div>
          <div className="absolute top-12 right-16 opacity-30 select-none text-3xl rotate-12">✈️</div>
          <div className="absolute bottom-16 left-16 opacity-25 select-none text-4xl -rotate-12">🌿</div>
          <div className="absolute bottom-12 right-24 opacity-30 select-none text-2xl">🍎</div>
          
          <svg className="absolute -left-10 top-1/4 w-32 h-32 text-[#B89C72]/10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          </svg>

          {/* Main checkmark icon */}
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 shadow-md transition-transform duration-500 scale-105">
            <Check className="w-10 h-10 text-white stroke-[3.5]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B] mb-4">
            Book Submitted Successfully!
          </h2>

          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Thank You, Author! We&apos;ve Received Your Manuscript And Our Team Is Excited To Help Bring Your Book To Life.
          </p>

          {/* Submission Info Box */}
          <div className="bg-[#E8F5E9]/40 border border-green-100 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 max-w-lg mx-auto mb-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-100/60 flex items-center justify-center text-green-700">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Submission Id</p>
                <p className="text-xs font-bold text-green-800">{submissionId}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-green-200 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-100/60 flex items-center justify-center text-green-700">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Submission On</p>
                <p className="text-xs font-bold text-green-800">{submissionDate}</p>
              </div>
            </div>
          </div>

          {/* Inkpot and Quill graphic aligned in the bottom right context */}
          <div className="relative max-w-xs mx-auto mb-6 flex justify-center items-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#B89C72]">
              {/* Inkpot base */}
              <path d="M30 75 L70 75 L65 55 L35 55 Z" fill="currentColor" opacity="0.8" />
              <path d="M40 55 L60 55 L58 48 L42 48 Z" fill="#0B132B" />
              {/* Quill Pen */}
              <path d="M45 48 C 45 48, 55 30, 80 15 C 80 15, 68 35, 52 48" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <line x1="45" y1="48" x2="80" y2="15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Reset button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow-[0_4px_16px_rgba(184,156,114,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Submit Another Book
            </button>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl border border-[#EBE5D6] text-gray-600 hover:border-[#B89C72] hover:text-[#B89C72] hover:bg-[#FAF7F2] transition-all cursor-pointer"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
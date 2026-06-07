"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Clock,
  Download,
  ArrowLeft,
  Headphones,
  CalendarDays,
  FileText,
  CloudUpload,
  X,
} from "lucide-react";
import leadersBlueprint from "@/assets/images/leaders_blueprint.png";
import { 
  useListBooksQuery, 
  useGetBookQuery, 
  useUpdateBookMutation, 
  useGetPresignedUrlMutation,
  useGetProfileQuery
} from "@/redux/api/authApi";

/* ─── Helpers ────────────────────────────────────────────────────── */
function activeStep(progress: number) {
  if (progress <= 20) return 0;
  if (progress <= 40) return 1;
  if (progress <= 60) return 2;
  if (progress <= 80) return 3;
  return 4;
}

function getProgressFromStatus(statusStr: string) {
  const s = statusStr?.toLowerCase();
  if (s === "published") return 100;
  if (s === "on hold" || s === "onhold") return 20;
  if (s === "in review" || s === "inreview" || s === "review") return 60;
  if (s === "submitted") return 20;
  if (s === "editing") return 40;
  if (s === "formatting") return 80;
  if (s === "in progress" || s === "inprogress") return 40;
  return 30; // default
}

function statusColor(s: string) {
  const status = s?.toLowerCase();
  if (status === "published") return "bg-green-50 border-green-200 text-green-600";
  if (status === "in review" || status === "inreview" || status === "review") return "bg-blue-50 border-blue-200 text-blue-600";
  if (status === "on hold" || status === "onhold") return "bg-gray-50 border-gray-200 text-gray-500";
  return "bg-amber-50 border-amber-200 text-amber-600";
}

function statusDot(s: string) {
  const status = s?.toLowerCase();
  if (status === "published") return "bg-green-400";
  if (status === "in review" || status === "inreview" || status === "review") return "bg-blue-400";
  if (status === "on hold" || status === "onhold") return "bg-gray-400";
  return "bg-amber-400 animate-pulse";
}

function formatStatusText(s: string) {
  const status = s?.toLowerCase();
  if (status === "published") return "Published";
  if (status === "in review" || status === "inreview" || status === "review") return "In Review";
  if (status === "on hold" || status === "onhold") return "On Hold";
  if (status === "in progress" || status === "inprogress") return "In Progress";
  return s || "In Progress";
}

const STEPS = ["Submitted", "Review", "Editing", "Formatting", "Publishing"];
const FILTERS = ["All Books", "In Progress", "In Review", "Published", "On Hold"] as const;

/* ─── Step Icons ─────────────────────────────────────────────────── */
function StepCircle({ i, active }: { i: number; active: number }) {
  const icons = [
    <path key="a" strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4 4 4M4 20h16" />,
    <><path key="b1" strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 6 12 6s9.75 6 9.75 6-3 6-9.75 6S2.25 12 2.25 12Z" /><circle key="b2" cx="12" cy="12" r="2.5" /></>,
    <path key="c" strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 1 1 2.97 2.97L7.5 18.81l-4 1 1-4 12.362-12.323Z" />,
    <><rect key="d1" x="3" y="3" width="7" height="7" rx="1" /><rect key="d2" x="14" y="3" width="7" height="7" rx="1" /><rect key="d3" x="3" y="14" width="7" height="7" rx="1" /><rect key="d4" x="14" y="14" width="7" height="7" rx="1" /></>,
    <><circle key="e1" cx="12" cy="12" r="10" /><path key="e2" strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2Z" /></>,
  ];
  const done = i < active;
  const cur = i === active;
  return (
    <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
      done || cur
        ? "bg-[#B89C72] border-[#B89C72] text-white shadow-[0_0_0_4px_rgba(184,156,114,0.2)]"
        : "bg-white border-[#D8CCBA] text-[#C0B49E]"
    }`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        {icons[i]}
      </svg>
    </div>
  );
}

/* ─── Upload Modal ───────────────────────────────────────────────── */
function UploadModal({ bookId, currentManuscriptUrls, onClose }: { bookId: number; currentManuscriptUrls: string | null; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const [updateBook] = useUpdateBookMutation();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const handleUploadSubmit = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadError("");

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        // 1. Get S3/Storage presigned URL
        const response = await getPresignedUrl({
          file_name: file.name,
          content_type: file.type,
          folder: "manuscripts",
        }).unwrap();

        console.log("Presigned URL response:", response);
        const uploadUrl = response.url || (response as any).presigned_url || (response as any).upload_url;
        const fields = response.fields;

        if (!uploadUrl) {
          throw new Error("No upload URL returned from presigned-url endpoint");
        }

        // 2. HTTP Upload
        if (fields) {
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
          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
        }

        // Calculate direct file URL
        let finalUrl = response.public_url || uploadUrl.split("?")[0];
        if (fields && fields.key) {
          const baseUrl = uploadUrl.endsWith("/") ? uploadUrl : uploadUrl + "/";
          finalUrl = baseUrl + fields.key;
        }
        uploadedUrls.push(finalUrl);
      }

      // 3. Update book manuscript URLs
      const existingUrls = currentManuscriptUrls ? currentManuscriptUrls.split(",").filter(Boolean) : [];
      const updatedUrls = [...existingUrls, ...uploadedUrls].join(",");

      await updateBook({
        id: bookId,
        manuscript_urls: updatedUrls,
      }).unwrap();

      onClose();
    } catch (err: any) {
      console.error("Upload failed:", err);
      const isCors = err?.message?.toLowerCase().includes("fetch") ||
                     err?.message?.toLowerCase().includes("cors") ||
                     err?.name === "TypeError";
      setUploadError(
        isCors
          ? "Upload failed: the storage bucket is blocking browser uploads (CORS not configured). Please ask your admin to add CORS rules to the R2 bucket, then try again."
          : `Upload failed: ${err?.message || "Please check your network connection and try again."}`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/40 backdrop-blur-sm font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 relative animate-fade-in">
        {/* Close */}
        <button onClick={onClose} disabled={uploading} className="absolute top-4 right-4 text-gray-400 hover:text-[#0B132B] transition-colors cursor-pointer">
          <X size={20} />
        </button>

        <h3 className="font-serif text-xl font-bold text-[#0B132B] mb-5">Upload Your Files</h3>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-6 cursor-pointer transition-all duration-300 ${
            dragging ? "border-[#B89C72] bg-[#FAF5EE]" : "border-[#D8CCBA] bg-[#FAF8F5] hover:border-[#B89C72]"
          }`}
          onClick={() => !uploading && inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" multiple className="hidden" disabled={uploading}
            onChange={(e) => setFiles([...files, ...Array.from(e.target.files || [])])} />
          <div className="w-14 h-14 rounded-full bg-[#F4EFE6] flex items-center justify-center mb-4">
            <CloudUpload size={26} className="text-[#B89C72]" />
          </div>
          <p className="font-bold text-[#0B132B] text-sm mb-1">Drag And Drop Files Here</p>
          <p className="text-gray-400 text-xs mb-4">Or</p>
          <button
            type="button"
            disabled={uploading}
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            className="bg-gradient-to-r from-[#B89C72] to-[#9a7e55] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:shadow-[0_4px_14px_rgba(184,156,114,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            Browse Files
          </button>
          <p className="text-[10px] text-gray-400 mt-4">DOC, DOCX, PDF, JPG, PNG up to 5MB each</p>
        </div>

        {/* Uploaded file list */}
        {files.length > 0 && (
          <ul className="mt-4 space-y-2 max-h-40 overflow-y-auto">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-[#FAF8F5] border border-[#EBE5D6] rounded-xl px-4 py-2.5 text-xs">
                <span className="text-[#0B132B] font-semibold truncate max-w-[200px]">{f.name}</span>
                <button 
                  onClick={() => setFiles(files.filter((_, j) => j !== i))} 
                  disabled={uploading}
                  className="text-gray-400 hover:text-red-400 ml-2 cursor-pointer disabled:opacity-50"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {uploadError && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2 text-xs font-semibold">
            <span className="text-red-800 font-bold mt-0.5">⚠️</span>
            <div className="flex-1">
              <p className="font-bold text-red-800 mb-0.5">Upload Failed</p>
              <p className="text-xs text-red-700 leading-relaxed font-medium">{uploadError}</p>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <button
            className="mt-4 w-full py-3 bg-[#0B132B] hover:bg-[#162040] text-white text-sm font-bold rounded-xl transition-colors duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            onClick={handleUploadSubmit}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              `Upload ${files.length} File${files.length > 1 ? "s" : ""}`
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Book Detail ────────────────────────────────────────────────── */
interface BookDetailProps {
  id: number;
  authorName: string;
  onBack: () => void;
}

function BookDetail({ id, authorName, onBack }: BookDetailProps) {
  const { data: book, isLoading } = useGetBookQuery(id);
  const [uploadOpen, setUploadOpen] = useState(false);

  if (isLoading || !book) {
    return (
      <div className="flex h-64 bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Loading book details...</p>
        </div>
      </div>
    );
  }

  const progress = getProgressFromStatus(book.status);
  const step = activeStep(progress);

  // Parse files list from manuscript_urls
  const fileUrls = book.manuscript_urls ? book.manuscript_urls.split(",").filter(Boolean) : [];
  const filesList = fileUrls.map((url, idx) => {
    const parts = url.split("/");
    const filename = decodeURIComponent(parts[parts.length - 1] || `Manuscript File ${idx + 1}`);
    const ext = filename.split(".").pop()?.toLowerCase();
    let type = "Manuscript";
    if (ext === "pdf") type = "PDF Document";
    else if (ext && ["png", "jpg", "jpeg", "webp"].includes(ext)) type = "Cover Art";
    
    return {
      name: filename,
      type,
      url,
      uploadedOn: new Date(book.updated_at || book.created_at).toLocaleDateString(),
    };
  });

  return (
    <div className="space-y-5 font-sans">
      {uploadOpen && (
        <UploadModal 
          bookId={book.id} 
          currentManuscriptUrls={book.manuscript_urls}
          onClose={() => setUploadOpen(false)} 
        />
      )}

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#B89C72] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to My Books
      </button>

      {/* ── Book Header Card ── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Cover */}
          <div className="flex-shrink-0 w-[100px] h-[136px] rounded-xl overflow-hidden shadow-md border border-[#EBE5D6] relative bg-gray-100">
            <img 
              src={book.cover_image_url || leadersBlueprint.src} 
              alt={book.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-serif text-2xl font-bold text-[#0B132B] mb-1">{book.title}</h1>
            <p className="text-sm text-gray-400 mb-3">{authorName}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 border text-xs font-bold px-3 py-1 rounded-full ${statusColor(book.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot(book.status)}`} />
                {formatStatusText(book.status)}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#EBE5D6] text-[#0B132B] text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89C72]" />
                {book.words.toLocaleString()} Words
              </span>
            </div>

            <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-3">
              <Clock size={12} className="text-[#B89C72]" />
              Last Update : {new Date(book.updated_at || book.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500">Progress</span>
              <div className="flex-1 max-w-[200px] h-2 bg-[#EBE5D6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B89C72] to-[#9a7e55] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#B89C72]">{progress}%</span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm">
              <CalendarDays size={16} className="text-[#B89C72]" />
              <div>
                <span className="font-bold text-[#0B132B]">Estimated Launch</span>
                <p className="text-gray-500 text-xs">
                  {new Date(new Date(book.created_at).setMonth(new Date(book.created_at).getMonth() + 6)).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* Right: quote + CTA */}
          <div className="hidden lg:flex flex-col items-end justify-between gap-4 flex-shrink-0 max-w-[220px]">
            <div className="relative">
              <span className="absolute -top-3 -left-2 font-serif text-[#B89C72] text-5xl leading-none opacity-50">"</span>
              <p className="font-serif text-sm text-[#0B132B]/70 italic leading-relaxed pt-4 px-2">
                We turn your words into a legacy that inspires the world.
              </p>
              <span className="absolute -bottom-3 -right-1 font-serif text-[#B89C72] text-5xl leading-none opacity-50">"</span>
              <p className="text-[10px] font-bold text-[#B89C72] mt-4 text-right">— Harmony Publishing</p>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#B89C72] to-[#9a7e55] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm hover:shadow-[0_4px_14px_rgba(184,156,114,0.4)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <Headphones size={15} />
              Contact Specialist
            </button>
          </div>
        </div>
      </div>

      {/* ── Publishing Progress ── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm p-6">
        <h2 className="font-serif text-xl font-bold text-[#0B132B] mb-6">Publishing Progress</h2>
        <div className="flex items-center justify-center gap-0 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <StepCircle i={i} active={step} />
                <span className={`text-xs font-semibold mt-2 ${i <= step ? "text-[#B89C72]" : "text-gray-300"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mb-5 mx-1 ${i < step ? "bg-[#B89C72]" : "bg-[#EBE5D6]"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Uploaded Files ── */}
      <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EBE5D6]/60 flex items-center gap-2">
          <FileText size={17} className="text-[#B89C72]" />
          <h2 className="font-serif text-xl font-bold text-[#0B132B]">Uploaded Files</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAF8F5] text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="text-left px-6 py-3">File Name</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Uploaded On</th>
                <th className="text-left px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5D6]/40">
              {filesList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-400">
                    No files uploaded yet.
                  </td>
                </tr>
              ) : (
                filesList.map((f, i) => (
                  <tr key={i} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#0B132B] truncate max-w-[300px]">{f.name}</td>
                    <td className="px-4 py-4 text-gray-500">{f.type}</td>
                    <td className="px-4 py-4 text-gray-500">{f.uploadedOn}</td>
                    <td className="px-4 py-4">
                      <button 
                        onClick={() => window.open(f.url, "_blank")}
                        title="Download File"
                        className="w-8 h-8 rounded-lg border border-[#EBE5D6] hover:border-[#B89C72] hover:text-[#B89C72] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Upload CTA */}
        <div className="px-6 py-5 border-t border-[#EBE5D6]/60 flex items-center justify-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Need To Upload New Files?</span>
          <button
            onClick={() => setUploadOpen(true)}
            className="border border-[#B89C72] text-[#B89C72] hover:bg-[#B89C72] hover:text-white text-sm font-bold px-5 py-2 rounded-xl transition-all duration-300 cursor-pointer"
          >
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Book Card (list) ───────────────────────────────────────────── */
interface BookCardProps {
  book: any;
  authorName: string;
  onView: () => void;
}

function BookCard({ book, authorName, onView }: BookCardProps) {
  const progress = getProgressFromStatus(book.status);
  
  return (
    <div className="bg-white rounded-2xl border border-[#EBE5D6] shadow-sm hover:shadow-md transition-all duration-300 p-5 flex gap-4">
      {/* Cover */}
      <div className="flex-shrink-0 w-[80px] h-[110px] rounded-xl overflow-hidden shadow-md border border-[#EBE5D6] relative bg-gray-100">
        <img 
          src={book.cover_image_url || leadersBlueprint.src} 
          alt={book.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-base font-bold text-[#0B132B] leading-tight mb-0.5 truncate">{book.title}</h3>
        <p className="text-xs text-gray-400 mb-2">{authorName}</p>

        <span className={`inline-flex items-center gap-1.5 border text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${statusColor(book.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(book.status)}`} />
          {formatStatusText(book.status)}
        </span>

        <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-2">
          <Clock size={10} className="text-[#B89C72]" /> Last Update : {new Date(book.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-gray-500 font-medium">Progress</span>
          <div className="flex-1 h-1.5 bg-[#EBE5D6] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B89C72] to-[#9a7e55] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-[#B89C72]">{progress}%</span>
        </div>

        <button
          onClick={onView}
          className="text-[11px] font-bold border border-[#B89C72] text-[#B89C72] hover:bg-[#B89C72] hover:text-white px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function MyBooks() {
  const { data: books, isLoading } = useListBooksQuery();
  const { data: profile } = useGetProfileQuery();

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All Books");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const authorName = profile?.first_name ? `By ${profile.first_name} ${profile.last_name}` : "By You";

  if (selectedId) {
    return <BookDetail id={selectedId} authorName={authorName} onBack={() => setSelectedId(null)} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 bg-[#FAF8F5] items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B89C72] mx-auto"></div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#B89C72]">Loading your library...</p>
        </div>
      </div>
    );
  }

  const filtered = (books || []).filter((b) => {
    // Map backend status to user filters
    const normalizedStatus = formatStatusText(b.status);
    const matchFilter = filter === "All Books" || normalizedStatus === filter;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-5 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0B132B]">My Books</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage and track all your publishing projects</p>
        </div>
      </div>

      {/* ── Filter Tabs + Search ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white border border-[#EBE5D6] rounded-xl p-1 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                filter === f
                  ? "bg-[#B89C72] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#0B132B] hover:bg-[#FAF8F5]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-[#EBE5D6] rounded-xl px-4 py-2.5 flex-1 max-w-xs">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search your books…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-[#0B132B] placeholder-gray-400 bg-transparent outline-none flex-1"
          />
        </div>
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-[#EBE5D6]">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-bold text-[#0B132B]">No books found</p>
          <p className="text-sm">Try changing the filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              authorName={authorName} 
              onView={() => setSelectedId(book.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
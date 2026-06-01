"use client";

import React, { useState } from "react";
import Image from "next/image";
import hero6 from "@/assets/images/hero6.png";

const categories = ["All Books", "Fiction", "Non-Fiction", "Business", "Memoir", "Children's"];

const books = [
  { title: "Beyond The Horizon", author: "James Walker", category: "Fiction", rating: 4.9, tag: "New" },
  { title: "Silent Waves", author: "James Walker", category: "Fiction", rating: 4.8, tag: null },
  { title: "The Mindset Mastery", author: "Sarah Adams", category: "Business", rating: 4.9, tag: "Prime" },
  { title: "Beyond The Horizon", author: "James Walker", category: "Non-Fiction", rating: 4.7, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Memoir", rating: 4.5, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Children's", rating: 4.3, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Fiction", rating: 4.9, tag: null },
  { title: "Silent Waves", author: "James Walker", category: "Non-Fiction", rating: 4.8, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Business", rating: 4.6, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Fiction", rating: 4.5, tag: null },
  { title: "Beyond The Horizon", author: "James Walker", category: "Memoir", rating: 4.4, tag: null },
];

const COVER_COLORS = [
  "from-[#1a2744] to-[#0d1730]",
  "from-[#0f1e33] to-[#1a2e4a]",
  "from-[#f5f0e8] to-[#e8dcc8]",
  "from-[#1c2b42] to-[#0a1520]",
  "from-[#162035] to-[#0b1525]",
  "from-[#1a2845] to-[#0c1630]",
];

const BookCard = ({ book, idx }: { book: typeof books[0]; idx: number }) => {
  const coverGradient = COVER_COLORS[idx % COVER_COLORS.length];
  const isLight = idx === 2;

  return (
    <div className="group flex flex-col">
      {/* Book Cover */}
      <div className={`relative rounded-xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 bg-gradient-to-b ${coverGradient} flex flex-col items-center justify-center p-4`}>
        {/* Tag */}
        {book.tag && (
          <div className="absolute top-2.5 left-2.5 bg-[#B89C72] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {book.tag}
          </div>
        )}
        {/* Book spine lines */}
        <div className={`text-center ${isLight ? "text-[#0B132B]" : "text-white"}`}>
          <div className={`w-12 h-12 mx-auto mb-3 rounded-full border flex items-center justify-center ${isLight ? "border-[#B89C72]" : "border-[#B89C72]/60"}`}>
            <svg className="w-6 h-6 text-[#B89C72]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <p className={`text-xs font-bold leading-tight uppercase tracking-wide ${isLight ? "text-[#0B132B]" : "text-white"}`}>
            {book.title}
          </p>
          <div className={`w-6 h-px mx-auto my-2 ${isLight ? "bg-[#B89C72]" : "bg-[#B89C72]/60"}`} />
          <p className={`text-[10px] ${isLight ? "text-gray-500" : "text-white/60"}`}>A Journey Of Purpose</p>
        </div>
      </div>

      {/* Book Info */}
      <div className="mt-3 px-1">
        <div className="flex items-center gap-1 mb-1">
          <svg className="w-3 h-3 text-[#B89C72] fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[10px] font-semibold text-gray-600">{book.rating}</span>
        </div>
        <p className="text-xs font-bold text-[#0B132B] leading-tight">{book.title}</p>
        <p className="text-[10px] text-gray-500 mt-0.5">A Journey Of Purpose</p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-4 h-4 rounded-full bg-[#B89C72]/20 border border-[#B89C72]/30 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-[#B89C72]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500">{book.author}</span>
        </div>
      </div>
    </div>
  );
};

const Showcase = () => {
  const [activeCategory, setActiveCategory] = useState("All Books");
  const [playing, setPlaying] = useState(false);

  const filtered = activeCategory === "All Books"
    ? books
    : books.filter((b) => b.category === activeCategory);

  return (
    <>
      {/* Video Section */}
      <section className="relative bg-[#0B132B] overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left text */}
            <div className="text-white">
              <p className="text-xs font-bold tracking-widest text-[#B89C72] uppercase mb-3">Where Stories</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-6">
                TAKE FLIGHT
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
                Watch how Harmony Publishing transforms manuscripts into beautifully published masterpieces that captivate readers worldwide.
              </p>
            </div>

            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
              <Image
                src={hero6}
                alt="Publishing showcase video"
                fill
                className="object-cover opacity-70"
              />
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-[#B89C72] w-1/3" />
              </div>
              {/* Play button */}
              <button
                onClick={() => setPlaying(!playing)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#B89C72] hover:bg-[#a08660] flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110">
                  {playing ? (
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Books Shelf */}
      <section id="books" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#B89C72]/10 border border-[#B89C72]/20 rounded-full px-4 py-1.5 mb-5">
              <svg className="w-3 h-3 text-[#B89C72] fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-bold tracking-widest text-[#B89C72] uppercase">Published Excellence</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B132B] mb-4 leading-tight">
              Books That <span className="text-[#B89C72]">Inspire Millions</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Discover A Collection Of Beautifully Crafted Books Published With Passion, Precision, And A Commitment To Excellence.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0B132B] text-white shadow"
                    : "bg-white border border-[#EBE5D6] text-gray-600 hover:border-[#B89C72]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filtered.map((book, i) => (
              <BookCard key={i} book={book} idx={i} />
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#B89C72] hover:bg-[#9a7e55] text-white font-bold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow cursor-pointer">
              View all
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Showcase;

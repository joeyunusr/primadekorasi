'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  tagline: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image: string;
  alt: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tagline: 'Manufaktur & Supplier B2B',
    headline: 'Solusi Perlengkapan Event untuk Bisnis Anda.',
    description: 'Dari furnitur event hingga tekstil dekorasi, temukan kebutuhan produk dalam satu katalog terpadu langsung dari produsen.',
    ctaText: 'Jelajahi Katalog',
    ctaHref: '/produk',
    secondaryCtaText: 'Minta Penawaran',
    secondaryCtaHref: '/minta-penawaran',
    image: '/images/hero_prima_event.jpg',
    alt: 'Perlengkapan Meja dan Kursi Banquet Event PT Prima Dekorasi Group',
  },
  {
    id: 'slide-2',
    tagline: 'Presisi Jahitan & Bahan Berkualitas',
    headline: 'Produksi Konveksi dengan Pilihan yang Fleksibel.',
    description: 'Temukan sarung kursi Futura, taplak meja prasmanan, dan kain dekorasi dengan beragam model serta puluhan nomor kode warna.',
    ctaText: 'Lihat Produk Tekstil',
    ctaHref: '/kategori/sarung-kursi',
    secondaryCtaText: 'Katalog Bahan Kain',
    secondaryCtaHref: '/material-kain',
    image: '/images/chair_cover_futura.jpg',
    alt: 'Sarung Kursi Futura Model Ketat Street dan Rempel',
  },
  {
    id: 'slide-3',
    tagline: 'Kustomisasi Logo & Dimensi',
    headline: 'Produk Custom untuk Kebutuhan Spesifik.',
    description: 'Konsultasikan ukuran, warna, material, dan kebutuhan bordir logo hotel atau persewaan Anda pada produk yang tersedia dalam layanan custom.',
    ctaText: 'Minta Penawaran Custom',
    ctaHref: '/custom-order',
    secondaryCtaText: 'Konsultasi Manufaktur',
    secondaryCtaHref: '/manufaktur',
    image: '/images/table_ibm_banquet.jpg',
    alt: 'Meja IBM dan Cover Stretch dengan Kustomisasi Khusus',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const activeSlide = SLIDES[current];

  return (
    <section className="w-full bg-white py-4 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Main Hero Card (Apple-style Rounded Container) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-[#F5F5F7] border border-[#E5E5E7] overflow-hidden min-h-[460px] md:min-h-[580px] flex flex-col justify-between p-5 sm:p-10 md:p-14 shadow-2xs"
        >
          
          {/* Slide Text Content */}
          <div className="relative z-10 max-w-xl space-y-2.5 sm:space-y-4">
            <span className="text-[10px] sm:text-sm font-semibold tracking-wide text-[#12629F] uppercase">
              {activeSlide.tagline}
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-[1.12]">
              {activeSlide.headline}
            </h2>

            <p className="text-xs sm:text-base text-[#6E6E73] leading-relaxed max-w-lg">
              {activeSlide.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href={activeSlide.ctaHref}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs sm:text-sm font-semibold rounded-full transition-colors shadow-sm border border-[#39C1D9]/30"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#39C1D9]" />
              </Link>

              {activeSlide.secondaryCtaText && activeSlide.secondaryCtaHref && (
                <Link
                  href={activeSlide.secondaryCtaHref}
                  className="inline-flex items-center gap-1 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1D1D1F] hover:text-[#12629F] transition-colors"
                >
                  <span>{activeSlide.secondaryCtaText}</span>
                  <span className="text-[#39C1D9]" aria-hidden="true">&gt;</span>
                </Link>
              )}
            </div>
          </div>

          {/* Slide Image Backdrop / Display - Full-height seamless coverage without cut-offs */}
          <div className="absolute inset-0 md:left-1/4 md:right-0 z-0 pointer-events-none overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                priority
                className="object-cover object-center md:object-right transition-opacity duration-700 opacity-85 md:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/70 to-[#F5F5F7]/30 md:bg-gradient-to-r md:from-[#F5F5F7] md:via-[#F5F5F7]/60 md:to-transparent" />
            </div>
          </div>

          {/* Bottom Floating Ultra-Modern Control Bar (Apple-Style) */}
          <div className="relative z-10 pt-6 sm:pt-8 flex items-center justify-between gap-3">
            {/* Pagination Pills with Counter */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E5E7] shadow-sm">
              <span className="text-[10px] font-bold text-[#12629F] px-2 py-0.5 rounded-full bg-[#12629F]/10 border border-[#39C1D9]/20 tracking-wider">
                0{current + 1} / 0{SLIDES.length}
              </span>

              <div className="flex items-center gap-1.5 px-1">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      idx === current ? 'w-7 sm:w-9 bg-[#12629F]' : 'w-2 bg-[#D2D2D7] hover:bg-gray-400'
                    }`}
                    aria-label={`Lihat slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 text-[#6E6E73] hover:text-[#12629F] transition-colors rounded-full hover:bg-gray-100"
                aria-label={isPlaying ? 'Jeda carousel' : 'Putar carousel'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Prev / Next Glass Arrows (Visible on both mobile & desktop) */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[#1D1D1F] border border-[#E5E5E7] shadow-sm transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D1D1F]" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-[#1D1D1F] border border-[#E5E5E7] shadow-sm transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                aria-label="Slide berikutnya"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D1D1F]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

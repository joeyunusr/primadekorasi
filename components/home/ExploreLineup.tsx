'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data/products';

export function ExploreLineup() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Curate 8 key highlight products for the lineup carousel
  const lineupSlugs = [
    'meja-bulat-event',
    'meja-ibm-persegi-panjang',
    'sarung-kursi-futura-model-ketat',
    'sarung-kursi-plastik-napolly',
    'cover-meja-prasmanan-rempel-full',
    'cover-meja-bulat-rempel-standar',
    'plafon-tenda-serut-sisir',
    'rangka-tenda-lengkung-terob-pesta',
  ];

  const lineupProducts: Product[] = lineupSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-[#F5F5F7] py-14 md:py-24 border-y border-[#E5E5E7] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header (Apple-Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Jelajahi jajarannya.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6E6E73] mt-1.5 sm:mt-2">
              Beragam perlengkapan event dan hospitality untuk kebutuhan usaha Anda.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/produk"
              className="text-xs sm:text-sm font-semibold text-[#12629F] hover:underline flex items-center gap-1 group"
            >
              <span>Bandingkan semua model</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-[#39C1D9]" aria-hidden="true">&gt;</span>
            </Link>

            {/* Desktop Quick Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-full border border-[#E5E5E7] transition-all shadow-xs ${
                  canScrollLeft
                    ? 'bg-white text-[#1D1D1F] hover:bg-gray-100 hover:scale-105'
                    : 'bg-white/50 text-gray-300 border-gray-200 cursor-not-allowed'
                }`}
                aria-label="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-full border border-[#E5E5E7] transition-all shadow-xs ${
                  canScrollRight
                    ? 'bg-white text-[#1D1D1F] hover:bg-gray-100 hover:scale-105'
                    : 'bg-white/50 text-gray-300 border-gray-200 cursor-not-allowed'
                }`}
                aria-label="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Cards - 2 CARDS PER ROW ON MOBILE, PROPORTIONALLY SCALED DOWN */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2.5 sm:gap-5 overflow-x-auto pb-4 no-scrollbar scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {lineupProducts.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50vw-22px)] sm:w-[320px] md:w-[350px] shrink-0 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-[#E5E5E7] shadow-xs flex flex-col justify-between snap-start group"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative w-full h-36 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#E5E5E7] mb-2.5 sm:mb-5">
                  <Image
                    src={product.images[0] || '/images/hero_prima_event.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Swatch color dots preview */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-2 sm:mb-4">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#12629F] border border-white ring-1 ring-gray-300" title="Biru Navy" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#39C1D9] border border-white ring-1 ring-gray-300" title="Cyan Blue" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#722F37] border border-white ring-1 ring-gray-300" title="Maroon" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#D4AF37] border border-white ring-1 ring-gray-300" title="Gold" />
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#1A1A1A] border border-white ring-1 ring-gray-300" title="Hitam" />
                </div>

                {/* Subtitle / Category Kicker */}
                <span className="text-[9px] sm:text-xs font-semibold text-[#12629F] uppercase tracking-wider block text-center mb-0.5 sm:mb-1 truncate">
                  {product.category_name}
                </span>

                {/* Title */}
                <h3 className="text-xs sm:text-lg font-bold text-[#1D1D1F] text-center tracking-tight min-h-[32px] sm:min-h-[54px] flex items-center justify-center line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                {/* Short Description */}
                <p className="text-[10px] sm:text-xs text-[#6E6E73] text-center line-clamp-1 sm:line-clamp-2 mt-1 sm:mt-2 leading-relaxed">
                  {product.short_description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-6 mt-2 sm:mt-4 border-t border-[#E5E5E7] flex flex-col gap-1.5 sm:gap-2">
                <Link
                  href={`/produk/${product.slug}`}
                  className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 bg-[#12629F] hover:bg-[#0E4F81] text-white text-[10px] sm:text-xs font-semibold rounded-full text-center transition-colors shadow-xs"
                >
                  Lihat Produk
                </Link>

                <Link
                  href={`/minta-penawaran?produk=${encodeURIComponent(product.name)}`}
                  className="w-full py-1.5 sm:py-2 px-2 text-[#1D1D1F] hover:text-[#12629F] text-[10px] sm:text-xs font-medium rounded-full text-center hover:bg-gray-100 transition-colors hidden sm:block"
                >
                  Minta Penawaran
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Interactive Apple-Style Slider Controls Bar */}
        <div className="mt-6 flex items-center justify-between sm:justify-center gap-4">
          {/* Mobile Prev Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-[#E5E5E7] transition-all sm:hidden ${
              canScrollLeft
                ? 'bg-white text-[#1D1D1F] shadow-xs active:scale-95'
                : 'bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Geser ke kiri"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Sleek Pill Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-64 h-1.5 bg-[#E5E5E7] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#12629F] rounded-full transition-all duration-150"
                style={{
                  width: '35%',
                  transform: `translateX(${scrollProgress * 185}%)`,
                }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-[#86868B] font-medium hidden sm:inline">
              Geser untuk melihat semua
            </span>
          </div>

          {/* Mobile Next Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-[#E5E5E7] transition-all sm:hidden ${
              canScrollRight
                ? 'bg-white text-[#1D1D1F] shadow-xs active:scale-95'
                : 'bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Geser ke kanan"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

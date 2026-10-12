import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function TwoColumnHighlights() {
  return (
    <section className="w-full bg-[#F5F5F7] py-16 md:py-24 border-t border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Yang penting untuk bisnis event Anda.
          </h2>
          <p className="text-sm md:text-base text-[#6E6E73] mt-2">
            Pondasi inventaris kokoh dan estetika tekstil terbaik untuk meningkatkan reputasi vendor Anda.
          </p>
        </div>

        {/* Two-Column Grid - 2 CARDS IN 1 ROW ON MOBILE, PROPORTIONALLY COMPACT */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8">
          
          {/* Card 1: Furnitur Event */}
          <div className="bg-white rounded-[22px] sm:rounded-[32px] p-3.5 sm:p-8 sm:p-10 border border-[#E5E5E7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-8">
              <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-[#12629F]">
                Furnitur & Meja
              </span>
              <h3 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] line-clamp-2 sm:line-clamp-none leading-tight">
                Furnitur untuk Kebutuhan Profesional.
              </h3>
              <p className="text-[10px] sm:text-sm text-[#6E6E73] leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none">
                Jelajahi meja event dengan pilihan konstruksi dan spesifikasi untuk kebutuhan acara, meeting, serta hospitality. Kaki hollow lipat kuat dengan adjustable floor adjuster.
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  href="/kategori/furnitur-event"
                  className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-[#12629F] hover:underline"
                >
                  <span>Lihat Furnitur</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#39C1D9] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="relative w-full h-36 sm:h-64 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#E5E5E7]">
              <Image
                src="/images/table_ibm_banquet.jpg"
                alt="Meja IBM dan Meja Bulat Event PT Prima Dekorasi Group"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 2: Tekstil & Sarung Kursi */}
          <div className="bg-white rounded-[22px] sm:rounded-[32px] p-3.5 sm:p-8 sm:p-10 border border-[#E5E5E7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:border-black/15 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-8">
              <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-[#12629F]">
                Konveksi Tekstil
              </span>
              <h3 className="text-xs sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] line-clamp-2 sm:line-clamp-none leading-tight">
                Tekstil Pilihan Model dan Warna.
              </h3>
              <p className="text-[10px] sm:text-sm text-[#6E6E73] leading-relaxed max-w-md line-clamp-2 sm:line-clamp-none">
                Temukan sarung kursi, taplak meja, pita kursi, dan kain dekorasi dengan opsi bahan serta warna sesuai katalog. Pilihan model ketat street, rempel rimpel, hingga bordir logo.
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  href="/kategori/sarung-kursi"
                  className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-[#12629F] hover:underline"
                >
                  <span>Jelajahi Tekstil</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#39C1D9] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="relative w-full h-36 sm:h-64 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAFAFA] border border-[#E5E5E7]">
              <Image
                src="/images/chair_cover_futura.jpg"
                alt="Sarung Kursi Futura dan Kain Dekorasi Event"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

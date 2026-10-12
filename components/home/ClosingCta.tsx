import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

export function ClosingCta() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#12629F] block">
            Pengadaan Perlengkapan Event B2B
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-tight">
            Sedang Menyiapkan Kebutuhan Produk untuk Bisnis Anda?
          </h2>

          <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed max-w-xl mx-auto">
            Jelajahi katalog atau kirimkan spesifikasi kebutuhan Anda untuk memperoleh penawaran harga produk resmi langsung dari produsen.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/produk"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#12629F] hover:bg-[#0E4F81] text-white text-sm font-semibold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#39C1D9]/30"
            >
              <span>Jelajahi Katalog Produk</span>
              <ArrowRight className="w-4 h-4 text-[#39C1D9]" />
            </Link>

            <Link
              href="/minta-penawaran"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F7] hover:bg-gray-200 text-[#1D1D1F] text-sm font-semibold rounded-full transition-colors flex items-center justify-center gap-2 border border-[#E5E5E7]"
            >
              <FileText className="w-4 h-4 text-[#12629F]" />
              <span>Minta Penawaran Harga</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-sm border border-[#E5E5E7] text-[#12629F]">
            <Search className="w-8 h-8 text-[#39C1D9]" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#12629F]">404 &bull; Halaman Tidak Ditemukan</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
              Halaman yang Anda cari tidak tersedia.
            </h1>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Tautan mungkin telah berpindah atau produk yang Anda tuju sedang diperbarui dalam katalog kami.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#12629F] text-white text-xs font-semibold hover:bg-[#0E4F81] transition-colors border border-[#39C1D9]/30"
            >
              <Home className="w-4 h-4 text-[#39C1D9]" />
              Kembali ke Beranda
            </Link>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-[#D2D2D7] text-[#1D1D1F] text-xs font-semibold hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

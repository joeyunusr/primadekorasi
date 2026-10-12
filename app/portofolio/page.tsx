'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Eye, X, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS, Product } from '@/lib/data/products';

export default function PortofolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    'Semua',
    'Furnitur Event',
    'Sarung Kursi',
    'Taplak & Sarung Meja',
    'Kain Dekorasi Tenda',
    'Rangka Tenda & Fabrikasi',
    'Material Kain',
    'Produk Custom',
  ];

  const filtered = activeFilter === 'Semua'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category_name === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Portofolio & Detail Produk</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-1">
              Dokumentasi Manufaktur
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Produk dan Detail yang Perlu Anda Kenali.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              Galeri dokumentasi fisik produk furnitur event, sarung kursi banquet, taplak meja katering, kain tenda, hingga rangka pipa galvanis.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === cat
                    ? 'bg-[#12629F] text-white shadow-xs'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E5E5E7] text-xs text-[#6E6E73]">
            <span>Menampilkan {filtered.length} dokumentasi produk</span>
            <span>*Foto mewakili standar produk fisik aktual</span>
          </div>

          {/* Grid - 2 COLUMNS ON MOBILE */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E5E7] bg-[#FAFAFA] flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full h-36 sm:h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={item.images[0] || '/images/hero_prima_event.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 text-[10px] sm:text-xs font-bold text-[#12629F] shadow-sm flex items-center gap-1 sm:gap-1.5">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Rincian Produk</span>
                      <span className="sm:hidden">Rincian</span>
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 space-y-1 sm:space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#12629F] uppercase tracking-wider block truncate">
                    {item.category_name}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1D1D1F] group-hover:text-[#12629F] transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#6E6E73] line-clamp-1 sm:line-clamp-2">
                    {item.short_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E5E5E7] relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Tutup rincian"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-64 sm:h-72 bg-gray-100 shrink-0">
                <Image
                  src={selectedProduct.images[0] || '/images/hero_prima_event.jpg'}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider">
                    {selectedProduct.category_name}
                  </span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mt-0.5">
                    {selectedProduct.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                  {selectedProduct.full_description}
                </p>

                <div className="p-4 rounded-2xl bg-[#F5F5F7] space-y-2 text-xs">
                  <div className="font-semibold text-[#1D1D1F]">Karakteristik & Bahan:</div>
                  <div className="text-[#6E6E73]">{selectedProduct.materials.join(', ')}</div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/produk/${selectedProduct.slug}`}
                    className="flex-1 py-3 px-5 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full text-center transition-colors flex items-center justify-center gap-2 border border-[#39C1D9]/30"
                  >
                    <span>Buka Halaman Produk & Varian</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="py-3 px-5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FABRIC_COLORS, FabricColor } from '@/lib/data/colors';
import { PRODUCTS } from '@/lib/data/products';
import { ChevronRight, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MaterialKainPage() {
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fabricProducts = PRODUCTS.filter((p) => p.category_id === 'material-kain');

  const filteredColors = FABRIC_COLORS.filter((color) => {
    const matchSearch =
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMaterial =
      selectedMaterialFilter === 'Semua' ||
      color.recommendedMaterials.includes(selectedMaterialFilter);
    return matchSearch && matchMaterial;
  });

  const materials = ['Semua', 'Polyester Lotto', 'Scuba', 'Abutay Felamin', 'Kain Satin', 'Blackout'];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-10 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Edukasi Material Kain & Swatch</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-1">
              Panduan Tekstil Manufaktur
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Karakteristik Material Kain & Katalog Warna Resmi
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              Pahami perbedaan karakteristik benang, elastisitas, daya tahan cuci, dan kode warna baku katalog tekstil PT Prima Dekorasi Group untuk hasil terbaik pada inventaris event Anda.
            </p>
          </div>
        </div>

        {/* 5 Master Materials Section */}
        <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-6 border-b border-[#E5E5E7]">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Pilihan Kain Konveksi Utama
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
              Setiap material memiliki sifat mekanis unik yang disesuaikan dengan jenis produk.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {fabricProducts.map((mat) => (
              <div
                key={mat.id}
                className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAFAFA] border border-[#E5E5E7] flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div className="space-y-1.5 sm:space-y-3">
                  <span className="text-[9px] sm:text-xs font-bold text-[#12629F] uppercase tracking-wider block">
                    {mat.subcategory}
                  </span>
                  <h3 className="text-xs sm:text-lg font-bold text-[#1D1D1F] line-clamp-1 leading-tight">
                    {mat.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#6E6E73] leading-relaxed line-clamp-2">
                    {mat.full_description}
                  </p>

                  <div className="pt-1.5 sm:pt-2 space-y-1 sm:space-y-1.5 border-t border-[#E5E5E7]">
                    {Object.entries(mat.specifications).slice(0, 3).map(([key, val]) => (
                      <div key={key} className="text-[9px] sm:text-xs flex justify-between gap-1">
                        <span className="text-[#6E6E73] truncate">{key}:</span>
                        <span className="text-[#1D1D1F] font-semibold text-right shrink-0">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 sm:pt-6">
                  <Link
                    href={`/produk/${mat.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[#12629F] hover:underline"
                  >
                    <span>Detail Bahan</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#39C1D9]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color Swatch Catalog Section */}
        <section className="py-16 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Katalog Kode Warna Baku
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
                Gunakan nomor kode warna ini saat mengajukan pemesanan sarung kursi, taplak meja, atau plafon tenda.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-[#6E6E73] max-w-md bg-[#F5F5F7] p-3 rounded-2xl border border-[#E5E5E7]">
              Warna pada layar dapat berbeda dari warna kain fisik. Konfirmasikan pilihan menggunakan katalog kain aktual sebelum produksi.
            </div>
          </div>

          {/* Search & Material Filters */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari warna (Maroon, No. 31, Gold)..."
                className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] rounded-full text-xs text-[#1D1D1F] border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterialFilter(mat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedMaterialFilter === mat
                      ? 'bg-[#12629F] text-white shadow-xs'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Color Grid - 2 columns on mobile, proportionally compact */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {filteredColors.map((color) => (
              <div
                key={color.id}
                className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E5E5E7] bg-white shadow-2xs flex flex-col justify-between hover:border-[#12629F] transition-colors"
              >
                <div>
                  <div
                    className="w-full h-16 sm:h-24 rounded-lg sm:rounded-xl shadow-inner border border-black/5 mb-2 sm:mb-3"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#12629F] uppercase block truncate">
                    {color.code}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1D1D1F] truncate">
                    {color.name}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#6E6E73] mt-0.5 sm:mt-1 line-clamp-2">
                    {color.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100 text-[9px] sm:text-[10px] text-[#6E6E73]">
                  <span>Cocok: </span>
                  <span className="text-[#1D1D1F] font-medium truncate block">
                    {color.recommendedMaterials.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-[#F5F5F7] rounded-3xl p-8 border border-[#E5E5E7] text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-xl font-bold text-[#1D1D1F]">
              Butuh Sampel Swatch Fisik untuk Uji Coba Lapangan?
            </h3>
            <p className="text-xs text-[#6E6E73]">
              Hubungi staf B2B kami untuk pengiriman swatch kit kain fisik sebelum memulai pesanan massal ratusan kursi dan tenda.
            </p>
            <div className="pt-2">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#12629F] text-white text-xs font-semibold rounded-full hover:bg-[#0E4F81] transition-colors shadow-xs border border-[#39C1D9]/30"
              >
                <span>Minta Sampel Swatch Kain</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

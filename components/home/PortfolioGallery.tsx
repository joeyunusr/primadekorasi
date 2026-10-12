'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ArrowRight, X } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'Semua' | 'Furnitur' | 'Sarung Kursi' | 'Taplak Meja' | 'Kain Tenda' | 'Rangka Tenda' | 'Custom';
  image: string;
  spec: string;
  slug: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Meja Bulat Event D180 cm Double Layer',
    category: 'Furnitur',
    image: '/images/hero_prima_event.jpg',
    spec: 'Multiplek 18mm, kaki besi silang lipat, cover rempel double layer',
    slug: 'meja-bulat-event',
  },
  {
    id: 'port-2',
    title: 'Sarung Kursi Futura Model Ketat Street',
    category: 'Sarung Kursi',
    image: '/images/chair_cover_futura.jpg',
    spec: 'Polyester Lotto No. 14 Hijau Botol, saku kaki kanvas ganda',
    slug: 'sarung-kursi-futura-model-ketat',
  },
  {
    id: 'port-3',
    title: 'Meja IBM 45x180 cm Kaki Hollow Lipat',
    category: 'Furnitur',
    image: '/images/table_ibm_banquet.jpg',
    spec: 'Hollow besi 3x3 cm, cat duco hitam, cover stretch spandex',
    slug: 'meja-ibm-persegi-panjang',
  },
  {
    id: 'port-4',
    title: 'Plafon Tenda Model Balon Ombak VIP',
    category: 'Kain Tenda',
    image: '/images/tent_ceiling_drapery.jpg',
    spec: 'Abutay Felamin Champagne & Ivory, modul bentang terob 6x6 meter',
    slug: 'plafon-tenda-balon-ombak',
  },
  {
    id: 'port-5',
    title: 'Cover Meja Prasmanan Rempel Full Box Pleat',
    category: 'Taplak Meja',
    image: '/images/hero_prima_event.jpg',
    spec: 'Felamin mengkilap Maroon No. 31, lipatan plisket teratur menyatu',
    slug: 'cover-meja-prasmanan-rempel-full',
  },
  {
    id: 'port-6',
    title: 'Rangka Tenda Lengkung Galvanis Pesta',
    category: 'Rangka Tenda',
    image: '/images/tent_ceiling_drapery.jpg',
    spec: 'Pipa besi galvanis anti karat, mesin roll bending, soket baut presisi',
    slug: 'rangka-tenda-lengkung-terob-pesta',
  },
  {
    id: 'port-7',
    title: 'Bordir Komputer Logo Identitas Usaha',
    category: 'Custom',
    image: '/images/chair_cover_futura.jpg',
    spec: 'Benang poly-embroidery tahan deterjen, densitas jahitan tinggi',
    slug: 'custom-bordir-logo',
  },
  {
    id: 'port-8',
    title: 'Pita Kursi Satin Silk Mengkilap Ikat Manual',
    category: 'Sarung Kursi',
    image: '/images/chair_cover_futura.jpg',
    spec: 'Kain Satin Silk Gold No. 18, kelim neci halus rapi',
    slug: 'pita-kursi-satin-premium',
  },
];

export function PortfolioGallery() {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Furnitur' | 'Sarung Kursi' | 'Taplak Meja' | 'Kain Tenda' | 'Rangka Tenda' | 'Custom'>('Semua');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filtered = activeTab === 'Semua'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  const tabs: Array<'Semua' | 'Furnitur' | 'Sarung Kursi' | 'Taplak Meja' | 'Kain Tenda' | 'Rangka Tenda' | 'Custom'> = [
    'Semua',
    'Furnitur',
    'Sarung Kursi',
    'Taplak Meja',
    'Kain Tenda',
    'Rangka Tenda',
    'Custom',
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Produk dan Detail yang Perlu Anda Kenali.
            </h2>
            <p className="text-sm md:text-base text-[#6E6E73] mt-2">
              Galeri dokumentasi produk dan detail kualitas fabrikasi konveksi PT Prima Dekorasi Group.
            </p>
          </div>

          <Link
            href="/portofolio"
            className="text-sm font-semibold text-[#12629F] hover:underline flex items-center gap-1 group shrink-0"
          >
            <span>Buka Semua Galeri Portofolio</span>
            <span className="group-hover:translate-x-0.5 transition-transform text-[#39C1D9]" aria-hidden="true">&gt;</span>
          </Link>
        </div>

        {/* Filter Tabs (Segmented Control Button Discipline) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#12629F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid - 2 COLUMNS ON MOBILE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E5E7] bg-[#FAFAFA] flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full h-36 sm:h-52 overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] sm:text-xs font-semibold text-[#12629F] shadow-sm flex items-center gap-1 sm:gap-1.5">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Lihat Rincian</span>
                    <span className="sm:hidden">Rincian</span>
                  </span>
                </div>
              </div>

              <div className="p-2.5 sm:p-4 space-y-1 sm:space-y-1.5">
                <span className="text-[9px] sm:text-[11px] font-semibold text-[#12629F] uppercase tracking-wider block truncate">
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#1D1D1F] group-hover:text-[#12629F] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#6E6E73] line-clamp-1 sm:line-clamp-2">
                  {item.spec}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5E5E7] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Tutup preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full h-64 bg-gray-100">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider">
                  Kategori {selectedItem.category}
                </span>
                <h3 className="text-xl font-bold text-[#1D1D1F]">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                  Spesifikasi produk: <span className="text-[#1D1D1F] font-medium">{selectedItem.spec}</span>
                </p>

                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href={`/produk/${selectedItem.slug}`}
                    className="flex-1 py-2.5 px-4 bg-[#12629F] text-white text-xs font-semibold rounded-full text-center hover:bg-[#0E4F81] transition-colors flex items-center justify-center gap-2 border border-[#39C1D9]/30"
                  >
                    <span>Buka Halaman Produk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="py-2.5 px-4 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

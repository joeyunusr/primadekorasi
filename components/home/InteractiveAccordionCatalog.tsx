'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  linkHref: string;
  linkText: string;
}

const ACCORDION_DATA: AccordionItem[] = [
  {
    id: 'acc-1',
    title: 'Furnitur Event & Meja Banquet',
    subtitle: 'Meja Bulat & IBM Konstruksi Presisi',
    description: 'Papan atas multiplek/blockboard tebal tahan beban dengan rangka kaki besi hollow 3x3 cm lipat dan adjustable floor adjuster. Dirancang khusus untuk rotasi tinggi persewaan tenda, ballroom hotel, dan ruang seminar.',
    bullets: [
      'Meja Bulat Round Table D120 cm, D160 cm, D180 cm',
      'Meja IBM 45x180 cm dan 60x180 cm kaki lipat rata',
      'Engsel pengunci kokoh aman untuk mobilisasi armada',
    ],
    image: '/images/table_ibm_banquet.jpg',
    imageAlt: 'Meja IBM dan Meja Bulat Event PT Prima Dekorasi Group',
    linkHref: '/kategori/furnitur-event',
    linkText: 'Lihat Detail Furnitur',
  },
  {
    id: 'acc-2',
    title: 'Sarung Kursi dan Taplak Meja',
    subtitle: 'Konveksi Presisi Aneka Model & Kursi',
    description: 'Tersedia model ketat/street bahan Lotto dan Scuba, model rempel klasik felamin plisket, model rempel pita renda VIP, hingga sarung kursi 1/2 body. Mendukung kursi Futura, Chitose lipat, Napolly plastik 101/102/209, dan Informa raja.',
    bullets: [
      'Cover Meja Prasmanan rempel full & model street 4-way stretch',
      'Cover Meja Bulat D120, D160, D180 cm rempel plisket & double layer',
      'Jahitan saku kaki kursi diperkuat kanvas anti jebol',
    ],
    image: '/images/chair_cover_futura.jpg',
    imageAlt: 'Sarung Kursi Futura dan Cover Meja Banquet',
    linkHref: '/kategori/sarung-kursi',
    linkText: 'Jelajahi Sarung Kursi & Taplak',
  },
  {
    id: 'acc-3',
    title: 'Kain Dekorasi Tenda Siap Pasang',
    subtitle: 'Plafon Datar, Serut, Balon & Rumbai Poni',
    description: 'Kain dekorasi plafon siap pasang yang memangkas waktu kerja kru tenda di lapangan. Bahan abutay felamin mengkilap yang jatuh rapi dan memantulkan pencahayaan pesta secara menawan.',
    bullets: [
      'Plafon serut sisir dan plafon balon ombak bertingkat',
      'Rumbai poni tenda model gelombang sabit dan tumpuk',
      'Kain penutup tiang model lilitan spiral dan tirai drape vertikal',
    ],
    image: '/images/tent_ceiling_drapery.jpg',
    imageAlt: 'Plafon Tenda Balon Ombak dan Dekorasi Drapery Tenda',
    linkHref: '/kategori/kain-dekorasi-tenda',
    linkText: 'Lihat Produk Kain Tenda',
  },
  {
    id: 'acc-4',
    title: 'Rangka Tenda & Fabrikasi',
    subtitle: 'Pipa Besi Galvanis Datar & Lengkung',
    description: 'Fabrikasi pipa besi galvanis tahan karat dengan sistem knockdown soket presisi. Diproses dengan mesin roll bending untuk rangka terob pesta lengkung yang stabil dan kokoh terhadap angin serta hujan.',
    bullets: [
      'Rangka Tenda Datar Standar modul 4x6m dan 6x6m',
      'Rangka Tenda Lengkung / Terob Pesta roll presisi',
      'Soket baut pengunci aman dan mudah dirakit kru',
    ],
    image: '/images/tent_ceiling_drapery.jpg',
    imageAlt: 'Rangka Pipa Galvanis Tenda Pesta Terob',
    linkHref: '/kategori/rangka-tenda',
    linkText: 'Lihat Rangka Tenda',
  },
  {
    id: 'acc-5',
    title: 'Material Kain & Pilihan Tekstil',
    subtitle: 'Lotto, Scuba, Felamin, Blackout & Satin',
    description: 'Kami memberikan transparansi karakteristik kain agar setiap produk memenuhi fungsi terbaiknya di lapangan. Dari bahan peregangan Lotto yang awet hingga felamin mengkilap yang mudah kering setelah dicuci.',
    bullets: [
      'Polyester Lotto Premium berbobot tebal untuk sarung ketat',
      'Scuba rajutan ganda dengan tampilan matte eksklusif',
      'Kain Satin silk dan Organdi transparan untuk pita kursi',
    ],
    image: '/images/hero_prima_event.jpg',
    imageAlt: 'Material Kain Tekstil Event PT Prima Dekorasi Group',
    linkHref: '/material-kain',
    linkText: 'Pelajari Material Kain',
  },
  {
    id: 'acc-6',
    title: 'Custom Order & Bordir Logo',
    subtitle: 'Spesifikasi Khusus untuk Branding B2B Anda',
    description: 'Layanan kustomisasi penuh mencakup bordir logo komputer nama rental/hotel, sablon logo elastis, penyesuaian ukuran dimensi non-standar, serta pemilihan kode warna katalog resmi.',
    bullets: [
      'Bordir komputer multi-head tahan cuci laundry industri',
      'Custom ukuran meja rapat dan bentangan modul tenda',
      'Kombinasi 2 atau 3 warna tematik sesuai kebutuhan',
    ],
    image: '/images/chair_cover_futura.jpg',
    imageAlt: 'Layanan Custom Order dan Bordir Logo Tekstil',
    linkHref: '/custom-order',
    linkText: 'Konsultasi Custom Order',
  },
];

export function InteractiveAccordionCatalog() {
  const [activeId, setActiveId] = useState<string>(ACCORDION_DATA[0].id);

  const activeItem = ACCORDION_DATA.find((item) => item.id === activeId) || ACCORDION_DATA[0];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading (Apple-Style) */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Satu Katalog untuk Beragam Kebutuhan Bisnis.
          </h2>
          <p className="text-sm md:text-base text-[#6E6E73] mt-2">
            Dari satu produsen, lengkapi seluruh kebutuhan furnitur, tekstil kursi, taplak meja, hingga rangka tenda Anda.
          </p>
        </div>

        {/* 2-Column Split: Accordion Left + Dynamic Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Accordion List (col-span-5) */}
          <div className="lg:col-span-6 space-y-3">
            {ACCORDION_DATA.map((item) => {
              const isOpen = item.id === activeId;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? 'bg-[#F5F5F7] border-[#E5E5E7] shadow-xs'
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? 'text-[#12629F]' : 'text-[#1D1D1F]'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5 font-medium">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className={`p-1.5 rounded-full transition-transform ${
                      isOpen ? 'rotate-180 bg-[#12629F] text-white' : 'text-[#6E6E73] bg-gray-100'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-4 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-2 pt-1">
                        {item.bullets.map((b, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#1D1D1F]">
                            <Check className="w-3.5 h-3.5 text-[#39C1D9] shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href={item.linkHref}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12629F] hover:underline"
                        >
                          <span>{item.linkText}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Responsive Dynamic Product Display (col-span-6) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-[#F5F5F7] border border-[#E5E5E7] shadow-sm flex flex-col justify-between p-8">
              
              {/* Dynamic Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  fill
                  className="object-cover transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              </div>

              {/* Top Floating Badge */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-semibold text-[#12629F] shadow-xs">
                  {activeItem.title}
                </span>
              </div>

              {/* Bottom Card Summary */}
              <div className="relative z-10 text-white space-y-2">
                <span className="text-xs text-[#39C1D9] font-semibold uppercase tracking-wider block">
                  {activeItem.subtitle}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-gray-200 line-clamp-3 leading-relaxed">
                  {activeItem.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={activeItem.linkHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#12629F] hover:bg-gray-100 text-xs font-bold rounded-full transition-colors shadow-xs"
                  >
                    <span>Buka Katalog Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#12629F]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

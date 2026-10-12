'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Plus, X, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EditorialCard {
  id: string;
  category: string;
  headline: string;
  image: string;
  theme: 'light' | 'dark';
  modalTitle: string;
  modalDescription: string;
  bulletPoints: string[];
  ctaLink: string;
  ctaText: string;
}

const EDITORIAL_CARDS: EditorialCard[] = [
  {
    id: 'ed-1',
    category: 'Konstruksi Furnitur',
    headline: 'Presisi Struktur. Kaki Hollow 3x3 cm & Floor Adjuster.',
    image: '/images/table_ibm_banquet.jpg',
    theme: 'light',
    modalTitle: 'Rekayasa Meja Event & Seminar Profesional',
    modalDescription: 'Meja event PT Prima Dekorasi Group dibangun dengan rangka besi hollow 3x3 cm berketebalan terukur dan engsel pengunci mekanis yang stabil. Menggunakan daun meja multiplek/blockboard tebal yang mampu menopang beban perangkat buffet katering maupun seminar.',
    bulletPoints: [
      'Papan atas multiplek/blockboard kokoh dengan lapisan penahan benturan',
      'Kaki lipat besi hollow 3x3 cm yang dapat dilipat rata sempurna',
      'Adjustable floor adjuster di setiap alas kaki untuk stabilitas lantai miring/tidak rata',
      'Pilihan ukuran baku Meja IBM 45x180 cm dan 60x180 cm, serta Meja Bulat D120, D160, D180 cm',
    ],
    ctaLink: '/kategori/furnitur-event',
    ctaText: 'Jelajahi Furnitur Event',
  },
  {
    id: 'ed-2',
    category: 'Jahitan & Pola',
    headline: 'Pola Ergonomis. Membungkus Rapi Tanpa Kusut Liar.',
    image: '/images/chair_cover_futura.jpg',
    theme: 'dark',
    modalTitle: 'Standar Pola Sarung Kursi Futura & Plastik',
    modalDescription: 'Setiap lekukan sandaran, sudut dudukan, dan jarak kaki kursi telah diukur dan dipotong dengan presisi tinggi. Menggunakan teknik obras ganda (double-stitch reinforcement) pada saku kaki kursi untuk menjamin ketahanan terhadap tarikan kencang saat dipasang.',
    bulletPoints: [
      'Model Ketat / Street dengan 4-way stretch membungkus rapi',
      'Model Rempel Klasik dengan plisket box pleat teratur dan simetris',
      'Saku kaki kursi berlapis bahan kanvas/karet sintetis anti robek',
      'Dukungan penuh untuk kursi Futura, Chitose lipat, dan Napolly plastik 101/102/209',
    ],
    ctaLink: '/kategori/sarung-kursi',
    ctaText: 'Lihat Koleksi Sarung Kursi',
  },
  {
    id: 'ed-3',
    category: 'Material Tekstil',
    headline: 'Polyester Lotto & Scuba. Tebal, Melar, Tahan Cuci.',
    image: '/images/hero_prima_event.jpg',
    theme: 'light',
    modalTitle: 'Seleksi Bahan Konveksi Berkualitas Tinggi',
    modalDescription: 'Kami memilih benang dan rajutan khusus yang tahan terhadap rotasi deterjen laundry industri dan setrika uap. Menjamin warna tetap pekat dan serat kain tidak melar permanen meskipun digunakan berulang kali pada puluhan event mingguan.',
    bulletPoints: [
      'Polyester Lotto: Serat padat berpori halus, tebal, tidak menerawang',
      'Scuba Premium: Rajutan ganda (double-knit) dengan tampilan matte kontemporer',
      'Abutay Felamin: Karakteristik kain jatuh mengkilap yang mudah kering',
      'Blackout: Perlindungan 90-99% dari cahaya langsung untuk backdrop panggung',
    ],
    ctaLink: '/material-kain',
    ctaText: 'Pelajari Karakteristik Kain',
  },
  {
    id: 'ed-4',
    category: 'Arsitektur Tenda',
    headline: 'Plafon & Drapery. Transformasi Kubah Ruang Megah.',
    image: '/images/tent_ceiling_drapery.jpg',
    theme: 'dark',
    modalTitle: 'Sistem Dekorasi Tenda Siap Pasang',
    modalDescription: 'Plafon siap pasang PT Prima Dekorasi Group dirancang untuk mempercepat instalasi kru di lokasi pesta. Lengkap dengan tali webbing pengikat di setiap modul rusuk tenda, menciptakan bentangan langit-langit yang simetris tanpa kendur.',
    bulletPoints: [
      'Plafon Datar: Bentangan lurus bersih untuk kebutuhan efisien',
      'Plafon Serut Sisir: Kerutan memanjang yang membaurkan pencahayaan lampu sorot',
      'Plafon Balon Ombak: Kemewahan bertingkat untuk perhelatan pernikahan VIP',
      'Rumbai Poni Tenda & Kain Penutup Tiang model spiral dan tirai elegan',
    ],
    ctaLink: '/kategori/kain-dekorasi-tenda',
    ctaText: 'Jelajahi Produk Tenda',
  },
  {
    id: 'ed-5',
    category: 'Fabrikasi Besi',
    headline: 'Pipa Galvanis Presisi. Rangka Knockdown Kuat.',
    image: '/images/tent_ceiling_drapery.jpg',
    theme: 'light',
    modalTitle: 'Fabrikasi Rangka Tenda Datar & Lengkung',
    modalDescription: 'Memadukan material pipa besi galvanis anti karat dengan pengelasan matang pada setiap soket sambungan. Konstruksi knockdown modular memudahkan bongkar muat pada truk armada persewaan tenda.',
    bulletPoints: [
      'Pipa galvanis tahan karat terhadap hujan dan kelembapan luar ruangan',
      'Mesin roll bending pipa presisi untuk bentuk lengkung terob pesta tanpa penyok',
      'Soket baut pengunci aman dan mudah dipasang oleh kru lapangan',
      'Spesifikasi dimensi disesuaikan dengan bentangan aktual yang dipesan',
    ],
    ctaLink: '/kategori/rangka-tenda',
    ctaText: 'Lihat Spesifikasi Rangka',
  },
  {
    id: 'ed-6',
    category: 'Kustomisasi B2B',
    headline: 'Bordir Logo & Custom Size. Identitas Usaha Anda.',
    image: '/images/chair_cover_futura.jpg',
    theme: 'dark',
    modalTitle: 'Aplikasi Logo & Dimensi Spesifik Perusahaan',
    modalDescription: 'Perkuat branding bisnis rental, hotel, atau wedding organizer Anda dengan bordir logo komputer berdensitas tinggi. Tidak mudah pudar, tidak rontok, dan terpasang simetris pada bagian punggung sarung kursi maupun cover meja.',
    bulletPoints: [
      'Bordir komputer multi-head dengan benang poly anti luntur',
      'Sablon karet elastis khusus kain stretch',
      'Layanan penyesuaian ukuran untuk meja dan bentangan tenda non-standar',
      'Katalog kode warna baku untuk konsistensi antar batch produksi',
    ],
    ctaLink: '/custom-order',
    ctaText: 'Konsultasikan Custom Order',
  },
];

export function EditorialDeepDive() {
  const [selectedCard, setSelectedCard] = useState<EditorialCard | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-white py-14 md:py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Kenali produk lebih dalam.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6E6E73] mt-1.5 sm:mt-2">
              Kualitas material, standar jahitan, dan keunggulan teknis dari lantai produksi kami.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border border-[#E5E5E7] transition-all shadow-xs ${
                canScrollLeft
                  ? 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-gray-200 hover:scale-105'
                  : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
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
                  ? 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-gray-200 hover:scale-105'
                  : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              }`}
              aria-label="Geser ke kanan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel of Tall Editorial Cards - 2 CARDS PER ROW ON MOBILE, PROPORTIONALLY COMPACT */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {EDITORIAL_CARDS.map((card) => {
            const isDark = card.theme === 'dark';
            return (
              <div
                key={card.id}
                className={`relative w-[calc(50vw-22px)] sm:w-[360px] md:w-[390px] h-[270px] sm:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 snap-start flex flex-col justify-between p-3.5 sm:p-8 border shadow-xs transition-transform duration-300 ${
                  isDark
                    ? 'bg-[#1D1D1F] text-white border-neutral-800'
                    : 'bg-[#F5F5F7] text-[#1D1D1F] border-[#E5E5E7]'
                }`}
              >
                {/* Background Image with Scrim */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.headline}
                    fill
                    className="object-cover opacity-65 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-black/95 via-black/60 to-black/30'
                        : 'bg-gradient-to-t from-white/95 via-white/70 to-white/30'
                    }`}
                  />
                </div>

                {/* Card Top Header */}
                <div className="relative z-10 space-y-1 sm:space-y-2">
                  <span
                    className={`text-[9px] sm:text-xs font-semibold tracking-wider uppercase block truncate ${
                      isDark ? 'text-[#39C1D9]' : 'text-[#12629F]'
                    }`}
                  >
                    {card.category}
                  </span>
                  <h3 className="text-xs sm:text-2xl font-bold tracking-tight leading-tight line-clamp-3 sm:line-clamp-none">
                    {card.headline}
                  </h3>
                </div>

                {/* Card Bottom Floating Action Button `+` */}
                <div className="relative z-10 flex items-center justify-between pt-2 sm:pt-4">
                  <span
                    className={`text-[9px] sm:text-xs font-medium hidden sm:inline ${
                      isDark ? 'text-gray-300' : 'text-[#6E6E73]'
                    }`}
                  >
                    Pelajari rincian
                  </span>

                  <button
                    onClick={() => setSelectedCard(card)}
                    className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 ml-auto sm:ml-0 ${
                      isDark
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-[#12629F] text-white hover:bg-[#0E4F81] border border-[#39C1D9]/30'
                    }`}
                    aria-label={`Buka detail ${card.category}`}
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Interactive Apple-Style Slider Controls Bar */}
        <div className="mt-6 flex items-center justify-between sm:justify-center gap-4">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-[#E5E5E7] transition-all sm:hidden ${
              canScrollLeft
                ? 'bg-[#F5F5F7] text-[#1D1D1F] shadow-xs active:scale-95'
                : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Geser ke kiri"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

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
              Geser untuk eksplorasi
            </span>
          </div>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-[#E5E5E7] transition-all sm:hidden ${
              canScrollRight
                ? 'bg-[#F5F5F7] text-[#1D1D1F] shadow-xs active:scale-95'
                : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
            }`}
            aria-label="Geser ke kanan"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal for Card Detail */}
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E5E7] relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-gray-100 transition-colors"
                aria-label="Tutup detail"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-semibold text-[#12629F] tracking-wider uppercase">
                {selectedCard.category}
              </span>

              <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mt-1 mb-3">
                {selectedCard.modalTitle}
              </h3>

              <p className="text-sm text-[#6E6E73] leading-relaxed mb-6">
                {selectedCard.modalDescription}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider">
                  Spesifikasi & Keunggulan Pabrik:
                </h4>
                {selectedCard.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1D1F] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#39C1D9] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E5E5E7]">
                <Link
                  href={selectedCard.ctaLink}
                  onClick={() => setSelectedCard(null)}
                  className="w-full sm:flex-1 py-3 px-5 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full text-center transition-colors flex items-center justify-center gap-2 border border-[#39C1D9]/30"
                >
                  <span>{selectedCard.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="w-full sm:w-auto py-3 px-5 text-[#6E6E73] hover:text-[#1D1D1F] text-xs font-medium rounded-full text-center hover:bg-gray-100 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

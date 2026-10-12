import React from 'react';
import Link from 'next/link';
import { Scissors, ShieldCheck, Sparkles, Wrench, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export function ManufacturingCapabilities() {
  const steps = [
    {
      icon: Scissors,
      title: '1. Pemotongan Pola Presisi',
      desc: 'Pola dipotong secara presisi mengikuti lekukan kursi banquet Futura, kursi lipat Chitose, dan kursi plastik Napolly 101/102/209 agar sarung tidak kendur.',
    },
    {
      icon: ShieldCheck,
      title: '2. Penjahitan & Saku Kaki Kanvas',
      desc: 'Obras ganda di setiap sambungan kain dengan perkuatan bahan kanvas/karet pada kantong kaki sarung kursi untuk menahan tarikan kuat di lokasi acara.',
    },
    {
      icon: Sparkles,
      title: '3. Bordir Komputer Multi-Head',
      desc: 'Aplikasi logo identitas hotel, wedding organizer, atau persewaan tenda menggunakan benang polyester khusus yang tahan cuci laundry industri berkali-kali.',
    },
    {
      icon: Wrench,
      title: '4. Fabrikasi Rangka Kaki Meja',
      desc: 'Pengelasan hollow besi 3x3 cm untuk Meja IBM dan silang lipat Meja Bulat dengan sistem pengunci mekanis dan adjustable floor leveler.',
    },
    {
      icon: Layers,
      title: '5. Roll Bending Pipa Galvanis',
      desc: 'Pipa besi galvanis anti karat diproses dengan mesin roll bending untuk membentuk lengkung kubah tenda terob tanpa penipisan pipa yang membahayakan.',
    },
    {
      icon: CheckCircle2,
      title: '6. Quality Check & Packing Ekspedisi',
      desc: 'Setiap produk diperiksa kelurusan jahitan, kerapian lipatan rempel, dan dikemas rapi untuk pengiriman aman ke seluruh kota di Indonesia.',
    },
  ];

  return (
    <section className="w-full bg-[#F5F5F7] py-16 md:py-24 border-b border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#12629F] block mb-2">
            Standar Mutu Manufaktur
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Dirancang untuk Kebutuhan Produk yang Spesifik.
          </h2>
          <p className="text-sm md:text-base text-[#6E6E73] mt-3 leading-relaxed">
            Mulai dari pilihan bahan dan model hingga ukuran serta aplikasi logo, konsultasikan kebutuhan produk Anda berdasarkan spesifikasi produksi yang tersedia.
          </p>
        </div>

        {/* 6 Grid Steps / Capabilities - 2 COLUMNS ON MOBILE */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-[#E5E5E7] shadow-xs flex flex-col justify-between hover:shadow-sm transition-all duration-300 group"
              >
                <div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#F5F5F7] text-[#12629F] flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-[#12629F] group-hover:text-white transition-colors">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-[#1D1D1F] tracking-tight mb-1 sm:mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#6E6E73] leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-white rounded-3xl p-8 border border-[#E5E5E7] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="text-lg font-bold text-[#1D1D1F]">
              Ingin Mengetahui Proses Produksi Lebih Dalam?
            </h4>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
              Pelajari alur kerja konveksi tekstil event dan fabrikasi rangka pipa kami di halaman Manufaktur.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/manufaktur"
              className="px-5 py-2.5 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-2 shadow-xs border border-[#39C1D9]/30"
            >
              <span>Pelajari Manufaktur</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
            </Link>
            <Link
              href="/custom-order"
              className="px-5 py-2.5 text-xs font-medium text-[#1D1D1F] hover:text-[#12629F] rounded-full hover:bg-gray-100 transition-colors"
            >
              Konsultasikan Order
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

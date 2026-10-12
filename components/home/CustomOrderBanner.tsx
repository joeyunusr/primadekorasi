import React from 'react';
import Link from 'next/link';
import { Palette, Maximize, Scissors, Sparkles, Paintbrush, FileText, ArrowRight } from 'lucide-react';

export function CustomOrderBanner() {
  const customOptions = [
    { icon: Maximize, label: 'Custom Size', desc: 'Dimensi meja banquet & bentangan tenda non-standar.' },
    { icon: Palette, label: 'Custom Warna', desc: 'Pilihan kode warna resmi katalog kain (Maroon, Gold, dsb.).' },
    { icon: Scissors, label: 'Custom Model', desc: 'Pilihan model jahitan, rempel, street, dan kombinasi poni.' },
    { icon: Sparkles, label: 'Bordir Komputer Logo', desc: 'Aplikasi logo usaha tahan deterjen laundry industri.' },
    { icon: Paintbrush, label: 'Sablon Logo Karet', desc: 'Sablon elastis khusus bahan stretch Lotto & Scuba.' },
    { icon: FileText, label: 'Konsultasi Material', desc: 'Rekomendasi teknis jenis kain sesuai konsep acara.' },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Banner Container */}
        <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 md:p-16 border border-[#E5E5E7] shadow-xs">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#12629F] block mb-2">
              Layanan Produksi Spesifik
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Spesifikasi Produk Menyesuaikan Kebutuhan Anda.
            </h2>
            <p className="text-sm sm:text-base text-[#6E6E73] mt-3 leading-relaxed">
              Ajukan kebutuhan ukuran khusus, pilihan bahan, kombinasi warna, model, atau aplikasi logo untuk produk yang tersedia dalam layanan custom order kami.
            </p>
          </div>

          {/* 6 Custom Pills/Boxes - 2 columns on mobile, proportionally compact */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mb-10">
            {customOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-[#E5E5E7] flex flex-col justify-between hover:border-[#12629F] transition-colors shadow-2xs"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F5F5F7] text-[#12629F] flex items-center justify-center mb-2 sm:mb-3">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#1D1D1F] mb-0.5 sm:mb-1">{opt.label}</h4>
                    <p className="text-[9px] sm:text-[11px] text-[#6E6E73] leading-snug line-clamp-2">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E5E5E7]">
            <span className="text-xs text-[#6E6E73]">
              *Setiap permintaan custom dievaluasi kelayakan teknis pola dan ketersediaan bahan sebelum produksi.
            </span>

            <Link
              href="/custom-order"
              className="w-full sm:w-auto px-6 py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#39C1D9]/30"
            >
              <span>Ajukan Custom Order Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

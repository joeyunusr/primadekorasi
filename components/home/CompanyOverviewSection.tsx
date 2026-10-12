import React from 'react';
import Link from 'next/link';
import { Building2, Factory, Truck, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '@/lib/data/company';

export function CompanyOverviewSection() {
  return (
    <section className="w-full bg-[#F5F5F7] py-16 md:py-24 border-b border-[#E5E5E7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#12629F]">
              Profil Perusahaan
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] leading-tight">
              Partner Manufaktur untuk Kebutuhan Event dan Hospitality.
            </h2>

            <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
              {COMPANY_CONFIG.legalName} bergerak di bidang manufaktur konveksi dan penyediaan perlengkapan event serta perhotelan. Kategori produk mencakup tekstil dekorasi, furnitur event, dan rangka tenda untuk mendukung kebutuhan pengusaha persewaan, vendor, gedung pertemuan, serta pelaku industri hospitality di seluruh Indonesia.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 pt-2">
              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E5E5E7]">
                <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-[#12629F] mb-1.5 sm:mb-2" />
                <h4 className="text-[11px] sm:text-xs font-bold text-[#1D1D1F]">Manufaktur Konveksi</h4>
                <p className="text-[9px] sm:text-[11px] text-[#6E6E73] mt-0.5 sm:mt-1 line-clamp-2">Pemotongan, penjahitan, dan bordir komputer tekstil event.</p>
              </div>

              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E5E5E7]">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#12629F] mb-1.5 sm:mb-2" />
                <h4 className="text-[11px] sm:text-xs font-bold text-[#1D1D1F]">Supplier Grosir B2B</h4>
                <p className="text-[9px] sm:text-[11px] text-[#6E6E73] mt-0.5 sm:mt-1 line-clamp-2">Pengadaan satuan hingga partai besar untuk vendor & hotel.</p>
              </div>

              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E5E5E7] col-span-2 sm:col-span-1">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#12629F] mb-1.5 sm:mb-2" />
                <h4 className="text-[11px] sm:text-xs font-bold text-[#1D1D1F]">Fabrikasi Terpadu</h4>
                <p className="text-[9px] sm:text-[11px] text-[#6E6E73] mt-0.5 sm:mt-1 line-clamp-2">Meja event, meja IBM, dan rangka pipa besi galvanis.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/tentang-kami"
                className="px-6 py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-2 shadow-xs border border-[#39C1D9]/30"
              >
                <span>Kenali Perusahaan Kami</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
              </Link>

              <Link
                href="/kontak"
                className="text-xs font-semibold text-[#12629F] hover:underline"
              >
                Hubungi Kami →
              </Link>
            </div>
          </div>

          {/* Right Column Brand Focus Card (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#E5E5E7] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-4">
              Komitmen Kualitas B2B
            </h3>

            <div className="space-y-4 text-xs text-[#6E6E73] leading-relaxed">
              <div className="space-y-1">
                <span className="font-semibold text-[#1D1D1F] block text-sm">Bukan Jasa Dekorasi Lapangan</span>
                <p>
                  Kami fokus memproduksi dan mensuplai produk fisik, sehingga tidak menjadi kompetitor bagi wedding organizer atau vendor tenda Anda, melainkan mitra produksi terpercaya di balik layar.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#1D1D1F] block text-sm">Konsistensi Kode Warna Resmi</span>
                <p>
                  Katalog nomor warna kain resmi menjamin pesanan tambahan di masa mendatang memiliki warna senada dengan armada sarung kursi yang sudah Anda miliki.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#1D1D1F] block text-sm">Pengiriman Antar Pulau</span>
                <p>
                  Bekerja sama dengan ekspedisi kargo darat, laut, dan udara terpercaya untuk memastikan tarif logistik efisien dan aman sampai tujuan.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E5E7]">
              <span className="text-[11px] text-[#12629F] font-medium">
                Pusat Manufaktur Tekstil Dekorasi & Furnitur Event
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

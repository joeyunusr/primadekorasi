import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Factory, Building2, Truck, ShieldCheck, ArrowRight, Layers, Palette, Wrench } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_CONFIG } from '@/lib/data/company';

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Tentang Perusahaan</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-2">
              Profil Perusahaan
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] max-w-3xl leading-[1.15]">
              Manufaktur Konveksi dan Supplier Perlengkapan Event.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-4 max-w-2xl leading-relaxed">
              {COMPANY_CONFIG.legalName} menyediakan kebutuhan tekstil dekorasi, furnitur event, dan perlengkapan tenda untuk mendukung usaha persewaan, vendor, gedung pertemuan, serta industri hospitality.
            </p>
          </div>
        </div>

        {/* Profil & Positioning */}
        <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 border-b border-[#E5E5E7]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block">
                Fokus & Positioning Bisnis
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Mitra Suplai di Balik Kesuksesan Ratusan Vendor Event
              </h2>
              <div className="text-xs sm:text-sm text-[#6E6E73] space-y-4 leading-relaxed">
                <p>
                  PT Prima Dekorasi Group berposisi secara tegas sebagai manufaktur konveksi (garmen) dan supplier perlengkapan dekorasi event, hospitality, dan persewaan tenda. Kami memproduksi dan menyediakan produk fisik dalam volume satuan hingga partai besar.
                </p>
                <p>
                  Kami bukan agensi dekorasi lapangan yang memasang pelaminan di lokasi resepsi. Dengan posisi ini, kami menjadi mitra terpercaya bagi para pemilik persewaan tenda, wedding organizer, banquet manager, dan pengusaha katering tanpa konflik kepentingan.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#12629F] text-white text-xs font-semibold rounded-full hover:bg-[#0E4F81] transition-colors shadow-xs border border-[#39C1D9]/30"
                >
                  <span>Lihat Katalog Produk B2B</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-gray-100 border border-[#E5E5E7] shadow-xs">
              <Image
                src="/images/hero_prima_event.jpg"
                alt="Produksi Tekstil dan Furnitur Event PT Prima Dekorasi Group"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </section>

        {/* 3 Pilar Bisnis Perusahaan */}
        <section className="py-16 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 border-b border-[#E5E5E7]">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-1">
              Struktur Kompetensi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Tiga Pilar Utama Bisnis Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-2">
              Kombinasi kapasitas garmen, rantai pasok grosir, dan fabrikasi logam ringan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
            <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] border border-[#E5E5E7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white text-[#12629F] flex items-center justify-center mb-3 sm:mb-6 shadow-2xs">
                  <Factory className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-[#1D1D1F] mb-1.5 sm:mb-3 leading-tight">
                  Pilar 1: Manufaktur Konveksi
                </h3>
                <p className="text-[10px] sm:text-xs text-[#6E6E73] leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Memproduksi produk tekstil melalui proses pemotongan kain presisi, penjahitan obras ganda, lipatan plisket, dan bordir komputer sesuai pola kursi dan meja standar industri.
                </p>
              </div>
              <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-[#E5E5E7] text-[9px] sm:text-xs font-semibold text-[#12629F] truncate">
                Sarung Kursi, Taplak Meja, Plafon Tenda
              </div>
            </div>

            <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] border border-[#E5E5E7] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white text-[#12629F] flex items-center justify-center mb-3 sm:mb-6 shadow-2xs">
                  <Building2 className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-[#1D1D1F] mb-1.5 sm:mb-3 leading-tight">
                  Pilar 2: Supplier Grosir B2B
                </h3>
                <p className="text-[10px] sm:text-xs text-[#6E6E73] leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Menyediakan perlengkapan untuk pengusaha persewaan tenda, wedding organizer, hotel, gedung pertemuan, katering, serta distributor dan reseller di seluruh Indonesia.
                </p>
              </div>
              <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-[#E5E5E7] text-[9px] sm:text-xs font-semibold text-[#12629F] truncate">
                Skalabilitas Partai Besar & Satuan
              </div>
            </div>

            <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F7] border border-[#E5E5E7] flex flex-col justify-between col-span-2 md:col-span-1">
              <div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white text-[#12629F] flex items-center justify-center mb-3 sm:mb-6 shadow-2xs">
                  <Wrench className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-[#1D1D1F] mb-1.5 sm:mb-3 leading-tight">
                  Pilar 3: Furnitur & Fabrikasi
                </h3>
                <p className="text-[10px] sm:text-xs text-[#6E6E73] leading-relaxed">
                  Menyediakan meja event bulat, meja IBM seminar kaki lipat hollow 3x3 cm, serta fabrikasi rangka tenda datar dan lengkung pipa besi galvanis sistem knockdown.
                </p>
              </div>
              <div className="mt-3 sm:mt-6 pt-2 sm:pt-4 border-t border-[#E5E5E7] text-[9px] sm:text-xs font-semibold text-[#12629F]">
                Meja IBM, Round Table, Pipa Galvanis
              </div>
            </div>
          </div>
        </section>

        {/* Kemampuan & Fleksibilitas */}
        <section className="py-16 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[#12629F] rounded-3xl p-8 sm:p-12 md:p-16 text-white shadow-lg">
            <div className="max-w-2xl space-y-4 mb-10">
              <span className="text-xs uppercase tracking-wider text-[#39C1D9] font-bold block">
                Kemampuan & Nilai Tambah
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Temukan Produk untuk Kebutuhan Bisnis Anda.
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                Kami siap menjadi rekanan suplai jangka panjang bisnis Anda dengan standar mutu terjaga, toleransi jahitan rapi, dan kemudahan konsultasi kustomisasi.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#39C1D9]/30">
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">42+ Produk & Varian</span>
                <span className="text-xs text-[#39C1D9]">Katalog terlengkap B2B</span>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Kode Warna Resmi</span>
                <span className="text-xs text-[#39C1D9]">Konsistensi tiap batch</span>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Custom Bordir Logo</span>
                <span className="text-xs text-[#39C1D9]">Branding hotel & rental</span>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Kirim Seluruh Nusantara</span>
                <span className="text-xs text-[#39C1D9]">Kargo darat & laut terpercaya</span>
              </div>
            </div>

            <div className="pt-10 flex flex-wrap gap-4">
              <Link
                href="/produk"
                className="px-6 py-3 bg-white text-[#12629F] hover:bg-gray-100 text-xs font-bold rounded-full transition-colors shadow-xs"
              >
                Jelajahi Katalog
              </Link>
              <Link
                href="/minta-penawaran"
                className="px-6 py-3 bg-[#0E4F81] hover:bg-[#0A3D66] text-white text-xs font-bold rounded-full transition-colors border border-[#39C1D9]/40"
              >
                Minta Penawaran Harga
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

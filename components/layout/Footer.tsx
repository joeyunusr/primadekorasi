import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_CONFIG } from '@/lib/data/company';

export function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5E7] text-[10px] sm:text-xs text-[#6E6E73] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-16">
        {/* Footnote Disclaimers (Apple-Style Concise Notes) */}
        <div className="border-b border-[#E5E5E7] pb-4 sm:pb-8 mb-6 sm:mb-10 space-y-1.5 sm:space-y-2 leading-relaxed text-[9.5px] sm:text-[11.5px] text-[#86868B]">
          <p>
            1. Warna kain yang ditampilkan pada layar monitor atau ponsel dapat memiliki deviasi warna halus dibandingkan fisik kain aktual akibat perbedaan kalibrasi layar. Selalu konfirmasikan nomor kode katalog resmi (seperti Maroon No. 31, Gold No. 18, dsb.) dengan tim kami sebelum proses produksi partai besar.
          </p>
          <p>
            2. PT Prima Dekorasi Group berposisi secara tegas sebagai manufaktur konveksi, supplier grosir, dan fabrikasi perlengkapan event/hospitality B2B. Perusahaan menyediakan produk fisik bagi pengusaha persewaan tenda, wedding organizer, hotel, dan katering, serta tidak menyediakan jasa pemasangan pelaminan di lokasi acara.
          </p>
          <p>
            3. Informasi spesifikasi teknis pipa besi galvanis, multiplek/blockboard, dan jenis kain mengikuti standar pabrikasi resmi kami dan dapat disesuaikan pada layanan Custom Order sesuai nota kesepakatan produksi.
          </p>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-12">
          {/* Col 1: Profil & Identitas */}
          <div className="space-y-2 sm:space-y-3 col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block py-0.5" aria-label="Prima Dekorasi">
              <Image
                src="https://files.catbox.moe/xwb6h6.png"
                alt="Prima Dekorasi"
                width={1044}
                height={318}
                className="h-7 sm:h-9 w-auto max-w-[140px] sm:max-w-[180px] object-contain block"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-[10px] sm:text-xs leading-relaxed text-[#6E6E73]">
              Pusat manufaktur konveksi tekstil event, produksi sarung kursi banquet, taplak meja katering, kain tenda, dan fabrikasi rangka pipa galvanis untuk seluruh Indonesia.
            </p>
            <div className="pt-1 text-[10px] sm:text-xs text-[#1D1D1F] space-y-0.5">
              <p className="font-semibold text-[#6E6E73]">Konsultasi Resmi:</p>
              <p className="text-[#12629F] font-semibold">{COMPANY_CONFIG.whatsappDisplay}</p>
              <p className="text-[#6E6E73]">{COMPANY_CONFIG.email}</p>
            </div>
          </div>

          {/* Col 2: Kategori Produk */}
          <div className="space-y-1.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-[#1D1D1F] tracking-wide uppercase">
              Katalog Produk
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
              <li>
                <Link href="/kategori/furnitur-event" className="hover:text-[#12629F] transition-colors">
                  Furnitur Event & Meja IBM
                </Link>
              </li>
              <li>
                <Link href="/kategori/sarung-kursi" className="hover:text-[#12629F] transition-colors">
                  Sarung Kursi Futura & Plastik
                </Link>
              </li>
              <li>
                <Link href="/kategori/taplak-sarung-meja" className="hover:text-[#12629F] transition-colors">
                  Taplak Meja Prasmanan & Bulat
                </Link>
              </li>
              <li>
                <Link href="/kategori/kain-dekorasi-tenda" className="hover:text-[#12629F] transition-colors">
                  Kain Dekorasi & Plafon Tenda
                </Link>
              </li>
              <li>
                <Link href="/kategori/rangka-tenda" className="hover:text-[#12629F] transition-colors">
                  Rangka Tenda & Fabrikasi
                </Link>
              </li>
              <li>
                <Link href="/material-kain" className="hover:text-[#12629F] transition-colors">
                  Edukasi Material Kain & Swatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan & Profil */}
          <div className="space-y-1.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-[#1D1D1F] tracking-wide uppercase">
              Perusahaan & Layanan
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
              <li>
                <Link href="/tentang-kami" className="hover:text-[#12629F] transition-colors">
                  Tentang Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/manufaktur" className="hover:text-[#12629F] transition-colors">
                  Standar Manufaktur & Jahitan
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="hover:text-[#12629F] transition-colors">
                  Custom Order Bordir & Ukuran
                </Link>
              </li>
              <li>
                <Link href="/portofolio" className="hover:text-[#12629F] transition-colors">
                  Portofolio & Detail Produk
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#12629F] transition-colors">
                  Hubungi Pabrik & Workshop
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: B2B Support & Ketentuan */}
          <div className="space-y-1.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-[#1D1D1F] tracking-wide uppercase">
              B2B & Pemesanan
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
              <li>
                <Link href="/minta-penawaran" className="hover:text-[#12629F] transition-colors">
                  Minta Penawaran Resmi (RFQ)
                </Link>
              </li>
              <li>
                <Link href="/keranjang" className="hover:text-[#12629F] transition-colors">
                  Keranjang & Rincian Pesanan
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="hover:text-[#12629F] transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="hover:text-[#12629F] transition-colors">
                  Syarat dan Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#12629F] hover:text-[#39C1D9] hover:underline transition-colors font-medium">
                  Portal Admin B2B
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-[#E5E5E7] pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[9.5px] sm:text-[11px] text-[#86868B]">
          <div className="text-center sm:text-left">
            Hak cipta © {new Date().getFullYear()} {COMPANY_CONFIG.legalName}. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/kebijakan-privasi" className="hover:underline">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:underline">
              Ketentuan Penggunaan
            </Link>
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

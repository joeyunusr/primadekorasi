import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Scissors, 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Layers, 
  PackageCheck, 
  ArrowRight,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ManufakturPage() {
  const steps = [
    {
      number: '01',
      title: 'Pemotongan Kain & Pola Presisi (Precision Cutting)',
      desc: 'Proses pemotongan bahan tekstil menggunakan cetakan pola baku yang telah disesuaikan secara milimetris dengan jenis kursi (Futura FTR-405, Chitose lipat, Napolly 101/102/209) serta diameter meja round table. Memastikan pemanfaatan bahan efisien dan keseragaman antar ribuan potong.',
      icon: Scissors,
      highlights: ['Pola lekukan sandaran akurat', 'Toleransi jahitan terukur', 'Serat kain searah untuk elastisitas optimal'],
    },
    {
      number: '02',
      title: 'Penjahitan & Penguatan Saku Kaki (Heavy-Duty Stitching)',
      desc: 'Penjahitan menggunakan mesin obras berkecepatan tinggi dengan benang polyester kuat. Pada model ketat street, kantong penahan kaki kursi diperkuat dengan lapisan kain ganda atau bahan kanvas tebal agar tidak mudah robek saat diregangkan berulang kali.',
      icon: ShieldCheck,
      highlights: ['Obras benang ganda anti rontok', 'Saku kaki kanvas/karet bertulang', 'Plisket box pleat teratur dan simetris'],
    },
    {
      number: '03',
      title: 'Aplikasi Bordir Komputer & Sablon Logo',
      desc: 'Untuk kebutuhan branding identitas usaha hotel, wedding organizer, dan persewaan tenda, logo diaplikasikan menggunakan mesin bordir komputer multi-head. Benang poly tahan terhadap deterjen cucian industri tanpa luntur atau menciut.',
      icon: Sparkles,
      highlights: ['Bordir komputer resolusi benang tinggi', 'Sablon karet elastis tahan renggang', 'Penempatan presisi simetris'],
    },
    {
      number: '04',
      title: 'Fabrikasi Meja & Rangka Kaki Lipat Hollow',
      desc: 'Produksi Meja IBM dan Meja Bulat menggabungkan daun meja multiplek/blockboard tebal dengan rangka besi hollow 3x3 cm. Setiap titik pengelasan dirapikan sebelum proses pelapisan cat anti-karat, dilengkapi mekanisme engsel pengunci dan floor leveler.',
      icon: Wrench,
      highlights: ['Multiplek tebal tahan beban katering', 'Kaki hollow 3x3 cm lipat rata', 'Adjustable floor adjuster di alas kaki'],
    },
    {
      number: '05',
      title: 'Fabrikasi Rangka Pipa Galvanis Tenda Pesta',
      desc: 'Pembuatan rangka tenda datar standar dan rangka tenda lengkung terob pesta menggunakan pipa besi galvanis. Mesin roll bending pipa memastikan kelengkungan atap kubah simetris tanpa lekukan patah atau penipisan pipa yang berbahaya.',
      icon: Layers,
      highlights: ['Pipa galvanis tahan cuaca luar ruang', 'Roll bending pipa tanpa penyok', 'Sistem knockdown soket baut pengunci aman'],
    },
    {
      number: '06',
      title: 'Inspeksi Kualitas & Pengemasan Kargo (QC & Dispatch)',
      desc: 'Setiap batch produk diperiksa kelurusan jahitan, kerapian lipatan plisket, kebersihan sisa benang, dan kelengkapan baut. Produk dilipat dan dikemas dalam karung atau kardus berlapis untuk perlindungan maksimal selama ekspedisi.',
      icon: PackageCheck,
      highlights: ['Pemeriksaan manual tiap unit', 'Pengemasan kargo aman ekspedisi darat/laut', 'Labeling spesifikasi produk per karung'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Kemampuan Manufaktur</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-2">
              Lantai Produksi & Kualitas
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] max-w-3xl leading-[1.15]">
              Standar Manufaktur & Alur Produksi Terpadu.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-4 max-w-2xl leading-relaxed">
              Memadukan keahlian penjahit konveksi berpengalaman, mesin bordir komputer modern, dan teknik fabrikasi pipa besi galvanis untuk menghasilkan perlengkapan event berkualitas tinggi.
            </p>
          </div>
        </div>

        {/* Alur Proses Produksi */}
        <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 border-b border-[#E5E5E7]">
          <div className="max-w-2xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Tahapan Produksi Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-2">
              Setiap produk melewati serangkaian tahapan terkontrol demi menjaga kualitas dan kepuasan pelanggan B2B.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.number}
                  className="p-8 sm:p-10 rounded-3xl bg-[#FAFAFA] border border-[#E5E5E7] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-1 text-3xl font-extrabold text-[#12629F] font-mono">
                    {st.number}
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#12629F] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F]">
                        {st.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-[#E5E5E7] space-y-2">
                    <span className="text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">
                      Fokus Kualitas:
                    </span>
                    {st.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#1D1D1F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39C1D9] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA B2B Production Consultation */}
        <section className="py-16 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 border border-[#E5E5E7] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-bold text-[#1D1D1F]">
                Siap Memulai Produksi Inventaris Anda?
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Diskusikan kuantitas unit, model jahitan, pilihan bahan, dan jadwal pengiriman bersama tim produksi kami.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/custom-order"
                className="px-6 py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-2 shadow-xs border border-[#39C1D9]/30"
              >
                <span>Ajukan Custom Order</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
              </Link>
              <Link
                href="/minta-penawaran"
                className="px-6 py-3 bg-white text-[#1D1D1F] text-xs font-semibold rounded-full border border-[#E5E5E7] hover:bg-gray-100 transition-colors"
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

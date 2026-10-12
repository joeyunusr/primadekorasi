'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

export default function KontakPage() {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Konsultasi Produk Tekstil Event');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const lines = [
      `*PESAN / PERTANYAAN DARI FORMULIR KONTAK WEBSITE*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `*Data Pengirim:*`,
      `• Nama Lengkap: ${name}`,
      `• Usaha / Hotel: ${business || '-'}`,
      `• Nomor WhatsApp: ${phone}`,
      `• Topik: ${subject}`,
      ``,
      `*Isi Pesan / Kebutuhan:*`,
      message,
      ``,
      `Mohon tim PT Prima Dekorasi Group dapat merespons pertanyaan ini. Terima kasih.`,
    ].join('\n');

    const url = buildWhatsAppUrl(lines);
    window.open(url, '_blank');
    setSentSuccess(true);
  };

  const handleWhatsAppChat = () => {
    const text = [
      `Halo PT Prima Dekorasi Group, saya ingin berkonsultasi mengenai kebutuhan perlengkapan event/hospitality.`,
      name ? `Nama: ${name}` : null,
      business ? `Usaha/Hotel: ${business}` : null,
      subject ? `Topik: ${subject}` : null,
      message ? `Pesan: ${message}` : null,
    ].filter(Boolean).join('\n');

    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#123B32]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Kontak & Lokasi</span>
            </nav>

            <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider block mb-1">
              Hubungi Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Konsultasi Langsung dengan Tim Pabrik.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              Diskusikan kebutuhan pengadaan sarung kursi, taplak meja katering, kain tenda, atau meja event dengan tim penjualan dan teknisi pola kami.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details Left (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7] space-y-6">
                <h2 className="text-lg font-bold text-[#1D1D1F]">
                  Informasi Kontak Resmi
                </h2>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#123B32] flex items-center justify-center shrink-0 border border-[#E5E5E7]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#6E6E73] block">WhatsApp Resmi Penjualan:</span>
                      <a
                        href={buildWhatsAppUrl('Halo PT Prima Dekorasi Group')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-sm text-[#123B32] hover:underline"
                      >
                        {COMPANY_CONFIG.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#123B32] flex items-center justify-center shrink-0 border border-[#E5E5E7]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#6E6E73] block">Email Resmi:</span>
                      <a
                        href={`mailto:${COMPANY_CONFIG.email}`}
                        className="font-bold text-sm text-[#1D1D1F] hover:underline"
                      >
                        {COMPANY_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#123B32] flex items-center justify-center shrink-0 border border-[#E5E5E7]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#6E6E73] block">Jam Kerja & Operasional:</span>
                      <span className="font-semibold text-[#1D1D1F]">
                        {COMPANY_CONFIG.operationalHours}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#123B32] flex items-center justify-center shrink-0 border border-[#E5E5E7]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#6E6E73] block">Fasilitas Manufaktur & Workshop:</span>
                      <span className="font-semibold text-[#1D1D1F] leading-relaxed block">
                        {COMPANY_CONFIG.officeAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppChat}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Mulai Chat WhatsApp Sekarang</span>
                  </button>
                </div>
              </div>

              {/* B2B Trust Box */}
              <div className="p-6 rounded-3xl bg-[#123B32] text-white space-y-2">
                <span className="text-xs uppercase font-bold text-emerald-300">
                  Konsultasi Pengadaan B2B
                </span>
                <h3 className="text-lg font-bold">
                  Kunjungan Workshop & Permintaan Sampel
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Bagi vendor yang ingin meninjau sampel jahitan fisik atau melakukan uji pasang di kursi sampel, silakan membuat janji temu terlebih dahulu melalui WhatsApp kami.
                </p>
              </div>
            </div>

            {/* Message Form Right (col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E5E7] shadow-xs">
              <h2 className="text-lg font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-3 mb-6">
                Kirim Pesan / Pertanyaan
              </h2>

              {sentSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1D1D1F]">Pesan Siap Terkirim ke WhatsApp!</h3>
                    <p className="text-xs sm:text-sm text-[#6E6E73] max-w-md mx-auto leading-relaxed mt-1">
                      Pesan Anda telah diformat otomatis. Jika aplikasi WhatsApp tidak terbuka secara otomatis, klik tombol hijau di bawah untuk melanjutkan chat dengan sales kami.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const lines = [
                          `*PESAN / PERTANYAAN DARI FORMULIR KONTAK WEBSITE*`,
                          `*${COMPANY_CONFIG.legalName}*`,
                          ``,
                          `*Data Pengirim:*`,
                          `• Nama Lengkap: ${name}`,
                          `• Usaha / Hotel: ${business || '-'}`,
                          `• Nomor WhatsApp: ${phone}`,
                          `• Topik: ${subject}`,
                          ``,
                          `*Isi Pesan / Kebutuhan:*`,
                          message,
                        ].join('\n');
                        window.open(buildWhatsAppUrl(lines), '_blank');
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Buka Chat WhatsApp Resmi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSentSuccess(false);
                        setMessage('');
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-xs font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                    >
                      Tulis Pesan Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama Anda"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                        Nama Usaha / Hotel (Opsional)
                      </label>
                      <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="Nama instansi/rental"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08123456789"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                        Topik Pertanyaan
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#12629F]"
                      >
                        <option value="Konsultasi Produk Tekstil Event">Konsultasi Sarung Kursi & Taplak Meja</option>
                        <option value="Pengadaan Meja IBM & Bulat">Pengadaan Furnitur Meja Event</option>
                        <option value="Fabrikasi Rangka Tenda Pipa">Fabrikasi Rangka Tenda Pipa Galvanis</option>
                        <option value="Layanan Custom Bordir Logo">Custom Order & Bordir Logo</option>
                        <option value="Kemitraan Reseller / Distributor">Kemitraan Grosir & Reseller</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      Pesan atau Kebutuhan Anda *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Jelaskan kebutuhan pengadaan, jumlah kursi/meja yang ingin dibungkus, atau pertanyaan teknis lainnya..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim Pesan ke WhatsApp Resmi</span>
                    </button>
                    <p className="text-[11px] text-center text-[#6E6E73]">
                      *Pesan akan diformat otomatis dan diteruskan langsung ke WhatsApp tim sales resmi PT Prima Dekorasi Group.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

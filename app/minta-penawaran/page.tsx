'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ChevronRight, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

function MintaPenawaranContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('produk') || '';
  const initialQty = searchParams.get('qty') || '50';

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Sarung Kursi');
  const [selectedProduct, setSelectedProduct] = useState(initialProduct || 'Sarung Kursi Futura Model Ketat (Street)');
  const [variant, setVariant] = useState('');
  const [quantity, setQuantity] = useState(initialQty);
  const [material, setMaterial] = useState('Polyester Lotto Premium');
  const [dimensions, setDimensions] = useState('Standar Kursi Futura');
  const [colorCode, setColorCode] = useState('Merah Ati Maroon No. 31');
  const [model, setModel] = useState('Model Ketat Street');
  const [logoRequirement, setLogoRequirement] = useState<'Tanpa Logo' | 'Bordir Logo' | 'Sablon Logo'>('Tanpa Logo');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [needDate, setNeedDate] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedRfqId, setSubmittedRfqId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRfqId(id);

    // Save to local storage for admin inquiry viewing
    try {
      const existing = JSON.parse(localStorage.getItem('prima_inquiries_v1') || '[]');
      existing.unshift({
        id,
        type: 'RFQ_PENAWARAN',
        createdAt: new Date().toISOString(),
        fullName,
        businessName,
        whatsapp,
        email,
        category,
        productName: selectedProduct,
        variant,
        quantity,
        material,
        dimensions,
        colorCode,
        model,
        logoRequirement,
        shippingCity,
        shippingAddress,
        needDate,
        notes,
        status: 'Baru',
      });
      localStorage.setItem('prima_inquiries_v1', JSON.stringify(existing));
    } catch {
      // ignore
    }
  };

  const handleDispatchWhatsApp = () => {
    const lines = [
      `*PERMINTAAN PENAWARAN HARGA RESMI (RFQ)*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `*Data Perusahaan/Pemohon:*`,
      `• Nama: ${fullName}`,
      `• Nama Usaha/Instansi: ${businessName || '-'}`,
      `• WhatsApp: ${whatsapp}`,
      `• Email: ${email || '-'}`,
      `• Tujuan Pengiriman: ${shippingCity || '-'}`,
      needDate ? `• Estimasi Tanggal Kebutuhan: ${needDate}` : null,
      ``,
      `*Spesifikasi Permintaan Produk:*`,
      `• Kategori: ${category}`,
      `• Produk: ${selectedProduct}`,
      variant ? `• Varian: ${variant}` : null,
      `• Kuantitas: ${quantity} unit`,
      `• Material Kain: ${material}`,
      `• Ukuran/Dimensi: ${dimensions}`,
      `• Pilihan Warna: ${colorCode}`,
      `• Model Jahitan: ${model}`,
      `• Aplikasi Logo: ${logoRequirement}`,
      notes ? `• Catatan Khusus: ${notes}` : null,
      ``,
      `Mohon diterbitkan rincian penawaran harga resmi (Quotation) dan jadwal estimasi produksinya. Terima kasih.`,
    ].filter(Boolean).join('\n');

    const url = buildWhatsAppUrl(lines);
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
              <span className="text-[#1D1D1F] font-semibold">Minta Penawaran B2B (RFQ)</span>
            </nav>

            <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider block mb-1">
              Request For Quotation (RFQ)
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Permintaan Penawaran Harga Resmi B2B.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              Lengkapi rincian kebutuhan sarung kursi, meja event, taplak prasmanan, atau tenda Anda untuk memperoleh dokumen penawaran harga pabrik resmi dari PT Prima Dekorasi Group.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Left (col-span-8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E5E7] shadow-xs">
              {submittedRfqId ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F]">
                    Permintaan Penawaran Terkirim!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] max-w-md mx-auto leading-relaxed">
                    Kode Referensi Penawaran Anda: <span className="font-mono font-bold text-[#123B32]">{submittedRfqId}</span>. Tim administrasi penjualan B2B kami akan menyiapkan kalkulasi penawaran resmi dan menghubungi Anda via WhatsApp.
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleDispatchWhatsApp}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirimkan Rincian ke WhatsApp Penjualan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedRfqId(null)}
                      className="px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Ajukan RFQ Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Data Pemohon */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      1. Data Perusahaan & Pemohon
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nama Lengkap Pemohon *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Nama penanggung jawab pengadaan"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nama Perusahaan / Rental / Hotel *
                        </label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Nama badan usaha / instansi"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nomor WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="08123456789"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Email Resmi (Opsional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="procurement@hotel.com"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Spesifikasi Permintaan */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      2. Spesifikasi Produk yang Diminta
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Kategori Produk *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#123B32]"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Pilihan Produk Acuan *
                        </label>
                        <select
                          value={selectedProduct}
                          onChange={(e) => setSelectedProduct(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#123B32]"
                        >
                          {PRODUCTS.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Varian / Tipe Spesifik
                        </label>
                        <input
                          type="text"
                          value={variant}
                          onChange={(e) => setVariant(e.target.value)}
                          placeholder="Contoh: D160 cm / Kaki Hollow 3x3 / Model 1/2 body"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Kuantitas Unit yang Diajukan *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Contoh: 100"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Pilihan Bahan Material
                        </label>
                        <select
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#123B32]"
                        >
                          <option value="Polyester Lotto Premium">Polyester Lotto Premium</option>
                          <option value="Scuba Premium">Scuba Premium</option>
                          <option value="Abutay Felamin Mengkilap">Abutay Felamin Mengkilap</option>
                          <option value="Kain Satin Silk">Kain Satin Silk</option>
                          <option value="Blackout Premium">Blackout Premium</option>
                          <option value="Multiplek + Rangka Besi">Multiplek Tebal + Besi Hollow</option>
                          <option value="Pipa Besi Galvanis">Pipa Besi Galvanis</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Ukuran / Dimensi
                        </label>
                        <input
                          type="text"
                          value={dimensions}
                          onChange={(e) => setDimensions(e.target.value)}
                          placeholder="Standar atau ukuran kustom"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Pilihan Warna / Kode Warna
                        </label>
                        <input
                          type="text"
                          value={colorCode}
                          onChange={(e) => setColorCode(e.target.value)}
                          placeholder="Contoh: Merah Ati Maroon No. 31, Gold No. 18"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Kebutuhan Aplikasi Logo
                        </label>
                        <select
                          value={logoRequirement}
                          onChange={(e) => setLogoRequirement(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#123B32]"
                        >
                          <option value="Tanpa Logo">Tanpa Logo</option>
                          <option value="Bordir Logo">Sertakan Bordir Komputer Logo</option>
                          <option value="Sablon Logo">Sertakan Sablon Karet Elastis Logo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pengiriman & Catatan */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      3. Logistik & Jadwal Kebutuhan
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Kota / Wilayah Pengiriman *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="Contoh: Surabaya / Denpasar / Makassar"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Estimasi Tanggal Kebutuhan (Opsional)
                        </label>
                        <input
                          type="date"
                          value={needDate}
                          onChange={(e) => setNeedDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Catatan Tambahan untuk Tim Penjualan
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tuliskan jika memerlukan sampel kain terlebih dahulu, spesifikasi khusus, atau jadwal termin pembayaran."
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 border-t border-[#E5E5E7] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 px-6 bg-[#123B32] hover:bg-[#176B4D] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Formulir Permintaan Penawaran</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDispatchWhatsApp}
                      className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim Langsung via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Right (col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7] space-y-4">
                <div className="flex items-center gap-2 text-[#123B32]">
                  <FileText className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-[#1D1D1F]">
                    Proses Penerbitan Penawaran Resmi
                  </h3>
                </div>

                <ol className="space-y-3 text-xs text-[#6E6E73] leading-relaxed list-decimal pl-4">
                  <li>
                    Spesifikasi yang Anda kirimkan ditinjau oleh staf kalkulasi pola dan bahan.
                  </li>
                  <li>
                    Penawaran harga resmi (Quotation) diterbitkan mencakup harga satuan, estimasi waktu produksi, dan opsi ekspedisi kargo.
                  </li>
                  <li>
                    Penawaran dikirimkan dalam format PDF resmi dan pesan konfirmasi WhatsApp.
                  </li>
                </ol>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E5E5E7] space-y-3">
                <div className="flex items-center gap-2 text-[#176B4D]">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold">Waktu Respons</span>
                </div>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  Permintaan penawaran harga diproses pada jam kerja: {COMPANY_CONFIG.operationalHours}.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function MintaPenawaranPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#123B32] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#86868B]">Memuat Formulir Penawaran...</p>
          </div>
        </div>
      }
    >
      <MintaPenawaranContent />
    </Suspense>
  );
}

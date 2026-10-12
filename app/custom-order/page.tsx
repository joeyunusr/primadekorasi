'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  MessageSquare, 
  Palette, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Scissors, 
  Maximize, 
  FileText,
  Paintbrush
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES, PRODUCTS } from '@/lib/data/products';
import { FABRIC_COLORS, FabricColor } from '@/lib/data/colors';
import { ColorCatalogModal } from '@/components/colors/ColorCatalogModal';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';
import { supabase } from '@/lib/supabase';

export default function CustomOrderPage() {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]?.name || 'Sarung Kursi');
  const [productName, setProductName] = useState('');
  const [customTypes, setCustomTypes] = useState<string[]>(['Custom Warna']);
  const [dimensions, setDimensions] = useState('');
  const [material, setMaterial] = useState('Polyester Lotto');
  const [colorCode, setColorCode] = useState('Maroon No. 31');
  const [model, setModel] = useState('');
  const [embroidery, setEmbroidery] = useState(false);
  const [screenPrinting, setScreenPrinting] = useState(false);
  const [quantity, setQuantity] = useState('50');
  const [notes, setNotes] = useState('');

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const toggleCustomType = (type: string) => {
    setCustomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSelectColor = (c: FabricColor) => {
    setColorCode(`${c.name} (${c.code})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CUST-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(id);

    // Save to local storage for admin inquiry viewing
    try {
      const existing = JSON.parse(localStorage.getItem('prima_inquiries_v1') || '[]');
      existing.unshift({
        id,
        type: 'CUSTOM_ORDER',
        createdAt: new Date().toISOString(),
        fullName,
        businessName,
        whatsapp,
        email,
        category,
        productName: productName || category,
        customTypes,
        dimensions,
        material,
        colorCode,
        model,
        embroidery,
        screenPrinting,
        quantity,
        notes,
        status: 'Baru',
      });
      localStorage.setItem('prima_inquiries_v1', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Direct insert to Supabase inquiries table
    try {
      void supabase.from('inquiries').insert({
        id,
        full_name: fullName,
        business_name: businessName || null,
        whatsapp,
        email: email || null,
        category,
        product_name: productName || category,
        custom_types: customTypes,
        dimensions: dimensions || null,
        material,
        color_code: colorCode,
        embroidery,
        screen_printing: screenPrinting,
        quantity,
        notes: notes || null,
        status: 'Baru',
      });
    } catch {
      // ignore
    }
  };

  const handleDispatchWhatsApp = () => {
    const lines = [
      `*FORMULIR PENGAJUAN CUSTOM ORDER B2B*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `*Data Pemesan:*`,
      `• Nama: ${fullName}`,
      `• Usaha: ${businessName || '-'}`,
      `• WhatsApp: ${whatsapp}`,
      `• Email: ${email || '-'}`,
      ``,
      `*Spesifikasi Produk Custom:*`,
      `• Kategori: ${category}`,
      productName ? `• Nama Produk Acuan: ${productName}` : null,
      `• Jenis Kustomisasi: ${customTypes.join(', ')}`,
      dimensions ? `• Ukuran / Dimensi: ${dimensions}` : null,
      `• Pilihan Material: ${material}`,
      `• Pilihan Warna: ${colorCode}`,
      model ? `• Model Jahitan: ${model}` : null,
      `• Bordir Logo: ${embroidery ? 'Ya, diperlukan bordir' : 'Tidak'}`,
      `• Sablon Logo: ${screenPrinting ? 'Ya, diperlukan sablon' : 'Tidak'}`,
      `• Estimasi Kuantitas: ${quantity} unit`,
      notes ? `• Catatan / Keterangan: ${notes}` : null,
      ``,
      `Mohon tim teknis PT Prima Dekorasi Group meninjau spesifikasi ini dan memberikan estimasi penawaran harga. Terima kasih.`,
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
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Custom Order</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-1">
              Layanan Produksi Spesifik
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              Spesifikasi Produk Menyesuaikan Kebutuhan Anda.
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              Kirimkan kebutuhan model, ukuran, warna, material, dan aplikasi logo agar tim kami dapat meninjau spesifikasi produk yang Anda inginkan.
            </p>
          </div>
        </div>

        {/* Content & Form */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Left (col-span-8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E5E7] shadow-xs">
              {submittedId ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-sky-100 text-[#12629F] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F]">
                    Pengajuan Custom Order Diterima!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] max-w-md mx-auto leading-relaxed">
                    Nomor referensi pengajuan Anda: <span className="font-mono font-bold text-[#12629F]">{submittedId}</span>. Tim kami akan meninjau kelayakan pola dan menghubungi Anda melalui WhatsApp.
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleDispatchWhatsApp}
                      className="px-6 py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#39C1D9]" />
                      <span>Kirimkan Langsung ke WhatsApp Resmi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedId(null)}
                      className="px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Ajukan Custom Order Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Bagian 1: Data Pemesan */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      1. Data Pemesan / Instansi
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Nama penanggung jawab"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nama Usaha / Rental / Hotel (Opsional)
                        </label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Contoh: Berkah Tenda / Hotel Grand Surya"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
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
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Email (Opsional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@perusahaan.com"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bagian 2: Jenis Custom yang Dibutuhkan */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      2. Jenis Kustomisasi yang Dibutuhkan
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Custom Size', desc: 'Ukuran dimensi khusus non-standar' },
                        { label: 'Custom Warna', desc: 'Pilihan nomor kode warna resmi' },
                        { label: 'Custom Model', desc: 'Model lipatan atau rempel khusus' },
                        { label: 'Custom Bordir Logo', desc: 'Aplikasi logo komputer pada kain' },
                        { label: 'Custom Sablon Logo', desc: 'Sablon karet elastis tahan cuci' },
                        { label: 'Konsultasi Material', desc: 'Eksplorasi kombinasi jenis bahan' },
                      ].map((item) => {
                        const isChecked = customTypes.includes(item.label);
                        return (
                          <div
                            key={item.label}
                            onClick={() => toggleCustomType(item.label)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                              isChecked
                                ? 'border-[#12629F] bg-sky-50 text-[#12629F]'
                                : 'border-[#E5E5E7] hover:bg-gray-50 text-[#1D1D1F]'
                            }`}
                          >
                            <span className="text-xs font-bold block">{item.label}</span>
                            <span className="text-[10px] text-[#6E6E73] block mt-0.5">{item.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bagian 3: Spesifikasi Produk */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2">
                      3. Spesifikasi Rinci Produk
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Kategori Produk *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#12629F]"
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
                          Nama Produk Acuan
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="Contoh: Sarung Kursi Futura / Cover Meja IBM"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Ukuran / Dimensi Khusus
                        </label>
                        <input
                          type="text"
                          value={dimensions}
                          onChange={(e) => setDimensions(e.target.value)}
                          placeholder="Contoh: D175 cm x T75 cm, atau Bentang Tenda 5x7m"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Pilihan Material
                        </label>
                        <select
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] bg-white focus:outline-none focus:border-[#12629F]"
                        >
                          <option value="Polyester Lotto">Polyester Lotto (Tebal & Melar)</option>
                          <option value="Scuba Premium">Scuba Premium (Matte & Padat)</option>
                          <option value="Abutay Felamin">Abutay Felamin (Jatuh & Mengkilap)</option>
                          <option value="Kain Satin Silk">Kain Satin Silk (Kilau Tinggi)</option>
                          <option value="Blackout Premium">Blackout Premium (Kedap Cahaya)</option>
                          <option value="Multiplek / Blockboard + Besi">Multiplek Tebal + Rangka Besi (Meja)</option>
                          <option value="Pipa Besi Galvanis">Pipa Besi Galvanis (Rangka Tenda)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-[#1D1D1F]">
                            Pilihan Warna / Kode Warna Katalog
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsColorModalOpen(true)}
                            className="text-xs text-[#12629F] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Palette className="w-3.5 h-3.5 text-[#39C1D9]" />
                            <span>Pilih dari Swatch Warna</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={colorCode}
                          onChange={(e) => setColorCode(e.target.value)}
                          placeholder="Contoh: Merah Ati Maroon No. 31, Gold No. 18, dsb."
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Model Jahitan / Varian
                        </label>
                        <input
                          type="text"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="Contoh: Rempel plisket box pleat, street ketat"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Estimasi Kuantitas (Unit) *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="Contoh: 100"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                        />
                      </div>
                    </div>

                    {/* Logo Checkboxes */}
                    <div className="pt-2 flex flex-wrap gap-6 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={embroidery}
                          onChange={(e) => setEmbroidery(e.target.checked)}
                          className="w-4 h-4 rounded text-[#12629F] focus:ring-[#12629F]"
                        />
                        <span className="font-medium text-[#1D1D1F]">
                          Sertakan Bordir Logo Komputer
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={screenPrinting}
                          onChange={(e) => setScreenPrinting(e.target.checked)}
                          className="w-4 h-4 rounded text-[#12629F] focus:ring-[#12629F]"
                        />
                        <span className="font-medium text-[#1D1D1F]">
                          Sertakan Sablon Logo Elastis
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                        Catatan Spesifikasi Tambahan
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Jelaskan detail khusus seperti penempatan logo, tanggal estimasi penggunaan, tujuan pengiriman kargo, dsb."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-[#E5E5E7] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 px-6 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4 text-[#39C1D9]" />
                      <span>Kirimkan Spesifikasi Custom Order</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDispatchWhatsApp}
                      className="w-full sm:w-auto py-3.5 px-6 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#39C1D9]" />
                      <span>Kirim Langsung via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Right Info (col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7] space-y-4">
                <h3 className="text-base font-bold text-[#1D1D1F]">
                  Ketentuan Layanan Custom
                </h3>
                <ul className="space-y-3 text-xs text-[#6E6E73] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#12629F] shrink-0 mt-0.5" />
                    <span>
                      Permintaan custom akan dikonfirmasi terlebih dahulu berdasarkan kelayakan teknis pola dan ketersediaan stok bahan baku.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#12629F] shrink-0 mt-0.5" />
                    <span>
                      Untuk custom bordir/sablon logo, mohon siapkan file logo beresolusi tinggi (format vector PDF, AI, atau CDR / PNG transparan).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#12629F] shrink-0 mt-0.5" />
                    <span>
                      Sampel prototipe dapat dibuat sebelum proses produksi massal partai besar sesuai kesepakatan penawaran.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-[#12629F] text-white space-y-2">
                <span className="text-xs uppercase font-bold text-[#39C1D9]">
                  Konsultasi Langsung
                </span>
                <h4 className="text-lg font-bold">
                  Butuh Bimbingan Teknis Ukuran?
                </h4>
                <p className="text-xs text-sky-100 leading-relaxed">
                  Tim teknis pola kami siap membantu Anda mengukur kursi atau meja sampel.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-white block">
                    {COMPANY_CONFIG.whatsappDisplay}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <ColorCatalogModal
        isOpen={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
        onSelectColor={handleSelectColor}
        selectedColorCode={colorCode}
      />

      <Footer />
    </div>
  );
}

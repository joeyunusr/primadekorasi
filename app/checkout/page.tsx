'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ShoppingBag, 
  ShieldCheck,
  Building2,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/lib/context/cart-context';
import { COMPANY_CONFIG } from '@/lib/data/company';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const {
    items,
    totalItems,
    subtotalFixed,
    hasQuotationItems,
    clearCart,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);

    // Persist to local storage for instant offline / local viewing
    try {
      const existing = JSON.parse(localStorage.getItem('prima_orders_v1') || '[]');
      existing.unshift({
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: {
          fullName,
          businessName,
          whatsapp,
          email,
          shippingCity,
          shippingAddress,
        },
        items: [...items],
        totalItems,
        subtotalFixed,
        hasQuotationItems,
        notes,
        status: 'Menunggu Konfirmasi Pabrik',
      });
      localStorage.setItem('prima_orders_v1', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Insert directly into Supabase orders table
    try {
      void supabase.from('orders').insert({
        id: orderId,
        customer_name: fullName,
        business_name: businessName || null,
        whatsapp,
        email: email || null,
        shipping_city: shippingCity,
        shipping_address: shippingAddress || null,
        items,
        total_items: totalItems,
        subtotal_fixed: subtotalFixed,
        has_quotation_items: hasQuotationItems,
        notes: notes || null,
        status: 'Menunggu Konfirmasi Pabrik',
      });
    } catch {
      // ignore
    }

    clearCart();
  };

  const customerData = {
    fullName,
    businessName,
    whatsapp,
    email,
    shippingCity,
    shippingAddress,
    notes,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-10 md:py-14">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-3">
              <Link href="/" className="hover:text-[#123B32]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/keranjang" className="hover:text-[#123B32]">
                Keranjang
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Formulir Pemesanan & RFQ</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Penyelesaian Pesanan B2B
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
          {confirmedOrderId ? (
            <div className="max-w-xl mx-auto py-12 px-6 rounded-3xl bg-[#FAFAFA] border border-[#E5E5E7] text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider block mb-1">
                  Pesanan Berhasil Disimpan
                </span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">
                  Order ID: {confirmedOrderId}
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6E73] mt-2 leading-relaxed">
                  Rincian pesanan dan permohonan penawaran Anda telah tersimpan di sistem administrasi PT Prima Dekorasi Group. Teruskan rincian ini ke staf penjualan resmi kami melalui WhatsApp untuk mempercepat proses pembuatan faktur/quotation.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppOrderUrl(customerData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Rincian via WhatsApp Resmi</span>
                </a>

                <Link
                  href="/produk"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#1D1D1F] border border-[#E5E5E7] text-xs font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  Kembali ke Katalog
                </Link>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-[#123B32]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h2 className="text-xl font-bold text-[#1D1D1F]">Tidak Ada Item untuk Dipesan</h2>
              <p className="text-xs text-[#6E6E73]">
                Keranjang Anda masih kosong. Silakan tambahkan produk sebelum melanjutkan ke formulir pemesanan.
              </p>
              <div className="pt-2">
                <Link
                  href="/produk"
                  className="px-6 py-2.5 bg-[#123B32] text-white text-xs font-semibold rounded-full hover:bg-[#176B4D] transition-colors"
                >
                  Jelajahi Produk
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Customer Form Left (col-span-7) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E5E7] shadow-xs">
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-2 mb-4">
                      Informasi Pemesan & Pengiriman
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Nama Lengkap Pemohon *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Nama penanggung jawab"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                            Nama Usaha / Rental / Hotel (Opsional)
                          </label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Contoh: Berkah Tenda"
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
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                            Kota / Kabupaten Tujuan *
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingCity}
                            onChange={(e) => setShippingCity(e.target.value)}
                            placeholder="Contoh: Kota Semarang"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
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
                            placeholder="email@usaha.com"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Alamat Pengiriman Lengkap *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Alamat kantor / gudang persewaan tenda"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                          Catatan Khusus Pesanan
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Contoh: Pilihan ekspedisi kargo langganan, kebutuhan faktur pajak, dsb."
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#123B32]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E5E7]">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#123B32] hover:bg-[#176B4D] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirimkan Rincian Pesanan ke Pabrik</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary Right (col-span-5) */}
              <div className="lg:col-span-5 bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7] space-y-6">
                <h3 className="text-lg font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-3">
                  Rincian Item yang Dipesan ({totalItems} Unit)
                </h3>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="p-3 rounded-xl bg-white border border-[#E5E5E7] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#1D1D1F]">
                        <span className="truncate max-w-[200px]">{it.name}</span>
                        <span className="tabular-nums">{it.quantity} unit</span>
                      </div>
                      {it.variantName && (
                        <p className="text-[#6E6E73] text-[11px]">Varian: {it.variantName}</p>
                      )}
                      {it.color && (
                        <p className="text-[#6E6E73] text-[11px]">Warna: {it.color}</p>
                      )}
                      {it.customDimensions && (
                        <p className="text-[#6E6E73] text-[11px]">Ukuran: {it.customDimensions}</p>
                      )}
                      <div className="text-[#123B32] font-semibold text-[11px] pt-1">
                        {it.price !== null && it.priceType === 'fixed'
                          ? `Rp ${(it.price * it.quantity).toLocaleString('id-ID')}`
                          : 'Harga melalui penawaran resmi'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E5E5E7] pt-4 space-y-2 text-xs">
                  {subtotalFixed > 0 && (
                    <div className="flex justify-between text-[#1D1D1F]">
                      <span className="text-[#6E6E73]">Subtotal Produk Berharga Pasti:</span>
                      <span className="font-bold tabular-nums">
                        Rp {subtotalFixed.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}

                  {hasQuotationItems && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      Item penawaran akan dikalkulasikan oleh bagian penjualan sesuai volume dan spesifikasi kain pesanan.
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E5E5E7] space-y-2 text-[11px] text-[#6E6E73]">
                  <div className="flex items-center gap-2 text-[#123B32] font-semibold text-xs">
                    <Truck className="w-4 h-4" />
                    <span>Ekspedisi & Logistik</span>
                  </div>
                  <p>
                    Ongkos kirim kargo dihitung berdasarkan volume packing dan kota tujuan setelah pesanan dikonfirmasi oleh staf kami.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

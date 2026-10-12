'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/lib/context/cart-context';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

export default function KeranjangPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    hasQuotationItems,
    subtotalFixed,
  } = useCart();

  const handleQuickWhatsApp = () => {
    const lines = [
      `*PERMINTAAN PENAWARAN & PESANAN DARI KERANJANG WEBSITE*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `Halo tim PT Prima Dekorasi Group, berikut daftar item yang ingin saya pesan:`,
      ``,
    ];

    items.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.name}*`);
      if (item.variantName) lines.push(`   - Varian: ${item.variantName}`);
      if (item.color) lines.push(`   - Warna: ${item.color}`);
      if (item.customDimensions) lines.push(`   - Ukuran: ${item.customDimensions}`);
      if (item.customNotes) lines.push(`   - Catatan: ${item.customNotes}`);
      lines.push(`   - Kuantitas: ${item.quantity} unit`);
      if (item.price !== null && item.priceType === 'fixed') {
        lines.push(`   - Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`);
      } else {
        lines.push(`   - Estimasi: Harga melalui penawaran resmi`);
      }
      lines.push(``);
    });

    lines.push(`Mohon dikonfirmasikan ketersediaan stok/jadwal produksi dan total penawarannya. Terima kasih.`);

    const url = buildWhatsAppUrl(lines.join('\n'));
    window.open(url, '_blank');
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
              <span className="text-[#1D1D1F] font-semibold">Keranjang Belanja & Penawaran</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Keranjang & Permintaan Penawaran ({totalItems} Item)
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
          {items.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mx-auto text-[#123B32]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h2 className="text-xl font-bold text-[#1D1D1F]">Keranjang Anda Kosong</h2>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Anda belum menambahkan produk ke keranjang. Jelajahi katalog sarung kursi, meja event, taplak prasmanan, dan tenda kami.
              </p>
              <div className="pt-4">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#123B32] text-white text-xs font-semibold rounded-full hover:bg-[#176B4D] transition-colors shadow-xs"
                >
                  <span>Jelajahi Katalog Produk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Items List Left (col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E7]">
                  <span className="text-xs font-semibold text-[#1D1D1F]">
                    Daftar Produk ({items.length} macam produk)
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Kosongkan Keranjang
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-[#E5E5E7] bg-white shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-[#E5E5E7] shrink-0">
                        <Image
                          src={item.image || '/images/hero_prima_event.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <span className="text-[10px] font-semibold text-[#176B4D] uppercase tracking-wider block">
                          {item.categoryName}
                        </span>
                        <h3 className="text-sm font-bold text-[#1D1D1F] truncate">
                          {item.name}
                        </h3>
                        {item.variantName && (
                          <p className="text-xs text-[#6E6E73]">
                            Varian: <span className="text-[#1D1D1F] font-medium">{item.variantName}</span>
                          </p>
                        )}
                        {item.color && (
                          <p className="text-xs text-[#6E6E73]">
                            Warna: <span className="text-[#1D1D1F] font-medium">{item.color}</span>
                          </p>
                        )}
                        {item.customDimensions && (
                          <p className="text-xs text-[#6E6E73]">
                            Ukuran: <span className="text-[#1D1D1F] font-medium">{item.customDimensions}</span>
                          </p>
                        )}
                        {item.customNotes && (
                          <p className="text-xs text-[#6E6E73]">
                            Catatan: <span className="text-[#1D1D1F]">{item.customNotes}</span>
                          </p>
                        )}

                        <div className="text-xs font-semibold text-[#123B32] pt-1">
                          {item.price !== null && item.priceType === 'fixed'
                            ? `Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
                            : 'Harga Melalui Penawaran'}
                        </div>
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                      <div className="flex items-center border border-[#E5E5E7] rounded-full bg-white px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-full text-[#6E6E73]"
                          aria-label="Kurangi kuantitas"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-[#1D1D1F] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-full text-[#6E6E73]"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <Link
                    href="/produk"
                    className="text-xs font-semibold text-[#123B32] hover:underline"
                  >
                    ← Tambah Produk Lain dari Katalog
                  </Link>
                </div>
              </div>

              {/* Order Summary Right (col-span-4) */}
              <div className="lg:col-span-4 bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7] space-y-6">
                <h3 className="text-lg font-bold text-[#1D1D1F] border-b border-[#E5E5E7] pb-3">
                  Ringkasan Pesanan & Penawaran
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#6E6E73]">
                    <span>Total Unit:</span>
                    <span className="font-semibold text-[#1D1D1F] tabular-nums">{totalItems} unit</span>
                  </div>

                  {subtotalFixed > 0 && (
                    <div className="flex justify-between text-[#1D1D1F]">
                      <span className="text-[#6E6E73]">Subtotal Produk Berharga:</span>
                      <span className="font-bold tabular-nums">
                        Rp {subtotalFixed.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}

                  {hasQuotationItems && (
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Penawaran Pabrik Diperlukan</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Item dalam keranjang Anda membutuhkan kalkulasi penawaran resmi dari tim penjualan berdasarkan kuantitas & spesifikasi.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-[#E5E5E7]">
                  <Link
                    href="/checkout"
                    className="w-full py-3.5 px-6 bg-[#123B32] hover:bg-[#176B4D] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Lanjut ke Formulir Checkout / RFQ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleQuickWhatsApp}
                    className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Kirim Keranjang via WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-[#6E6E73] space-y-1">
                  <p>• Tidak ada pembayaran online langsung di halaman ini.</p>
                  <p>• Transaksi B2B diproses melalui faktur resmi dan konfirmasi tim penjualan.</p>
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

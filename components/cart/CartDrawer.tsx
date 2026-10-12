'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    hasQuotationItems,
    subtotalFixed,
  } = useCart();

  if (!isCartOpen) return null;

  const handleQuickWhatsApp = () => {
    const lines: string[] = [
      `*KONSULTASI & PENAWARAN PRODUK*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `Halo tim PT Prima Dekorasi Group, saya tertarik dengan item berikut dari katalog website:`,
      ``,
    ];

    items.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.name}*`);
      if (item.variantName) lines.push(`   - Varian: ${item.variantName}`);
      if (item.color) lines.push(`   - Warna: ${item.color}`);
      if (item.customDimensions) lines.push(`   - Ukuran: ${item.customDimensions}`);
      if (item.customNotes) lines.push(`   - Catatan: ${item.customNotes}`);
      lines.push(`   - Kuantitas: ${item.quantity} unit`);
      lines.push(``);
    });

    lines.push(`Mohon informasi penawaran harga B2B dan estimasi produksinya. Terima kasih.`);

    const url = buildWhatsAppUrl(lines.join('\n'));
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartOpen(false)} 
        aria-hidden="true" 
      />

      <aside 
        aria-label="Keranjang & Permintaan Penawaran"
        className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10"
      >
        <div className="w-screen max-w-md bg-white border-l border-[#E5E5E7] shadow-2xl flex flex-col rounded-t-[32px] sm:rounded-none sm:rounded-l-[32px] overflow-hidden">
          {/* iOS Grabber Handle */}
          <div className="pt-3 pb-1 flex justify-center sm:hidden">
            <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 sm:py-5 border-b border-[#E5E5E7] bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#12629F]/10 flex items-center justify-center text-[#12629F]">
                <ShoppingBag className="w-4 h-4 text-[#12629F]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#12629F] uppercase tracking-wider block">
                  iOS Cart Drawer
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] leading-tight">
                  Keranjang & Penawaran ({totalItems})
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-neutral-200 transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>


          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-[#6E6E73]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#12629F]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-base font-semibold text-[#1D1D1F]">Keranjang Anda Kosong</p>
                <p className="text-sm mt-1 text-[#6E6E73] max-w-xs mx-auto">
                  Pilih produk furnitur event, sarung kursi, atau tekstil tenda dari katalog manufaktur kami.
                </p>
                <Link
                  href="/produk"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#12629F] text-white text-sm font-medium rounded-full hover:bg-[#0E4F81] transition-colors border border-[#39C1D9]/30"
                >
                  <span>Jelajahi Katalog Produk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#39C1D9]" />
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E5E5E7] bg-[#FAFAFA] flex gap-3 relative group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-200">
                    <Image
                      src={item.image || '/images/hero_prima_event.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#12629F] font-semibold">{item.categoryName}</div>
                    <h3 className="text-sm font-semibold text-[#1D1D1F] truncate">{item.name}</h3>
                    
                    {item.variantName && (
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Tipe: <span className="text-[#1D1D1F] font-medium">{item.variantName}</span>
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

                    <div className="mt-2 text-xs font-semibold text-[#12629F]">
                      {item.price !== null && item.priceType === 'fixed'
                        ? `Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
                        : 'Harga Melalui Penawaran'}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#E5E5E7] rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-[#6E6E73] transition-colors"
                          aria-label="Kurangi kuantitas"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#1D1D1F] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-[#6E6E73] transition-colors"
                          aria-label="Tambah kuantitas"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-600 hover:text-red-700 p-1 flex items-center gap-1 transition-colors"
                        aria-label="Hapus item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5E5E7] bg-[#FAFAFA] space-y-4">
              <div className="space-y-1.5 text-sm">
                {subtotalFixed > 0 && (
                  <div className="flex justify-between text-[#1D1D1F]">
                    <span className="text-[#6E6E73]">Subtotal Produk Berharga:</span>
                    <span className="font-semibold tabular-nums">
                      Rp {subtotalFixed.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                {hasQuotationItems && (
                  <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    Sebagian atau seluruh item membutuhkan penawaran harga resmi (Quotation) dari produsen sesuai kuantitas & spesifikasi.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#12629F] text-white rounded-xl font-medium text-sm hover:bg-[#0E4F81] transition-colors shadow-sm border border-[#39C1D9]/30"
                >
                  <span>Lanjut ke Formulir Checkout / RFQ</span>
                  <ArrowRight className="w-4 h-4 text-[#39C1D9]" />
                </Link>

                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#12629F] text-white rounded-xl font-medium text-sm hover:bg-[#0E4F81] transition-colors shadow-sm border border-[#39C1D9]/30"
                >
                  <MessageSquare className="w-4 h-4 text-[#39C1D9]" />
                  <span>Kirim Rincian via WhatsApp Resmi</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#6E6E73]">
                PT Prima Dekorasi Group melayani pesanan partai B2B & pengiriman ke seluruh Indonesia.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

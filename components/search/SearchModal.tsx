'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Table, Armchair, Tent, Layers, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)) ||
        p.color_options.some((c) => c.toLowerCase().includes(q)) ||
        p.model_options.some((m) => m.toLowerCase().includes(q)) ||
        p.short_description.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5E5E7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E5E7]">
          <Search className="w-5 h-5 text-[#6E6E73] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk (contoh: Sarung Kursi Futura, Meja IBM, Lotto, Plafon Serut)..."
            className="w-full text-base bg-transparent text-[#1D1D1F] placeholder:text-[#6E6E73] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-gray-100 transition-colors"
            aria-label="Tutup pencarian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links or Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-medium text-[#6E6E73] uppercase tracking-wider mb-3 px-2">
                Kategori Populer
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Link
                  href="/kategori/furnitur-event"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <Table className="w-4 h-4 text-[#12629F]" />
                  <span>Meja & Furnitur</span>
                </Link>
                <Link
                  href="/kategori/sarung-kursi"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <Armchair className="w-4 h-4 text-[#12629F]" />
                  <span>Sarung Kursi</span>
                </Link>
                <Link
                  href="/kategori/kain-dekorasi-tenda"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <Tent className="w-4 h-4 text-[#12629F]" />
                  <span>Kain & Plafon Tenda</span>
                </Link>
                <Link
                  href="/kategori/rangka-tenda"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <Layers className="w-4 h-4 text-[#12629F]" />
                  <span>Rangka Tenda</span>
                </Link>
                <Link
                  href="/material-kain"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#12629F]" />
                  <span>Material Kain</span>
                </Link>
                <Link
                  href="/custom-order"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-[#39C1D9]" />
                  <span>Custom Order</span>
                </Link>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#6E6E73] px-2 mb-2">
                Ditemukan {filteredProducts.length} produk untuk &quot;{query}&quot;
              </p>
              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/produk/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <Image
                      src={p.images[0] || '/images/hero_prima_event.jpg'}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#12629F] font-medium">{p.category_name}</div>
                    <div className="text-sm font-semibold text-[#1D1D1F] truncate group-hover:text-[#12629F] transition-colors">
                      {p.name}
                    </div>
                    <div className="text-xs text-[#6E6E73] truncate">
                      {p.materials.join(', ')}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-[#12629F] font-medium block">
                      {p.price !== null ? `Rp ${p.price.toLocaleString('id-ID')}` : 'Minta Penawaran'}
                    </span>
                    <span className="text-[11px] text-[#6E6E73]">Lihat detail →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-[#6E6E73]">
              <p className="text-sm">Tidak ada produk yang cocok dengan &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-gray-400">
                Coba cari dengan kata kunci kategori seperti &quot;sarung kursi&quot;, &quot;meja&quot;, &quot;plafon&quot;, atau &quot;lotto&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#F5F5F7] border-t border-[#E5E5E7] flex items-center justify-between text-xs text-[#6E6E73]">
          <span>Tekan ESC atau klik luar untuk keluar</span>
          <Link href="/produk" onClick={onClose} className="hover:text-[#12629F] font-medium">
            Lihat semua 42 katalog →
          </Link>
        </div>
      </div>
    </div>
  );
}

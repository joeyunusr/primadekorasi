'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Calculator, 
  Palette, 
  ChevronDown, 
  X, 
  Sparkles, 
  Factory, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

interface DynamicIslandProps {
  onOpenQuickTools?: () => void;
}

export function DynamicIsland({ onOpenQuickTools }: DynamicIslandProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasNewItemAlert, setHasNewItemAlert] = useState(false);
  const prevCountRef = React.useRef(totalItems);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Flash island when item is added to cart
  useEffect(() => {
    if (totalItems > prevCountRef.current) {
      const showTimer = setTimeout(() => {
        setHasNewItemAlert(true);
      }, 0);
      const hideTimer = setTimeout(() => {
        setHasNewItemAlert(false);
      }, 3500);
      prevCountRef.current = totalItems;
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
    prevCountRef.current = totalItems;
  }, [totalItems]);

  const handleWhatsAppChat = () => {
    const url = buildWhatsAppUrl('Halo PT Prima Dekorasi Group, saya ingin konsultasi pengadaan perlengkapan event via WhatsApp.');
    window.open(url, '_blank');
  };

  return (
    <div className="fixed top-2.5 sm:top-3.5 left-0 right-0 z-50 flex justify-center pointer-events-none px-3">
      <AnimatePresence initial={false} mode="wait">
        {!isExpanded ? (
          /* COMPACT DYNAMIC ISLAND */
          <motion.div
            key="compact"
            initial={{ scale: 0.9, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            onClick={() => setIsExpanded(true)}
            className="pointer-events-auto cursor-pointer group select-none"
          >
            <div className={`ios-island flex items-center justify-between gap-3 px-3.5 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
              hasNewItemAlert 
                ? 'ring-2 ring-[#39C1D9] ring-offset-2 ring-offset-black scale-105' 
                : 'hover:scale-[1.03]'
            }`}>
              {/* Left pill status */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/90 tracking-tight flex items-center gap-1">
                  <span>Prima B2B</span>
                  <span className="hidden sm:inline text-white/40 text-[10px]">· Produksi Aktif</span>
                </span>
              </div>

              {/* Center notification / alert */}
              {hasNewItemAlert ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#12629F]/80 text-[#39C1D9] text-[10px] font-semibold animate-pulse">
                  <ShoppingBag className="w-3 h-3" />
                  <span>Item Ditambahkan!</span>
                </div>
              ) : (
                <div className="h-3 w-[1px] bg-white/20 mx-0.5" />
              )}

              {/* Right pill action */}
              <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white">
                {totalItems > 0 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCartOpen(true);
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-[10px] sm:text-[11px] font-medium text-white transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#39C1D9]" />
                    <span className="font-bold tabular-nums">{totalItems}</span>
                  </button>
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/70 flex items-center gap-1">
                    <span>Menu Cepat</span>
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:translate-y-0.5 transition-transform" />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* EXPANDED DYNAMIC ISLAND MODAL */
          <motion.div
            key="expanded"
            initial={{ scale: 0.92, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto w-full max-w-md ios-island rounded-[28px] p-4 text-white shadow-2xl border border-white/15"
          >
            {/* Expanded Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#12629F] flex items-center justify-center text-white">
                  <Factory className="w-4 h-4 text-[#39C1D9]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                    <span>PT Prima Dekorasi Group</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-semibold">
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] text-white/60">
                    Lantai Produksi Konveksi & Fabrikasi Besi Aktif
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                aria-label="Tutup Dynamic Island"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expanded Stats / Live Status */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/50 block">Estimasi Waktu Respon</span>
                <span className="text-xs font-bold text-emerald-400">± 5 - 15 Menit</span>
                <span className="text-[9px] text-white/40 block mt-0.5">Admin Penjualan WhatsApp</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/50 block">Status Keranjang / RFQ</span>
                <span className="text-xs font-bold text-[#39C1D9]">{totalItems} Item Siap Ajukan</span>
                <span className="text-[9px] text-white/40 block mt-0.5">Penawaran Resmi Pabrik</span>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Tool 1: Hitung Estimasi Event */}
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  if (onOpenQuickTools) onOpenQuickTools();
                }}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2.5 text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#12629F]/40 flex items-center justify-center text-[#39C1D9] shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#39C1D9] transition-colors leading-tight">
                    Kalkulator Event
                  </div>
                  <div className="text-[9px] text-white/50">Hitung taplak & sarung</div>
                </div>
              </button>

              {/* Tool 2: WhatsApp Chat CS */}
              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="p-2.5 rounded-2xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500/30 transition-colors flex items-center gap-2.5 text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    Chat WhatsApp
                  </div>
                  <div className="text-[9px] text-emerald-100">Konsultasi CS Pabrik</div>
                </div>
              </button>

              {/* Tool 3: Buka Keranjang */}
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setIsCartOpen(true);
                }}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2.5 text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300 shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    Keranjang & RFQ
                  </div>
                  <div className="text-[9px] text-white/50">{totalItems} item dipilih</div>
                </div>
              </button>

              {/* Tool 4: Katalog Warna Kain */}
              <Link
                href="/material-kain"
                onClick={() => setIsExpanded(false)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2.5 text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    Katalog Warna
                  </div>
                  <div className="text-[9px] text-white/50">30+ Swatch kain baku</div>
                </div>
              </Link>
            </div>

            {/* Bottom mini link */}
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Kualitas Manufaktur Standar B2B</span>
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-white/80 hover:text-white font-medium"
              >
                Sembunyikan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

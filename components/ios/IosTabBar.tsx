'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  Home, 
  ShoppingBag, 
  Calculator, 
  MessageCircle, 
  Layers
} from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { buildWhatsAppUrl } from '@/lib/data/company';

interface IosTabBarProps {
  onOpenQuickTools: () => void;
}

export function IosTabBar({ onOpenQuickTools }: IosTabBarProps) {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl('Halo PT Prima Dekorasi Group, saya ingin konsultasi produk via WhatsApp.');
    window.open(url, '_blank');
  };

  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
      action: null,
    },
    {
      label: 'Katalog',
      href: '/produk',
      icon: ShoppingBag,
      isActive: pathname.startsWith('/produk') || pathname.startsWith('/kategori'),
      action: null,
    },
    {
      label: 'Estimasi B2B',
      href: null,
      icon: Calculator,
      isActive: false,
      action: onOpenQuickTools,
      highlight: true,
    },
    {
      label: 'Keranjang',
      href: null,
      icon: Layers,
      isActive: false,
      action: () => setIsCartOpen(true),
      badge: totalItems > 0 ? (totalItems > 99 ? '99+' : totalItems) : null,
    },
    {
      label: 'Chat CS',
      href: null,
      icon: MessageCircle,
      isActive: false,
      action: handleWhatsApp,
      isWhatsApp: true,
    },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-2 sm:px-4">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        aria-label="iOS Mini Floating Navigation Dock"
        className="pointer-events-auto ios-glass rounded-full px-1.5 sm:px-3 py-1 sm:py-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.1)] flex items-center gap-0.5 sm:gap-2 max-w-fit border border-white/80"
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center justify-center px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full transition-all duration-200 ${
                    item.isActive
                      ? 'text-[#12629F] font-bold bg-[#12629F]/10'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ${item.isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span className="text-[8px] sm:text-[9.5px] mt-0.5 tracking-tight font-medium leading-none">
                    {item.label}
                  </span>

                  {item.isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#12629F]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          }

          return (
            <motion.button
              key={item.label}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={item.action || undefined}
              className={`relative flex flex-col items-center justify-center px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full transition-all duration-200 ${
                item.isWhatsApp
                  ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-500/10'
                  : item.highlight
                  ? 'text-[#12629F] hover:bg-[#12629F]/10'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
              }`}
            >
              <div className="relative">
                <Icon className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[1.8] ${item.isWhatsApp ? 'text-emerald-600' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 min-w-[13px] h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center shadow-xs tabular-nums leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[8px] sm:text-[9.5px] mt-0.5 tracking-tight font-medium leading-none">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}

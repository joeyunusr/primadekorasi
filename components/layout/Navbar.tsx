'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { SearchModal } from '@/components/search/SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { COMPANY_CONFIG } from '@/lib/data/company';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk' },
    { label: 'Manufaktur', href: '/manufaktur' },
    { label: 'Custom Order', href: '/custom-order' },
    { label: 'Portofolio', href: '/portofolio' },
    { label: 'Tentang Kami', href: '/tentang-kami' },
    { label: 'Kontak', href: '/kontak' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'ios-glass border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-white/90 backdrop-blur-xl border-[#E5E5E7]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-6 md:gap-8">
          {/* Zone 1: Official Brand Logo - DILARANG TERPOTONG & TANPA TEKS TAMBAHAN */}
          <Link
            href="/"
            className="flex items-center shrink-0 focus:outline-none py-1"
            aria-label="Prima Dekorasi"
          >
            <div className="flex items-center h-9 sm:h-11 md:h-12 w-auto">
              <Image
                src="https://files.catbox.moe/xwb6h6.png"
                alt="Prima Dekorasi"
                width={1044}
                height={318}
                priority
                className="h-8 sm:h-10 md:h-11 w-auto max-w-[170px] sm:max-w-[220px] object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium text-[#1D1D1F]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#12629F] py-1 relative ${
                    isActive ? 'text-[#12629F] font-semibold' : 'text-[#6E6E73]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#12629F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Cart, Quote CTA, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              aria-label="Cari produk"
            >
              <Search className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#1D1D1F]" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-2 rounded-full text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors relative"
              aria-label="Buka keranjang"
            >
              <ShoppingBag className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#1D1D1F]" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#12629F] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* RFQ CTA */}
            <Link
              href="/minta-penawaran"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#12629F] hover:bg-[#0E4F81] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs border border-[#39C1D9]/30"
            >
              <span>Minta Penawaran</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#39C1D9]" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              aria-label="Menu navigasi"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#1D1D1F]" />
              ) : (
                <Menu className="w-5 h-5 text-[#1D1D1F]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E5E7] bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium py-1.5 transition-colors ${
                      isActive ? 'text-[#12629F] font-semibold' : 'text-[#1D1D1F] hover:text-[#12629F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E5E5E7] space-y-3">
              <Link
                href="/minta-penawaran"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#12629F] text-white text-sm font-semibold rounded-xl hover:bg-[#0E4F81] transition-colors"
              >
                <span>Minta Penawaran B2B</span>
                <ArrowUpRight className="w-4 h-4 text-[#39C1D9]" />
              </Link>
              <div className="text-xs text-[#6E6E73] text-center">
                Pusat Bantuan & WhatsApp: <span className="text-[#1D1D1F] font-semibold">{COMPANY_CONFIG.whatsappDisplay}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

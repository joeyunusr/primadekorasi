import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryNav } from '@/components/home/CategoryNav';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ExploreLineup } from '@/components/home/ExploreLineup';
import { EditorialDeepDive } from '@/components/home/EditorialDeepDive';
import { TwoColumnHighlights } from '@/components/home/TwoColumnHighlights';
import { InteractiveAccordionCatalog } from '@/components/home/InteractiveAccordionCatalog';
import { ManufacturingCapabilities } from '@/components/home/ManufacturingCapabilities';
import { PortfolioGallery } from '@/components/home/PortfolioGallery';
import { CompanyOverviewSection } from '@/components/home/CompanyOverviewSection';
import { CustomOrderBanner } from '@/components/home/CustomOrderBanner';
import { ClosingCta } from '@/components/home/ClosingCta';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* SECTION 1: Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 2: Page Title (Apple-Style Clean Editorial Header) */}
        <section className="pt-10 pb-6 md:pt-14 md:pb-8 bg-white border-b border-[#E5E5E7]/50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-[1.15]">
                Perlengkapan Event dan Hospitality, Langsung dari Produsen.
              </h1>
              <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                Solusi tekstil dekorasi, furnitur event, dan perlengkapan tenda untuk kebutuhan bisnis persewaan, vendor, gedung pertemuan, dan industri perhotelan.
              </p>
              <div className="pt-2">
                <Link
                  href="/produk"
                  className="text-xs sm:text-sm font-semibold text-[#12629F] hover:underline inline-flex items-center gap-1 group"
                >
                  <span>Jelajahi Semua Produk</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-[#39C1D9]" aria-hidden="true">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Category Navigation */}
        <CategoryNav />

        {/* SECTION 4: Hero Carousel */}
        <HeroCarousel />

        {/* SECTION 5: Jelajahi Jajaran Produk */}
        <ExploreLineup />

        {/* SECTION 6: Kenali Produk Lebih Dalam */}
        <EditorialDeepDive />

        {/* SECTION 7: Yang Penting untuk Bisnis Event Anda */}
        <TwoColumnHighlights />

        {/* SECTION 8: Satu Mitra untuk Beragam Kebutuhan Produk (Accordion + Dynamic Display) */}
        <InteractiveAccordionCatalog />

        {/* SECTION 9: Kemampuan Manufaktur */}
        <ManufacturingCapabilities />

        {/* SECTION 10: Portofolio Produk & Detail */}
        <PortfolioGallery />

        {/* SECTION 11: Tentang Perusahaan */}
        <CompanyOverviewSection />

        {/* SECTION 12: Custom Order */}
        <CustomOrderBanner />

        {/* SECTION 13: CTA Penutup */}
        <ClosingCta />
      </main>

      {/* SECTION 14: Footer */}
      <Footer />
    </div>
  );
}

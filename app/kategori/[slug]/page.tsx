import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/data/products';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category_id === category.id);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-10 md:py-14">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-4">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/produk" className="hover:text-[#12629F]">
                Produk
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">{category.name}</span>
            </nav>

            <span className="text-xs font-semibold text-[#12629F] uppercase tracking-wider block mb-1">
              Kategori Manufaktur
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
              {category.name}
            </h1>
            <p className="text-sm md:text-base text-[#6E6E73] mt-3 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Content Listing */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E7]">
            <span className="text-xs font-medium text-[#6E6E73]">
              Tersedia <span className="text-[#1D1D1F] font-bold">{categoryProducts.length}</span> produk dalam kategori ini
            </span>

            <Link
              href="/produk"
              className="text-xs font-semibold text-[#12629F] hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3 text-[#39C1D9]" />
              <span>Kembali ke Semua Katalog</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Custom Order Callout for this Category */}
          <div className="mt-16 bg-[#F5F5F7] rounded-3xl p-8 border border-[#E5E5E7] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">
                Membutuhkan Model atau Ukuran Khusus untuk {category.name}?
              </h3>
              <p className="text-xs text-[#6E6E73] mt-1 max-w-xl">
                Kami melayani custom ukuran khusus, bordir logo instansi, serta kombinasi kain berdasarkan kebutuhan B2B Anda.
              </p>
            </div>
            <Link
              href={`/custom-order?kategori=${encodeURIComponent(category.name)}`}
              className="px-6 py-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors whitespace-nowrap shadow-xs border border-[#39C1D9]/30"
            >
              Ajukan Custom {category.short_name}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

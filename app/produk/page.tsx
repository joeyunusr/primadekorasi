'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, RotateCcw, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/catalog/ProductCard';
import { PRODUCTS, CATEGORIES, Product } from '@/lib/data/products';

export default function ProdukCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [customOnly, setCustomOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');

  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.materials.forEach((m) => set.add(m)));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      const q = searchTerm.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)) ||
        p.short_description.toLowerCase().includes(q) ||
        p.color_options.some((c) => c.toLowerCase().includes(q));

      // Category
      const matchCat = selectedCategory === 'all' || p.category_id === selectedCategory;

      // Material
      const matchMat =
        selectedMaterial === 'all' ||
        p.materials.some((m) => m.toLowerCase().includes(selectedMaterial.toLowerCase()));

      // Custom
      const matchCustom = !customOnly || p.is_customizable;

      return matchSearch && matchCat && matchMat && matchCustom;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      // featured
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedMaterial, customOnly, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setCustomOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb & Header */}
        <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] py-8 md:py-12">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-3">
              <Link href="/" className="hover:text-[#12629F]">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1D1D1F] font-semibold">Katalog Produk</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              Semua Katalog Produk Manufaktur
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-2 max-w-2xl">
              Daftar lengkap furnitur event, sarung kursi banquet, taplak meja prasmanan, plafon tenda, hingga rangka pipa galvanis langsung dari PT Prima Dekorasi Group.
            </p>
          </div>
        </div>

        {/* Catalog Control Bar */}
        <div className="border-b border-[#E5E5E7] bg-white sticky top-14 md:top-16 z-20 py-4 shadow-2xs">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="w-full md:w-96 relative">
              <Search className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, bahan (Lotto, Scuba, Meja IBM)..."
                className="w-full pl-9 pr-4 py-2 bg-[#F5F5F7] rounded-full text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E6E73] hover:text-[#1D1D1F]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter pills & sorting */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none no-scrollbar">
              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F] border border-[#E5E5E7] rounded-full px-3 py-2 focus:outline-none"
              >
                <option value="all">Semua Kategori ({PRODUCTS.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Custom only toggle */}
              <button
                type="button"
                onClick={() => setCustomOnly(!customOnly)}
                className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                  customOnly
                    ? 'bg-[#12629F] text-white border-[#12629F]'
                    : 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7] hover:text-[#1D1D1F]'
                }`}
              >
                Custom Order Only
              </button>

              {/* Sorting */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F] border border-[#E5E5E7] rounded-full px-3 py-2 focus:outline-none"
              >
                <option value="featured">Urutkan: Produk Unggulan</option>
                <option value="name-asc">Nama: A - Z</option>
                <option value="name-desc">Nama: Z - A</option>
              </select>

              {/* Reset button */}
              {(searchTerm || selectedCategory !== 'all' || customOnly || selectedMaterial !== 'all') && (
                <button
                  onClick={handleReset}
                  className="p-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full flex items-center gap-1 transition-colors shrink-0"
                  title="Reset Filter"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Result Count and Status */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E7]">
            <span className="text-xs font-medium text-[#6E6E73]">
              Menampilkan <span className="text-[#1D1D1F] font-bold">{filteredProducts.length}</span> produk
            </span>

            <Link
              href="/custom-order"
              className="text-xs font-semibold text-[#12629F] hover:underline"
            >
              Butuh spesifikasi atau ukuran khusus? Konsultasikan Custom Order →
            </Link>
          </div>

          {/* Products Grid - 2 columns on mobile, proportionally compact */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#6E6E73]">
                <Filter className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Tidak Ada Produk Ditemukan</h3>
              <p className="text-xs text-[#6E6E73] mt-1 mb-6">
                Tidak ada produk yang cocok dengan kombinasi filter atau pencarian Anda. Coba reset filter untuk melihat katalog lengkap.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#12629F] text-white text-xs font-semibold rounded-full hover:bg-[#0E4F81] transition-colors border border-[#39C1D9]/30"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

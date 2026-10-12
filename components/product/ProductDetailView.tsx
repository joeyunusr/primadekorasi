'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  MessageSquare, 
  Plus, 
  Minus, 
  ShoppingBag, 
  FileText, 
  Palette, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCart } from '@/lib/context/cart-context';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';
import { ColorCatalogModal } from '@/components/colors/ColorCatalogModal';
import { FabricColor } from '@/lib/data/colors';
import { ProductCard } from '@/components/catalog/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { addItem, setIsCartOpen } = useCart();

  // Gallery active image
  const [activeImage, setActiveImage] = useState<string>(product.images[0] || '/images/hero_prima_event.jpg');

  // Selected variant
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0] || null
  );

  // Selected color
  const [selectedColor, setSelectedColor] = useState<string>(
    product.color_options[0] || 'Sesuai Standar Katalog'
  );

  // Selected model
  const [selectedModel, setSelectedModel] = useState<string>(
    product.model_options[0] || 'Standar'
  );

  // Custom notes & dimensions
  const [customDimensions, setCustomDimensions] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Color modal
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  // Success notification
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSelectFabricColor = (color: FabricColor) => {
    setSelectedColor(`${color.name} (${color.code})`);
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      categoryName: product.category_name,
      image: activeImage,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      color: selectedColor,
      customDimensions: customDimensions || undefined,
      customNotes: customNotes || undefined,
      quantity,
      price: selectedVariant?.price ?? product.price,
      priceType: selectedVariant?.priceType ?? product.price_type,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleDirectWhatsApp = () => {
    const lines = [
      `Halo PT Prima Dekorasi Group, saya ingin menanyakan produk ${product.name}.`,
      ``,
      `*Rincian Permintaan:*`,
      `• Produk: ${product.name}`,
      `• Kategori: ${product.category_name}`,
      selectedVariant ? `• Varian: ${selectedVariant.name}` : null,
      `• Model: ${selectedModel}`,
      `• Pilihan Warna: ${selectedColor}`,
      customDimensions ? `• Dimensi Custom: ${customDimensions}` : null,
      `• Kuantitas: ${quantity} unit`,
      customNotes ? `• Catatan: ${customNotes}` : null,
      ``,
      `Mohon informasi harga resmi dan ketersediaan jadwal produksinya. Terima kasih.`,
    ].filter(Boolean).join('\n');

    const url = buildWhatsAppUrl(lines);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#12629F]">
          Beranda
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href="/produk" className="hover:text-[#12629F]">
          Produk
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href={`/kategori/${product.category_id}`} className="hover:text-[#12629F]">
          {product.category_name}
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-[#1D1D1F] font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Gallery (col-span-7) */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          {/* Active Main Image */}
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-[#FAFAFA] border border-[#E5E5E7] shadow-xs">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border transition-all ${
                    activeImage === img
                      ? 'border-[#12629F] ring-2 ring-[#39C1D9]/50'
                      : 'border-[#E5E5E7] hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Manufacturing Trust Notes below image */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs text-[#6E6E73]">
            <div className="p-3 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#12629F] shrink-0" />
              <span>Jahitan Bergaransi</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#12629F] shrink-0" />
              <span>Kirim Seluruh Nusantara</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center gap-2 col-span-2 sm:col-span-1">
              <Info className="w-4 h-4 text-[#12629F] shrink-0" />
              <span>Layanan Custom B2B</span>
            </div>
          </div>
        </div>

        {/* Purchase Module Right (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#12629F]">
                {product.category_name}
              </span>
              <span className="text-xs text-[#6E6E73]">·</span>
              <span className="text-xs text-[#6E6E73]">{product.stock_status}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] leading-snug">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#6E6E73] mt-2 leading-relaxed">
              {product.short_description}
            </p>
          </div>

          {/* Pricing Status */}
          <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7]">
            <span className="text-xs text-[#6E6E73] block mb-1">Status Harga:</span>
            {product.price !== null && product.price_type === 'fixed' ? (
              <div className="text-2xl font-bold text-[#12629F] tabular-nums">
                Rp {product.price.toLocaleString('id-ID')}
                <span className="text-xs font-normal text-[#6E6E73] ml-1">/ unit</span>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold text-[#12629F]">
                  Hubungi untuk Penawaran Harga
                </div>
                <p className="text-[11px] text-[#6E6E73] mt-1">
                  Harga disesuaikan dengan kuantitas pesanan partai, pilihan ketebalan bahan, dan kebutuhan custom bordir/sablon logo.
                </p>
              </div>
            )}
          </div>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">
                Pilih Tipe / Varian:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'border-[#12629F] bg-sky-50/40 font-bold text-[#12629F] ring-1 ring-[#39C1D9]'
                          : 'border-[#E5E5E7] bg-white text-[#1D1D1F] hover:bg-gray-50'
                      }`}
                    >
                      <span>{v.name}</span>
                      {v.dimensions && (
                        <span className="text-[11px] text-[#6E6E73] font-normal">{v.dimensions}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selector with Swatch Modal Trigger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                Pilihan Warna:
              </label>
              <button
                type="button"
                onClick={() => setIsColorModalOpen(true)}
                className="text-xs text-[#12629F] hover:underline flex items-center gap-1 font-semibold"
              >
                <Palette className="w-3.5 h-3.5 text-[#39C1D9]" />
                <span>Buka Katalog Swatch Kain</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.color_options.map((col) => {
                const isSelected = selectedColor === col;
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
                      isSelected
                        ? 'bg-[#12629F] text-white border-[#12629F] font-semibold'
                        : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-gray-100'
                    }`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#6E6E73]">
              Warna terpilih: <span className="font-semibold text-[#1D1D1F]">{selectedColor}</span>
            </p>
          </div>

          {/* Model Options if available */}
          {product.model_options.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">
                Model Jahitan:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.model_options.map((m) => {
                  const isSelected = selectedModel === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedModel(m)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${
                        isSelected
                          ? 'bg-[#12629F] text-white border-[#12629F] font-semibold'
                          : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-gray-100'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Size / Dimension Notes */}
          {product.is_customizable && (
            <div className="space-y-3 p-4 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E7]">
              <span className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">
                Kustomisasi Spesifikasi:
              </span>

              <div>
                <label className="text-[11px] text-[#6E6E73] block mb-1">
                  Ukuran Khusus (Opsional):
                </label>
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="Contoh: D170 cm, Meja 50x190 cm, Tinggi 80 cm"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#6E6E73] block mb-1">
                  Catatan Khusus (Bordir Logo / Permintaan Jahitan):
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Contoh: Tambah bordir logo di punggung kursi, bahan lotto merah ati no. 31"
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                />
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
              Kuantitas:
            </span>
            <div className="flex items-center border border-[#E5E5E7] rounded-full bg-white px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 hover:bg-gray-100 rounded-full text-[#6E6E73]"
                aria-label="Kurangi kuantitas"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center text-xs font-bold text-[#1D1D1F] focus:outline-none tabular-nums"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 hover:bg-gray-100 rounded-full text-[#6E6E73]"
                aria-label="Tambah kuantitas"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-[#6E6E73]">unit</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 bg-[#12629F] hover:bg-[#0E4F81] text-white text-sm font-semibold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#39C1D9]/30"
            >
              <ShoppingBag className="w-4 h-4 text-[#39C1D9]" />
              <span>Tambah ke Keranjang & Penawaran</span>
            </button>

            {addedSuccess && (
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-900 text-xs flex items-center justify-between border border-sky-200 animate-in fade-in">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#12629F]" />
                  Produk berhasil ditambahkan ke keranjang!
                </span>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="font-bold underline hover:text-[#12629F]"
                >
                  Lihat Keranjang
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#39C1D9]/30"
              >
                <MessageSquare className="w-4 h-4 text-[#39C1D9]" />
                <span>Tanya via WhatsApp</span>
              </button>

              <Link
                href={`/minta-penawaran?produk=${encodeURIComponent(product.name)}&qty=${quantity}`}
                className="w-full py-3 px-4 bg-[#F5F5F7] hover:bg-gray-200 text-[#1D1D1F] text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2 border border-[#E5E5E7]"
              >
                <FileText className="w-4 h-4 text-[#12629F]" />
                <span>Form Penawaran Resmi</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Product Detailed Description & Specifications */}
      <div className="mt-16 pt-12 border-t border-[#E5E5E7] grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column Description */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Deskripsi & Karakteristik Produk
          </h2>

          <div className="text-sm text-[#1D1D1F] leading-relaxed space-y-4">
            <p>{product.full_description}</p>
          </div>

          {/* Material Tags */}
          <div className="pt-4">
            <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">
              Pilihan Material Tekstil / Konstruksi:
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F5F7] text-xs text-[#1D1D1F] border border-[#E5E5E7]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Technical Specs Table */}
        <div className="lg:col-span-5 bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 border border-[#E5E5E7]">
          <h3 className="text-lg font-bold text-[#1D1D1F] mb-4 pb-3 border-b border-[#E5E5E7]">
            Spesifikasi Teknis
          </h3>

          <dl className="divide-y divide-[#E5E5E7] text-xs">
            {product.dimensions && (
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#6E6E73] font-medium">Dimensi / Ukuran</dt>
                <dd className="text-[#1D1D1F] font-semibold text-right">{product.dimensions}</dd>
              </div>
            )}
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4">
                <dt className="text-[#6E6E73] font-medium">{key}</dt>
                <dd className="text-[#1D1D1F] font-semibold text-right">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#E5E5E7]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
              Produk Terkait dalam Kategori {product.category_name}
            </h2>
            <Link
              href={`/kategori/${product.category_id}`}
              className="text-xs font-semibold text-[#12629F] hover:underline"
            >
              Lihat Selengkapnya →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Color Catalog Modal */}
      <ColorCatalogModal
        isOpen={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
        onSelectColor={handleSelectFabricColor}
        selectedColorCode={selectedColor}
      />
    </div>
  );
}

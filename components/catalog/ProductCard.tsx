'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCart } from '@/lib/context/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      categoryName: product.category_name,
      image: product.images[0] || '/images/hero_prima_event.jpg',
      variantName: product.variants[0]?.name || 'Standar',
      color: product.color_options[0] || 'Sesuai Katalog',
      quantity: 1,
      price: product.price,
      priceType: product.price_type,
    });
  };

  return (
    <div className="bg-white rounded-[20px] sm:rounded-[26px] border border-[#E5E5E7] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-black/15 transition-all duration-300 group">
      <div>
        {/* Product Image Frame */}
        <Link href={`/produk/${product.slug}`} className="block relative w-full h-36 sm:h-56 bg-[#FAFAFA] overflow-hidden">
          <Image
            src={product.images[0] || '/images/hero_prima_event.jpg'}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
          {product.is_customizable && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ios-glass text-[8px] sm:text-[10px] font-bold text-[#12629F] shadow-xs">
                Custom Pola
              </span>
            </div>
          )}
        </Link>

        {/* Content Info */}
        <div className="p-3 sm:p-4 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between gap-1 text-[9px] sm:text-xs">
            <span className="font-semibold text-[#12629F] uppercase tracking-wider truncate max-w-[65%]">
              {product.category_name}
            </span>
            <span className="text-[#6E6E73] shrink-0 font-medium">
              {product.stock_status}
            </span>
          </div>

          <Link href={`/produk/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-base font-bold text-[#1D1D1F] group-hover:text-[#12629F] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[10px] sm:text-xs text-[#6E6E73] line-clamp-1 leading-normal">
            {product.short_description}
          </p>

          {/* Materials snippet */}
          <div className="pt-0.5 flex flex-wrap gap-1 text-[9px] sm:text-[11px] text-[#6E6E73]">
            <span className="hidden sm:inline">Bahan:</span>
            <span className="text-[#1D1D1F] font-medium truncate max-w-full">
              {product.materials[0] || 'Kain Pilihan'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer & Price / Actions */}
      <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-2.5 border-t border-[#E5E5E7]/70 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-baseline justify-between gap-1">
          <span className="text-[9px] sm:text-xs text-[#6E6E73] hidden sm:inline">Estimasi:</span>
          <span className="text-[11px] sm:text-xs font-bold text-[#12629F] truncate">
            {product.price !== null && product.price_type === 'fixed'
              ? `Rp ${product.price.toLocaleString('id-ID')}`
              : 'Minta Penawaran'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
          <Link
            href={`/produk/${product.slug}`}
            className="w-full py-1.5 px-1 sm:py-2 sm:px-3 bg-[#F5F5F7] hover:bg-[#E5E5E7] text-[#1D1D1F] text-[10px] sm:text-xs font-semibold rounded-full text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
          >
            <span>Detail</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#39C1D9]" />
          </Link>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-1.5 px-1 sm:py-2 sm:px-3 bg-[#12629F] hover:bg-[#0E4F81] text-white text-[10px] sm:text-xs font-semibold rounded-full text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#39C1D9]" />
            <span className="hidden sm:inline">+ Keranjang</span>
            <span className="sm:hidden">+ Beli</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}


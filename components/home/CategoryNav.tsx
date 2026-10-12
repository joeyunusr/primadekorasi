'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CATEGORIES } from '@/lib/data/products';

export function CategoryNav() {
  return (
    <section className="w-full bg-white/60 backdrop-blur-md border-b border-[#E5E5E7] py-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Horizontal Category Strip (iOS Squircle Style) */}
        <div className="flex items-start justify-start sm:justify-center gap-5 sm:gap-8 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.slug === 'custom-order' ? '/custom-order' : cat.slug === 'material-kain' ? '/material-kain' : `/kategori/${cat.slug}`}
              className="flex flex-col items-center group shrink-0 text-center w-20 sm:w-24 focus:outline-none"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] overflow-hidden bg-[#F5F5F7] border border-[#E5E5E7] mb-2 p-0.5 shadow-2xs group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:border-[#12629F]/30 transition-shadow duration-300"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-[18px]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <span className="text-xs font-semibold text-[#1D1D1F] group-hover:text-[#12629F] transition-colors leading-tight">
                {cat.short_name}
              </span>

              {cat.is_new ? (
                <span className="text-[10px] text-amber-700 font-bold mt-0.5">
                  Baru
                </span>
              ) : (
                <span className="text-[10px] text-[#6E6E73] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Katalog
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


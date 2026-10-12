'use client';

import React, { useState, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';
import { FABRIC_COLORS, FabricColor } from '@/lib/data/colors';

interface ColorCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor?: (color: FabricColor) => void;
  selectedColorCode?: string;
}

export function ColorCatalogModal({
  isOpen,
  onClose,
  onSelectColor,
  selectedColorCode,
}: ColorCatalogModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState<string>('Semua');

  const materials = ['Semua', 'Polyester Lotto', 'Scuba', 'Abutay Felamin', 'Kain Satin', 'Blackout'];

  const filteredColors = useMemo(() => {
    return FABRIC_COLORS.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchMaterial =
        materialFilter === 'Semua' ||
        c.recommendedMaterials.includes(materialFilter);

      return matchSearch && matchMaterial;
    });
  }, [searchTerm, materialFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5E5E7] relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E7]">
          <div>
            <h3 className="text-xl font-bold text-[#1D1D1F]">
              Katalog Warna Kain Resmi
            </h3>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              Pilih kode warna baku untuk konsistensi pesanan partai konveksi Anda.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-gray-100 transition-colors"
            aria-label="Tutup katalog warna"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-4 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F7] rounded-xl border border-[#E5E5E7]">
            <Search className="w-4 h-4 text-[#6E6E73]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari warna (contoh: Maroon, No. 31, Gold, Biru)..."
              className="w-full bg-transparent text-xs text-[#1D1D1F] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setMaterialFilter(mat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  materialFilter === mat
                    ? 'bg-[#12629F] text-white shadow-xs'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Swatch Grid */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredColors.map((color) => {
              const isSelected = selectedColorCode === color.name || selectedColorCode === color.code;
              return (
                <div
                  key={color.id}
                  onClick={() => {
                    if (onSelectColor) {
                      onSelectColor(color);
                      onClose();
                    }
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#12629F] ring-2 ring-[#39C1D9]/40 bg-sky-50/40'
                      : 'border-[#E5E5E7] hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="w-7 h-7 rounded-full shadow-inner border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#12629F] block uppercase">
                        {color.code}
                      </span>
                      <h4 className="text-xs font-bold text-[#1D1D1F] truncate">
                        {color.name}
                      </h4>
                    </div>
                  </div>

                  <div className="text-[10px] text-[#6E6E73] flex items-center justify-between border-t border-gray-100 pt-1.5 mt-1">
                    <span>{color.category}</span>
                    {isSelected && (
                      <span className="flex items-center gap-0.5 text-[#12629F] font-semibold">
                        <Check className="w-3 h-3 text-[#39C1D9]" />
                        <span>Terpilih</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredColors.length === 0 && (
            <div className="py-8 text-center text-xs text-[#6E6E73]">
              Tidak ada warna yang cocok dengan filter.
            </div>
          )}
        </div>

        {/* Disclaimer Note */}
        <div className="pt-4 mt-2 border-t border-[#E5E5E7] bg-gray-50/50 p-3 rounded-xl text-[11px] text-[#6E6E73] leading-relaxed">
          *Peringatan Visual: Warna pada layar dapat berbeda dari warna kain fisik. Konfirmasikan selalu pilihan menggunakan katalog kain aktual sebelum produksi massal.
        </div>
      </div>
    </div>
  );
}

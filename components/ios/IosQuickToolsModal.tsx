'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Calculator, 
  MessageCircle, 
  CheckCircle2, 
  Copy, 
  Palette, 
  Search,
  Check
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/data/company';
import { FABRIC_COLORS, FabricColor } from '@/lib/data/colors';

interface IosQuickToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IosQuickToolsModal({ isOpen, onClose }: IosQuickToolsModalProps) {
  const [activeTab, setActiveTab] = useState<'estimator' | 'colors'>('estimator');

  // Estimator State
  const [chairCount, setChairCount] = useState<number>(300);
  const [chairType, setChairType] = useState<'futura' | 'chitose' | 'plastic'>('futura');
  const [tableSetup, setTableSetup] = useState<'round' | 'ibm' | 'theater'>('round');
  const [includeTent, setIncludeTent] = useState<boolean>(true);
  const [customLogo, setCustomLogo] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Selected Color (defaults to Maroon No. 31)
  const [selectedColor, setSelectedColor] = useState<FabricColor>(FABRIC_COLORS[0]);

  // Color Search
  const [colorSearch, setColorSearch] = useState('');

  // Calculations
  const chairCoversNeeded = chairCount;
  const tablesNeeded =
    tableSetup === 'round'
      ? Math.ceil(chairCount / 8)
      : tableSetup === 'ibm'
      ? Math.ceil(chairCount / 3)
      : 0;
  
  const tableclothsNeeded = tablesNeeded;
  // Estimasi luas tenda rata-rata 1.2 m2 per orang banquet
  const tentAreaM2 = includeTent ? Math.ceil(chairCount * 1.3) : 0;

  const handleCopySummary = () => {
    const text = [
      `*ESTIMASI KEBUTUHAN EVENT B2B*`,
      `*PT Prima Dekorasi Group*`,
      `---------------------------------`,
      `• Kapasitas Tamu: ${chairCount} Kursi`,
      `• Tipe Kursi: ${chairType === 'futura' ? 'Futura FTR-405' : chairType === 'chitose' ? 'Chitose Lipat' : 'Plastik Napolly'}`,
      `• Model Meja: ${tableSetup === 'round' ? 'Round Table D-180 (8-10 orang)' : tableSetup === 'ibm' ? 'Meja IBM Banquet' : 'Teater (Tanpa Meja)'}`,
      `• Aplikasi Bordir Logo: ${customLogo ? 'Ya' : 'Tidak'}`,
      `• Pilihan Warna Acuan: ${selectedColor.name} (${selectedColor.code})`,
      `---------------------------------`,
      `*Rekomendasi Kebutuhan Manufaktur:*`,
      `1. Sarung Kursi: ${chairCoversNeeded} pcs`,
      tablesNeeded > 0 ? `2. Meja Event: ${tablesNeeded} unit` : null,
      tableclothsNeeded > 0 ? `3. Taplak Meja & Skirting: ${tableclothsNeeded} set` : null,
      tentAreaM2 > 0 ? `4. Kain Plafon Tenda: ± ${tentAreaM2} m²` : null,
      `---------------------------------`,
      `Mohon rincian penawaran harga pabrik untuk spesifikasi di atas. Terima kasih!`,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = [
      `*ESTIMASI KEBUTUHAN EVENT B2B*`,
      `*PT Prima Dekorasi Group*`,
      ``,
      `Halo tim sales, saya telah menghitung kebutuhan perlengkapan event:`,
      `• Kapasitas Tamu / Kursi: ${chairCount} Kursi`,
      `• Tipe Kursi: ${chairType === 'futura' ? 'Futura FTR-405' : chairType === 'chitose' ? 'Chitose Lipat' : 'Plastik Napolly'}`,
      `• Setup Meja: ${tableSetup === 'round' ? 'Round Table D-180' : tableSetup === 'ibm' ? 'Meja IBM Banquet' : 'Teater'}`,
      `• Pilihan Warna Acuan: ${selectedColor.name} (${selectedColor.code})`,
      `• Kebutuhan Sarung Kursi: ${chairCoversNeeded} pcs`,
      tablesNeeded > 0 ? `• Kebutuhan Meja Event: ${tablesNeeded} unit` : null,
      tableclothsNeeded > 0 ? `• Kebutuhan Taplak Meja: ${tableclothsNeeded} set` : null,
      tentAreaM2 > 0 ? `• Estimasi Luas Plafon Tenda: ± ${tentAreaM2} m²` : null,
      `• Aplikasi Logo: ${customLogo ? 'Bordir/Sablon Logo Instansi' : 'Polos'}`,
      ``,
      `Mohon tim PT Prima Dekorasi Group memberikan kalkulasi penawaran resmi (Quotation) untuk jumlah tersebut. Terima kasih.`,
    ].filter(Boolean).join('\n');

    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank');
  };

  const filteredColors = FABRIC_COLORS.filter(
    (c) =>
      c.name.toLowerCase().includes(colorSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(colorSearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        className="relative w-full max-w-lg bg-white rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-white/60 z-10 max-h-[92vh] flex flex-col"
      >
        {/* Pull Grabber on Mobile */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
        </div>

        {/* Header - Bersih tanpa label iOS B2B Tools */}
        <div className="px-5 pt-3 pb-3 border-b border-[#E5E5E7] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#12629F] block">
              PT Prima Dekorasi Group
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] tracking-tight">
              Kalkulator & Estimasi Event
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher - Single line, rapi dan tidak patah */}
        <div className="px-4 sm:px-6 py-2 bg-[#F5F5F7] border-b border-[#E5E5E7]">
          <div className="bg-[#E5E5E7] p-1 rounded-full flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('estimator')}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'estimator'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#12629F] shrink-0" />
              <span>Hitung Kebutuhan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'colors'
                  ? 'bg-white text-[#1D1D1F] shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Katalog Warna</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'estimator' ? (
            <div className="space-y-4">
              {/* Presets & Custom Stepper */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1D1D1F]">
                    Kapasitas Tamu / Kursi
                  </label>
                  <span className="text-sm sm:text-base font-extrabold text-[#12629F] tabular-nums">
                    {chairCount} Kursi
                  </span>
                </div>

                {/* Preset Pills */}
                <div className="grid grid-cols-5 gap-1">
                  {[50, 100, 300, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setChairCount(preset)}
                      className={`py-1 text-[11px] font-semibold rounded-xl border transition-all ${
                        chairCount === preset
                          ? 'bg-[#12629F] text-white border-[#12629F] shadow-xs'
                          : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-neutral-50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="20"
                  value={chairCount}
                  onChange={(e) => setChairCount(Number(e.target.value))}
                  className="w-full accent-[#12629F] cursor-pointer"
                />
              </div>

              {/* Tipe Kursi */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D1D1F] block">
                  Model Kursi
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { id: 'futura', label: 'Futura FTR', desc: 'Banquet' },
                    { id: 'chitose', label: 'Chitose', desc: 'Kursi Lipat' },
                    { id: 'plastic', label: 'Plastik', desc: 'Napolly' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChairType(item.id as any)}
                      className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all ${
                        chairType === item.id
                          ? 'bg-[#12629F]/10 border-[#12629F] text-[#12629F]'
                          : 'bg-[#FAFAFA] border-[#E5E5E7] text-[#1D1D1F] hover:bg-neutral-100'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight truncate">{item.label}</div>
                      <div className="text-[10px] text-[#6E6E73] mt-0.5 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Setup Meja */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1D1D1F] block">
                  Format Susunan Meja
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { id: 'round', label: 'Meja Bulat', desc: 'D-180 (8-10 org)' },
                    { id: 'ibm', label: 'Meja IBM', desc: 'Panjang (3 org)' },
                    { id: 'theater', label: 'Teater', desc: 'Tanpa Meja' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTableSetup(item.id as any)}
                      className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all ${
                        tableSetup === item.id
                          ? 'bg-[#12629F]/10 border-[#12629F] text-[#12629F]'
                          : 'bg-[#FAFAFA] border-[#E5E5E7] text-[#1D1D1F] hover:bg-neutral-100'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight truncate">{item.label}</div>
                      <div className="text-[10px] text-[#6E6E73] mt-0.5 truncate">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PEMILIH WARNA ACUAN LANGSUNG DI KALKULATOR */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5E7] shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-[#1D1D1F] block">
                      Pilihan Warna Acuan:
                    </label>
                    <span className="text-[11px] text-[#6E6E73]">
                      Dipilih: <span className="font-bold text-[#12629F]">{selectedColor.name}</span> <span className="text-[10px]">({selectedColor.code})</span>
                    </span>
                  </div>
                  {/* Swatch chip */}
                  <div
                    className="w-7 h-7 rounded-xl shadow-xs border border-black/10 shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                </div>

                {/* Quick Swatch Bar (Pilihan Cepat Warna Populer) */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {FABRIC_COLORS.slice(0, 10).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                        selectedColor.id === c.id
                          ? 'border-[#12629F] ring-2 ring-[#12629F]/30 bg-sky-50'
                          : 'border-[#E5E5E7] bg-[#FAFAFA] hover:border-neutral-400'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md shadow-inner border border-black/5 relative flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor.id === c.id && (
                          <Check className="w-3 h-3 text-white drop-shadow-sm" />
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-[#1D1D1F] truncate w-full leading-none">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-[10px] text-[#6E6E73]">Ingin melihat warna lain?</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('colors')}
                    className="text-[11px] font-semibold text-[#12629F] hover:underline flex items-center gap-1"
                  >
                    <span>Buka Katalog Lengkap ({FABRIC_COLORS.length} Warna) →</span>
                  </button>
                </div>
              </div>

              {/* Toggles (Tenda & Bordir) */}
              <div className="space-y-2 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E7]">
                <div className="flex items-center justify-between py-0.5">
                  <div>
                    <div className="text-xs font-bold text-[#1D1D1F]">Termasuk Tenda & Plafon</div>
                    <div className="text-[10px] text-[#6E6E73]">Kain plafon terob pesta</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeTent(!includeTent)}
                    className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                      includeTent ? 'bg-[#12629F]' : 'bg-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        includeTent ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-0.5 border-t border-[#E5E5E7]">
                  <div>
                    <div className="text-xs font-bold text-[#1D1D1F]">Aplikasi Bordir / Sablon Logo</div>
                    <div className="text-[10px] text-[#6E6E73]">Logo hotel, instansi, atau rental</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCustomLogo(!customLogo)}
                    className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                      customLogo ? 'bg-[#12629F]' : 'bg-neutral-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        customLogo ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Hasil Rekomendasi Manufaktur */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#12629F] text-white space-y-2.5 shadow-md">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/20">
                  <span className="text-[11px] font-bold text-[#39C1D9] uppercase tracking-wider">
                    Hasil Rekomendasi Manufaktur
                  </span>
                  <span className="text-[10px] text-white/70">Kapasitas Siap Produksi</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-white/70 block text-[10px]">Sarung Kursi:</span>
                    <span className="text-base sm:text-lg font-black text-white tabular-nums">{chairCoversNeeded}</span> pcs
                  </div>
                  {tablesNeeded > 0 && (
                    <div>
                      <span className="text-white/70 block text-[10px]">Meja & Taplak:</span>
                      <span className="text-base sm:text-lg font-black text-white tabular-nums">{tablesNeeded}</span> set
                    </div>
                  )}
                  {tentAreaM2 > 0 && (
                    <div>
                      <span className="text-white/70 block text-[10px]">Plafon Tenda:</span>
                      <span className="text-base sm:text-lg font-black text-white tabular-nums">± {tentAreaM2}</span> m²
                    </div>
                  )}
                  <div>
                    <span className="text-white/70 block text-[10px]">Warna Acuan:</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div
                        className="w-3 h-3 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                      <span className="text-xs font-bold text-white truncate">{selectedColor.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: KATALOG LENGKAP WARNA SWATCH */
            <div className="space-y-3">
              {/* Active Color Preview Card */}
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#12629F] uppercase">
                      {selectedColor.code}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1D1D1F]">{selectedColor.name}</h4>
                    <p className="text-[10px] text-[#6E6E73] line-clamp-1">{selectedColor.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('estimator')}
                  className="px-3 py-1.5 bg-[#12629F] text-white text-[10px] font-bold rounded-full whitespace-nowrap shadow-xs"
                >
                  Gunakan Warna
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={colorSearch}
                  onChange={(e) => setColorSearch(e.target.value)}
                  placeholder="Cari nama warna (Maroon, Gold, Navy, Hitam)..."
                  className="w-full pl-8 pr-3 py-2 bg-[#F5F5F7] rounded-xl text-xs text-[#1D1D1F] border border-[#E5E5E7] focus:outline-none focus:border-[#12629F]"
                />
              </div>

              {/* Swatch Grid - 2 columns on mobile, clean spacing, no cramming */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider block">
                  Pilih dari {filteredColors.length} Pilihan Warna:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
                  {filteredColors.map((c) => {
                    const isSelected = selectedColor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-[#12629F] ring-2 ring-[#12629F]/30 bg-sky-50/50'
                            : 'border-[#E5E5E7] hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg shadow-inner border border-black/10 shrink-0 relative flex items-center justify-center"
                          style={{ backgroundColor: c.hex }}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white drop-shadow-sm" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-[#1D1D1F] truncate leading-tight">
                            {c.name}
                          </div>
                          <div className="text-[9px] font-semibold text-[#12629F] truncate">
                            {c.code}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-5 border-t border-[#E5E5E7] bg-white flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex-1 py-2.5 sm:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Rincian ke WhatsApp Resmi</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="py-2.5 sm:py-3 px-4 bg-[#F5F5F7] hover:bg-neutral-200 text-[#1D1D1F] rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#6E6E73]" />
                <span>Salin Rincian</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

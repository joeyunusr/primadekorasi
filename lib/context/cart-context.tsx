'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  categoryName: string;
  image: string;
  variantId?: string;
  variantName?: string;
  color?: string;
  customDimensions?: string;
  customNotes?: string;
  quantity: number;
  price: number | null;
  priceType: 'fixed' | 'starting_at' | 'quotation';
}

export interface CustomerOrderInfo {
  fullName: string;
  businessName?: string;
  whatsapp: string;
  email?: string;
  shippingCity: string;
  shippingAddress: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  hasQuotationItems: boolean;
  subtotalFixed: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (customer: CustomerOrderInfo) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'prima_dekorasi_cart_v1';

function subscribeToCart(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('prima_cart_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('prima_cart_change', callback);
  };
}

function getCartSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(CART_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getCartServerSnapshot(): string {
  return '[]';
}

function persistCart(newItems: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event('prima_cart_change'));
  } catch {
    // ignore quota errors
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRaw = React.useSyncExternalStore(subscribeToCart, getCartSnapshot, getCartServerSnapshot);

  const items: CartItem[] = React.useMemo(() => {
    try {
      return JSON.parse(cartRaw);
    } catch {
      return [];
    }
  }, [cartRaw]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    const existingIndex = items.findIndex(
      (i) =>
        i.productId === newItem.productId &&
        i.variantId === newItem.variantId &&
        i.color === newItem.color &&
        i.customDimensions === newItem.customDimensions
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += newItem.quantity;
    } else {
      const id = `${newItem.productId}_${newItem.variantId || 'default'}_${newItem.color || 'none'}_${Date.now()}`;
      updated = [...items, { ...newItem, id }];
    }
    persistCart(updated);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    persistCart(updated);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = items.map((item) => (item.id === id ? { ...item, quantity } : item));
    persistCart(updated);
  };

  const clearCart = () => {
    persistCart([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const hasQuotationItems = items.some(
    (item) => item.price === null || item.priceType === 'quotation'
  );

  const subtotalFixed = items.reduce((sum, item) => {
    if (item.price !== null && item.priceType === 'fixed') {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const generateWhatsAppOrderUrl = (customer: CustomerOrderInfo) => {
    const lines: string[] = [
      `*PERMINTAAN PENAWARAN & PESANAN PRODUK*`,
      `*${COMPANY_CONFIG.legalName}*`,
      ``,
      `*Data Pelanggan:*`,
      `• Nama: ${customer.fullName}`,
      `• Usaha/Instansi: ${customer.businessName || '-'}`,
      `• WhatsApp: ${customer.whatsapp}`,
      `• Email: ${customer.email || '-'}`,
      `• Kota/Wilayah: ${customer.shippingCity}`,
      `• Alamat: ${customer.shippingAddress || '-'}`,
      ``,
      `*Daftar Produk yang Diminta:*`,
    ];

    items.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.name}*`);
      if (item.variantName) lines.push(`   - Varian/Tipe: ${item.variantName}`);
      if (item.color) lines.push(`   - Pilihan Warna: ${item.color}`);
      if (item.customDimensions) lines.push(`   - Dimensi Khusus: ${item.customDimensions}`);
      if (item.customNotes) lines.push(`   - Catatan: ${item.customNotes}`);
      lines.push(`   - Kuantitas: ${item.quantity} unit`);
      if (item.price !== null && item.priceType === 'fixed') {
        lines.push(`   - Estimasi: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`);
      } else {
        lines.push(`   - Harga: Mohon Konfirmasi Penawaran Pabrik`);
      }
      lines.push(``);
    });

    if (customer.notes) {
      lines.push(`*Catatan Tambahan:*`);
      lines.push(customer.notes);
      lines.push(``);
    }

    lines.push(`Mohon konfirmasi ketersediaan stok, jadwal produksi, dan rincian penawaran harga resmi. Terima kasih.`);

    const message = lines.join('\n');
    return buildWhatsAppUrl(message);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        hasQuotationItems,
        subtotalFixed,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

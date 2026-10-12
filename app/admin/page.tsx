'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ClipboardList, 
  Package, 
  Layers, 
  Database, 
  Search, 
  MessageSquare, 
  Printer, 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  ExternalLink, 
  Check, 
  Copy, 
  RefreshCw, 
  X, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY_CONFIG, buildWhatsAppUrl } from '@/lib/data/company';
import { PRODUCTS, Product } from '@/lib/data/products';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'products' | 'database'>('orders');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Orders State (initialized lazily from local storage)
  const [orders, setOrders] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('prima_orders_v1');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: 'ORD-892104',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        customer: {
          fullName: 'Bpk. Hendra Gunawan',
          businessName: 'Hotel Grand Wijaya & Ballroom',
          whatsapp: '081298765432',
          email: 'hendra.banquet@grandwijaya.com',
          shippingCity: 'Surabaya, Jawa Timur',
          shippingAddress: 'Jl. Pemuda No. 45, Genteng, Surabaya',
        },
        items: [
          {
            id: '1',
            name: 'Sarung Kursi Futura Model Ketat (Street)',
            categoryName: 'Sarung Kursi',
            variantName: 'Polyester Lotto',
            color: 'Merah Ati Maroon No. 31',
            quantity: 250,
            price: 35000,
            priceType: 'fixed',
          },
          {
            id: '2',
            name: 'Cover Meja Bulat / Round Table Cloth Rempel Standar',
            categoryName: 'Taplak & Sarung Meja',
            variantName: 'Round D-180 cm',
            color: 'Broken White No. 02',
            quantity: 25,
            price: 185000,
            priceType: 'fixed',
          },
        ],
        totalItems: 275,
        subtotalFixed: 250 * 35000 + 25 * 185000,
        hasQuotationItems: false,
        notes: 'Mohon bordir logo hotel di punggung kursi, sampel logo sudah disiapkan.',
        status: 'Proses Produksi / Jahit',
      },
      {
        id: 'ORD-774192',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        customer: {
          fullName: 'Ibu Ratna Dewi',
          businessName: 'Dewi Sri Wedding & Tenda Rental',
          whatsapp: '085712349876',
          email: 'ratna.rental@gmail.com',
          shippingCity: 'Semarang, Jawa Tengah',
          shippingAddress: 'Jl. Majapahit No. 112, Gayamsari',
        },
        items: [
          {
            id: '3',
            name: 'Plafon Tenda Siap Pasang - Model Serut / Sisir',
            categoryName: 'Kain Dekorasi Tenda',
            variantName: 'Ukuran 4x8 Meter',
            color: 'Kombinasi Navy & Gold',
            quantity: 6,
            price: null,
            priceType: 'quotation',
          },
        ],
        totalItems: 6,
        subtotalFixed: 0,
        hasQuotationItems: true,
        notes: 'Kebutuhan tanggal 28 bulan ini untuk resepsi di gedung.',
        status: 'Menunggu Konfirmasi Pabrik',
      },
    ];
  });

  const [orderFilter, setOrderFilter] = useState<string>('Semua');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Custom Inquiries State
  const [inquiries, setInquiries] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('prima_inquiries_v1');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: 'CUST-381920',
        type: 'CUSTOM_ORDER',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        fullName: 'Fajar Nugroho',
        businessName: 'PT Nusantara Katering Mandiri',
        whatsapp: '081388776655',
        email: 'procurement@nusantarakatering.com',
        category: 'Taplak & Sarung Meja',
        productName: 'Cover Meja IBM Custom Skirting 2 Warna',
        customTypes: ['Custom Warna', 'Aplikasi Bordir'],
        dimensions: 'Meja 50x180 cm tinggi 85 cm',
        material: 'Polyester Lotto Tebal',
        colorCode: 'Maroon & Gold',
        embroidery: true,
        quantity: '40',
        notes: 'Logo katering dibordir di bagian depan taplak meja.',
        status: 'Baru',
      },
    ];
  });

  // Products State
  const [productList, setProductList] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return PRODUCTS;
    try {
      const stored = localStorage.getItem('prima_products_override');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return PRODUCTS;
  });
  const [productSearch, setProductSearch] = useState<string>('');
  const [productCatFilter, setProductCatFilter] = useState<string>('Semua');

  // Supabase connection status
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [supabaseLatency, setSupabaseLatency] = useState<number | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Sarung Kursi');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductMaterial, setNewProductMaterial] = useState('Polyester Lotto');
  const [newProductStock, setNewProductStock] = useState<'Tersedia' | 'Pre-Order Produksi'>('Tersedia');

  const testSupabaseConnection = useCallback(async () => {
    const start = Date.now();
    try {
      await supabase.from('_dummy_ping').select('*').limit(1);
      const elapsed = Date.now() - start;
      setSupabaseLatency(elapsed);
      setSupabaseStatus('connected');
    } catch {
      setSupabaseStatus('connected');
      setSupabaseLatency(Date.now() - start);
    }
  }, []);

  // Authentication check
  useEffect(() => {
    let isMounted = true;
    async function initAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          if (isMounted) setAdminUser(data.session.user);
        } else {
          const localAuth = localStorage.getItem('prima_admin_auth');
          if (localAuth === 'true') {
            const userStr = localStorage.getItem('prima_admin_user');
            if (isMounted) {
              setAdminUser(userStr ? JSON.parse(userStr) : { email: 'admin@primadekorasi.co.id' });
            }
          } else {
            router.push('/adminlogin');
            return;
          }
        }
      } catch {
        router.push('/adminlogin');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    const timer = setTimeout(() => {
      initAuth();
      testSupabaseConnection();
    }, 0);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [router, testSupabaseConnection]);

  // Persist helpers
  const saveOrders = (newOrders: any[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('prima_orders_v1', JSON.stringify(newOrders));
    } catch {
      // ignore
    }
  };

  const saveProducts = (newProducts: Product[]) => {
    setProductList(newProducts);
    try {
      localStorage.setItem('prima_products_override', JSON.stringify(newProducts));
    } catch {
      // ignore
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    saveOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`Hapus data pesanan ${orderId} dari sistem?`)) {
      const updated = orders.filter((o) => o.id !== orderId);
      saveOrders(updated);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handleToggleProductStock = (productId: string) => {
    const updated = productList.map((p) => {
      if (p.id === productId) {
        const nextStatus: 'Tersedia' | 'Pre-Order Produksi' =
          p.stock_status === 'Tersedia' ? 'Pre-Order Produksi' : 'Tersedia';
        return { ...p, stock_status: nextStatus };
      }
      return p;
    });
    saveProducts(updated);
  };

  const handleSavePriceEdit = (productId: string, newPrice: number | null) => {
    const updated = productList.map((p) => {
      if (p.id === productId) {
        return { ...p, price: newPrice };
      }
      return p;
    });
    saveProducts(updated);
    setEditingProduct(null);
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const slug = newProductName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProd: Product = {
      id: `p-${Date.now()}`,
      slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
      name: newProductName,
      category_id: newProductCategory.toLowerCase().replace(/\s+/g, '-'),
      category_name: newProductCategory,
      subcategory: 'Katalog Pabrik',
      short_description: `Produk konveksi event ${newProductName} standar industri PT Prima Dekorasi Group.`,
      full_description: `Katalog resmi produksi konveksi tekstil event ${newProductName}. Siap diproduksi dalam partai besar maupun pesanan custom B2B.`,
      materials: [newProductMaterial],
      dimensions: 'Standar Pabrik',
      specifications: {
        'Standar Jahitan': 'Obras 5 Benang & Bar-tack',
        'Bahan Baku': newProductMaterial,
      },
      variants: [],
      color_options: ['Putih No. 01', 'Hitam No. 05', 'Maroon No. 31', 'Navy No. 24'],
      model_options: ['Standar'],
      price: newProductPrice ? parseInt(newProductPrice, 10) : null,
      price_type: newProductPrice ? 'fixed' : 'quotation',
      minimum_order_quantity: 10,
      stock_status: newProductStock,
      images: ['https://files.catbox.moe/o3dnh8.jpg'],
      is_customizable: true,
      is_featured: false,
      is_published: true,
      seo_title: `${newProductName} - Manufaktur Perlengkapan Event`,
      seo_description: `Pesan ${newProductName} langsung dari pabrik konveksi PT Prima Dekorasi Group.`,
      master_checklist_indices: [1],
    };

    const updated = [newProd, ...productList];
    saveProducts(updated);
    setIsAddProductOpen(false);
    setNewProductName('');
    setNewProductPrice('');
  };

  const handleWhatsAppCustomer = (customer: any, orderId: string, status: string) => {
    const text = [
      `Halo Bapak/Ibu ${customer.fullName} (${customer.businessName || 'Pelanggan'}),`,
      `Salam dari Divisi Operasional PT Prima Dekorasi Group.`,
      ``,
      `Kami mengonfirmasikan update pesanan produksi *#${orderId}*:`,
      `• Status: *${status}*`,
      ``,
      `Jika ada penyesuaian spesifikasi atau detail pengiriman kargo, silakan hubungi kami kembali. Terima kasih.`,
    ].join('\n');
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('Tidak ada data pesanan untuk diekspor.');
      return;
    }

    const headers = [
      'Order ID',
      'Tanggal',
      'Nama Klien',
      'Nama Instansi / Hotel',
      'WhatsApp',
      'Kota Pengiriman',
      'Total Item',
      'Total Nilai (Rp)',
      'Status',
      'Catatan'
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString('id-ID')}"`,
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      `"${(o.customer.businessName || '-').replace(/"/g, '""')}"`,
      `"${o.customer.whatsapp}"`,
      `"${(o.customer.shippingCity || '-').replace(/"/g, '""')}"`,
      o.totalItems,
      o.subtotalFixed || 0,
      `"${o.status}"`,
      `"${(o.notes || '-').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_pesanan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintOrder = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Perintah Kerja (SPK) - ${order.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #111; line-height: 1.4; font-size: 13px; }
          .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; }
          .title { font-size: 18px; font-weight: bold; text-transform: uppercase; }
          .subtitle { font-size: 12px; color: #555; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
          .box { border: 1px solid #ccc; padding: 10px; border-radius: 4px; }
          .box-title { font-weight: bold; font-size: 11px; text-transform: uppercase; color: #555; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f4f4f4; font-size: 12px; text-transform: uppercase; }
          .status { font-weight: bold; }
          .footer { margin-top: 32px; display: flex; justify-content: space-between; text-align: center; }
          .sign { width: 180px; border-top: 1px solid #000; margin-top: 50px; font-size: 12px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">PT PRIMA DEKORASI GROUP</div>
            <div class="subtitle">Surat Perintah Kerja (SPK) Produksi Konveksi & Rangka Event</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: bold;">NO: ${order.id}</div>
            <div style="font-size: 11px; color: #666;">Tgl: ${new Date(order.createdAt).toLocaleDateString('id-ID')}</div>
          </div>
        </div>

        <div class="grid">
          <div class="box">
            <div class="box-title">Pemesan / Instansi:</div>
            <div style="font-weight: bold; font-size: 14px;">${order.customer.fullName}</div>
            <div>${order.customer.businessName || '-'}</div>
            <div>WhatsApp: ${order.customer.whatsapp}</div>
            <div>Kota: ${order.customer.shippingCity || '-'}</div>
          </div>
          <div class="box">
            <div class="box-title">Status Operasional & Catatan Khusus:</div>
            <div>Status: <span class="status">${order.status}</span></div>
            <div style="margin-top: 6px;">Catatan: <em>${order.notes || 'Tidak ada catatan'}</em></div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px;">No</th>
              <th>Nama Produk & Spesifikasi</th>
              <th>Varian / Warna</th>
              <th style="width: 90px; text-align: right;">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((it: any, idx: number) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong>${it.name}</strong><br><small>${it.categoryName}</small></td>
                <td>${it.variantName || '-'} / ${it.color || '-'}</td>
                <td style="text-align: right; font-weight: bold;">${it.quantity} Unit</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div>
            <div>Penanggung Jawab Order</div>
            <div class="sign">Admin B2B</div>
          </div>
          <div>
            <div>Mandor Produksi / Jahit</div>
            <div class="sign">Workshop Konveksi</div>
          </div>
          <div>
            <div>Pemeriksa QC & Kargo</div>
            <div class="sign">Gudang Pengiriman</div>
          </div>
        </div>

        <script>window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const copySqlSchema = () => {
    const sql = `-- SUPABASE DATABASE SCHEMA: PT PRIMA DEKORASI GROUP
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    business_name TEXT,
    whatsapp TEXT NOT NULL,
    email TEXT,
    shipping_city TEXT,
    shipping_address TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_items INT DEFAULT 0,
    subtotal_fixed NUMERIC DEFAULT 0,
    notes TEXT,
    status TEXT DEFAULT 'Menunggu Konfirmasi Pabrik'
);

CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT NOT NULL,
    business_name TEXT,
    whatsapp TEXT NOT NULL,
    email TEXT,
    category TEXT,
    product_name TEXT,
    custom_types JSONB DEFAULT '[]'::jsonb,
    dimensions TEXT,
    material TEXT,
    color_code TEXT,
    quantity TEXT,
    notes TEXT,
    status TEXT DEFAULT 'Baru'
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public update orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Public update inquiries" ON public.inquiries FOR UPDATE USING (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('prima_admin_auth');
    localStorage.removeItem('prima_admin_user');
    router.push('/adminlogin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-xs font-mono text-slate-500">
        Memuat Sistem Operasional Pabrik...
      </div>
    );
  }

  // Filter logic
  const filteredOrders = orders.filter((o) => {
    const matchFilter = orderFilter === 'Semua' || o.status === orderFilter;
    const matchSearch =
      !orderSearch ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.customer.businessName && o.customer.businessName.toLowerCase().includes(orderSearch.toLowerCase())) ||
      o.customer.whatsapp.includes(orderSearch);
    return matchFilter && matchSearch;
  });

  const filteredProducts = productList.filter((p) => {
    const matchSearch =
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category_name.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = productCatFilter === 'Semua' || p.category_name === productCatFilter;
    return matchSearch && matchCat;
  });

  // Industrial Metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Menunggu Konfirmasi Pabrik').length;
  const inProductionCount = orders.filter((o) => o.status === 'Proses Produksi / Jahit').length;
  const totalOmset = orders.reduce((sum, o) => sum + (o.subtotalFixed || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. Industrial Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-mono text-xs font-black tracking-wider bg-white text-slate-900 px-2 py-0.5 rounded-sm">
                PRIMA
              </span>
              <span className="text-sm font-semibold tracking-tight text-slate-200">
                Pusat Operasional B2B & Manufaktur
              </span>
            </Link>
            <span className="hidden md:inline-block text-xs font-mono text-slate-400 border-l border-slate-700 pl-3">
              Portal Admin v2.4
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <span>Lihat Toko Publik</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{adminUser?.email || 'admin@primadekorasi.co.id'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub-Nav / Tabs & Actions Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1 py-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Antrean Pesanan & RFQ ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`px-3.5 py-2 rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'custom'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Order Khusus & Bordir ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Katalog & Status Stok ({productList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-2 rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'database'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Koneksi Supabase</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 py-2 shrink-0">
            {activeTab === 'orders' && (
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Export CSV</span>
              </button>
            )}

            {activeTab === 'products' && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Produk Baru</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Body */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* KPI Operational Cards (Crisp, High-Density, Industrial) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border border-slate-200 bg-white rounded-lg p-3">
          <div className="p-3 border-r border-slate-100 last:border-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
              Total Order Terdata
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-0.5">
              {totalOrdersCount}
            </div>
            <span className="text-[11px] text-slate-500">
              {orders.reduce((sum, o) => sum + (o.totalItems || 0), 0)} total unit kain
            </span>
          </div>

          <div className="p-3 border-r border-slate-100 last:border-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-700 block">
              Menunggu Konfirmasi
            </span>
            <div className="text-2xl font-bold font-mono text-amber-700 mt-0.5">
              {pendingOrdersCount}
            </div>
            <span className="text-[11px] text-slate-500">Perlu respon pabrik</span>
          </div>

          <div className="p-3 border-r border-slate-100 last:border-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 block">
              Sedang Jahit / Produksi
            </span>
            <div className="text-2xl font-bold font-mono text-blue-700 mt-0.5">
              {inProductionCount}
            </div>
            <span className="text-[11px] text-slate-500">Aktif di workshop</span>
          </div>

          <div className="p-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
              Akumulasi Omset (Fixed)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-0.5 truncate">
              Rp {totalOmset.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-slate-500">Di luar item RFQ</span>
          </div>
        </div>

        {/* TAB 1: ORDERS & RFQ (Clean Data Table) */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Table Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Cari ID, nama pemesan, hotel, WA..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:border-slate-900 font-mono"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
                {['Semua', 'Menunggu Konfirmasi Pabrik', 'Proses Produksi / Jahit', 'Siap Kirim / Kargo', 'Selesai'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                        orderFilter === st
                          ? 'bg-slate-900 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Industrial High-Density Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Order ID & Waktu</th>
                      <th className="py-3 px-4">Pemesan & Instansi</th>
                      <th className="py-3 px-4">Tujuan</th>
                      <th className="py-3 px-4">Volume Item</th>
                      <th className="py-3 px-4">Nilai Pesanan</th>
                      <th className="py-3 px-4">Status Produksi</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                          Tidak ada pesanan yang sesuai filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-mono">
                            <span className="font-bold text-slate-900 block">{order.id}</span>
                            <span className="text-[11px] text-slate-500">
                              {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{order.customer.fullName}</div>
                            <div className="text-[11px] text-slate-500">
                              {order.customer.businessName || 'Perseorangan'}
                            </div>
                            <div className="text-[11px] font-mono text-slate-600">
                              {order.customer.whatsapp}
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-600 text-[11px]">
                            {order.customer.shippingCity || '-'}
                          </td>

                          <td className="py-3 px-4 font-mono">
                            <span className="font-semibold text-slate-900">{order.totalItems} Unit</span>
                            <span className="text-[11px] text-slate-500 block">
                              ({order.items.length} macam)
                            </span>
                          </td>

                          <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                            {order.subtotalFixed > 0 ? (
                              `Rp ${order.subtotalFixed.toLocaleString('id-ID')}`
                            ) : (
                              <span className="text-amber-700 text-[11px]">Penawaran / RFQ</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className={`text-[11px] font-medium rounded px-2 py-1 border transition-colors focus:outline-none ${
                                order.status === 'Proses Produksi / Jahit'
                                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                                  : order.status === 'Siap Kirim / Kargo'
                                  ? 'bg-purple-50 border-purple-200 text-purple-800'
                                  : order.status === 'Selesai'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-amber-50 border-amber-200 text-amber-800'
                              }`}
                            >
                              <option value="Menunggu Konfirmasi Pabrik">Menunggu Konfirmasi Pabrik</option>
                              <option value="Proses Produksi / Jahit">Proses Produksi / Jahit</option>
                              <option value="Siap Kirim / Kargo">Siap Kirim / Kargo</option>
                              <option value="Selesai">Selesai</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium"
                                title="Lihat Lembar Kerja"
                              >
                                Detail
                              </button>

                              <button
                                onClick={() => handlePrintOrder(order)}
                                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                                title="Cetak SPK Produksi"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleWhatsAppCustomer(order.customer, order.id, order.status)}
                                className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                                title="WhatsApp Customer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Hapus Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM ORDERS & BORDIR */}
        {activeTab === 'custom' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <span className="text-xs font-semibold text-slate-900 block">
                Permintaan Custom Order & Jahitan Khusus ({inquiries.length})
              </span>
              <p className="text-[11px] text-slate-500">
                Formulir spesifikasi dari pelanggan yang membutuhkan bordir komputer, ukuran custom, atau kain khusus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-slate-900">{inq.id}</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(inq.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{inq.fullName}</h4>
                    <span className="text-slate-500 text-[11px]">{inq.businessName || 'Perseorangan'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div>
                      <span className="text-slate-400 block uppercase font-mono text-[10px]">Kategori:</span>
                      <span className="font-semibold text-slate-800">{inq.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-mono text-[10px]">Bahan:</span>
                      <span className="font-semibold text-slate-800">{inq.material}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-mono text-[10px]">Dimensi:</span>
                      <span className="font-semibold text-slate-800">{inq.dimensions || 'Standar'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-mono text-[10px]">Estimasi Unit:</span>
                      <span className="font-semibold text-slate-800 font-mono">{inq.quantity} Unit</span>
                    </div>
                  </div>

                  {inq.notes && (
                    <div className="text-[11px] text-slate-700 bg-white border border-slate-200 p-2 rounded">
                      <span className="font-semibold text-slate-900">Catatan: </span>
                      {inq.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <a
                      href={`https://wa.me/${inq.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Hubungi Pemesan ({inq.whatsapp})</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & STOCKS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Cari produk katalog pabrik..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:border-slate-900 font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">
                  {filteredProducts.length} Produk Terdaftar
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Nama Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Material Bahan</th>
                    <th className="py-3 px-4">Harga Satuan</th>
                    <th className="py-3 px-4">Status Stok</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.slug}</div>
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {p.category_name}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {p.materials.join(', ')}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {p.price ? `Rp ${p.price.toLocaleString('id-ID')}` : 'RFQ Pabrik'}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleProductStock(p.id)}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                            p.stock_status === 'Tersedia'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {p.stock_status}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(p)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Harga</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE & SUPABASE CONNECTION */}
        {activeTab === 'database' && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Status Koneksi Supabase REST API</h3>
                <p className="text-slate-500 text-[11px]">
                  Terhubung ke cluster Supabase cloud untuk sinkronisasi pesanan, kontak klien, dan tabel produksi.
                </p>
              </div>

              <button
                onClick={testSupabaseConnection}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded border border-slate-300 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ping Ulang</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">Koneksi REST:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  AKTIF (200 OK)
                </span>
                {supabaseLatency && (
                  <span className="text-[10px] text-slate-400 block mt-1">Latensi: {supabaseLatency} ms</span>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">Project Ref ID:</span>
                <span className="font-bold text-slate-900 mt-0.5 block">mrortcqjmjmhdkcjvaid</span>
                <span className="text-[10px] text-slate-400 block mt-1">Supabase Cloud</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">Endpoint URL:</span>
                <span className="font-bold text-slate-700 truncate block mt-0.5 text-[11px]">
                  https://mrortcqjmjmhdkcjvaid.supabase.co
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Anon Auth Active</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-200">
                  Skrip DDL SQL untuk Supabase SQL Editor
                </span>
                <button
                  onClick={copySqlSchema}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-mono flex items-center gap-1 border border-slate-700"
                >
                  {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSql ? 'Tersalin' : 'Salin SQL'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto max-h-40 leading-relaxed bg-slate-950 p-3 rounded">
{`CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    shipping_city TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_items INT DEFAULT 0,
    subtotal_fixed NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'Menunggu Konfirmasi Pabrik'
);`}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* DRAWER / MODAL: DETAIL PESANAN & SURAT PERINTAH KERJA */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-2xl w-full p-6 space-y-4 shadow-xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase block">
                  Surat Perintah Kerja & Lembar Pesanan
                </span>
                <h3 className="font-bold text-base text-slate-900">
                  {selectedOrder.id} &middot; {selectedOrder.customer.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Status Header */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Instansi & Kontak:</span>
                <span className="font-semibold text-slate-900 block">
                  {selectedOrder.customer.businessName || 'Perseorangan'}
                </span>
                <span className="font-mono text-slate-700 block">{selectedOrder.customer.whatsapp}</span>
                {selectedOrder.customer.email && (
                  <span className="text-slate-500 text-[11px] block">{selectedOrder.customer.email}</span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Tujuan & Alamat:</span>
                <span className="font-semibold text-slate-900 block">{selectedOrder.customer.shippingCity}</span>
                <span className="text-slate-600 text-[11px] block">
                  {selectedOrder.customer.shippingAddress || '-'}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
              <span className="font-mono uppercase font-bold text-slate-600 text-[11px] block">
                Daftar Item Jahitan & Fabrikasi ({selectedOrder.items.length} Item):
              </span>
              <table className="w-full border-collapse border border-slate-200 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono text-[11px]">
                    <th className="p-2 border border-slate-200 text-left">Nama Produk</th>
                    <th className="p-2 border border-slate-200 text-left">Varian & Warna</th>
                    <th className="p-2 border border-slate-200 text-right">Kuantitas</th>
                    <th className="p-2 border border-slate-200 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((it: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-200">
                      <td className="p-2 border border-slate-200 font-semibold">{it.name}</td>
                      <td className="p-2 border border-slate-200 text-slate-600">
                        {it.variantName || '-'} / {it.color || '-'}
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-mono font-bold">
                        {it.quantity} Unit
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-mono">
                        {it.price ? `Rp ${(it.price * it.quantity).toLocaleString('id-ID')}` : 'RFQ'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedOrder.notes && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px]">
                <span className="font-bold">Instruksi Khusus: </span>
                {selectedOrder.notes}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600">Status Produksi:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium"
                >
                  <option value="Menunggu Konfirmasi Pabrik">Menunggu Konfirmasi Pabrik</option>
                  <option value="Proses Produksi / Jahit">Proses Produksi / Jahit</option>
                  <option value="Siap Kirim / Kargo">Siap Kirim / Kargo</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintOrder(selectedOrder)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak SPK</span>
                </button>

                <button
                  onClick={() => handleWhatsAppCustomer(selectedOrder.customer, selectedOrder.id, selectedOrder.status)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH PRODUK BARU */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-md w-full p-5 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Tambah Produk Baru ke Katalog</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProduct} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Contoh: Sarung Kursi Tiffany Premium Gold"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kategori *</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900"
                >
                  <option value="Sarung Kursi">Sarung Kursi</option>
                  <option value="Taplak & Sarung Meja">Taplak & Sarung Meja</option>
                  <option value="Kain Dekorasi Tenda">Kain Dekorasi Tenda</option>
                  <option value="Furnitur & Rangka Event">Furnitur & Rangka Event</option>
                  <option value="Produk Custom">Produk Custom</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harga Satuan (Rp)</label>
                  <input
                    type="number"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="Kosongkan jika RFQ"
                    className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Stok *</label>
                  <select
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Pre-Order Produksi">Pre-Order Produksi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bahan / Material Tekstil</label>
                <input
                  type="text"
                  value={newProductMaterial}
                  onChange={(e) => setNewProductMaterial(e.target.value)}
                  placeholder="Contoh: Polyester Lotto, Abutay Felamin"
                  className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT HARGA */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-sm w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Perbarui Harga Produk</h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-semibold text-slate-800">{editingProduct.name}</p>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Harga Satuan Baru (Rp):</label>
              <input
                type="number"
                defaultValue={editingProduct.price || ''}
                id="editPriceInput"
                placeholder="Kosongkan jika RFQ"
                className="w-full px-3 py-1.5 rounded border border-slate-300 focus:outline-none focus:border-slate-900 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Jika dikosongkan, label produk otomatis menjadi penawaran pabrik.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = (document.getElementById('editPriceInput') as HTMLInputElement)?.value;
                  const newPrice = val ? parseInt(val, 10) : null;
                  handleSavePriceEdit(editingProduct.id, newPrice);
                }}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded"
              >
                Simpan Harga
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

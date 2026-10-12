# PT Prima Dekorasi Group - B2B Event Manufacturing Portal

Aplikasi web e-commerce & portal operasional manufaktur perlengkapan event B2B untuk **PT Prima Dekorasi Group** (sarung kursi hotel, taplak meja ballroom, plafon & tenda pesta, skirting prasmanan, dan custom order jahitan tekstil).

---

## 🌟 Fitur Utama

- **Katalog Produk & Spesifikasi B2B**: Sarung kursi futura/chitose, taplak meja bulat/kotak, plafon tenda, skirting meja, kain dekorasi.
- **Kalkulator & Form Kebutuhan Event**: Pengadaan skala besar dengan estimasi kebutuhan unit dan kain.
- **Sistem Checkout & Request for Quotation (RFQ)**: Terintegrasi langsung dengan pesan otomatis WhatsApp dan database Supabase.
- **Formulir Custom Order**: Pelanggan dapat mengajukan pesanan pola khusus, ukuran meja khusus, atau request bordir logo.
- **Portal Admin & ERP Manufaktur (`/adminlogin` & `/admin`)**:
  - Kata sandi login cepat: `admin123`
  - Manajemen antrean pesanan & SPK (Surat Perintah Kerja) jahit
  - Tracking status produksi (*Menunggu Konfirmasi, Proses Produksi / Jahit, Siap Kirim, Selesai*)
  - Tombol WhatsApp 1-klik untuk konfirmasi langsung ke pemesan
  - Export data pesanan ke file CSV (Excel / Google Sheets)
  - Edit harga produk & penambahan item katalog
  - Monitor koneksi database Supabase secara real-time
- **Favicon & Identitas Brand**: Terpasang menggunakan logo resmi PT Prima Dekorasi Group (`https://files.catbox.moe/v1fszb.png`).

---

## 🚀 Panduan Deploy ke GitHub & Cloudflare Pages

### 1. Push ke Repositori GitHub

Jalankan perintah ini di terminal komputer Anda:

```bash
# 1. Tambahkan remote repository GitHub Anda (ganti URL dengan milik Anda)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 2. Pastikan branch utama bernama main
git branch -M main

# 3. Push ke GitHub
git push -u origin main
```

---

### 2. Hubungkan ke Cloudflare Pages

1. Masuk ke dashboard Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Buka menu **Workers & Pages** > **Create application** > Pilih tab **Pages**.
3. Pilih **Connect to Git** dan pilih repositori GitHub yang baru Anda push.
4. Pada form **Build settings**:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. Pada menu **Environment variables (advanced)**, tambahkan:
   - `NODE_VERSION` = `20` *(Rekomendasi untuk Next.js 15)*
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mrortcqjmjmhdkcjvaid.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb3J0Y3FqbWptaGRrY2p2YWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDYzOTgsImV4cCI6MjEwNzE4MjM5OH0.EBQ5MkSNEgDiHql-pV8o6Dctqv_DABknenOXh-YPS8A`
6. Klik **Save and Deploy**.
7. Dalam 1-2 menit, website Anda sudah aktif dengan domain gratis `*.pages.dev` lengkap dengan HTTPS/SSL gratis dan proteksi DDoS global Cloudflare!

---

## 🛠️ Pengembangan Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server lokal
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🗄️ Skema Database Supabase

Jalankan script SQL berikut pada **SQL Editor** di Dashboard Supabase (`mrortcqjmjmhdkcjvaid`):

```sql
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    business_name TEXT,
    whatsapp TEXT NOT NULL,
    email TEXT,
    total_amount NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'pending',
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    delivery_address TEXT,
    event_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    business_name TEXT,
    whatsapp TEXT NOT NULL,
    email TEXT,
    category TEXT,
    target_date DATE,
    notes TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to orders" ON public.orders FOR ALL USING (true);

CREATE POLICY "Allow public insert to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to inquiries" ON public.inquiries FOR ALL USING (true);
```

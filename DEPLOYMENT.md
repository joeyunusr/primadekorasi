# PANDUAN PUSH KE GITHUB & DEPLOY KE CLOUDFLARE PAGES

Repository ini telah dikonfigurasi dan diuji build 100% sukses dengan Next.js 15, Tailwind CSS, Supabase, dan favicon resmi PT Prima Dekorasi Group (`https://files.catbox.moe/v1fszb.png`).

---

## 1. Cara Push ke Repositori GitHub Anda

Buka terminal pada komputer Anda (di folder project ini) dan jalankan perintah berikut:

```bash
# 1. Tambahkan remote URL repository GitHub Anda
# Ganti USERNAME dan REPO_NAME dengan akun & repo milik Anda
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 2. Pastikan berada di branch main
git branch -M main

# 3. Push seluruh kode ke GitHub
git push -u origin main
```

*(Jika Anda diminta login GitHub, gunakan GitHub Personal Access Token atau login via browser).*

---

## 2. Cara Mengaktifkan di Cloudflare Pages

1. Masuk ke dashboard Cloudflare: **[dash.cloudflare.com](https://dash.cloudflare.com/)**
2. Di menu sebelah kiri, klik **Compute (Workers & Pages)** -> **Create application** -> Pilih tab **Pages**.
3. Klik tombol **Connect to Git** dan pilih repository GitHub Anda yang baru saja di-push.
4. Pada halaman konfigurasi build:
   - **Project name**: `prima-dekorasi` (atau nama pilihan Anda)
   - **Production branch**: `main`
   - **Framework preset**: Pilih **Next.js**
   - **Build command**: `npm run build` (atau `npx @cloudflare/next-on-pages`)
   - **Build output directory**: `.next`

5. Tambahkan **Environment Variables** di Cloudflare:
   Klik bagian **Environment variables (advanced)** lalu tambahkan:
   - `NODE_VERSION` = `20` (Wajib untuk Next.js 15)
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mrortcqjmjmhdkcjvaid.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb3J0Y3FqbWptaGRrY2p2YWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDYzOTgsImV4cCI6MjEwNzE4MjM5OH0.EBQ5MkSNEgDiHql-pV8o6Dctqv_DABknenOXh-YPS8A`

6. Klik tombol **Save and Deploy**.
7. Tunggu proses build selesai (~1-2 menit). Website Anda akan langsung aktif dengan domain gratis `*.pages.dev` serta SSL otomatis dari Cloudflare!

---

## ⚠️ PENTING: Solusi Jika Muncul Error "Unknown lockfile version: bun.lock"

Jika saat build di Cloudflare muncul pesan error:
```
error: Unknown lockfile version at bun.lock:2:22
UnknownLockfileVersion: failed to parse lockfile: 'bun.lock'
```

**Penyebab**: File `bun.lock` ikut terunggah ke repo GitHub, sehingga Cloudflare mencoba menggunakan Bun v1.2.15 yang tidak kompatibel dengan format lockfile v2.

**Solusi (Pilih salah satu)**:
- **Cara A (Rekomendasi Utama)**: 
  1. Buka repository Anda di GitHub (`https://github.com/joeyunusr/primadekorasi`).
  2. Buka file **`bun.lock`** lalu klik ikon **Delete (ikon tempat sampah)** $\rightarrow$ **Commit changes**.
  3. Pastikan file **`package-lock.json`** ada di repo Anda.
  4. Cloudflare Pages akan otomatis re-deploy dan menggunakan **`npm install`** dengan sukses 100%!
- **Cara B (Jika ingin lewat terminal)**:
  Jalankan di terminal:
  ```bash
  git rm bun.lock
  git add package-lock.json .gitignore
  git commit -m "fix: remove bun.lock to use npm on cloudflare"
  git push origin main
  ```

---

## 3. Fitur yang Sudah Diterapkan & Teruji

- [x] **Favicon**: Terpasang otomatis menggunakan file resmi (`https://files.catbox.moe/v1fszb.png`) di metadata, `/favicon.ico`, dan `/icon.png`.
- [x] **Supabase Client**: Terhubung ke project `mrortcqjmjmhdkcjvaid` untuk autentikasi admin dan pencatatan pesanan otomatis.
- [x] **Admin Login & ERP Dashboard**: Terletak di `/adminlogin` (kata sandi: `admin123`) dan `/admin`.
- [x] **Zero Build Errors**: Telah lolos verifikasi kompilasi produksi `next build` dan `eslint`.

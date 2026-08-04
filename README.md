# Aura Sports Club

Aplikasi manajemen klub olahraga — Next.js 14 (App Router) + Supabase + Tailwind, tema **Gold / Black / White**.

## Fitur

| Halaman | Status |
|---|---|
| Masuk (Nama + Kode) | ✅ Aktif |
| Beranda | ✅ Aktif |
| Anggota | ✅ Aktif |
| Jadwal | ✅ Aktif |
| Pertandingan (Skor Live + Bagan Turnamen) | ✅ Aktif |
| Absensi | ✅ Aktif |
| Pembayaran (Iuran + Kas) | ✅ Aktif |
| Galeri | ✅ Aktif |
| Profil | ✅ Aktif |
| Peringkat, Statistik, Pengumuman, Pengaturan, Admin | 🔒 Segera Hadir (tabel database sudah siap) |

## Setup

### 1. Supabase
1. Buat project di supabase.com
2. Buka **SQL Editor**, jalankan **setiap file** di folder `sql/` satu per satu (urutan tidak masalah, kecuali `absensi.sql` dijalankan **setelah** `jadwal.sql` karena ada referensi)
3. Buka **Authentication → Sign In / Providers**, aktifkan **"Allow anonymous sign-ins"** (wajib, dipakai sistem login Nama+Kode)
4. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**

### 2. Environment variables
```
cp .env.example .env.local
```
Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dengan nilai dari langkah di atas.

### 3. Jalankan lokal
```
npm install
npm run dev
```

### 4. Kode akses login
Kode default: `aura2026` — ganti di `lib/autentikasi.js`, baris:
```js
export const KODE_KLUB = "aura2026";
```

### 5. Deploy ke Vercel
Push ke GitHub → Import di vercel.com → isi Environment Variables yang sama seperti `.env.local` → Deploy.

## Struktur Proyek

```
Aura-Sports-Club/
├── app/
│   ├── masuk/              halaman login (publik)
│   ├── (app)/               route group berlogin (Sidebar otomatis terpasang)
│   │   ├── layout.js
│   │   ├── beranda/
│   │   ├── anggota/
│   │   ├── jadwal/
│   │   ├── pertandingan/    skor live + bagan (1 halaman, 2 tab)
│   │   ├── peringkat/       segera hadir
│   │   ├── statistik/       segera hadir
│   │   ├── absensi/
│   │   ├── pembayaran/      iuran + kas (1 halaman, 2 tab)
│   │   ├── galeri/
│   │   ├── pengumuman/      segera hadir
│   │   ├── profil/
│   │   ├── pengaturan/      segera hadir
│   │   └── admin/           segera hadir
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── komponen/                (bukan components/, sesuai permintaan)
├── lib/
├── sql/
├── public/{logo,banner,ikon,gambar}
├── styles/{warna.css, tema.css, animasi.css}
└── middleware.js
```

## Catatan jujur — penyesuaian dari daftar file asli Anda

Beberapa file/tabel saya tambahkan **di luar** daftar yang Anda berikan, karena
dibutuhkan supaya fitur yang sudah jalan (Pembayaran, Kas, Galeri) tidak hilang:

- `lib/supabase-server.js` — dibutuhkan untuk proteksi login di server
- `sql/pembayaran.sql`, `sql/galeri.sql` — dibutuhkan 2 fitur di atas
- Folder `app/(app)/pembayaran` — menu "Pembayaran" tidak ada di 13 folder asli Anda, saya tambahkan sebagai folder ke-14

Semua penambahan ini ditandai dengan komentar `Catatan:` di masing-masing file.

## Logo

`app/layout.js` mereferensikan `/logo/logo.png` untuk favicon. Upload file logo
Anda ke `public/logo/logo.png` — sebelum itu, favicon akan tampil default dulu.

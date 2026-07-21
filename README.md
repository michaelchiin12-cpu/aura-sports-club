# Aura Sports Club — Dashboard Member

Dashboard member untuk klub olahraga: login, dan jadwal latihan/kelas yang
diambil langsung dari database Supabase.

Stack: **Next.js 14 (App Router)** · **Tailwind CSS** · **Supabase (Auth + Database)** · **Vercel (hosting gratis)**

---

## 1. Siapkan Supabase (gratis)

1. Buat akun di https://supabase.com lalu klik **New Project**.
2. Setelah project selesai dibuat, buka **SQL Editor** → **New query**.
3. Salin seluruh isi file `sql/schema.sql` di folder ini, tempel, lalu **Run**.
   Ini akan membuat tabel `jadwal_latihan`, mengaktifkan keamanan (RLS), dan
   mengisi 6 contoh jadwal.
4. Buka **Authentication → Users → Add user**, buat 1 akun untuk login
   (misalnya email admin/member klub). Ini akun yang dipakai login ke
   dashboard — bukan pendaftaran publik.
5. Buka **Project Settings → API**, salin:
   - `Project URL`
   - `anon public key`

## 2. Jalankan di komputer Anda

```bash
# 1. Install dependencies
npm install

# 2. Salin file environment
cp .env.example .env.local
```

Buka `.env.local`, isi dengan data dari Supabase langkah 1.5:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
```

Lalu jalankan:

```bash
npm run dev
```

Buka http://localhost:3000 — akan otomatis diarahkan ke halaman **Login**.
Login memakai akun yang dibuat di langkah 1.4, lalu Anda akan masuk ke
**Dashboard → Jadwal Latihan**.

## 3. Deploy gratis ke Vercel

1. Push folder ini ke repository GitHub baru.
2. Buka https://vercel.com → **Add New Project** → pilih repo tadi.
3. Saat diminta **Environment Variables**, isi `NEXT_PUBLIC_SUPABASE_URL`
   dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` (nilai yang sama seperti `.env.local`).
4. Klik **Deploy**. Selesai — website online di `nama-project.vercel.app`,
   gratis, dengan SSL otomatis.

## 4. Mengelola jadwal latihan

Untuk sekarang, jadwal ditambah/diubah langsung lewat **Supabase → Table
Editor → jadwal_latihan** (tanpa perlu coding). Kolom yang tersedia:

| Kolom | Keterangan |
|---|---|
| `hari` | Senin–Minggu |
| `jam_mulai` / `jam_selesai` | format 24 jam, mis. `18:00` |
| `nama_kelas` | nama sesi latihan |
| `pelatih` | nama pelatih |
| `status` | `Buka`, `Penuh`, atau `Libur` |

## 5. Struktur proyek

```
aura-sports-club/
├─ app/
│  ├─ login/page.js         # halaman login
│  ├─ dashboard/
│  │  ├─ layout.js          # sidebar + proteksi login
│  │  └─ page.js            # tampilan jadwal latihan
│  ├─ layout.js             # font & metadata global
│  └─ globals.css           # tema warna & tipografi
├─ components/Sidebar.jsx
├─ lib/supabaseClient.js    # koneksi Supabase (browser)
├─ lib/supabaseServer.js    # koneksi Supabase (server)
├─ middleware.js            # redirect otomatis jika belum login
└─ sql/schema.sql           # skrip database siap pakai
```

## 6. Rencana pengembangan lanjutan

Struktur ini sengaja dibuat sederhana dan gratis dulu (Supabase Free Tier +
Vercel Hobby). Fitur yang bisa ditambahkan berikutnya tanpa mengubah
fondasi: profil member, absensi, statistik kehadiran, notifikasi WhatsApp/email,
dan panel admin untuk kelola jadwal langsung dari dashboard (bukan dari
Supabase Table Editor).

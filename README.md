# 🦝 RakunKecil HQ — Smart Badminton Match Scheduler

Single-file web app buat ngatur sesi main badminton: pemain, jadwal otomatis
(weighted fairness algorithm, bukan random), input skor, leaderboard, TV mode,
dan analitik. Semua jalan di browser, gak butuh server/backend — data
tersimpan di `localStorage`.

## Cara pakai

Gak ada build step. Tinggal buka `index.html` langsung di browser, atau kalau
mau di-host via **GitHub Pages**: Settings → Pages → set source ke branch ini
(root), otomatis jalan di `https://<username>.github.io/<repo>/`.

## Struktur

```
.
├── index.html   ← seluruh app (HTML + CSS + JS jadi satu file)
└── README.md
```

Satu file dipilih dengan sengaja: gampang di-deploy (upload langsung / GitHub
Pages tanpa config), gampang dibagi ke orang lain (kirim 1 file), gak ada
dependency/build tool. Kalau nanti proyeknya makin gede (lihat Roadmap di
bawah), masuk akal buat dipecah jadi `index.html` + `css/style.css` +
`js/app.js`.

## Fitur saat ini (Fun Session module)

- Manajemen pemain: level (Beginner/Intermediate/Advanced) atau rating custom 1-10
- Preferred Partner, Avoid Partner (hard rule), Avoid Opponent
- Scheduler weighted-optimization: minimalin penalti ulang partner, ulang
  lawan, ketidakseimbangan skill, dan ulang court — bukan random shuffle
- Mode Ganda (2v2) & Tunggal (1v1)
- Tipe Sesi: Fun / Balanced / Competitive / Random (ubah bobot algoritma)
- Team Balance Score (⭐) + Match Quality badge per match
- Smart warnings (main berturut-turut, kelamaan nunggu, lawan tersering)
- Live editing: pemain keluar/cedera tengah sesi → match pending-nya
  otomatis dibatalin & slot-nya dicoba diisi ulang
- Manual override: tuker pemain/court di match yang belum main
- Leaderboard + riwayat (partner favorit, lawan tersering)
- Analitik: match per pemain, pemakaian court, distribusi skill
- TV Mode (fullscreen, teks besar, buat ditaro di tablet/TV deket lapangan)
- Dark/light theme

## ⚠️ Known issues (belum dibenerin di versi ini)

1. **Partner rotation stuck di 2 grup tetap** — kalau jumlah pemain pas-pasan
   sama kapasitas lapangan (misal 8 pemain / 1 lapangan), pemain bisa kebagi
   jadi 2 grup fixed yang gantian maju tapi gak pernah campur satu sama lain.
   Root cause udah ketemu (tie-break `restStreak` bikin lockstep), fix-nya
   nambahin faktor "hindari co-occurrence berulang" ke seleksi pemain per
   ronde — belum diterapkan ke file ini.
2. **"Mulai Sesi Baru" gak nge-reset tampilan Jadwal** — ronde dari sesi lama
   masih numpuk keliatan di tab Jadwal, harusnya sesi baru mulai kosong dan
   sesi lama pindah ke semacam riwayat.
3. **Leaderboard belum beda tampilan buat mode Ganda** — harusnya ada
   ranking per-pasangan (mis. "Andi & Budi") selain ranking individu, khusus
   pas mode Ganda.

## 🗺️ Roadmap (spec diterima, belum diimplementasi)

Dokumen requirement tambahan udah diterima buat pengembangan berikutnya:

- **Match Rules** — preset skor configurable per sesi: Community Fast (15,
  no deuce), Community Standard (17, no deuce), BWF Official (21, win-by-2,
  max 30), atau Custom. Estimasi durasi otomatis ngikutin ini + jumlah
  court + format + jumlah peserta.
- **Tournament module** (terpisah dari Fun Session, gak boleh ganggu fitur
  yang udah ada) — bracket knockout otomatis (byes, seeding, Round of
  32/16 → QF → SF → Final) berdasarkan jumlah peserta, organizer cuma pilih
  format. Ada Tournament Preview (estimasi durasi, rekomendasi kalau
  konfigurasinya kurang efisien) sebelum di-generate.
- **Fixed Partner (hard rule)** — mode di mana partner yang udah
  ke-generate jadi permanen sepanjang sesi/turnamen (cuma lawan & court yang
  rotasi), prioritasnya di atas fairness rotation biasa.
- **History module** — riwayat Fun Session & Tournament terpisah, dengan
  search/filter/sort, dan aksi per item: rename, duplicate (config doang,
  tanpa hasil skor), export, delete.
- **Navigasi disederhanakan** — tab Analitik dihapus (fungsinya udah
  ke-cover di Leaderboard + History), struktur akhir: Dashboard, Players,
  Fun Session, Tournament, Leaderboard, History, Settings.
- Prinsip organizer-in-control tetap dipegang: semua hasil generate (jadwal,
  bracket, grup, skor) harus tetap bisa diedit manual, dan perubahan manual
  selalu menang dibanding hasil generate ulang.

## Data & privasi

Semua data (pemain, jadwal, skor, riwayat) tersimpan lokal di browser
(`localStorage`), gak dikirim ke server manapun. Ganti device/browser =
mulai dari data kosong lagi, kecuali di-export manual.

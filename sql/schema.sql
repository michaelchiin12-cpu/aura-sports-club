-- =========================================================
-- AURA SPORTS CLUB — SKEMA DATABASE SUPABASE
-- Jalankan seluruh isi file ini di: Supabase Dashboard > SQL Editor > New query
-- =========================================================

-- 1. Tabel jadwal latihan / kelas
create table if not exists jadwal_latihan (
  id uuid primary key default gen_random_uuid(),
  hari text not null check (hari in ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')),
  jam_mulai time not null,
  jam_selesai time not null,
  nama_kelas text not null,
  pelatih text,
  kapasitas int default 20,
  status text default 'Buka' check (status in ('Buka','Penuh','Libur')),
  created_at timestamp with time zone default now()
);

-- 2. Aktifkan Row Level Security
alter table jadwal_latihan enable row level security;

-- 3. Kebijakan: semua user yang sudah login (member) boleh membaca jadwal
create policy "Member bisa melihat jadwal"
  on jadwal_latihan for select
  using (auth.role() = 'authenticated');

-- (Opsional) Kebijakan admin untuk insert/update/delete bisa ditambahkan
-- belakangan dengan mengecek kolom role di tabel profil member.

-- 4. Contoh data jadwal awal — silakan ubah sesuai klub Anda
insert into jadwal_latihan (hari, jam_mulai, jam_selesai, nama_kelas, pelatih, status)
values
  ('Senin', '06:00', '07:30', 'Lari Pagi & Interval', 'Coach Rangga', 'Buka'),
  ('Senin', '18:00', '19:30', 'Latihan Fisik Tim', 'Coach Dinda', 'Buka'),
  ('Rabu', '17:00', '18:30', 'Teknik & Taktik', 'Coach Rangga', 'Penuh'),
  ('Jumat', '06:00', '07:00', 'Recovery & Stretching', 'Coach Dinda', 'Buka'),
  ('Sabtu', '08:00', '10:00', 'Sparring / Uji Tanding', 'Coach Rangga', 'Buka'),
  ('Minggu', '00:00', '00:00', 'Libur Klub', null, 'Libur');

-- =========================================================
-- CATATAN
-- - Untuk menambah member/akun login, buat lewat:
--   Supabase Dashboard > Authentication > Users > Add User
-- - Aplikasi hanya butuh NEXT_PUBLIC_SUPABASE_URL dan
--   NEXT_PUBLIC_SUPABASE_ANON_KEY (lihat Project Settings > API).
-- =========================================================

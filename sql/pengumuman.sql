create table if not exists pengumuman (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  isi text not null,
  penting boolean default false,
  created_at timestamp with time zone default now()
);

alter table pengumuman enable row level security;

create policy "Baca pengumuman" on pengumuman for select using (auth.role() = 'authenticated');
create policy "Tambah pengumuman" on pengumuman for insert with check (auth.role() = 'authenticated');

-- Catatan: tabel ini disiapkan lebih dulu, tapi halaman /pengumuman masih
-- berstatus "Segera Hadir".

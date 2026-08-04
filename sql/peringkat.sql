create table if not exists peringkat (
  id uuid primary key default gen_random_uuid(),
  nama_anggota text not null,
  poin int default 0,
  menang int default 0,
  kalah int default 0,
  seri int default 0,
  updated_at timestamp with time zone default now()
);

alter table peringkat enable row level security;

create policy "Baca peringkat" on peringkat for select using (auth.role() = 'authenticated');
create policy "Ubah peringkat" on peringkat for update using (auth.role() = 'authenticated');
create policy "Tambah peringkat" on peringkat for insert with check (auth.role() = 'authenticated');

-- Catatan: tabel ini disiapkan lebih dulu, tapi halaman /peringkat masih
-- berstatus "Segera Hadir" — belum ada UI yang membaca/menulis ke sini.

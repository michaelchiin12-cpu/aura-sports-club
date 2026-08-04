create table if not exists statistik_klub (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  nilai text not null,
  keterangan text,
  updated_at timestamp with time zone default now()
);

alter table statistik_klub enable row level security;

create policy "Baca statistik" on statistik_klub for select using (auth.role() = 'authenticated');
create policy "Ubah statistik" on statistik_klub for update using (auth.role() = 'authenticated');
create policy "Tambah statistik" on statistik_klub for insert with check (auth.role() = 'authenticated');

-- Catatan: tabel ini disiapkan lebih dulu, tapi halaman /statistik masih
-- berstatus "Segera Hadir".

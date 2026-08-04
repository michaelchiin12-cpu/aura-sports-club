-- Catatan: file ini di luar 7 file sql/ yang Anda sebutkan, tapi WAJIB ada
-- karena halaman /galeri (fitur yang sudah jalan) butuh ini.

create table if not exists galeri (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  url text not null,
  kategori text default 'Umum',
  created_at timestamp with time zone default now()
);

alter table galeri enable row level security;
create policy "Baca galeri" on galeri for select using (auth.role() = 'authenticated');
create policy "Tambah galeri" on galeri for insert with check (auth.role() = 'authenticated');

-- Catatan: file ini di luar 7 file sql/ yang Anda sebutkan, tapi WAJIB ada
-- karena halaman /pembayaran (fitur keuangan yang sudah jalan) butuh ini.

create table if not exists pembayaran (
  id uuid primary key default gen_random_uuid(),
  nama_anggota text not null,
  periode text not null,
  jumlah numeric not null default 0,
  status text default 'Belum Lunas' check (status in ('Lunas','Belum Lunas')),
  tanggal_bayar date,
  created_at timestamp with time zone default now()
);

alter table pembayaran enable row level security;
create policy "Baca pembayaran" on pembayaran for select using (auth.role() = 'authenticated');
create policy "Tambah pembayaran" on pembayaran for insert with check (auth.role() = 'authenticated');
create policy "Ubah pembayaran" on pembayaran for update using (auth.role() = 'authenticated');

create table if not exists kas_transaksi (
  id uuid primary key default gen_random_uuid(),
  tanggal date not null default current_date,
  keterangan text not null,
  tipe text not null check (tipe in ('Masuk','Keluar')),
  jumlah numeric not null,
  created_at timestamp with time zone default now()
);

alter table kas_transaksi enable row level security;
create policy "Baca kas" on kas_transaksi for select using (auth.role() = 'authenticated');
create policy "Catat kas" on kas_transaksi for insert with check (auth.role() = 'authenticated');

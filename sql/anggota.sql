create table if not exists anggota (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  email text,
  no_hp text,
  role text default 'member' check (role in ('admin','member')),
  status text default 'Aktif' check (status in ('Aktif','Nonaktif')),
  tanggal_gabung date default current_date,
  created_at timestamp with time zone default now()
);

alter table anggota enable row level security;

create policy "Baca anggota" on anggota for select using (auth.role() = 'authenticated');
create policy "Tambah anggota" on anggota for insert with check (auth.role() = 'authenticated');
create policy "Ubah anggota" on anggota for update using (auth.role() = 'authenticated');
create policy "Hapus anggota" on anggota for delete using (auth.role() = 'authenticated');

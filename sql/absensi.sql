create table if not exists absensi (
  id uuid primary key default gen_random_uuid(),
  jadwal_id uuid references jadwal_latihan(id) on delete set null,
  nama_anggota text not null,
  tanggal date not null default current_date,
  status text default 'Hadir' check (status in ('Hadir','Izin','Alpa')),
  created_at timestamp with time zone default now()
);

alter table absensi enable row level security;

create policy "Baca absensi" on absensi for select using (auth.role() = 'authenticated');
create policy "Catat absensi" on absensi for insert with check (auth.role() = 'authenticated');

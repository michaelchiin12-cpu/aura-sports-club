create table if not exists jadwal_latihan (
  id uuid primary key default gen_random_uuid(),
  hari text not null check (hari in ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu')),
  jam_mulai time not null,
  jam_selesai time not null,
  nama_kelas text not null,
  pelatih text,
  status text default 'Buka' check (status in ('Buka','Penuh','Libur')),
  created_at timestamp with time zone default now()
);

alter table jadwal_latihan enable row level security;

create policy "Baca jadwal" on jadwal_latihan for select using (auth.role() = 'authenticated');
create policy "Tambah jadwal" on jadwal_latihan for insert with check (auth.role() = 'authenticated');
create policy "Hapus jadwal" on jadwal_latihan for delete using (auth.role() = 'authenticated');

insert into jadwal_latihan (hari, jam_mulai, jam_selesai, nama_kelas, pelatih, status) values
  ('Senin', '18:00', '19:30', 'Latihan Reguler', 'Coach Rangga', 'Buka'),
  ('Rabu', '18:00', '19:30', 'Latihan Teknik', 'Coach Dinda', 'Buka'),
  ('Sabtu', '08:00', '10:00', 'Sparring / Fun Match', 'Coach Rangga', 'Buka');

create table if not exists pertandingan (
  id uuid primary key default gen_random_uuid(),
  ronde text not null,
  urutan int default 1,
  tim_a text not null,
  tim_b text not null,
  skor_a int default 0,
  skor_b int default 0,
  status text default 'Belum Mulai' check (status in ('Belum Mulai','Berlangsung','Selesai')),
  updated_at timestamp with time zone default now()
);

alter table pertandingan enable row level security;

create policy "Baca pertandingan" on pertandingan for select using (auth.role() = 'authenticated');
create policy "Ubah pertandingan" on pertandingan for update using (auth.role() = 'authenticated');
create policy "Tambah pertandingan" on pertandingan for insert with check (auth.role() = 'authenticated');

alter publication supabase_realtime add table pertandingan;

insert into pertandingan (ronde, urutan, tim_a, tim_b, status) values
  ('Semifinal', 1, 'Aura A', 'Rival Club', 'Belum Mulai'),
  ('Semifinal', 2, 'Aura B', 'Garuda Muda', 'Belum Mulai'),
  ('Final', 1, 'Menunggu', 'Menunggu', 'Belum Mulai');

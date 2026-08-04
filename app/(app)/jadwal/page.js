"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import KartuJadwal from "@/komponen/KartuJadwal";
import TombolUtama from "@/komponen/TombolUtama";
import Loader from "@/komponen/Loader";
import { Plus } from "lucide-react";

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function JadwalPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ hari: "Senin", nama_kelas: "", pelatih: "", jam_mulai: "18:00", jam_selesai: "19:30", status: "Buka" });

  async function muat() {
    setLoading(true);
    const { data } = await supabase.from("jadwal_latihan").select("*").order("hari");
    setData(data || []);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");
    })();
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleTambah(e) {
    e.preventDefault();
    if (!form.nama_kelas.trim()) return;
    setSaving(true);
    await supabase.from("jadwal_latihan").insert(form);
    setForm({ ...form, nama_kelas: "" });
    setSaving(false);
    muat();
  }

  async function handleHapus(id) {
    await supabase.from("jadwal_latihan").delete().eq("id", id);
    muat();
  }

  const grup = HARI.map((h) => ({ hari: h, kelas: data.filter((d) => d.hari === h) })).filter((g) => g.kelas.length > 0);

  return (
    <div>
      <Header nama={nama} subjudul="Kelola jadwal latihan klub." />

      <form onSubmit={handleTambah} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        <select value={form.hari} onChange={(e) => setForm({ ...form, hari: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper">
          {HARI.map((h) => <option key={h}>{h}</option>)}
        </select>
        <input required placeholder="Nama kelas" value={form.nama_kelas} onChange={(e) => setForm({ ...form, nama_kelas: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <input placeholder="Pelatih" value={form.pelatih} onChange={(e) => setForm({ ...form, pelatih: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <input type="time" value={form.jam_mulai} onChange={(e) => setForm({ ...form, jam_mulai: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <input type="time" value={form.jam_selesai} onChange={(e) => setForm({ ...form, jam_selesai: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <TombolUtama type="submit" icon={Plus} disabled={saving}>{saving ? "..." : "Tambah"}</TombolUtama>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {grup.map((g) => (
            <div key={g.hari} className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-ink-line font-display font-semibold text-paper">{g.hari}</div>
              {g.kelas.map((k) => (
                <KartuJadwal key={k.id} item={k} onHapus={handleHapus} />
              ))}
            </div>
          ))}
          {grup.length === 0 && <div className="bg-ink-soft border border-ink-line rounded-xl p-8 text-center text-mist text-sm">Belum ada jadwal.</div>}
        </div>
      )}
    </div>
  );
}

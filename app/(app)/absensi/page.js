"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import TombolUtama from "@/komponen/TombolUtama";
import Loader from "@/komponen/Loader";

const GAYA_STATUS = {
  Hadir: "bg-go/15 text-go border-go/30",
  Izin: "bg-warn/15 text-warn border-warn/30",
  Alpa: "bg-pulse/15 text-pulse border-pulse/30",
};

export default function AbsensiPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [jadwalList, setJadwalList] = useState([]);
  const [riwayat, setRiwayat] = useState([]);
  const [form, setForm] = useState({ nama_anggota: "", jadwal_id: "", tanggal: new Date().toISOString().slice(0, 10), status: "Hadir" });

  async function muat() {
    setLoading(true);
    const [{ data: jw }, { data: ab }] = await Promise.all([
      supabase.from("jadwal_latihan").select("id, hari, nama_kelas"),
      supabase.from("absensi").select("*, jadwal_latihan(nama_kelas)").order("tanggal", { ascending: false }).limit(30),
    ]);
    setJadwalList(jw || []);
    setRiwayat(ab || []);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");
      setForm((f) => ({ ...f, nama_anggota: user?.user_metadata?.full_name || "" }));
    })();
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCatat(e) {
    e.preventDefault();
    if (!form.nama_anggota || !form.jadwal_id) return;
    setSaving(true);
    await supabase.from("absensi").insert(form);
    setSaving(false);
    muat();
  }

  return (
    <div>
      <Header nama={nama} subjudul="Catat kehadiran latihan." />

      <form onSubmit={handleCatat} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <input required placeholder="Nama" value={form.nama_anggota} onChange={(e) => setForm({ ...form, nama_anggota: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <select required value={form.jadwal_id} onChange={(e) => setForm({ ...form, jadwal_id: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper">
          <option value="">Pilih kelas</option>
          {jadwalList.map((j) => <option key={j.id} value={j.id}>{j.hari} — {j.nama_kelas}</option>)}
        </select>
        <input type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper">
          <option>Hadir</option><option>Izin</option><option>Alpa</option>
        </select>
        <TombolUtama type="submit" disabled={saving}>{saving ? "..." : "Catat"}</TombolUtama>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-ink-line font-display font-semibold text-paper">Riwayat Terbaru</div>
          {riwayat.length === 0 ? (
            <p className="text-mist text-sm p-6">Belum ada data.</p>
          ) : (
            riwayat.map((r) => (
              <div key={r.id} className="px-5 py-3 flex items-center justify-between border-b border-ink-line last:border-b-0">
                <div>
                  <p className="text-paper font-medium text-sm">{r.nama_anggota}</p>
                  <p className="text-mist text-xs font-mono">{r.tanggal} · {r.jadwal_latihan?.nama_kelas || "-"}</p>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border ${GAYA_STATUS[r.status]}`}>{r.status}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import KartuAnggota from "@/komponen/KartuAnggota";
import TombolUtama from "@/komponen/TombolUtama";
import Loader from "@/komponen/Loader";
import { Plus } from "lucide-react";

export default function AnggotaPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [daftar, setDaftar] = useState([]);
  const [form, setForm] = useState({ nama: "", email: "", no_hp: "", role: "member" });

  async function muat() {
    setLoading(true);
    const { data } = await supabase.from("anggota").select("*").order("created_at", { ascending: false });
    setDaftar(data || []);
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
    if (!form.nama.trim()) return;
    setSaving(true);
    await supabase.from("anggota").insert(form);
    setForm({ nama: "", email: "", no_hp: "", role: "member" });
    setSaving(false);
    muat();
  }

  return (
    <div>
      <Header nama={nama} subjudul="Kelola data anggota klub." />

      <form onSubmit={handleTambah} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs text-mist mb-2 uppercase tracking-wide">Nama</label>
          <input
            required
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper outline-none focus:border-aura"
          />
        </div>
        <div>
          <label className="block text-xs text-mist mb-2 uppercase tracking-wide">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper outline-none focus:border-aura"
          />
        </div>
        <div>
          <label className="block text-xs text-mist mb-2 uppercase tracking-wide">No. HP</label>
          <input
            value={form.no_hp}
            onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
            className="w-full bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper outline-none focus:border-aura"
          />
        </div>
        <TombolUtama type="submit" icon={Plus} disabled={saving}>
          {saving ? "..." : "Tambah"}
        </TombolUtama>
      </form>

      {loading ? (
        <Loader />
      ) : daftar.length === 0 ? (
        <div className="bg-ink-soft border border-ink-line rounded-xl p-8 text-center text-mist text-sm">
          Belum ada anggota terdaftar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {daftar.map((a) => (
            <KartuAnggota key={a.id} anggota={a} />
          ))}
        </div>
      )}
    </div>
  );
}

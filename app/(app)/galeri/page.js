"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import TombolUtama from "@/komponen/TombolUtama";
import Loader from "@/komponen/Loader";

export default function GaleriPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ judul: "", url: "", kategori: "Umum" });

  async function muat() {
    setLoading(true);
    const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
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
    if (!form.judul || !form.url) return;
    await supabase.from("galeri").insert(form);
    setForm({ judul: "", url: "", kategori: "Umum" });
    muat();
  }

  const kategoriUnik = [...new Set(data.map((d) => d.kategori || "Umum"))];

  return (
    <div>
      <Header nama={nama} subjudul="Foto dan video kegiatan klub." />

      <form onSubmit={handleTambah} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input required placeholder="Judul" value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <input required placeholder="Link (Drive/YouTube/dll)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper md:col-span-2" />
        <input placeholder="Kategori" value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
        <TombolUtama type="submit" className="md:col-span-4 md:w-fit">Simpan</TombolUtama>
      </form>

      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="bg-ink-soft border border-ink-line rounded-xl p-8 text-center text-mist text-sm">Belum ada galeri.</div>
      ) : (
        kategoriUnik.map((kat) => (
          <div key={kat} className="mb-6">
            <p className="text-xs text-mist uppercase font-mono mb-3">{kat}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.filter((d) => (d.kategori || "Umum") === kat).map((d) => (
                <a key={d.id} href={d.url} target="_blank" rel="noreferrer" className="bg-ink-soft border border-ink-line hover:border-aura/40 rounded-xl p-4">
                  <p className="text-paper font-medium text-sm">{d.judul}</p>
                  <p className="text-aura text-xs mt-1 truncate font-mono">{d.url}</p>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

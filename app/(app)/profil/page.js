"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import { inisial } from "@/lib/helper";
import Header from "@/komponen/Header";
import TombolUtama from "@/komponen/TombolUtama";

export default function ProfilPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [namaBaru, setNamaBaru] = useState("");
  const [saving, setSaving] = useState(false);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      const n = user?.user_metadata?.full_name || "Member";
      setNama(n);
      setNamaBaru(n);
    })();
  }, []);

  async function simpan(e) {
    e.preventDefault();
    setSaving(true);
    await supabase.auth.updateUser({ data: { full_name: namaBaru.trim() } });
    setNama(namaBaru.trim());
    setSaving(false);
    setPesan("Nama berhasil diperbarui.");
    setTimeout(() => setPesan(""), 2500);
  }

  return (
    <div>
      <Header nama={nama} subjudul="Kelola profil kamu." />

      <div className="bg-ink-soft border border-ink-line rounded-2xl p-6 max-w-md">
        <div className="w-16 h-16 rounded-full bg-aura/15 border border-aura/30 flex items-center justify-center text-aura font-display text-xl font-bold mb-5">
          {inisial(nama)}
        </div>
        <form onSubmit={simpan}>
          <label className="block text-xs text-mist mb-2 uppercase tracking-wide">Nama</label>
          <input
            value={namaBaru}
            onChange={(e) => setNamaBaru(e.target.value)}
            className="w-full bg-ink border border-ink-line rounded-lg px-4 py-2.5 text-paper mb-4 outline-none focus:border-aura"
          />
          {pesan && <p className="text-go text-sm mb-4">{pesan}</p>}
          <TombolUtama type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan Perubahan"}</TombolUtama>
        </form>
      </div>
    </div>
  );
}

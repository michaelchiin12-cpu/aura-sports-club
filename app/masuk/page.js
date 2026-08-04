"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginDenganKode } from "@/lib/autentikasi";
import TombolUtama from "@/komponen/TombolUtama";

export default function HalamanMasuk() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const hasil = await loginDenganKode(nama, kode);
    setLoading(false);
    if (hasil.error) {
      setError(hasil.error);
      return;
    }
    router.replace("/beranda");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-ink bg-aura-glow flex flex-col items-center justify-center px-6 py-10">
      <img
        src="/logo/logo-lengkap.png"
        alt="Aura Sports Club"
        className="w-full max-w-[260px] mb-8 animasi-masuk"
      />

      <div className="w-full max-w-sm">
        <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden cincin-emas animasi-masuk">
          <div className="px-8 pt-9 pb-6 text-center bg-gradient-to-b from-aura/10 to-transparent">
            <div className="w-[70px] h-[70px] rounded-full mx-auto mb-4 border-2 border-aura/40 bg-black overflow-hidden">
              <img src="/logo/logo-ikon.png" alt="" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-display text-2xl font-bold text-paper tracking-tight">MASUK KE AURA</h1>
            <p className="text-mist text-sm mt-1">Masukkan nama dan kode akses Anda</p>
          </div>

          <div className="px-8 pb-9 pt-2">
            <form onSubmit={handleSubmit}>
              <label className="block text-xs font-medium text-mist mb-2 uppercase tracking-wide">Nama</label>
              <input
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full bg-ink border border-ink-line rounded-lg px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none focus:border-aura mb-4"
              />
              <label className="block text-xs font-medium text-mist mb-2 uppercase tracking-wide">Kode Akses</label>
              <input
                required
                type="password"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                placeholder="Kode dari pengurus klub"
                className="w-full bg-ink border border-ink-line rounded-lg px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none focus:border-aura mb-4"
              />
              {error && <p className="text-pulse text-sm mb-4">{error}</p>}
              <TombolUtama type="submit" disabled={loading} className="w-full py-3">
                {loading ? "Memproses..." : "MASUK"}
              </TombolUtama>
            </form>

            <p className="text-center text-mist text-xs mt-6">Aura Sports Club</p>
          </div>
        </div>
      </div>
    </main>
  );
}

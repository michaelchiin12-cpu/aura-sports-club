"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import { formatRupiah } from "@/lib/format";
import Header from "@/komponen/Header";
import TombolUtama from "@/komponen/TombolUtama";
import Loader from "@/komponen/Loader";

export default function PembayaranPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [tab, setTab] = useState("iuran");
  const [loading, setLoading] = useState(true);
  const [iuran, setIuran] = useState([]);
  const [kas, setKas] = useState([]);
  const [formIuran, setFormIuran] = useState({ nama_anggota: "", periode: new Date().toISOString().slice(0, 7), jumlah: "" });
  const [formKas, setFormKas] = useState({ keterangan: "", tanggal: new Date().toISOString().slice(0, 10), jumlah: "", tipe: "Masuk" });

  async function muat() {
    setLoading(true);
    const [{ data: i }, { data: k }] = await Promise.all([
      supabase.from("pembayaran").select("*").order("periode", { ascending: false }),
      supabase.from("kas_transaksi").select("*").order("tanggal", { ascending: false }),
    ]);
    setIuran(i || []);
    setKas(k || []);
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

  async function tambahIuran(e) {
    e.preventDefault();
    if (!formIuran.nama_anggota || !formIuran.jumlah) return;
    await supabase.from("pembayaran").insert({ ...formIuran, jumlah: Number(formIuran.jumlah), status: "Belum Lunas" });
    setFormIuran({ ...formIuran, nama_anggota: "", jumlah: "" });
    muat();
  }
  async function toggleLunas(item) {
    const statusBaru = item.status === "Lunas" ? "Belum Lunas" : "Lunas";
    await supabase.from("pembayaran").update({ status: statusBaru, tanggal_bayar: statusBaru === "Lunas" ? new Date().toISOString().slice(0, 10) : null }).eq("id", item.id);
    muat();
  }
  async function tambahKas(e) {
    e.preventDefault();
    if (!formKas.keterangan || !formKas.jumlah) return;
    await supabase.from("kas_transaksi").insert({ ...formKas, jumlah: Number(formKas.jumlah) });
    setFormKas({ ...formKas, keterangan: "", jumlah: "" });
    muat();
  }

  const masuk = kas.filter((k) => k.tipe === "Masuk").reduce((a, b) => a + Number(b.jumlah), 0);
  const keluar = kas.filter((k) => k.tipe === "Keluar").reduce((a, b) => a + Number(b.jumlah), 0);

  return (
    <div>
      <Header nama={nama} subjudul="Iuran member dan kas klub." />

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("iuran")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "iuran" ? "bg-aura text-ink" : "border border-ink-line text-mist"}`}>Iuran Member</button>
        <button onClick={() => setTab("kas")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "kas" ? "bg-aura text-ink" : "border border-ink-line text-mist"}`}>Kas Klub</button>
      </div>

      {loading ? (
        <Loader />
      ) : tab === "iuran" ? (
        <>
          <form onSubmit={tambahIuran} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <input required placeholder="Nama" value={formIuran.nama_anggota} onChange={(e) => setFormIuran({ ...formIuran, nama_anggota: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
            <input type="month" value={formIuran.periode} onChange={(e) => setFormIuran({ ...formIuran, periode: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
            <input type="number" required placeholder="Jumlah" value={formIuran.jumlah} onChange={(e) => setFormIuran({ ...formIuran, jumlah: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
            <TombolUtama type="submit">Tambah Tagihan</TombolUtama>
          </form>
          <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
            {iuran.length === 0 ? <p className="text-mist text-sm p-6">Belum ada data.</p> : iuran.map((it) => (
              <div key={it.id} className="px-5 py-3 flex justify-between items-center border-b border-ink-line last:border-b-0">
                <div><p className="text-paper text-sm font-medium">{it.nama_anggota}</p><p className="text-mist text-xs font-mono">{it.periode} · {formatRupiah(it.jumlah)}</p></div>
                <button onClick={() => toggleLunas(it)} className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-full border ${it.status === "Lunas" ? "bg-go/15 text-go border-go/30" : "bg-warn/15 text-warn border-warn/30"}`}>{it.status}</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-ink-soft border border-aura/30 rounded-2xl p-5 cincin-emas"><p className="text-xs text-mist uppercase mb-2">Saldo</p><p className="font-mono text-2xl font-bold text-paper">{formatRupiah(masuk - keluar)}</p></div>
            <div className="bg-ink-soft border border-ink-line rounded-2xl p-5"><p className="text-xs text-mist uppercase mb-2">Masuk</p><p className="font-mono text-xl font-bold text-go">{formatRupiah(masuk)}</p></div>
            <div className="bg-ink-soft border border-ink-line rounded-2xl p-5"><p className="text-xs text-mist uppercase mb-2">Keluar</p><p className="font-mono text-xl font-bold text-pulse">{formatRupiah(keluar)}</p></div>
          </div>
          <form onSubmit={tambahKas} className="bg-ink-soft border border-ink-line rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <input required placeholder="Keterangan" value={formKas.keterangan} onChange={(e) => setFormKas({ ...formKas, keterangan: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper md:col-span-2" />
            <input type="date" value={formKas.tanggal} onChange={(e) => setFormKas({ ...formKas, tanggal: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
            <input type="number" required placeholder="Jumlah" value={formKas.jumlah} onChange={(e) => setFormKas({ ...formKas, jumlah: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper" />
            <select value={formKas.tipe} onChange={(e) => setFormKas({ ...formKas, tipe: e.target.value })} className="bg-ink border border-ink-line rounded-lg px-3 py-2.5 text-paper"><option>Masuk</option><option>Keluar</option></select>
            <TombolUtama type="submit" className="md:col-span-5 md:w-fit">Catat</TombolUtama>
          </form>
          <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
            {kas.length === 0 ? <p className="text-mist text-sm p-6">Belum ada transaksi.</p> : kas.map((k) => (
              <div key={k.id} className="px-5 py-3 flex justify-between items-center border-b border-ink-line last:border-b-0">
                <div><p className="text-paper text-sm font-medium">{k.keterangan}</p><p className="text-mist text-xs font-mono">{k.tanggal}</p></div>
                <span className={`font-mono text-sm font-semibold ${k.tipe === "Masuk" ? "text-go" : "text-pulse"}`}>{k.tipe === "Masuk" ? "+" : "-"}{formatRupiah(k.jumlah)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

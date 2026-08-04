"use client";

import { useEffect, useState } from "react";
import { Users, ClipboardCheck, Swords, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import KartuStatistik from "@/komponen/KartuStatistik";
import KartuJadwal from "@/komponen/KartuJadwal";
import Loader from "@/komponen/Loader";

export default function BerandaPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState([]);
  const [jumlahAnggota, setJumlahAnggota] = useState(0);
  const [hadirHariIni, setHadirHariIni] = useState(0);
  const [pertandinganAktif, setPertandinganAktif] = useState(0);

  useEffect(() => {
    async function muat() {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");

      const hariIni = new Date().toISOString().slice(0, 10);
      const [{ data: jw }, { count: totalAnggota }, { count: totalHadir }, { count: totalMatch }] = await Promise.all([
        supabase.from("jadwal_latihan").select("*").order("hari").limit(4),
        supabase.from("anggota").select("*", { count: "exact", head: true }),
        supabase.from("absensi").select("*", { count: "exact", head: true }).eq("tanggal", hariIni).eq("status", "Hadir"),
        supabase.from("pertandingan").select("*", { count: "exact", head: true }).eq("status", "Berlangsung"),
      ]);

      setJadwal(jw || []);
      setJumlahAnggota(totalAnggota || 0);
      setHadirHariIni(totalHadir || 0);
      setPertandinganAktif(totalMatch || 0);
      setLoading(false);
    }
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header nama={nama} />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KartuStatistik icon={Users} label="Total Anggota" nilai={jumlahAnggota} keterangan="Terdaftar" />
            <KartuStatistik icon={ClipboardCheck} label="Hadir Hari Ini" nilai={hadirHariIni} />
            <KartuStatistik icon={Swords} label="Pertandingan Aktif" nilai={pertandinganAktif} />
            <KartuStatistik icon={Trophy} label="Turnamen" nilai="-" keterangan="Segera hadir" />
          </div>

          <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-ink-line font-display font-semibold text-paper">
              Jadwal Terdekat
            </div>
            {jadwal.length === 0 ? (
              <p className="text-mist text-sm p-6">Belum ada jadwal.</p>
            ) : (
              jadwal.map((j) => <KartuJadwal key={j.id} item={j} />)
            )}
          </div>
        </>
      )}
    </div>
  );
}

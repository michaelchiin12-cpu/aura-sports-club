"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import KartuPertandingan from "@/komponen/KartuPertandingan";
import Loader from "@/komponen/Loader";

const URUTAN_RONDE = ["Penyisihan", "32 Besar", "16 Besar", "Perempat Final", "Semifinal", "Final"];

export default function PertandinganPage() {
  const supabase = createClient();
  const [nama, setNama] = useState("");
  const [tab, setTab] = useState("skor");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function muat() {
    const { data } = await supabase.from("pertandingan").select("*").order("ronde").order("urutan");
    setData(data || []);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");
    })();
    muat();

    const channel = supabase
      .channel("pertandingan-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "pertandingan" }, muat)
      .subscribe();

    return () => supabase.removeChannel(channel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUbahSkor(id, sisi, nilai) {
    await supabase.from("pertandingan").update({ [sisi === "a" ? "skor_a" : "skor_b"]: nilai }).eq("id", id);
  }
  async function handleUbahStatus(id, status) {
    await supabase.from("pertandingan").update({ status }).eq("id", id);
  }

  const rondeUnik = [...new Set(data.map((d) => d.ronde))].sort((a, b) => {
    const ia = URUTAN_RONDE.indexOf(a), ib = URUTAN_RONDE.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return (
    <div>
      <Header nama={nama} subjudul="Skor live dan bagan turnamen klub." />

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("skor")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "skor" ? "bg-aura text-ink" : "border border-ink-line text-mist"}`}>
          Skor Live
        </button>
        <button onClick={() => setTab("bagan")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "bagan" ? "bg-aura text-ink" : "border border-ink-line text-mist"}`}>
          Bagan Turnamen
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : tab === "skor" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((m) => (
            <KartuPertandingan key={m.id} match={m} onUbahSkor={handleUbahSkor} onUbahStatus={handleUbahStatus} />
          ))}
          {data.length === 0 && <div className="bg-ink-soft border border-ink-line rounded-xl p-8 text-center text-mist text-sm">Belum ada pertandingan.</div>}
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-10 min-w-max">
            {rondeUnik.map((ronde, i) => {
              const matches = data.filter((d) => d.ronde === ronde).sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
              const gap = 16 * Math.pow(2, i);
              return (
                <div key={ronde} className="flex flex-col" style={{ width: 220 }}>
                  <p className="text-xs text-mist uppercase tracking-wide font-mono mb-4 text-center">{ronde}</p>
                  <div className="flex flex-col justify-around flex-1" style={{ gap: `${gap}px` }}>
                    {matches.map((m) => {
                      const menang = m.status === "Selesai" ? (m.skor_a === m.skor_b ? null : m.skor_a > m.skor_b ? "a" : "b") : null;
                      return (
                        <div key={m.id} className="bg-ink-soft border border-ink-line rounded-xl overflow-hidden cincin-emas">
                          <div className={`flex justify-between px-3 py-2 text-sm ${menang === "a" ? "text-go font-semibold" : "text-paper"}`}>
                            <span className="truncate">{m.tim_a}</span><span className="font-mono">{m.skor_a}</span>
                          </div>
                          <div className="garis-pembatas" />
                          <div className={`flex justify-between px-3 py-2 text-sm ${menang === "b" ? "text-go font-semibold" : "text-paper"}`}>
                            <span className="truncate">{m.tim_b}</span><span className="font-mono">{m.skor_b}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

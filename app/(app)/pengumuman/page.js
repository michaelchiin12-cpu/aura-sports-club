"use client";

import { useEffect, useState } from "react";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import { Megaphone } from "lucide-react";

export default function PengumumanPage() {
  const [nama, setNama] = useState("");
  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");
    })();
  }, []);

  return (
    <div>
      <Header nama={nama} subjudul="Pengumuman resmi klub." />
      <div className="bg-ink-soft border border-ink-line rounded-2xl p-14 text-center">
        <Megaphone className="mx-auto text-aura mb-4" size={36} />
        <p className="font-display text-lg font-semibold text-paper mb-1">Segera Hadir</p>
        <p className="text-mist text-sm">Tabel <code className="font-mono">pengumuman</code> sudah disiapkan di database, tinggal dibangun halamannya.</p>
      </div>
    </div>
  );
}

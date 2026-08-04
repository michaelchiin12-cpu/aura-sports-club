"use client";

import { useEffect, useState } from "react";
import { getUserSaatIni } from "@/lib/autentikasi";
import Header from "@/komponen/Header";
import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [nama, setNama] = useState("");
  useEffect(() => {
    (async () => {
      const user = await getUserSaatIni();
      setNama(user?.user_metadata?.full_name || "Member");
    })();
  }, []);

  return (
    <div>
      <Header nama={nama} subjudul="Panel khusus admin." />
      <div className="bg-ink-soft border border-ink-line rounded-2xl p-14 text-center">
        <ShieldCheck className="mx-auto text-aura mb-4" size={36} />
        <p className="font-display text-lg font-semibold text-paper mb-1">Segera Hadir</p>
        <p className="text-mist text-sm">Manajemen user & backup database akan dibangun di tahap berikutnya.</p>
      </div>
    </div>
  );
}

"use client";

import { Bell, CalendarDays } from "lucide-react";
import { inisial } from "@/lib/helper";
import TombolUtama from "./TombolUtama";

export default function Header({ nama, subjudul }) {
  const jamSekarang = new Date().getHours();
  const sapaan = jamSekarang < 11 ? "Selamat Pagi" : jamSekarang < 15 ? "Selamat Siang" : jamSekarang < 18 ? "Selamat Sore" : "Selamat Malam";

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-paper">
          {sapaan}, {nama || "Member"} 👋
        </h1>
        <p className="text-mist text-sm mt-1">{subjudul || "Berikut ringkasan aktivitas klub Anda hari ini."}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full border border-ink-line flex items-center justify-center text-mist hover:text-paper relative">
          <Bell size={17} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-aura text-[9px] text-ink font-bold flex items-center justify-center">
            0
          </span>
        </button>
        <button className="w-10 h-10 rounded-full border border-ink-line flex items-center justify-center text-mist hover:text-paper">
          <CalendarDays size={17} />
        </button>
        <div className="w-10 h-10 rounded-full bg-aura/15 border border-aura/30 flex items-center justify-center text-aura font-display font-bold">
          {inisial(nama)}
        </div>
      </div>
    </div>
  );
}

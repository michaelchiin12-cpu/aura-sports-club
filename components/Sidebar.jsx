"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

const MENU = [
  { href: "/dashboard", label: "Jadwal Latihan" },
  { href: "/dashboard/absensi", label: "Absensi" },
  { href: "/dashboard/pembayaran", label: "Pembayaran" },
  { href: "/dashboard/kas", label: "Kas Aura" },
  { href: "/dashboard/skor", label: "Skor Live" },
  { href: "/dashboard/bagan", label: "Bagan Pertandingan" },
  { href: "/dashboard/dokumentasi", label: "Dokumentasi" },
];

export default function Sidebar({ email }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-64 shrink-0 bg-ink-soft border-r border-ink-line flex flex-col md:min-h-screen">
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-mist uppercase font-mono">
            Member Access
          </span>
        </div>
        <h1 className="font-display text-lg md:text-xl font-semibold text-paper tracking-tight">
          AURA SPORTS CLUB
        </h1>
      </div>

      <div className="lane-divider" />

      <nav className="flex flex-wrap md:flex-col gap-2 p-4 md:p-6 flex-1">
        {MENU.map((item) => {
          const active = pathname === item.href;
          return (
            
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                active
                  ? "bg-aura/15 text-paper font-medium border border-aura/30"
                  : "text-mist hover:text-paper border border-transparent"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="lane-divider" />

      <div className="p-5 md:p-6 flex items-center md:flex-col md:items-start justify-between gap-3">
        <div className="text-xs text-mist truncate font-mono">{email}</div>
        <button
          onClick={handleLogout}
          className="text-sm text-mist hover:text-pulse transition-colors text-left"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}

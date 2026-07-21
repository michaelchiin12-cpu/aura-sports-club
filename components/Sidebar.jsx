"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function Sidebar({ email }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-64 shrink-0 bg-ink-soft border-r border-ink-line flex md:flex-col md:min-h-screen">
      <div className="p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-mist uppercase font-mono">
            Member Access
          </span>
        </div>
        <h1 className="font-display text-xl font-semibold text-paper tracking-tight">
          AURA SPORTS CLUB
        </h1>
      </div>

      <div className="lane-divider hidden md:block" />

      <nav className="flex md:flex-col gap-1 p-4 md:p-6 flex-1">
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-aura/15 text-paper font-medium text-sm border border-aura/30"
        >
          Jadwal Latihan
        </a>
      </nav>

      <div className="lane-divider hidden md:block" />

      <div className="p-6 hidden md:flex flex-col gap-3">
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

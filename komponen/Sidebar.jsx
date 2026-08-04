"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CalendarDays,
  Swords,
  Award,
  BarChart3,
  ClipboardCheck,
  Wallet,
  Image as ImageIcon,
  Megaphone,
  UserCircle,
  Settings,
  ShieldCheck,
  LogOut,
  Lock,
} from "lucide-react";
import { logout } from "@/lib/autentikasi";
import { inisial } from "@/lib/helper";
import { useRouter } from "next/navigation";

export const MENU = [
  { label: "Beranda", icon: Home, href: "/beranda" },
  { label: "Anggota", icon: Users, href: "/anggota" },
  { label: "Jadwal", icon: CalendarDays, href: "/jadwal" },
  { label: "Pertandingan", icon: Swords, href: "/pertandingan" },
  { label: "Peringkat", icon: Award, href: null },
  { label: "Statistik", icon: BarChart3, href: null },
  { label: "Absensi", icon: ClipboardCheck, href: "/absensi" },
  { label: "Pembayaran", icon: Wallet, href: "/pembayaran" },
  { label: "Galeri", icon: ImageIcon, href: "/galeri" },
  { label: "Pengumuman", icon: Megaphone, href: null },
  { label: "Profil", icon: UserCircle, href: "/profil" },
  { label: "Pengaturan", icon: Settings, href: null },
  { label: "Admin", icon: ShieldCheck, href: null },
];

export default function Sidebar({ nama }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/masuk");
    router.refresh();
  }

  return (
    <aside className="hidden md:flex w-72 shrink-0 bg-[#0F0D0A] border-r border-ink-line flex-col min-h-screen">
      <div className="flex items-center gap-3 p-6">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-aura/50 bg-black shrink-0">
          <img src="/logo/logo-ikon.png" alt="Aura Sports Club" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-display text-sm font-bold text-paper tracking-wide leading-none">AURA</div>
          <div className="text-[9px] text-aura tracking-[0.2em] font-mono leading-none mt-1">SPORTS CLUB</div>
        </div>
      </div>

      <div className="garis-pembatas" />

      <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
        {MENU.map((item) => {
          const Icon = item.icon;
          const aktif = item.href && pathname === item.href;
          const nonaktif = !item.href;

          if (nonaktif) {
            return (
              <div key={item.label} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm text-mist/50 cursor-not-allowed">
                <span className="flex items-center gap-3"><Icon size={17} strokeWidth={1.8} />{item.label}</span>
                <Lock size={12} />
              </div>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                aktif ? "bg-aura/15 text-paper font-medium border border-aura/30" : "text-mist hover:text-paper hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={17} strokeWidth={1.8} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="garis-pembatas" />

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-aura/20 border border-aura/40 flex items-center justify-center text-aura font-display text-sm font-bold shrink-0">
            {inisial(nama)}
          </div>
          <div className="min-w-0">
            <div className="text-sm text-paper truncate">{nama || "Member"}</div>
            <div className="text-[11px] text-mist">Member</div>
          </div>
        </div>
        <button onClick={handleLogout} className="text-mist hover:text-pulse transition-colors shrink-0" title="Keluar">
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}

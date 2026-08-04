"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, X, LogOut } from "lucide-react";
import { MENU } from "./Sidebar";
import { logout } from "@/lib/autentikasi";

export default function MenuMengambang() {
  const [terbuka, setTerbuka] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/masuk");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      {terbuka && (
        <div
          className="fixed inset-0 bg-black/70 z-40 animasi-masuk"
          onClick={() => setTerbuka(false)}
        >
          <div
            className="absolute bottom-24 right-5 bg-ink-soft border border-ink-line rounded-2xl w-64 max-h-[70vh] overflow-y-auto cincin-emas"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              {MENU.map((item) => {
                const Icon = item.icon;
                const nonaktif = !item.href;
                const aktif = item.href && pathname === item.href;
                if (nonaktif) {
                  return (
                    <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-mist/40">
                      <Icon size={16} />
                      {item.label}
                    </div>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                      aktif ? "bg-aura/15 text-paper" : "text-mist"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </a>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-pulse mt-1 border-t border-ink-line"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setTerbuka((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-aura text-ink flex items-center justify-center shadow-lg cincin-emas"
      >
        {terbuka ? <X size={22} /> : <LayoutGrid size={22} />}
      </button>
    </div>
  );
}

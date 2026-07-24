"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Members",
    href: "/dashboard/members",
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
  },
  {
    title: "Matches",
    href: "/dashboard/matches",
  },
  {
    title: "Tournament",
    href: "/dashboard/tournament",
  },
  {
    title: "Ranking",
    href: "/dashboard/ranking",
  },
  {
    title: "Statistics",
    href: "/dashboard/statistics",
  },
  {
    title: "Finance",
    href: "/dashboard/finance",
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <img
          src="/logo/logo.png"
          alt="Aura"
        />

        <h2>AURA</h2>

      </div>

      <nav>

        {menu.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className={
              pathname === item.href
                ? "menu active"
                : "menu"
            }
          >
            {item.title}
          </Link>

        ))}

      </nav>

    </aside>
  );
}
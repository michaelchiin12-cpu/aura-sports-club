"use client";

import { gabungKelas } from "@/lib/helper";

export default function TombolUtama({
  children,
  onClick,
  type = "button",
  variant = "utama", // utama | garis | teks
  disabled = false,
  className = "",
  icon: Icon = null,
}) {
  const dasar = "flex items-center justify-center gap-2 rounded-lg font-semibold text-sm px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const gaya = {
    utama: "bg-aura hover:bg-aura-soft text-ink",
    garis: "border border-ink-line hover:border-aura/50 text-paper bg-transparent",
    teks: "text-mist hover:text-paper bg-transparent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={gabungKelas(dasar, gaya[variant], className)}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

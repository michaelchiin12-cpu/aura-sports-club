"use client";

import { X } from "lucide-react";

export default function Modal({ terbuka, onTutup, judul, children, footer }) {
  if (!terbuka) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animasi-masuk"
      onClick={onTutup}
    >
      <div
        className="bg-ink-soft border border-ink-line rounded-2xl w-full max-w-md overflow-hidden cincin-emas"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-line">
          <h3 className="font-display font-semibold text-paper">{judul}</h3>
          <button onClick={onTutup} className="text-mist hover:text-paper">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && (
          <div className="px-5 py-4 border-t border-ink-line flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

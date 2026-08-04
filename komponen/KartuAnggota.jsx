import { inisial } from "@/lib/helper";

const GAYA_STATUS = {
  Aktif: "bg-go/15 text-go border-go/30",
  Nonaktif: "bg-mist/10 text-mist border-mist/20",
};

export default function KartuAnggota({ anggota, onHapus }) {
  return (
    <div className="bg-ink-soft border border-ink-line rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-aura/15 border border-aura/30 flex items-center justify-center text-aura font-display font-bold shrink-0">
        {inisial(anggota.nama)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-paper font-medium truncate">{anggota.nama}</p>
        <p className="text-mist text-xs font-mono truncate">{anggota.email || anggota.no_hp || "-"}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border ${GAYA_STATUS[anggota.status] || GAYA_STATUS.Nonaktif}`}>
          {anggota.status || "Aktif"}
        </span>
        {anggota.role === "admin" && (
          <span className="text-[10px] text-aura font-mono uppercase">Admin</span>
        )}
      </div>
    </div>
  );
}

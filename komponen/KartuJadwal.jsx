import { formatJam } from "@/lib/format";

const GAYA_STATUS = {
  Buka: "bg-go/15 text-go border-go/30",
  Penuh: "bg-warn/15 text-warn border-warn/30",
  Libur: "bg-mist/10 text-mist border-mist/20",
};

export default function KartuJadwal({ item, onHapus }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-ink-line last:border-b-0">
      <div>
        <p className="text-paper font-medium text-sm">{item.nama_kelas}</p>
        <p className="text-mist text-xs mt-0.5">Pelatih: {item.pelatih || "-"}</p>
        <p className="text-aura-soft text-xs mt-1 font-mono">
          {formatJam(item.jam_mulai)} – {formatJam(item.jam_selesai)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border ${GAYA_STATUS[item.status] || GAYA_STATUS.Libur}`}>
          {item.status}
        </span>
        {onHapus && (
          <button onClick={() => onHapus(item.id)} className="text-[10px] text-pulse font-mono uppercase">
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}

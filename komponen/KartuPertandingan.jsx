const GAYA_STATUS = {
  "Belum Mulai": "bg-mist/10 text-mist border-mist/20",
  Berlangsung: "bg-pulse/15 text-pulse border-pulse/30",
  Selesai: "bg-go/15 text-go border-go/30",
};

export default function KartuPertandingan({ match, onUbahSkor, onUbahStatus }) {
  return (
    <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-mist font-mono uppercase">{match.ronde}</span>
        <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border ${GAYA_STATUS[match.status]}`}>
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-paper font-medium flex-1">{match.tim_a}</span>
        <input
          type="number"
          min="0"
          value={match.skor_a}
          onChange={(e) => onUbahSkor?.(match.id, "a", Number(e.target.value))}
          className="w-16 text-center bg-ink border border-ink-line rounded-lg py-1.5 font-mono text-xl text-aura font-semibold outline-none focus:border-aura"
        />
      </div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-paper font-medium flex-1">{match.tim_b}</span>
        <input
          type="number"
          min="0"
          value={match.skor_b}
          onChange={(e) => onUbahSkor?.(match.id, "b", Number(e.target.value))}
          className="w-16 text-center bg-ink border border-ink-line rounded-lg py-1.5 font-mono text-xl text-aura font-semibold outline-none focus:border-aura"
        />
      </div>

      <div className="garis-pembatas mb-4" />

      <div className="flex gap-2">
        {["Belum Mulai", "Berlangsung", "Selesai"].map((s) => (
          <button
            key={s}
            onClick={() => onUbahStatus?.(match.id, s)}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-colors ${
              match.status === s
                ? "bg-aura/15 border-aura/40 text-paper"
                : "border-ink-line text-mist hover:text-paper"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

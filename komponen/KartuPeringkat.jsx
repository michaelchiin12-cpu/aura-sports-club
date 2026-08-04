export default function KartuPeringkat({ posisi, data }) {
  const warnaPosisi =
    posisi === 1 ? "text-aura" : posisi === 2 ? "text-mist" : posisi === 3 ? "text-pulse" : "text-mist";

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-ink-line last:border-b-0">
      <span className={`font-display font-bold text-lg w-6 text-center ${warnaPosisi}`}>
        {posisi}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-paper font-medium text-sm truncate">{data.nama_anggota}</p>
        <p className="text-mist text-xs font-mono">
          {data.menang}M · {data.kalah}K · {data.seri}S
        </p>
      </div>
      <span className="font-mono text-aura font-semibold">{data.poin} pts</span>
    </div>
  );
}

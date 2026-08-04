export default function KartuStatistik({ icon: Icon, label, nilai, keterangan }) {
  return (
    <div className="bg-ink-soft border border-ink-line rounded-2xl p-5 flex items-start gap-4">
      {Icon && (
        <div className="w-11 h-11 rounded-xl bg-aura/15 border border-aura/30 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-aura" />
        </div>
      )}
      <div>
        <p className="text-xs text-mist uppercase tracking-wide mb-1">{label}</p>
        <p className="font-display text-2xl font-bold text-paper">{nilai}</p>
        {keterangan && <p className="text-xs text-mist mt-1">{keterangan}</p>}
      </div>
    </div>
  );
}

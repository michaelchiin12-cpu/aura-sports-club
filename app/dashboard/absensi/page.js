export default function AbsensiPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-xs tracking-[0.3em] text-mist uppercase font-mono">
          Dashboard
        </span>

        <h2 className="font-display text-2xl md:text-3xl font-semibold text-paper mt-1">
          Absensi Aura
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist text-sm">Total Main</p>
          <h3 className="text-3xl font-bold text-paper mt-2">0</h3>
        </div>

        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist text-sm">Main</p>
          <h3 className="text-3xl font-bold text-paper mt-2">0</h3>
        </div>

        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist text-sm">Skip</p>
          <h3 className="text-3xl font-bold text-paper mt-2">0</h3>
        </div>
      </div>

      <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink">
            <tr>
              <th className="p-4 text-left text-mist">Tanggal</th>
              <th className="p-4 text-left text-mist">Nama</th>
              <th className="p-4 text-left text-mist">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4 text-paper">-</td>
              <td className="p-4 text-paper">-</td>
              <td className="p-4 text-paper">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
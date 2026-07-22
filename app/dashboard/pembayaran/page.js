export default function PembayaranPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-semibold text-paper">
          Pembayaran Member
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist">Total Tagihan</p>
          <h3 className="text-3xl font-bold text-paper">Rp 0</h3>
        </div>

        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist">Sudah Bayar</p>
          <h3 className="text-3xl font-bold text-paper">0</h3>
        </div>

        <div className="bg-ink-soft border border-ink-line rounded-2xl p-5">
          <p className="text-mist">Belum Bayar</p>
          <h3 className="text-3xl font-bold text-paper">0</h3>
        </div>
      </div>
    </div>
  );
}
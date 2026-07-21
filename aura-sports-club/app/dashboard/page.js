import { createClient } from "@/lib/supabaseServer";

const URUTAN_HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const STATUS_STYLE = {
  Buka: "bg-go/15 text-go border-go/30",
  Penuh: "bg-warn/15 text-warn border-warn/30",
  Libur: "bg-mist/10 text-mist border-mist/20",
};

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: jadwal, error } = await supabase
    .from("jadwal_latihan")
    .select("*")
    .order("jam_mulai", { ascending: true });

  const terkelompok = URUTAN_HARI.map((hari) => ({
    hari,
    kelas: (jadwal || []).filter((item) => item.hari === hari),
  }));

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs tracking-[0.3em] text-mist uppercase font-mono">
          Minggu Ini
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-paper mt-1">
          Jadwal Latihan &amp; Kelas
        </h2>
      </div>

      {error && (
        <div className="bg-ink-soft border border-pulse/30 rounded-xl p-5 text-sm text-mist mb-6">
          Belum bisa memuat jadwal dari database.{" "}
          <span className="text-pulse">
            Pastikan tabel <code className="font-mono">jadwal_latihan</code> sudah
            dibuat di Supabase (lihat sql/schema.sql) dan variabel env sudah
            diisi.
          </span>
        </div>
      )}

      {!error && jadwal && jadwal.length === 0 && (
        <div className="bg-ink-soft border border-ink-line rounded-xl p-8 text-center">
          <p className="text-paper font-medium mb-1">Belum ada jadwal.</p>
          <p className="text-mist text-sm">
            Tambahkan kelas latihan lewat Supabase Table Editor pada tabel{" "}
            <code className="font-mono">jadwal_latihan</code>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {terkelompok
          .filter((grup) => grup.kelas.length > 0)
          .map((grup) => (
            <div
              key={grup.hari}
              className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-ink-line flex items-center justify-between">
                <span className="font-display font-semibold text-paper">
                  {grup.hari}
                </span>
                <span className="font-mono text-xs text-mist">
                  {grup.kelas.length} kelas
                </span>
              </div>

              <div className="lane-divider" />

              <ul className="divide-y divide-ink-line">
                {grup.kelas.map((item) => (
                  <li key={item.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-paper font-medium">
                          {item.nama_kelas}
                        </p>
                        <p className="text-mist text-xs mt-0.5">
                          Pelatih: {item.pelatih || "-"}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-1 rounded-full border shrink-0 ${
                          STATUS_STYLE[item.status] || STATUS_STYLE.Libur
                        }`}
                      >
                        {item.status || "Info"}
                      </span>
                    </div>
                    <p className="font-mono text-aura-soft text-sm mt-2">
                      {item.jam_mulai?.slice(0, 5)} – {item.jam_selesai?.slice(0, 5)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export function formatRupiah(angka) {
  return "Rp" + Number(angka || 0).toLocaleString("id-ID");
}

export function formatTanggal(tanggalISO) {
  if (!tanggalISO) return "-";
  const d = new Date(tanggalISO);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function formatJam(jamHHMMSS) {
  if (!jamHHMMSS) return "-";
  return jamHHMMSS.slice(0, 5);
}

export function formatTanggalPendek(tanggalISO) {
  if (!tanggalISO) return "-";
  const d = new Date(tanggalISO);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
}

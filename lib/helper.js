/** ID unik sederhana, dipakai kalau perlu bikin id di sisi client */
export function buatId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/** Escape teks supaya aman ditampilkan sebagai HTML (anti XSS sederhana) */
export function amankanTeks(teks) {
  return String(teks ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

/** Ambil huruf pertama nama, dipakai untuk avatar bulat */
export function inisial(nama) {
  if (!nama) return "?";
  return nama.trim().charAt(0).toUpperCase();
}

/** Gabungkan className secara kondisional, mirip fungsi `clsx` */
export function gabungKelas(...kelas) {
  return kelas.filter(Boolean).join(" ");
}

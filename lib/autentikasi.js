import { createClient } from "@/lib/supabase";

/* Ganti kode akses klub di sini kapan pun Anda mau */
export const KODE_KLUB = "aura2026";

/**
 * Login pakai Nama + Kode klub.
 * Di belakang layar tetap pakai sesi Supabase asli (anonymous sign-in),
 * supaya data tetap aman dan RLS tetap berlaku, walau tanpa email/password.
 */
export async function loginDenganKode(nama, kode) {
  if (kode !== KODE_KLUB) {
    return { error: "Kode akses salah. Hubungi pengurus klub." };
  }
  if (!nama || !nama.trim()) {
    return { error: "Nama wajib diisi." };
  }

  const supabase = createClient();
  const { error: authError } = await supabase.auth.signInAnonymously();
  if (authError) {
    return { error: "Gagal masuk: " + authError.message };
  }

  await supabase.auth.updateUser({ data: { full_name: nama.trim() } });
  return { error: null };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/** Ambil data user yang sedang login (dipanggil dari Client Component) */
export async function getUserSaatIni() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

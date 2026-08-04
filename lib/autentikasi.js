import { createClient } from "@/lib/supabase";

/**
 * Login menggunakan Nama + Kode Akses
 */
export async function loginDenganKode(nama, kode) {
  if (!nama?.trim()) {
    return {
      error: "Nama wajib diisi.",
    };
  }

  if (!kode?.trim()) {
    return {
      error: "Kode akses wajib diisi.",
    };
  }

  const supabase = createClient();

  // Login anonymous agar mendapatkan session Supabase
  const {
    data: authData,
    error: authError,
  } = await supabase.auth.signInAnonymously();

  if (authError) {
    return {
      error: "Gagal membuat sesi login: " + authError.message,
    };
  }

  // Cari akun di database
  const { data: member, error: memberError } = await supabase
    .from("members")
    .select("*")
    .eq("nama", nama.trim())
    .eq("kode", kode.trim())
    .eq("aktif", true)
    .single();

  if (memberError || !member) {
    await supabase.auth.signOut();

    return {
      error: "Nama atau kode akses salah.",
    };
  }

  // Simpan informasi user ke metadata Auth
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      member_id: member.id,
      full_name: member.nama,
      role: member.role,
    },
  });

  if (updateError) {
    return {
      error: updateError.message,
    };
  }

  return {
    error: null,
    user: member,
  };
}

/**
 * Logout
 */
export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/**
 * Ambil user Auth saat ini
 */
export async function getUserSaatIni() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Ambil data member dari tabel members
 */
export async function getMemberSaatIni() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const memberId = user.user_metadata?.member_id;

  if (!memberId) return null;

  const { data } = await supabase
    .from("members")
    .select("*")
    .eq("id", memberId)
    .single();

  return data;
}

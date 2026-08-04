/* Catatan: file ini di luar daftar asli lib/ yang Anda kasih, tapi WAJIB
   ada supaya proteksi login (cek sesi di server) bisa jalan. Dipakai oleh
   app/(app)/layout.js dan app/page.js. */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (e) {
            /* diabaikan bila dipanggil dari Server Component (read-only) */
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (e) {
            /* diabaikan */
          }
        },
      },
    }
  );
}

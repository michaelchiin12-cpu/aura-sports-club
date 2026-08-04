import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const HALAMAN_PUBLIK = ["/masuk"];

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;
  const isPublik = HALAMAN_PUBLIK.includes(path);

  if (!user && !isPublik) {
    const url = request.nextUrl.clone();
    url.pathname = "/masuk";
    return NextResponse.redirect(url);
  }

  if (user && isPublik) {
    const url = request.nextUrl.clone();
    url.pathname = "/beranda";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/masuk",
    "/beranda",
    "/anggota/:path*",
    "/jadwal/:path*",
    "/pertandingan/:path*",
    "/peringkat/:path*",
    "/statistik/:path*",
    "/absensi/:path*",
    "/pembayaran/:path*",
    "/galeri/:path*",
    "/pengumuman/:path*",
    "/profil/:path*",
    "/pengaturan/:path*",
    "/admin/:path*",
  ],
};

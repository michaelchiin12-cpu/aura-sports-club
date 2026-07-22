"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError("Gagal login: " + error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink bg-aura-glow flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden aura-ring">
          <div className="px-8 pt-9 pb-6 text-center bg-gradient-to-b from-aura/10 to-transparent">
            <div className="w-[78px] h-[78px] rounded-full mx-auto mb-4 border-2 border-white/20 bg-ink flex items-center justify-center">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#8B7FFF" strokeWidth="1.6" />
                <path d="M12 2v20M2 12h20" stroke="#8B7FFF" strokeWidth="1.2" opacity=".5" />
                <circle cx="12" cy="12" r="4" fill="#6D5EF5" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-paper tracking-tight">
              Aura Sports Club
            </h1>
            <p className="text-[11px] tracking-[0.35em] text-aura-soft uppercase font-mono mt-1">
              Member Access
            </p>
          </div>

          <div className="px-8 pb-9 pt-2">
            <p className="text-center text-mist text-sm leading-relaxed mb-6">
              Login dengan akun Google untuk mengakses dashboard.
              <br />
              Identitas kamu terverifikasi lewat Google.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:shadow-[0_0_0_3px_rgba(255,255,255,0.15)] text-gray-800 font-semibold rounded-xl py-3 text-sm disabled:opacity-60 transition-shadow"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l6-6C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c2.8 0 5.3 1 7.3 2.7l6-6C34 6.5 29.3 4.5 24 4.5c-7.6 0-14.1 4.3-17.4 10.6.4-.1.5-.3.7-.4z" />
                <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-1.8 13.5-4.9l-6.2-5.3C29.3 34.9 26.8 35.8 24 35.8c-5.2 0-9.6-3.5-11.2-8.2l-6.5 5C9.9 39 16.4 43.5 24 43.5z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.2 5.3C40.6 36 43.5 30.5 43.5 24c0-1.2-.1-2.4-.3-3.5z" />
              </svg>
              {loading ? "Menghubungkan..." : "Masuk dengan Google"}
            </button>

            {error && <p className="text-pulse text-sm text-center mt-4">{error}</p>}

            <p className="text-center text-mist text-xs mt-6 leading-relaxed">
              Data absensi, jadwal, dan aktivitas klub tersimpan aman dan
              sinkron di semua perangkat kamu.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

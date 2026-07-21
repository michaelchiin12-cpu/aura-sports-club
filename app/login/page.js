"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-ink bg-aura-glow flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-pulse" />
            <span className="text-xs tracking-[0.3em] text-mist uppercase font-mono">
              Member Access
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold text-paper tracking-tight">
            AURA SPORTS CLUB
          </h1>
          <p className="text-mist text-sm mt-2">
            Masuk untuk melihat jadwal latihan dan aktivitas klub Anda.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-ink-soft border border-ink-line rounded-2xl p-7 aura-ring"
        >
          <div className="mb-4">
            <label className="block text-xs font-medium text-mist mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full bg-ink border border-ink-line rounded-lg px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none focus:border-aura transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium text-mist mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-ink border border-ink-line rounded-lg px-4 py-2.5 text-paper placeholder:text-mist/50 outline-none focus:border-aura transition-colors"
            />
          </div>

          {error && (
            <p className="text-pulse text-sm mb-4 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-aura hover:bg-aura-soft transition-colors text-white font-semibold rounded-lg py-2.5 disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-mist text-xs mt-6">
          Akun member dibuat oleh admin. Hubungi pengurus klub bila belum
          memiliki akses.
        </p>
      </div>
    </main>
  );
}

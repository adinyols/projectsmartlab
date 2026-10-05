'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Kata sandi salah');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Gagal masuk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-white text-black mx-auto flex items-center justify-center font-bold text-xl mb-3">
            <Lock className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Smart Lab Admin
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Masukkan kode sandi otentikasi untuk mengelola materi dan mencetak QR Code perangkat.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-neutral-950 border border-red-500/40 text-red-400 text-xs sm:text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Admin Passcode / Secret Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-all pl-10"
              />
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500">
              Default sistem lokal: <code className="text-neutral-400 bg-neutral-800 px-1 py-0.5 rounded">admin123</code> (dikonfigurasi di file <code className="text-neutral-400">.env</code>)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-800/80 text-center">
          <a
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            ← Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}

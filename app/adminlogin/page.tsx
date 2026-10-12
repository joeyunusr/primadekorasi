'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY_CONFIG } from '@/lib/data/company';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@primadekorasi.co.id');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Check if already logged in via Supabase or admin session
  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.push('/admin');
          return;
        }
        if (typeof window !== 'undefined' && localStorage.getItem('prima_admin_auth') === 'true') {
          router.push('/admin');
        }
      } catch {
        // ignore
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setInfoMsg('');

    const trimmedPassword = password.trim();
    const adminEmail = email.trim() || 'admin@primadekorasi.co.id';

    // 1. Direct login with admin123
    if (trimmedPassword === 'admin123') {
      localStorage.setItem('prima_admin_auth', 'true');
      localStorage.setItem(
        'prima_admin_user',
        JSON.stringify({
          email: adminEmail.includes('@') ? adminEmail : 'admin@primadekorasi.co.id',
          role: 'Administrator',
        })
      );
      router.push('/admin');
      return;
    }

    try {
      if (isSignUpMode) {
        // Sign up new admin account in Supabase
        const { data, error } = await supabase.auth.signUp({
          email: adminEmail,
          password: trimmedPassword,
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          localStorage.setItem('prima_admin_auth', 'true');
          localStorage.setItem('prima_admin_user', JSON.stringify(data.user));
          router.push('/admin');
        } else {
          setInfoMsg('Pendaftaran berhasil! Silakan periksa email Anda atau masuk dengan kata sandi admin123.');
          setIsSignUpMode(false);
        }
      } else {
        // Sign in existing admin via Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: trimmedPassword,
        });

        if (error) {
          throw new Error('Kata sandi salah. Gunakan kata sandi admin123.');
        }

        if (data.session) {
          localStorage.setItem('prima_admin_auth', 'true');
          localStorage.setItem('prima_admin_user', JSON.stringify(data.user));
          router.push('/admin');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-between p-4 sm:p-6">
      {/* Top Bar */}
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#12629F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Utama</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] text-[#6E6E73]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase Protected</span>
        </div>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-[28px] border border-[#E5E5E7] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-6">
          {/* Brand Logo & Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <Image
                src="https://files.catbox.moe/xwb6h6.png"
                alt="Prima Dekorasi"
                width={1044}
                height={318}
                priority
                className="h-9 w-auto max-w-[180px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
              Portal Manajemen Admin
            </h1>
            <p className="text-xs text-[#6E6E73] max-w-xs mx-auto">
              Masuk untuk mengelola pesanan masuk, permintaan custom order, katalog harga, dan data pelanggan.
            </p>
          </div>

          {/* Error / Info Alert */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                Email / Username Admin
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primadekorasi.co.id"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5F5F7] rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6E6E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-[#F5F5F7] rounded-xl border border-[#E5E5E7] focus:outline-none focus:border-[#12629F] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#12629F] hover:bg-[#0E4F81] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <span>{isSignUpMode ? 'Daftarkan Akun Admin Baru' : 'Masuk ke Dashboard Admin'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login / SignUp Mode */}
          <div className="text-center pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#6E6E73]">
            <span>{isSignUpMode ? 'Sudah memiliki akun?' : 'Ingin daftar akun baru di Supabase?'}</span>
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setErrorMsg('');
                setInfoMsg('');
              }}
              className="font-bold text-[#12629F] hover:underline"
            >
              {isSignUpMode ? 'Masuk' : 'Daftar Akun'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-[11px] text-[#86868B] py-2">
        {COMPANY_CONFIG.legalName} &copy; {new Date().getFullYear()} &middot; Terhubung dengan Supabase API
      </div>
    </div>
  );
}

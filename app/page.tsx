'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { INITIAL_TOOLS } from '@/lib/initial-data';
import {
  QrCode,
  Compass,
  BookOpen,
  Wrench,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Lock,
  ExternalLink,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const [selectedDemoTool, setSelectedDemoTool] = useState(INITIAL_TOOLS[0]);
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const qrDemoUrl = `${origin}/tool/${selectedDemoTool.slug}`;

  const stages = [
    {
      num: '01',
      title: 'Kenali Alat',
      desc: 'Nama, kode lab, foto fisik, fungsi utama, dan spesifikasi teknis.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Pelajari',
      desc: 'Video ringkas dan modul teori arsitektur perangkat sebelum praktik.',
      icon: BookOpen,
    },
    {
      num: '03',
      title: 'Cara Menggunakan',
      desc: 'Panduan langkah demi langkah terstruktur dengan tips keselamatan alat.',
      icon: Wrench,
    },
    {
      num: '04',
      title: 'Coba Sendiri',
      desc: 'Skenario praktik mandiri (hands-on) dengan checklist pelacakan progres.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Tes Pemahaman',
      desc: 'Kuis interaktif pilihan ganda dengan umpan balik skor & pembahasan instan.',
      icon: HelpCircle,
    },
    {
      num: '06',
      title: 'Troubleshooting',
      desc: 'Pilih kendala yang dialami saat praktikum dan peroleh panduan solusinya.',
      icon: AlertTriangle,
    },
    {
      num: '07',
      title: 'Challenge',
      desc: 'Tantangan mandiri dengan kriteria kelulusan untuk melatih kemahiran.',
      icon: Trophy,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-wider">
              QR
            </div>
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-400 block uppercase">
                Laboratorium Cerdas
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Smart Lab QR
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 hover:border-neutral-700 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Asisten Belajar Digital Berbasis Perangkat Laboratorium</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Smart Lab Berbasis QR Code
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Setiap alat laboratorium diberi QR Code yang berfungsi sebagai asisten belajar digital mandiri bagi mahasiswa. Scan QR untuk mengakses alur pembelajaran lengkap dari pengenalan hingga tantangan.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#simulator"
              className="px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulasi Scan QR Mahasiswa</span>
            </a>
            <Link
              href="/admin/login"
              className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold text-sm hover:bg-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-neutral-400" />
              <span>Kelola Alat & Kustomisasi Materi</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Learning Stages Grid */}
      <section className="py-16 sm:py-20 border-b border-neutral-800 bg-neutral-900/40">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Konsep Alur Belajar Terintegrasi
            </h3>
            <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              7 Tahapan Mandiri Berbasis Alat
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Bukan sekadar tautan dokumen PDF, melainkan asisten digital yang memandu mahasiswa saat berhadapan langsung dengan perangkat fisik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3 hover:border-neutral-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center">
                        <Icon className="w-4 h-4 text-black" />
                      </div>
                      <span className="font-mono text-xs text-neutral-500 font-bold">
                        {stage.num}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white tracking-tight">
                      {stage.title}
                    </h5>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Special Highlight Card */}
            <div className="bg-neutral-950 border border-neutral-700/80 rounded-xl p-5 space-y-3 flex flex-col justify-between text-neutral-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 uppercase">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Akses Terisolasi</span>
                </div>
                <h5 className="text-base font-bold text-white">Fokus Mahasiswa</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Mahasiswa yang memindai QR langsung diarahkan ke materi alat tersebut tanpa distraksi menu web internal lainnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulator" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 w-full space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Simulator Scan QR
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Uji Coba Pengalaman Mahasiswa
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Pilih salah satu alat laboratorium di bawah untuk melihat stiker QR atau langsung membuka antarmuka asisten digitalnya.
          </p>
        </div>

        {/* Tool selector buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {INITIAL_TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedDemoTool(t)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedDemoTool.slug === t.slug
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {t.name} ({t.code})
            </button>
          ))}
        </div>

        {/* Simulator Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* QR Sticker Demo */}
          <div className="flex flex-col items-center justify-center p-6 bg-neutral-950 rounded-xl border border-neutral-800">
            <div className="w-full max-w-[240px] bg-white text-black p-5 rounded-lg border-2 border-black flex flex-col items-center text-center space-y-2 shadow-xl">
              <div className="w-full flex items-center justify-between border-b border-black/20 pb-1.5">
                <span className="font-mono text-[9px] font-bold bg-black text-white px-1.5 py-0.5 rounded">
                  SMART LAB
                </span>
                <span className="font-mono text-[10px] font-bold">
                  {selectedDemoTool.code}
                </span>
              </div>

              <div className="p-2 bg-white border border-black rounded">
                <QRCodeSVG value={qrDemoUrl} size={150} level="H" />
              </div>

              <div className="space-y-0.5 w-full">
                <p className="text-xs font-extrabold text-black truncate">
                  {selectedDemoTool.name}
                </p>
                <p className="text-[9px] text-neutral-600 line-clamp-1">
                  {selectedDemoTool.location}
                </p>
              </div>

              <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-black pt-1 border-t border-black/10">
                📲 Scan dengan Kamera HP
              </p>
            </div>

            <p className="text-[11px] font-mono text-neutral-500 mt-3 text-center">
              Scan QR di atas dengan kamera ponsel Anda atau klik tombol buka di samping.
            </p>
          </div>

          {/* Tool Info & Direct Access */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-neutral-800 border border-neutral-700 text-neutral-300">
                  {selectedDemoTool.code}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {selectedDemoTool.category}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                {selectedDemoTool.name}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedDemoTool.functionSummary}
              </p>
            </div>

            <div className="space-y-2 pt-1 text-xs text-neutral-400 font-mono">
              <div>📍 Lokasi: {selectedDemoTool.location}</div>
              <div>⚡ Total Alur: {selectedDemoTool.steps.length} Panduan Langkah • {selectedDemoTool.quizzes.length} Soal Kuis • {selectedDemoTool.troubleshoots.length} Troubleshooting</div>
            </div>

            <div className="pt-2">
              <Link
                href={`/tool/${selectedDemoTool.slug}`}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all inline-flex items-center justify-center gap-2 shadow-md"
              >
                <span>Buka Antarmuka Digital Mahasiswa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-800 bg-neutral-950 py-8 text-center text-xs text-neutral-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs font-mono">
          <Link href="/admin" className="text-neutral-400 hover:text-white transition-colors">
            Portal Admin
          </Link>
          <span>•</span>
          <a href="#simulator" className="text-neutral-400 hover:text-white transition-colors">
            Simulator QR
          </a>
        </div>
        <p className="font-mono">
          Smart Lab Berbasis QR Code • Asisten Belajar Digital Laboratorium
        </p>
      </footer>
    </div>
  );
}

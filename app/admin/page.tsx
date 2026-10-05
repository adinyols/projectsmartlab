'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToolData } from '@/types/tool';
import QrStickerModal from '@/components/qr-sticker-modal';
import ToolEditorModal from '@/components/tool-editor-modal';
import {
  Plus,
  QrCode,
  Edit3,
  ExternalLink,
  Trash2,
  LogOut,
  Search,
  Cpu,
  Layers,
  HelpCircle,
  AlertTriangle,
  Trophy,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tools, setTools] = useState<ToolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedToolForQr, setSelectedToolForQr] = useState<ToolData | null>(null);
  const [toolToEdit, setToolToEdit] = useState<ToolData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchTools = async () => {
    setLoading(true);
    try {
      // Check auth status first
      const authRes = await fetch('/api/admin/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/tools');
      const data = await res.json();
      setTools(data.tools || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Hapus materi alat "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/tools?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setTools((prev) => prev.filter((t) => t.slug !== slug));
      }
    } catch (err) {
      alert('Gagal menghapus alat');
    }
  };

  const handleToolSaved = (savedTool: ToolData) => {
    setTools((prev) => {
      const exists = prev.some((t) => t.id === savedTool.id || t.slug === savedTool.slug);
      if (exists) {
        return prev.map((t) => (t.id === savedTool.id || t.slug === savedTool.slug ? savedTool : t));
      }
      return [savedTool, ...prev];
    });
  };

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-wider">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
                  Panel Administrator
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                Smart Lab Berbasis QR Code
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setToolToEdit(null);
                setIsCreating(true);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tambah Alat Baru</span>
              <span className="sm:hidden">Tambah</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
              title="Keluar Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stats & Header Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-1">
            <span className="text-xs font-mono uppercase text-neutral-400">Total Alat Laboratorium</span>
            <div className="text-2xl font-bold font-mono text-white">{tools.length} Perangkat</div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-1">
            <span className="text-xs font-mono uppercase text-neutral-400">Status Database</span>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-300">Prisma & Supabase Ready</span>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-1">
            <span className="text-xs font-mono uppercase text-neutral-400">Akses Mahasiswa</span>
            <div className="text-xs text-neutral-300 pt-1">
              Hanya akses alat via scan QR (<code className="text-neutral-400">/tool/[slug]</code>)
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 border border-neutral-800/80 p-3 rounded-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari alat berdasarkan nama, kode (misal: LAB-NET-01), atau kategori..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>

          <button
            onClick={fetchTools}
            className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all self-end sm:self-auto"
            title="Muat Ulang"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tools List */}
        {loading ? (
          <div className="text-center py-16 text-neutral-500 text-sm font-mono">
            Memuat data perangkat laboratorium...
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <Cpu className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-sm text-neutral-400 font-medium">Tidak ada alat yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id || tool.slug}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 border border-neutral-700 text-white font-semibold">
                          {tool.code}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {tool.name}
                      </h3>
                    </div>

                    {/* QR Code quick preview thumbnail */}
                    <button
                      type="button"
                      onClick={() => setSelectedToolForQr(tool)}
                      className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg hover:border-white transition-all text-neutral-300 hover:text-white shrink-0"
                      title="Lihat & Cetak Stiker QR"
                    >
                      <QrCode className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
                    <span>📍 {tool.location}</span>
                  </div>

                  {/* Badges of 7 learning stages */}
                  <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      <Layers className="w-3 h-3" /> {tool.steps?.length || 0} Langkah
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      <HelpCircle className="w-3 h-3" /> {tool.quizzes?.length || 0} Soal
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      <AlertTriangle className="w-3 h-3" /> {tool.troubleshoots?.length || 0} Isu
                    </span>
                    <span className="flex items-center gap-1 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      <Trophy className="w-3 h-3" /> {tool.challenges?.length || 0} Tantangan
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <a
                    href={`/tool/${tool.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <span>Tes View Mahasiswa</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedToolForQr(tool)}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium flex items-center gap-1 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Cetak QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setToolToEdit(tool)}
                      className="px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-medium flex items-center gap-1 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Materi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(tool.slug, tool.name)}
                      className="p-1.5 rounded-lg border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-900 transition-all"
                      title="Hapus Alat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* QR Sticker Modal */}
      {selectedToolForQr && (
        <QrStickerModal
          tool={selectedToolForQr}
          onClose={() => setSelectedToolForQr(null)}
        />
      )}

      {/* Tool Editor Modal (Create / Edit) */}
      {(toolToEdit || isCreating) && (
        <ToolEditorModal
          initialTool={toolToEdit}
          onClose={() => {
            setToolToEdit(null);
            setIsCreating(false);
          }}
          onSaved={handleToolSaved}
        />
      )}
    </div>
  );
}

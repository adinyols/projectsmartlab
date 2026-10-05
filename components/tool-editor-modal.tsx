'use client';

import { useState } from 'react';
import { ToolData, UsageStep, PracticeTask, QuizQuestion, TroubleshootItem, ChallengeItem } from '@/types/tool';
import { X, Save, Plus, Trash2, HelpCircle } from 'lucide-react';

interface ToolEditorModalProps {
  initialTool?: ToolData | null;
  onClose: () => void;
  onSaved: (tool: ToolData) => void;
}

export default function ToolEditorModal({
  initialTool,
  onClose,
  onSaved,
}: ToolEditorModalProps) {
  const isEditing = !!initialTool;

  const [formData, setFormData] = useState<ToolData>(() => {
    if (initialTool) return JSON.parse(JSON.stringify(initialTool));
    return {
      id: `tool-${Date.now()}`,
      slug: '',
      name: '',
      category: 'Jaringan Komputer',
      code: 'LAB-01',
      location: 'Lab Utama',
      imageUrl: '',
      description: '',
      functionSummary: '',
      specs: ['Spesifikasi 1'],
      videoUrl: '',
      moduleSummary: '',
      moduleContent: '',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: 'Langkah Awal',
          description: 'Instruksi penggunaan langkah 1',
          tip: 'Tips penting keselamatan',
        },
      ],
      practiceTasks: [
        {
          id: 'task-1',
          order: 1,
          title: 'Tugas Praktik 1',
          instruction: 'Lakukan konfigurasi dasar pada alat',
          expectedResult: 'Indikator aktif',
        },
      ],
      quizzes: [
        {
          id: 'quiz-1',
          question: 'Pertanyaan konsep alat?',
          options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
          correctAnswer: 0,
          explanation: 'Penjelasan jawaban benar.',
        },
      ],
      troubleshoots: [
        {
          id: 'tb-1',
          problem: 'Masalah umum sering terjadi',
          symptom: 'Gejala yang muncul',
          solution: 'Langkah perbaikan masalah',
          preventive: 'Cara mencegah masalah berulang',
        },
      ],
      challenges: [
        {
          id: 'chal-1',
          title: 'Tantangan Mandiri Praktikan',
          level: 'Menengah',
          description: 'Deskripsi tugas mandiri yang harus diselesaikan',
          criteria: ['Kriteria 1 berhasil'],
        },
      ],
    };
  });

  const [activeTab, setActiveTab] = useState<'info' | 'pelajari' | 'steps' | 'practice' | 'quiz' | 'troubleshoot' | 'challenge'>('info');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.slug || !formData.code) {
      setError('Nama alat, kode alat, dan slug URL wajib diisi.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan alat.');
      }

      onSaved(data.tool);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  // Helper spec list
  const addSpec = () => {
    setFormData((prev) => ({ ...prev, specs: [...prev.specs, ''] }));
  };
  const updateSpec = (idx: number, val: string) => {
    const updated = [...formData.specs];
    updated[idx] = val;
    setFormData((prev) => ({ ...prev, specs: updated }));
  };
  const removeSpec = (idx: number) => {
    setFormData((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== idx) }));
  };

  // Helper Steps
  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: `step-${Date.now()}`,
          stepNumber: prev.steps.length + 1,
          title: `Langkah ${prev.steps.length + 1}`,
          description: '',
          tip: '',
        },
      ],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isEditing ? `Edit Materi: ${initialTool.name}` : 'Tambah Alat Laboratorium Baru'}
            </h2>
            <p className="text-xs text-neutral-400">
              Konfigurasi detail identitas alat dan 7 alur belajar mandiri
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab navigation */}
        <div className="border-b border-neutral-800 bg-neutral-950/60 px-4 flex overflow-x-auto no-scrollbar">
          {[
            { id: 'info', label: '1. Kenali Alat' },
            { id: 'pelajari', label: '2. Pelajari' },
            { id: 'steps', label: '3. Cara Pakai' },
            { id: 'practice', label: '4. Coba Sendiri' },
            { id: 'quiz', label: '5. Kuis' },
            { id: 'troubleshoot', label: '6. Troubleshooting' },
            { id: 'challenge', label: '7. Challenge' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* TAB 1: IDENTITAS ALAT (KENALI) */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Nama Alat *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setFormData((prev) => ({
                        ...prev,
                        name,
                        slug: isEditing ? prev.slug : slug,
                      }));
                    }}
                    placeholder="Contoh: MikroTik RouterBoard RB750Gr3"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Slug URL (Untuk QR) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="mikrotik-rb750gr3"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Kode Alat Laboratorium *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                    placeholder="Contoh: LAB-NET-01"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Kategori</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Jaringan Komputer / IoT / Sistem Tertanam"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Lokasi Penempatan di Lab</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Contoh: Meja Praktikum Jaringan 02 - Lab Jarkom Lantai 3"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase">URL Gambar / Foto Alat</label>
                  <input
                    type="text"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-400 uppercase">Deskripsi Perangkat</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Penjelasan umum tentang perangkat..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-400 uppercase">Fungsi Utama dalam Praktikum</label>
                <textarea
                  rows={2}
                  value={formData.functionSummary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, functionSummary: e.target.value }))}
                  placeholder="Kegunaan alat bagi praktikan..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              {/* Specs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-neutral-400 uppercase">Daftar Spesifikasi</label>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="text-xs text-white hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Spek
                  </button>
                </div>
                {formData.specs.map((sp, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={sp}
                      onChange={(e) => updateSpec(idx, e.target.value)}
                      placeholder="Spesifikasi teknis..."
                      className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="p-1.5 text-neutral-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PELAJARI */}
          {activeTab === 'pelajari' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-400 uppercase">URL Video Embed (YouTube dsb)</label>
                <input
                  type="text"
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-400 uppercase">Ringkasan Materi / Teori Singkat</label>
                <textarea
                  rows={3}
                  value={formData.moduleSummary || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, moduleSummary: e.target.value }))}
                  placeholder="Ringkasan poin kunci yang harus dipahami praktikan..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-400 uppercase">Catatan Lengkap Teori / Catatan Lab</label>
                <textarea
                  rows={6}
                  value={formData.moduleContent || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, moduleContent: e.target.value }))}
                  placeholder="Catatan teks / markdown..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CARA MENGGUNAKAN */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Panduan Langkah Demi Langkah</h3>
                <button
                  type="button"
                  onClick={addStep}
                  className="px-2.5 py-1 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Langkah
                </button>
              </div>

              {formData.steps.map((st, idx) => (
                <div key={st.id || idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold">Langkah #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          steps: prev.steps.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={st.title}
                    onChange={(e) => {
                      const updated = [...formData.steps];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({ ...prev, steps: updated }));
                    }}
                    placeholder="Judul langkah (misal: Hubungkan Adaptor Daya)"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={(e) => {
                      const updated = [...formData.steps];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({ ...prev, steps: updated }));
                    }}
                    placeholder="Instruksi detail..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    value={st.tip || ''}
                    onChange={(e) => {
                      const updated = [...formData.steps];
                      updated[idx].tip = e.target.value;
                      setFormData((prev) => ({ ...prev, steps: updated }));
                    }}
                    placeholder="Tips asisten lab (opsional)"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: COBA SENDIRI */}
          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Daftar Tugas Praktik Hands-on</h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      practiceTasks: [
                        ...prev.practiceTasks,
                        {
                          id: `task-${Date.now()}`,
                          order: prev.practiceTasks.length + 1,
                          title: 'Tugas Praktik Baru',
                          instruction: '',
                          expectedResult: '',
                        },
                      ],
                    }))
                  }
                  className="px-2.5 py-1 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Tugas
                </button>
              </div>

              {formData.practiceTasks.map((pt, idx) => (
                <div key={pt.id || idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold">Tugas #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          practiceTasks: prev.practiceTasks.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pt.title}
                    onChange={(e) => {
                      const updated = [...formData.practiceTasks];
                      updated[idx].title = e.target.value;
                      setFormData((prev) => ({ ...prev, practiceTasks: updated }));
                    }}
                    placeholder="Judul tugas praktik..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    value={pt.instruction}
                    onChange={(e) => {
                      const updated = [...formData.practiceTasks];
                      updated[idx].instruction = e.target.value;
                      setFormData((prev) => ({ ...prev, practiceTasks: updated }));
                    }}
                    placeholder="Instruksi langkah yang harus dilakukan mahasiswa..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    value={pt.expectedResult || ''}
                    onChange={(e) => {
                      const updated = [...formData.practiceTasks];
                      updated[idx].expectedResult = e.target.value;
                      setFormData((prev) => ({ ...prev, practiceTasks: updated }));
                    }}
                    placeholder="Hasil yang diharapkan (misal: IP berhasil didapat)"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white font-mono"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: KUIS */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Soal Kuis Pemahaman</h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quizzes: [
                        ...prev.quizzes,
                        {
                          id: `quiz-${Date.now()}`,
                          question: 'Soal kuis baru...',
                          options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
                          correctAnswer: 0,
                          explanation: '',
                        },
                      ],
                    }))
                  }
                  className="px-2.5 py-1 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Soal
                </button>
              </div>

              {formData.quizzes.map((qz, idx) => (
                <div key={qz.id || idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold">Soal #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          quizzes: prev.quizzes.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={qz.question}
                    onChange={(e) => {
                      const updated = [...formData.quizzes];
                      updated[idx].question = e.target.value;
                      setFormData((prev) => ({ ...prev, quizzes: updated }));
                    }}
                    placeholder="Pertanyaan kuis..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase">
                      Pilihan Jawaban (Pilih radio untuk jawaban benar)
                    </span>
                    {qz.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qz.id}`}
                          checked={qz.correctAnswer === oIdx}
                          onChange={() => {
                            const updated = [...formData.quizzes];
                            updated[idx].correctAnswer = oIdx;
                            setFormData((prev) => ({ ...prev, quizzes: updated }));
                          }}
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...formData.quizzes];
                            updated[idx].options[oIdx] = e.target.value;
                            setFormData((prev) => ({ ...prev, quizzes: updated }));
                          }}
                          className="flex-1 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={qz.explanation || ''}
                    onChange={(e) => {
                      const updated = [...formData.quizzes];
                      updated[idx].explanation = e.target.value;
                      setFormData((prev) => ({ ...prev, quizzes: updated }));
                    }}
                    placeholder="Penjelasan kenapa jawaban tersebut benar..."
                    className="w-full px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-400"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: TROUBLESHOOTING */}
          {activeTab === 'troubleshoot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Daftar Troubleshooting Masalah</h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      troubleshoots: [
                        ...prev.troubleshoots,
                        {
                          id: `tb-${Date.now()}`,
                          problem: 'Masalah baru',
                          symptom: '',
                          solution: '',
                          preventive: '',
                        },
                      ],
                    }))
                  }
                  className="px-2.5 py-1 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Masalah
                </button>
              </div>

              {formData.troubleshoots.map((tb, idx) => (
                <div key={tb.id || idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold">Masalah #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          troubleshoots: prev.troubleshoots.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={tb.problem}
                    onChange={(e) => {
                      const updated = [...formData.troubleshoots];
                      updated[idx].problem = e.target.value;
                      setFormData((prev) => ({ ...prev, troubleshoots: updated }));
                    }}
                    placeholder="Judul permasalahan..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white font-medium"
                  />
                  <input
                    type="text"
                    value={tb.symptom || ''}
                    onChange={(e) => {
                      const updated = [...formData.troubleshoots];
                      updated[idx].symptom = e.target.value;
                      setFormData((prev) => ({ ...prev, troubleshoots: updated }));
                    }}
                    placeholder="Gejala fisik atau pesan error..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-300"
                  />
                  <textarea
                    rows={3}
                    value={tb.solution}
                    onChange={(e) => {
                      const updated = [...formData.troubleshoots];
                      updated[idx].solution = e.target.value;
                      setFormData((prev) => ({ ...prev, troubleshoots: updated }));
                    }}
                    placeholder="Langkah penyelesaian praktis..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    value={tb.preventive || ''}
                    onChange={(e) => {
                      const updated = [...formData.troubleshoots];
                      updated[idx].preventive = e.target.value;
                      setFormData((prev) => ({ ...prev, troubleshoots: updated }));
                    }}
                    placeholder="Tindakan pencegahan..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-400"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: CHALLENGE */}
          {activeTab === 'challenge' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Tugas Mandiri (Challenge)</h3>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      challenges: [
                        ...prev.challenges,
                        {
                          id: `chal-${Date.now()}`,
                          title: 'Tantangan Baru',
                          level: 'Menengah',
                          description: '',
                          criteria: ['Kriteria kelulusan'],
                        },
                      ],
                    }))
                  }
                  className="px-2.5 py-1 rounded bg-neutral-800 text-xs text-white hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Tantangan
                </button>
              </div>

              {formData.challenges.map((ch, idx) => (
                <div key={ch.id || idx} className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-bold">Challenge #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          challenges: prev.challenges.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={ch.title}
                      onChange={(e) => {
                        const updated = [...formData.challenges];
                        updated[idx].title = e.target.value;
                        setFormData((prev) => ({ ...prev, challenges: updated }));
                      }}
                      placeholder="Judul tantangan..."
                      className="col-span-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                    />
                    <select
                      value={ch.level}
                      onChange={(e) => {
                        const updated = [...formData.challenges];
                        updated[idx].level = e.target.value as any;
                        setFormData((prev) => ({ ...prev, challenges: updated }));
                      }}
                      className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                    >
                      <option value="Pemula">Pemula</option>
                      <option value="Menengah">Menengah</option>
                      <option value="Mahir">Mahir</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    value={ch.description}
                    onChange={(e) => {
                      const updated = [...formData.challenges];
                      updated[idx].description = e.target.value;
                      setFormData((prev) => ({ ...prev, challenges: updated }));
                    }}
                    placeholder="Instruksi tantangan..."
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white"
                  />
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase">Kriteria Kelulusan</label>
                    <textarea
                      rows={2}
                      value={ch.criteria.join('\n')}
                      onChange={(e) => {
                        const updated = [...formData.challenges];
                        updated[idx].criteria = e.target.value.split('\n').filter(Boolean);
                        setFormData((prev) => ({ ...prev, challenges: updated }));
                      }}
                      placeholder="Tulis setiap kriteria di baris baru..."
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Materi Perangkat'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ToolData } from '@/types/tool';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  Wrench,
  HelpCircle,
  AlertTriangle,
  Trophy,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Tag,
  Cpu,
  PlayCircle,
  Lightbulb,
  RotateCcw,
  Check,
  ShieldCheck,
  Flame,
  Info
} from 'lucide-react';

interface ToolLearningViewProps {
  tool: ToolData;
}

type TabType =
  | 'kenali'
  | 'pelajari'
  | 'cara-menggunakan'
  | 'coba-sendiri'
  | 'kuis'
  | 'troubleshooting'
  | 'challenge';

export default function ToolLearningView({ tool }: ToolLearningViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('kenali');

  // State untuk Coba Sendiri (Checklist)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // State untuk Kuis
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // State untuk Troubleshooting accordion
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(
    tool.troubleshoots?.[0]?.id || null
  );

  const tabs: { id: TabType; label: string; icon: any; stepNumber: number }[] = [
    { id: 'kenali', label: '1. Kenali', icon: Compass, stepNumber: 1 },
    { id: 'pelajari', label: '2. Pelajari', icon: BookOpen, stepNumber: 2 },
    { id: 'cara-menggunakan', label: '3. Cara Pakai', icon: Wrench, stepNumber: 3 },
    { id: 'coba-sendiri', label: '4. Coba Sendiri', icon: CheckCircle2, stepNumber: 4 },
    { id: 'kuis', label: '5. Tes Pemahaman', icon: HelpCircle, stepNumber: 5 },
    { id: 'troubleshooting', label: '6. Troubleshooting', icon: AlertTriangle, stepNumber: 6 },
    { id: 'challenge', label: '7. Challenge', icon: Trophy, stepNumber: 7 },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    if (!tool.quizzes || tool.quizzes.length === 0) return 0;
    let correct = 0;
    tool.quizzes.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / tool.quizzes.length) * 100);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const practiceProgress = tool.practiceTasks.length > 0
    ? Math.round(
        (Object.values(completedTasks).filter(Boolean).length / tool.practiceTasks.length) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Standalone Header - Minimalist Black & White */}
      <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-wider">
              QR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
                  {tool.code}
                </span>
                <span className="text-xs text-neutral-400 hidden sm:inline-block">
                  Asisten Belajar Mandiri
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate max-w-[220px] sm:max-w-md">
                {tool.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-neutral-400 block">Lokasi Lab</span>
              <span className="text-xs text-neutral-200 font-medium">{tool.location}</span>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Sistem Aktif" />
          </div>
        </div>

        {/* Horizontal Stepper Tabs (Scrollable on Mobile) */}
        <div className="border-t border-neutral-800/80 bg-neutral-900/50">
          <div className="max-w-4xl mx-auto px-2 flex overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-white text-white bg-neutral-800/40'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* TAB 1: KENALI ALAT */}
        {activeTab === 'kenali' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-800 border border-neutral-700 text-neutral-300">
                  <Tag className="w-3 h-3" /> {tool.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-800 border border-neutral-700 text-neutral-300">
                  <MapPin className="w-3 h-3" /> {tool.location}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  {tool.name}
                </h2>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {tool.description}
                </p>
              </div>

              {tool.imageUrl && (
                <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 aspect-video max-h-72">
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 rounded text-[11px] font-mono text-neutral-400 border border-neutral-800">
                    Foto Perangkat Laboratorium
                  </div>
                </div>
              )}

              {/* Fungsi Utama */}
              <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Info className="w-4 h-4 text-neutral-400" />
                  <span>Fungsi Utama dalam Praktikum</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {tool.functionSummary}
                </p>
              </div>

              {/* Spesifikasi Teknis */}
              {tool.specs && tool.specs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Spesifikasi Perangkat
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tool.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-neutral-950/70 border border-neutral-800/80 text-xs font-mono text-neutral-300 flex items-start gap-2"
                      >
                        <span className="text-neutral-500 font-bold">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: PELAJARI */}
        {activeTab === 'pelajari' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Video & Modul Ringkas
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Pelajari prinsip kerja dan arsitektur perangkat sebelum memulai praktik hands-on.
                </p>
              </div>

              {/* Video Embed or Placeholder */}
              {tool.videoUrl && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <PlayCircle className="w-4 h-4 text-neutral-300" />
                    <span>Video Penjelasan / Tutorial</span>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                    <iframe
                      src={tool.videoUrl}
                      title="Tutorial Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Ringkasan Modul */}
              {tool.moduleSummary && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-neutral-400" />
                    <span>Ringkasan Materi Penting</span>
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {tool.moduleSummary}
                  </p>
                </div>
              )}

              {/* Detail Konten Teori */}
              {tool.moduleContent && (
                <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Catatan Laboratorium
                  </h3>
                  <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line font-mono bg-neutral-950 p-4 rounded border border-neutral-800/80">
                    {tool.moduleContent}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: CARA MENGGUNAKAN */}
        {activeTab === 'cara-menggunakan' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Panduan Langkah Demi Langkah
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Ikuti instruksi penggunaan perangkat secara berurutan untuk keamanan alat dan data.
                </p>
              </div>

              <div className="space-y-4">
                {tool.steps.map((step) => (
                  <div
                    key={step.id}
                    className="p-4 sm:p-5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {step.tip && (
                      <div className="ml-10 p-3 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-200">Tips Asisten:</strong> {step.tip}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: COBA SENDIRI */}
        {activeTab === 'coba-sendiri' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                    Praktik Mandiri (Hands-on Lab)
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Lakukan instruksi berikut langsung di perangkat dan centang saat selesai.
                  </p>
                </div>
                <div className="bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-right">
                  <span className="text-[11px] text-neutral-400 uppercase font-mono block">Progres Praktik</span>
                  <span className="text-lg font-mono font-bold text-white">
                    {practiceProgress}% Selesai
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${practiceProgress}%` }}
                />
              </div>

              <div className="space-y-3">
                {tool.practiceTasks.map((task) => {
                  const isChecked = !!completedTasks[task.id];
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                        isChecked
                          ? 'bg-neutral-950/80 border-neutral-700 opacity-90'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-white border-white text-black'
                            : 'border-neutral-600 bg-neutral-900 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neutral-500">Tugas #{task.order}</span>
                          <h3
                            className={`text-sm font-semibold transition-all ${
                              isChecked ? 'text-neutral-400 line-through' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {task.instruction}
                        </p>
                        {task.expectedResult && (
                          <div className="mt-2 text-xs font-mono bg-neutral-900 p-2 rounded border border-neutral-800 text-neutral-300">
                            <span className="text-neutral-400 font-semibold">Hasil yang Diharapkan:</span>{' '}
                            {task.expectedResult}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {practiceProgress === 100 && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-white/20 text-center space-y-2 animate-fadeIn">
                  <ShieldCheck className="w-8 h-8 text-white mx-auto" />
                  <h4 className="text-base font-bold text-white">Semua Langkah Praktik Selesai!</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Bagus sekali! Anda telah menyelesaikan seluruh prosedur operasional dasar. Lanjutkan ke tes pemahaman untuk menguji pengetahuan Anda.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 5: TES PEMAHAMAN (KUIS) */}
        {activeTab === 'kuis' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                    Tes Pemahaman (Kuis Singkat)
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Jawab pertanyaan konseptual berikut untuk memvalidasi pemahaman materi.
                  </p>
                </div>

                {quizSubmitted && (
                  <div className="bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-right">
                    <span className="text-[11px] text-neutral-400 uppercase font-mono block">Skor Akhir</span>
                    <span className="text-xl font-mono font-bold text-white">
                      {calculateScore()} / 100
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {tool.quizzes.map((quiz, qIdx) => {
                  const userAnswer = selectedAnswers[quiz.id];
                  const isAnswered = userAnswer !== undefined;

                  return (
                    <div
                      key={quiz.id}
                      className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                          Soal #{qIdx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-medium text-white flex-1 leading-snug">
                          {quiz.question}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {quiz.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          let btnStyle = 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-600';

                          if (quizSubmitted) {
                            if (optIdx === quiz.correctAnswer) {
                              btnStyle = 'border-white bg-white text-black font-semibold';
                            } else if (isSelected && optIdx !== quiz.correctAnswer) {
                              btnStyle = 'border-neutral-700 bg-neutral-900 text-neutral-500 line-through';
                            } else {
                              btnStyle = 'border-neutral-900 bg-neutral-950 text-neutral-600';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-white bg-neutral-800 text-white font-medium';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectAnswer(quiz.id, optIdx)}
                              disabled={quizSubmitted}
                              className={`p-3 rounded-lg border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && optIdx === quiz.correctAnswer && (
                                <Check className="w-4 h-4 text-black stroke-[3]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && quiz.explanation && (
                        <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                          <span className="font-semibold text-neutral-200">Penjelasan Jawaban:</span>
                          <p>{quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Reset Actions */}
              <div className="flex items-center justify-between pt-2">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Periksa Jawaban Kuis
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 border border-neutral-700 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Ulangi Kuis
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: TROUBLESHOOTING */}
        {activeTab === 'troubleshooting' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Panduan Troubleshooting Masalah
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Mengalami kendala pada alat? Pilih permasalahan yang terjadi untuk melihat petunjuk solusinya.
                </p>
              </div>

              <div className="space-y-3">
                {tool.troubleshoots.map((item) => {
                  const isSelected = selectedIssueId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedIssueId(isSelected ? null : item.id)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-neutral-900/60 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-white">
                              {item.problem}
                            </h3>
                            {item.symptom && (
                              <p className="text-xs text-neutral-400 mt-0.5">
                                Gejala: {item.symptom}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 text-neutral-500 transition-transform ${
                            isSelected ? 'rotate-90 text-white' : ''
                          }`}
                        />
                      </button>

                      {isSelected && (
                        <div className="p-4 pt-2 border-t border-neutral-800/80 bg-neutral-900/40 space-y-3">
                          <div className="space-y-1">
                            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                              Langkah Penyelesaian / Solusi:
                            </span>
                            <div className="text-xs sm:text-sm text-neutral-200 whitespace-pre-line leading-relaxed bg-neutral-950 p-3 rounded border border-neutral-800">
                              {item.solution}
                            </div>
                          </div>

                          {item.preventive && (
                            <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                              <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-neutral-200">Tindakan Pencegahan:</strong>{' '}
                                {item.preventive}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TAB 7: CHALLENGE */}
        {activeTab === 'challenge' && (
          <section className="space-y-6 animate-fadeIn">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                  Tugas Mandiri (Challenge)
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Tuntaskan tantangan mandiri ini dan konfirmasi hasil akhir konfigurasi ke asisten lab.
                </p>
              </div>

              <div className="space-y-5">
                {tool.challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-5 sm:p-6 rounded-lg bg-neutral-950 border border-neutral-800 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-white" />
                        {challenge.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-white text-black font-semibold">
                        Tingkat: {challenge.level}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {challenge.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                        Kriteria Kelulusan Tantangan:
                      </span>
                      <div className="space-y-2">
                        {challenge.criteria.map((crit, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 rounded bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center font-mono text-[11px] shrink-0 font-bold">
                              {cIdx + 1}
                            </span>
                            <span>{crit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Flow Navigation (Next / Previous Stage) */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
          <button
            type="button"
            onClick={goToPrevTab}
            disabled={currentTabIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800 text-xs sm:text-sm font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs font-mono text-neutral-500">
            Tahap {currentTabIndex + 1} dari {tabs.length}
          </span>

          <button
            type="button"
            onClick={goToNextTab}
            disabled={currentTabIndex === tabs.length - 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Clean Minimalist Lab Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-4 text-center text-xs text-neutral-600 font-mono">
        Smart Lab QR • Asisten Belajar Mandiri Laboratorium
      </footer>
    </div>
  );
}

export interface UsageStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface PracticeTask {
  id: string;
  order: number;
  title: string;
  instruction: string;
  expectedResult?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation?: string;
}

export interface TroubleshootItem {
  id: string;
  problem: string;
  symptom?: string;
  solution: string;
  preventive?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  level: 'Pemula' | 'Menengah' | 'Mahir';
  description: string;
  criteria: string[];
}

export interface ToolData {
  id: string;
  slug: string;
  name: string;
  category: string;
  code: string;
  location: string;
  imageUrl?: string;
  description: string;
  functionSummary: string;
  specs: string[];

  // 2. Pelajari
  videoUrl?: string;
  moduleSummary?: string;
  moduleContent?: string;

  // 3. Cara Menggunakan
  steps: UsageStep[];

  // 4. Coba Sendiri
  practiceTasks: PracticeTask[];

  // 5. Tes Pemahaman
  quizzes: QuizQuestion[];

  // 6. Troubleshooting
  troubleshoots: TroubleshootItem[];

  // 7. Challenge
  challenges: ChallengeItem[];

  createdAt?: string;
  updatedAt?: string;
}

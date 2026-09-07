export type GradeLevel = 'Pre-K' | 'Kindergarten' | '1st Grade' | '2nd Grade' | '3rd Grade' | '4th Grade' | '5th Grade';

export type Subject = 'Math' | 'Language Arts' | 'Science' | 'Typing' | 'Logic & Puzzles' | 'Creative Arts';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type GameType = 'interactive_worksheet' | 'bubble_pop' | 'word_builder' | 'speed_typing';

export interface Question {
  id: string;
  prompt: string;
  imageEmoji?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  hint?: string;
}

export interface WorksheetGame {
  id: string;
  title: string;
  slug: string;
  grade: GradeLevel;
  subject: Subject;
  topic: string;
  description: string;
  difficulty: Difficulty;
  gameType: GameType;
  questionsCount: number;
  timeLimitSec?: number;
  isPrintable: boolean;
  playsCount: number;
  rating: number;
  iconEmoji: string;
  badgeText?: string;
  questions: Question[];
}

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  avatar: string; // e.g., 'dino', 'unicorn', 'robot', 'lion', 'astronaut', 'owl'
  role: 'student' | 'parent' | 'teacher' | 'admin';
  grade: GradeLevel;
  totalXP: number;
  level: number;
  stars: number;
  streakDays: number;
  badges: string[];
  createdAt: string;
}

export interface GameSessionRecord {
  id: string;
  userId: string;
  worksheetId: string;
  worksheetTitle: string;
  subject: Subject;
  grade: GradeLevel;
  score: number;
  maxScore: number;
  accuracy: number;
  starsEarned: number;
  xpEarned: number;
  timeSpentSec: number;
  completedAt: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'milestone' | 'math' | 'reading' | 'streak' | 'accuracy';
}

export interface SubjectMastery {
  subject: Subject;
  accuracy: number;
  completedCount: number;
  stars: number;
}

export interface UserStats {
  totalXP: number;
  level: number;
  stars: number;
  gamesPlayed: number;
  averageAccuracy: number;
  streakDays: number;
  subjectMastery: SubjectMastery[];
  recentSessions: GameSessionRecord[];
  badges: AchievementBadge[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  grade: GradeLevel;
  stars: number;
  totalXP: number;
  badgesCount: number;
}

export interface MongoStatusResponse {
  connected: boolean;
  type: 'atlas' | 'embedded_persistent';
  databaseName: string;
  collections: {
    name: string;
    count: number;
  }[];
  connectionUriConfigured: boolean;
  message: string;
}

export interface AdminStats {
  totalUsers: number;
  totalGamesPlayed: number;
  totalWorksheets: number;
  avgAccuracy: number;
  totalStarsAwarded: number;
  totalXpEarned: number;
  subjectDistribution: { subject: string; count: number }[];
  gradeDistribution: { grade: string; count: number }[];
}

export interface CustomTableInfo {
  name: string;
  description: string;
  columns: string[];
  count: number;
  createdAt?: string;
}


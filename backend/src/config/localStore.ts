import fs from 'fs';
import { DATA_DIR, LOCAL_DB_FILE } from './env';

export interface LocalDB {
  users: any[];
  game_sessions: any[];
  progress_tracking: any[];
  worksheet_records: any[];
  achievements: any[];
  worksheets?: any[];
  custom_tables?: Record<string, any[]>;
  custom_tables_meta?: any[];
  [key: string]: any;
}

const DEFAULT_ADMIN = {
  _id: 'admin-super-1',
  username: 'admin',
  email: 'admin@wonderkids.edu',
  role: 'admin',
  avatar: 'owl',
  grade: '5th Grade',
  totalXP: 9999,
  level: 25,
  stars: 500,
  streakDays: 30,
  badges: ['welcome_adventurer', 'first_game', 'math_whiz', 'star_collector'],
  createdAt: new Date().toISOString()
};

export function initLocalStore(): LocalDB {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_FILE)) {
    const initialData: LocalDB = {
      users: [
        DEFAULT_ADMIN,
        {
          _id: 'demo-student-1',
          username: 'StarExplorer Leo',
          role: 'student',
          avatar: 'lion',
          grade: '1st Grade',
          totalXP: 450,
          level: 3,
          stars: 48,
          streakDays: 4,
          badges: ['first_game', 'math_star', 'curious_learner'],
          createdAt: new Date().toISOString()
        }
      ],
      game_sessions: [
        {
          _id: 'session-demo-1',
          userId: 'demo-student-1',
          worksheetId: 'math-1-addition-quest',
          worksheetTitle: 'Magical Addition Forest (Within 20)',
          subject: 'Math',
          grade: '1st Grade',
          score: 5,
          maxScore: 5,
          accuracy: 100,
          starsEarned: 3,
          xpEarned: 100,
          timeSpentSec: 42,
          completedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
        },
        {
          _id: 'session-demo-2',
          userId: 'demo-student-1',
          worksheetId: 'la-1-spelling-safari',
          worksheetTitle: 'Word Wizard Spelling Safari',
          subject: 'Language Arts',
          grade: '1st Grade',
          score: 4,
          maxScore: 5,
          accuracy: 80,
          starsEarned: 2,
          xpEarned: 80,
          timeSpentSec: 58,
          completedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
        }
      ],
      progress_tracking: [
        { userId: 'demo-student-1', subject: 'Math', accuracy: 100, completedCount: 4, stars: 12 },
        { userId: 'demo-student-1', subject: 'Language Arts', accuracy: 85, completedCount: 3, stars: 8 },
        { userId: 'demo-student-1', subject: 'Science', accuracy: 90, completedCount: 2, stars: 6 },
        { userId: 'demo-student-1', subject: 'Typing', accuracy: 95, completedCount: 3, stars: 9 }
      ],
      worksheet_records: [],
      achievements: [
        {
          userId: 'demo-student-1',
          badgeId: 'first_game',
          title: 'First Step Champion',
          icon: '🌟',
          unlockedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString()
        },
        {
          userId: 'demo-student-1',
          badgeId: 'math_star',
          title: 'Math Magician',
          icon: '🪄',
          unlockedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
        }
      ]
    };
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  try {
    const raw = fs.readFileSync(LOCAL_DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.worksheets) parsed.worksheets = [];
    if (!parsed.custom_tables) parsed.custom_tables = {};
    if (!parsed.custom_tables_meta) parsed.custom_tables_meta = [];
    if (!parsed.users) parsed.users = [];

    const hasAdmin = parsed.users.some((u: any) => u.username?.toLowerCase() === 'admin' || u.role === 'admin');
    if (!hasAdmin) {
      parsed.users.unshift({ ...DEFAULT_ADMIN, createdAt: new Date().toISOString() });
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(parsed, null, 2));
    }
    return parsed;
  } catch {
    return {
      users: [], game_sessions: [], progress_tracking: [], worksheet_records: [],
      achievements: [], worksheets: [], custom_tables: {}, custom_tables_meta: []
    };
  }
}

export function saveLocalStore(data: LocalDB) {
  try {
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write local database file:', err);
  }
}

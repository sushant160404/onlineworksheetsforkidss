import { mongoState } from '../config/mongo';
import { initLocalStore } from '../config/localStore';

export const DatabaseModel = {
  async getCollectionCounts() {
    if (mongoState.isConnected && mongoState.db) {
      const baseCollections = ['users', 'game_sessions', 'progress_tracking', 'worksheet_records', 'achievements', 'worksheets'];
      let customNames: string[] = [];
      try {
        const customMeta = await mongoState.db.collection('custom_tables_meta').find({}).toArray();
        customNames = customMeta.map((c: any) => c.name);
      } catch {}
      const allNames = Array.from(new Set([...baseCollections, ...customNames]));
      return Promise.all(
        allNames.map(async (name) => {
          try {
            const count = await mongoState.db!.collection(name).countDocuments();
            return { name, count };
          } catch {
            return { name, count: 0 };
          }
        })
      );
    }
    const local = initLocalStore();
    const counts = [
      { name: 'users', count: (local.users || []).length },
      { name: 'game_sessions', count: (local.game_sessions || []).length },
      { name: 'progress_tracking', count: (local.progress_tracking || []).length },
      { name: 'worksheet_records', count: (local.worksheet_records || []).length },
      { name: 'achievements', count: (local.achievements || []).length },
      { name: 'worksheets', count: (local.worksheets || []).length }
    ];
    const customMeta = local.custom_tables_meta || [];
    for (const t of customMeta) {
      counts.push({ name: t.name, count: (local.custom_tables?.[t.name] || []).length });
    }
    return counts;
  },

  async getTableRows(tableName: string, limit = 50) {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection(tableName).find({}).sort({ _id: -1 }).limit(limit).toArray();
    }
    const local = initLocalStore();
    if ((local as any)[tableName]) return (local as any)[tableName].slice(0, limit);
    if (local.custom_tables && local.custom_tables[tableName]) return local.custom_tables[tableName].slice(0, limit);
    return [];
  },

  async getAdminStats() {
    let users: any[] = [];
    let sessions: any[] = [];
    let customWorksheets: any[] = [];

    if (mongoState.isConnected && mongoState.db) {
      users = await mongoState.db.collection('users').find({}).toArray();
      sessions = await mongoState.db.collection('game_sessions').find({}).toArray();
      customWorksheets = await mongoState.db.collection('worksheets').find({}).toArray();
    } else {
      const local = initLocalStore();
      users = local.users || [];
      sessions = local.game_sessions || [];
      customWorksheets = local.worksheets || [];
    }

    const totalUsers = users.length;
    const totalGamesPlayed = sessions.length;
    const totalWorksheets = 1000 + customWorksheets.length;

    const avgAccuracy = sessions.length > 0
      ? Math.round(sessions.reduce((acc: number, s: any) => acc + (s.accuracy || 0), 0) / sessions.length)
      : 95;

    const totalStarsAwarded = users.reduce((acc: number, u: any) => acc + (u.stars || 0), 0);
    const totalXpEarned = users.reduce((acc: number, u: any) => acc + (u.totalXP || 0), 0);

    const subjects = ['Math', 'Language Arts', 'Science', 'Typing', 'Logic & Puzzles', 'Creative Arts'];
    const subjectDistribution = subjects.map(subject => ({
      subject,
      count: sessions.filter((s: any) => s.subject === subject).length
    }));

    const grades = ['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
    const gradeDistribution = grades.map(grade => ({
      grade,
      count: users.filter((u: any) => u.grade === grade).length
    }));

    return {
      totalUsers,
      totalGamesPlayed,
      totalWorksheets,
      avgAccuracy,
      totalStarsAwarded,
      totalXpEarned,
      subjectDistribution,
      gradeDistribution
    };
  }
};

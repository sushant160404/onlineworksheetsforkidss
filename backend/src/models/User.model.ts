import { mongoState } from '../config/mongo';
import { initLocalStore, saveLocalStore } from '../config/localStore';

export const UserModel = {
  async findByUsername(username: string) {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('users').findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    }
    const local = initLocalStore();
    return local.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },

  async findById(id: string) {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('users').findOne({ _id: id as any });
    }
    const local = initLocalStore();
    return local.users.find(u => u._id === id || u.id === id);
  },

  async create(userData: any) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('users').insertOne(userData);
      return userData;
    }
    const local = initLocalStore();
    local.users.push(userData);
    saveLocalStore(local);
    return userData;
  },

  async update(id: string, updates: any) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('users').updateOne({ _id: id as any }, { $set: updates });
      return;
    }
    const local = initLocalStore();
    const idx = local.users.findIndex(u => u._id === id || u.id === id);
    if (idx !== -1) {
      local.users[idx] = { ...local.users[idx], ...updates };
      saveLocalStore(local);
    }
  },

  async getAll() {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
    }
    const local = initLocalStore();
    return local.users || [];
  },

  async delete(id: string) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('users').deleteOne({ _id: id as any });
      await mongoState.db.collection('game_sessions').deleteMany({ userId: id });
      return true;
    }
    const local = initLocalStore();
    local.users = (local.users || []).filter(u => u._id !== id && u.id !== id);
    local.game_sessions = (local.game_sessions || []).filter(s => s.userId !== id);
    saveLocalStore(local);
    return true;
  },

  async getLeaderboard(limit = 10) {
    if (mongoState.isConnected && mongoState.db) {
      const users = await mongoState.db.collection('users')
        .find({})
        .sort({ stars: -1, totalXP: -1 })
        .limit(limit)
        .toArray();

      return users.map((u, i) => ({
        rank: i + 1,
        userId: u._id,
        username: u.username,
        avatar: u.avatar || 'lion',
        grade: u.grade || '1st Grade',
        stars: u.stars || 0,
        totalXP: u.totalXP || 0,
        badgesCount: (u.badges || []).length
      }));
    }
    const local = initLocalStore();
    const sorted = [...local.users].sort((a, b) => (b.stars || 0) - (a.stars || 0) || (b.totalXP || 0) - (a.totalXP || 0));
    return sorted.slice(0, limit).map((u, i) => ({
      rank: i + 1,
      userId: u._id || u.id,
      username: u.username,
      avatar: u.avatar || 'lion',
      grade: u.grade || '1st Grade',
      stars: u.stars || 0,
      totalXP: u.totalXP || 0,
      badgesCount: (u.badges || []).length
    }));
  }
};

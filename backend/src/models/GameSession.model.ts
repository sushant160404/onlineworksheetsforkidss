import { mongoState } from '../config/mongo';
import { initLocalStore, saveLocalStore } from '../config/localStore';

export const GameSessionModel = {
  async record(sessionData: any) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('game_sessions').insertOne(sessionData);
      return sessionData;
    }
    const local = initLocalStore();
    local.game_sessions.unshift(sessionData);
    saveLocalStore(local);
    return sessionData;
  },

  async getByUser(userId: string) {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('game_sessions').find({ userId }).sort({ completedAt: -1 }).limit(20).toArray();
    }
    const local = initLocalStore();
    return local.game_sessions.filter(s => s.userId === userId).slice(0, 20);
  },

  async getAll(limit = 100) {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('game_sessions').find({}).sort({ completedAt: -1 }).limit(limit).toArray();
    }
    const local = initLocalStore();
    return (local.game_sessions || []).slice(0, limit);
  },

  async delete(id: string) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('game_sessions').deleteOne({ _id: id as any });
      return true;
    }
    const local = initLocalStore();
    local.game_sessions = (local.game_sessions || []).filter(s => s._id !== id && s.id !== id);
    saveLocalStore(local);
    return true;
  }
};

import { mongoState } from '../config/mongo';
import { initLocalStore, saveLocalStore } from '../config/localStore';

export const WorksheetModel = {
  async getAll() {
    if (mongoState.isConnected && mongoState.db) {
      return mongoState.db.collection('worksheets').find({}).sort({ createdAt: -1 }).toArray();
    }
    const local = initLocalStore();
    return local.worksheets || [];
  },

  async save(data: any) {
    const id = data.id || data._id || 'ws_' + Date.now();
    const doc = { ...data, _id: id, id, updatedAt: new Date().toISOString() };
    if (!doc.createdAt) doc.createdAt = new Date().toISOString();

    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('worksheets').updateOne({ _id: id as any }, { $set: doc }, { upsert: true });
      return doc;
    }
    const local = initLocalStore();
    if (!local.worksheets) local.worksheets = [];
    const idx = local.worksheets.findIndex(w => (w._id || w.id) === id);
    if (idx !== -1) {
      local.worksheets[idx] = doc;
    } else {
      local.worksheets.unshift(doc);
    }
    saveLocalStore(local);
    return doc;
  },

  async delete(id: string) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('worksheets').deleteOne({ _id: id as any });
      return true;
    }
    const local = initLocalStore();
    if (local.worksheets) {
      local.worksheets = local.worksheets.filter(w => w._id !== id && w.id !== id);
      saveLocalStore(local);
    }
    return true;
  }
};

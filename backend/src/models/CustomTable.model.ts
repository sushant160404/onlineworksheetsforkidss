import { mongoState } from '../config/mongo';
import { initLocalStore, saveLocalStore } from '../config/localStore';

export const CustomTableModel = {
  async getAll() {
    if (mongoState.isConnected && mongoState.db) {
      try {
        const meta = await mongoState.db.collection('custom_tables_meta').find({}).toArray();
        return Promise.all(
          meta.map(async (t: any) => {
            const count = await mongoState.db!.collection(t.name).countDocuments();
            return { ...t, count };
          })
        );
      } catch {
        return [];
      }
    }
    const local = initLocalStore();
    const meta = local.custom_tables_meta || [];
    return meta.map((t: any) => ({ ...t, count: (local.custom_tables?.[t.name] || []).length }));
  },

  async create(name: string, description: string, columns: string[]) {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const metaObj = {
      _id: cleanName,
      name: cleanName,
      description: description || 'Custom kid educational dataset table',
      columns: columns.length > 0 ? columns : ['title', 'category', 'notes', 'status'],
      createdAt: new Date().toISOString()
    };

    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection('custom_tables_meta').updateOne({ _id: cleanName as any }, { $set: metaObj }, { upsert: true });
      const cols = await mongoState.db.listCollections({ name: cleanName }).toArray();
      if (cols.length === 0) {
        await mongoState.db.createCollection(cleanName);
      }
      return metaObj;
    }
    const local = initLocalStore();
    if (!local.custom_tables_meta) local.custom_tables_meta = [];
    if (!local.custom_tables) local.custom_tables = {};
    const idx = local.custom_tables_meta.findIndex((m: any) => m.name === cleanName);
    if (idx !== -1) {
      local.custom_tables_meta[idx] = metaObj;
    } else {
      local.custom_tables_meta.push(metaObj);
    }
    if (!local.custom_tables[cleanName]) local.custom_tables[cleanName] = [];
    saveLocalStore(local);
    return metaObj;
  },

  async insertRow(tableName: string, rowData: any) {
    const row = {
      _id: 'row_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      ...rowData,
      createdAt: new Date().toISOString()
    };

    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection(tableName).insertOne(row);
      return row;
    }
    const local = initLocalStore();
    if (!local.custom_tables) local.custom_tables = {};
    if (!local.custom_tables[tableName]) local.custom_tables[tableName] = [];
    local.custom_tables[tableName].unshift(row);
    saveLocalStore(local);
    return row;
  },

  async deleteRow(tableName: string, rowId: string) {
    if (mongoState.isConnected && mongoState.db) {
      await mongoState.db.collection(tableName).deleteOne({ _id: rowId as any });
      return true;
    }
    const local = initLocalStore();
    if (local.custom_tables?.[tableName]) {
      local.custom_tables[tableName] = local.custom_tables[tableName].filter((r: any) => r._id !== rowId && r.id !== rowId);
      saveLocalStore(local);
    }
    return true;
  }
};

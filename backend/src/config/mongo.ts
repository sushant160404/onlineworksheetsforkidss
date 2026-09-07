import { MongoClient, Db } from 'mongodb';
import { MONGODB_URI, DB_NAME } from './env';

export const mongoState = {
  client: null as MongoClient | null,
  db: null as Db | null,
  isConnected: false,
  connectionError: ''
};

export async function initMongoDB(): Promise<void> {
  if (!MONGODB_URI) {
    console.log('ℹ️ MONGODB_URI not set. Running with embedded persistent document store.');
    return;
  }

  try {
    mongoState.client = new MongoClient(MONGODB_URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    await mongoState.client.connect();
    mongoState.db = mongoState.client.db(DB_NAME);
    mongoState.isConnected = true;
    console.log(`✅ Successfully connected to MongoDB Atlas database: ${DB_NAME}`);

    const collections = await mongoState.db.listCollections().toArray();
    const existingNames = collections.map(c => c.name);
    const required = ['users', 'game_sessions', 'progress_tracking', 'worksheet_records', 'achievements'];

    for (const name of required) {
      if (!existingNames.includes(name)) {
        await mongoState.db.createCollection(name);
        console.log(`Created MongoDB collection: ${name}`);
      }
    }
  } catch (err: any) {
    console.warn(`⚠️ Could not connect to MongoDB Atlas (${err.message}). Using local persistent database.`);
    mongoState.connectionError = err.message;
    mongoState.isConnected = false;
  }
}

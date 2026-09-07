import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';

// Render provides PORT automatically; the default only matters for local dev.
export const PORT = Number(process.env.PORT) || 4000;

export const JWT_SECRET = process.env.JWT_SECRET || 'wonderkids_super_secret_jwt_key_2026';
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const DB_NAME = 'wonderkids_education';

// CORS_ORIGIN accepts a single origin or a comma-separated list, e.g.
// "https://your-app.vercel.app,https://your-app-git-main-you.vercel.app"
export const CORS_ORIGINS: string[] = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

export const DATA_DIR = path.join(process.cwd(), 'data');
export const LOCAL_DB_FILE = path.join(DATA_DIR, 'wonderkids_db.json');

if (IS_PRODUCTION && !process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET is not set. Using an insecure default — set it in your Render environment variables.');
}

if (IS_PRODUCTION && !process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI is not set. Data will be stored in a local JSON file, which does NOT persist reliably across Render deploys/restarts. Add a MONGODB_URI (e.g. MongoDB Atlas) for real persistence.');
}

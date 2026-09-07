import { Request, Response } from 'express';
import { DatabaseModel } from '../models/Database.model';
import { UserModel } from '../models/User.model';
import { mongoState } from '../config/mongo';
import { DB_NAME, MONGODB_URI } from '../config/env';

export const DbController = {
  health(req: Request, res: Response) {
    res.json({
      status: 'ok',
      service: 'onlineworksheetsforkidss Platform Backend',
      timestamp: new Date().toISOString()
    });
  },

  async status(req: Request, res: Response) {
    try {
      const collections = await DatabaseModel.getCollectionCounts();
      res.json({
        connected: mongoState.isConnected,
        type: mongoState.isConnected ? 'atlas' : 'embedded_persistent',
        databaseName: DB_NAME,
        collections,
        connectionUriConfigured: Boolean(MONGODB_URI),
        message: mongoState.isConnected
          ? 'Connected to MongoDB Atlas cluster securely'
          : (MONGODB_URI ? `MongoDB Atlas connection error: ${mongoState.connectionError}. Running on embedded persistent store.` : 'Running with local persistent store. Add MONGODB_URI to .env to connect to your Atlas cluster.')
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async tableRows(req: Request, res: Response) {
    try {
      const tableName = req.params.name;
      const rows = await DatabaseModel.getTableRows(tableName);
      res.json({ tableName, count: rows.length, rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async seed(req: Request, res: Response) {
    try {
      const sampleUsers = [
        {
          _id: 'user_sophia', username: 'Sophia MathWiz', role: 'student', avatar: 'unicorn', grade: '2nd Grade',
          totalXP: 1420, level: 7, stars: 124, streakDays: 8,
          badges: ['welcome_adventurer', 'first_game', 'perfect_score', 'star_collector', 'math_whiz'],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'user_noah', username: 'Noah DinoRacer', role: 'student', avatar: 'dino', grade: '1st Grade',
          totalXP: 980, level: 5, stars: 86, streakDays: 5,
          badges: ['welcome_adventurer', 'first_game', 'turbo_typer', 'word_wizard'],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'user_maya', username: 'Maya AstroGirl', role: 'student', avatar: 'astronaut', grade: '3rd Grade',
          totalXP: 1850, level: 9, stars: 160, streakDays: 14,
          badges: ['welcome_adventurer', 'first_game', 'perfect_score', 'star_collector', 'math_whiz', 'word_wizard', 'turbo_typer'],
          createdAt: new Date().toISOString()
        }
      ];

      for (const u of sampleUsers) {
        const existing = await UserModel.findById(u._id);
        if (!existing) await UserModel.create(u);
      }

      res.json({ message: 'Sample kids & games seeded successfully!' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

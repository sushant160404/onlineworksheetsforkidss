import { Request, Response } from 'express';
import { DatabaseModel } from '../models/Database.model';
import { UserModel } from '../models/User.model';
import { GameSessionModel } from '../models/GameSession.model';
import { WorksheetModel } from '../models/Worksheet.model';
import { CustomTableModel } from '../models/CustomTable.model';

export const AdminController = {
  async getStats(req: Request, res: Response) {
    try {
      const stats = await DatabaseModel.getAdminStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getAll();
      const safe = users.map((u: any) => {
        const { passwordHash: _, ...rest } = u;
        return { ...rest, id: rest._id || rest.id };
      });
      res.json({ users: safe });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role, stars, totalXP, level, grade } = req.body;
      const updates: any = {};
      if (role !== undefined) updates.role = role;
      if (stars !== undefined) updates.stars = Number(stars);
      if (totalXP !== undefined) updates.totalXP = Number(totalXP);
      if (level !== undefined) updates.level = Number(level);
      if (grade !== undefined) updates.grade = grade;

      await UserModel.update(id, updates);
      const updated = await UserModel.findById(id);
      res.json({ success: true, user: updated });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserModel.delete(id);
      res.json({ success: true, message: `User ${id} removed successfully` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getSessions(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 100;
      const sessions = await GameSessionModel.getAll(limit);
      res.json({ sessions: sessions.map((s: any) => ({ ...s, id: s._id || s.id })) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteSession(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await GameSessionModel.delete(id);
      res.json({ success: true, message: 'Game session deleted' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getWorksheets(req: Request, res: Response) {
    try {
      const worksheets = await WorksheetModel.getAll();
      res.json({ worksheets: worksheets.map((w: any) => ({ ...w, id: w._id || w.id })) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async createWorksheet(req: Request, res: Response) {
    try {
      const worksheetData = req.body;
      if (!worksheetData.title || !worksheetData.grade || !worksheetData.subject) {
        return res.status(400).json({ error: 'Title, grade, and subject are required' });
      }

      const id = worksheetData.id || ('custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));
      const newWorksheet = {
        ...worksheetData,
        _id: id,
        id,
        slug: worksheetData.slug || worksheetData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        isCustom: true,
        playsCount: worksheetData.playsCount || 0,
        rating: worksheetData.rating || 5.0,
        questionsCount: (worksheetData.questions || []).length || 5,
        iconEmoji: worksheetData.iconEmoji || '✨'
      };

      const saved = await WorksheetModel.save(newWorksheet);
      res.json({ success: true, worksheet: saved });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateWorksheet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const saved = await WorksheetModel.save({ ...updates, id, _id: id });
      res.json({ success: true, worksheet: saved });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteWorksheet(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await WorksheetModel.delete(id);
      res.json({ success: true, message: 'Worksheet deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async getTables(req: Request, res: Response) {
    try {
      const tables = await CustomTableModel.getAll();
      res.json({ tables });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async createTable(req: Request, res: Response) {
    try {
      const { name, description, columns = [] } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Table name is required' });
      }
      const table = await CustomTableModel.create(name, description, columns);
      res.json({ success: true, table });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async insertRow(req: Request, res: Response) {
    try {
      const tableName = req.params.name;
      const rowData = req.body;
      const row = await CustomTableModel.insertRow(tableName, rowData);
      res.json({ success: true, row });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteRow(req: Request, res: Response) {
    try {
      const { name, id } = req.params;
      await CustomTableModel.deleteRow(name, id);
      res.json({ success: true, message: 'Row removed' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

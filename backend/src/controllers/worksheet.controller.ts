import { Request, Response } from 'express';
import { WorksheetModel } from '../models/Worksheet.model';

export const WorksheetController = {
  async getPublic(req: Request, res: Response) {
    try {
      const custom = await WorksheetModel.getAll();
      res.json({ worksheets: custom.map((w: any) => ({ ...w, id: w._id || w.id })) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

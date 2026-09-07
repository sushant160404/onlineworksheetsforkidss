import { Request, Response } from 'express';
import { UserModel } from '../models/User.model';

export const LeaderboardController = {
  async getLeaderboard(req: Request, res: Response) {
    try {
      const leaders = await UserModel.getLeaderboard(15);
      res.json({ leaderboard: leaders });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

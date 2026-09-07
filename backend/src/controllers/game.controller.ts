import { Request, Response } from 'express';
import { GameSessionModel } from '../models/GameSession.model';
import { UserModel } from '../models/User.model';

export const GameController = {
  async record(req: Request, res: Response) {
    try {
      const {
        userId, worksheetId, worksheetTitle, subject, grade,
        score, maxScore, accuracy, timeSpentSec
      } = req.body;

      if (!userId || !worksheetId) {
        return res.status(400).json({ error: 'Missing required session details' });
      }

      const baseXP = Math.round(score * 20);
      const accuracyBonus = accuracy >= 100 ? 50 : accuracy >= 80 ? 25 : 10;
      const totalXPEarned = baseXP + accuracyBonus;
      const starsEarned = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1;

      const sessionId = 'gs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const sessionRecord = {
        _id: sessionId,
        userId, worksheetId, worksheetTitle, subject, grade,
        score, maxScore, accuracy,
        starsEarned,
        xpEarned: totalXPEarned,
        timeSpentSec: timeSpentSec || 30,
        completedAt: new Date().toISOString()
      };

      await GameSessionModel.record(sessionRecord);

      const user: any = await UserModel.findById(userId);
      let newLevel = 1;
      const newBadges: string[] = [];

      if (user) {
        const currentXP = (user.totalXP || 0) + totalXPEarned;
        const currentStars = (user.stars || 0) + starsEarned;
        newLevel = Math.floor(currentXP / 200) + 1;

        const currentBadges: string[] = user.badges || [];
        const earnedBadges = [...currentBadges];

        if (!earnedBadges.includes('first_game')) {
          earnedBadges.push('first_game');
          newBadges.push('first_game');
        }
        if (accuracy === 100 && !earnedBadges.includes('perfect_score')) {
          earnedBadges.push('perfect_score');
          newBadges.push('perfect_score');
        }
        if (currentStars >= 25 && !earnedBadges.includes('star_collector')) {
          earnedBadges.push('star_collector');
          newBadges.push('star_collector');
        }
        if (subject === 'Math' && !earnedBadges.includes('math_whiz')) {
          earnedBadges.push('math_whiz');
          newBadges.push('math_whiz');
        }
        if (subject === 'Language Arts' && !earnedBadges.includes('word_wizard')) {
          earnedBadges.push('word_wizard');
          newBadges.push('word_wizard');
        }
        if (subject === 'Typing' && !earnedBadges.includes('turbo_typer')) {
          earnedBadges.push('turbo_typer');
          newBadges.push('turbo_typer');
        }

        await UserModel.update(userId, {
          totalXP: currentXP,
          level: newLevel,
          stars: currentStars,
          badges: earnedBadges
        });
      }

      res.json({
        success: true,
        session: { ...sessionRecord, id: sessionRecord._id },
        rewards: { xpEarned: totalXPEarned, starsEarned, newLevel, newBadges }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

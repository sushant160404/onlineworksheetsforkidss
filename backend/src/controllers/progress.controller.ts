import { Request, Response } from 'express';
import { UserModel } from '../models/User.model';
import { GameSessionModel } from '../models/GameSession.model';

const BADGE_DEFINITIONS: Record<string, { title: string; description: string; icon: string; category: string }> = {
  welcome_adventurer: { title: 'Junior Explorer', description: 'Joined the WonderKids online academy!', icon: '🎒', category: 'milestone' },
  first_game: { title: 'First Game Played', description: 'Completed your very first interactive worksheet game!', icon: '🎯', category: 'milestone' },
  perfect_score: { title: 'Flawless Victory', description: 'Scored 100% accuracy on a challenging worksheet!', icon: '🏆', category: 'accuracy' },
  star_collector: { title: 'Star Collector', description: 'Collected 25+ shining stars across games!', icon: '⭐', category: 'milestone' },
  math_whiz: { title: 'Math Magician', description: 'Solved equations and number puzzles with flying colors!', icon: '🔢', category: 'math' },
  word_wizard: { title: 'Phonics Pioneer', description: 'Mastered spelling, sight words, and reading games!', icon: '📚', category: 'reading' },
  turbo_typer: { title: 'Speedy Nitro Typer', description: 'Blazed through typing games with fast fingers!', icon: '🏎️', category: 'milestone' }
};

export const ProgressController = {
  async getProgress(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user: any = await UserModel.findById(userId);
      const sessions = await GameSessionModel.getByUser(userId);

      const subjects = ['Math', 'Language Arts', 'Science', 'Typing', 'Logic & Puzzles', 'Creative Arts'];
      const subjectMastery = subjects.map(subj => {
        const matching = sessions.filter((s: any) => s.subject === subj);
        if (matching.length === 0) {
          return { subject: subj, accuracy: 0, completedCount: 0, stars: 0 };
        }
        const avgAcc = Math.round(matching.reduce((acc: number, cur: any) => acc + (cur.accuracy || 0), 0) / matching.length);
        const totalStars = matching.reduce((acc: number, cur: any) => acc + (cur.starsEarned || 0), 0);
        return { subject: subj, accuracy: avgAcc, completedCount: matching.length, stars: totalStars };
      });

      const avgOverallAccuracy = sessions.length > 0
        ? Math.round(sessions.reduce((acc: number, s: any) => acc + (s.accuracy || 0), 0) / sessions.length)
        : 100;

      const userBadgeIds: string[] = user?.badges || ['welcome_adventurer', 'first_game'];
      const badges = userBadgeIds.map(id => ({
        id,
        title: BADGE_DEFINITIONS[id]?.title || 'Achievement Unlocked',
        description: BADGE_DEFINITIONS[id]?.description || 'Great job achieving this milestone!',
        icon: BADGE_DEFINITIONS[id]?.icon || '🎖️',
        category: BADGE_DEFINITIONS[id]?.category || 'milestone'
      }));

      res.json({
        totalXP: user?.totalXP || 100,
        level: user?.level || 1,
        stars: user?.stars || 5,
        streakDays: user?.streakDays || 1,
        gamesPlayed: sessions.length,
        averageAccuracy: avgOverallAccuracy,
        subjectMastery,
        recentSessions: sessions.map((s: any) => ({ ...s, id: s._id || s.id })),
        badges
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};

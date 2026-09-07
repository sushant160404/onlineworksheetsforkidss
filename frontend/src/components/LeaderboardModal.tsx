import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { api } from '../services/api';
import { AvatarIcon } from './AvatarIcon';
import { Trophy, Star, Medal, Crown, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    setLoading(true);
    try {
      const data = await api.getLeaderboard();
      setLeaders(data);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="leaderboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-white text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-white text-sm"
          >
            ✕
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mx-auto mb-2 shadow-inner border border-white/30">
            👑
          </div>
          <h2 className="text-2xl font-black font-['Fredoka',sans-serif]">WonderKids Champions</h2>
          <p className="text-xs text-amber-100 mt-0.5 font-medium">
            Top learners and online worksheet gaming superstars
          </p>
        </div>

        {/* Leaders list */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {loading ? (
            <div className="py-12 text-center text-gray-400">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs font-bold">Fetching leaderboard scores...</p>
            </div>
          ) : leaders.length > 0 ? (
            leaders.map((leader) => {
              const isTop3 = leader.rank <= 3;
              return (
                <div
                  key={leader.userId || leader.rank}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-transform ${
                    leader.rank === 1
                      ? 'bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-200'
                      : leader.rank === 2
                      ? 'bg-slate-50 border-slate-300 shadow-xs'
                      : leader.rank === 3
                      ? 'bg-orange-50/70 border-orange-300 shadow-xs'
                      : 'bg-white border-gray-100 hover:border-purple-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="w-8 text-center font-black text-sm">
                      {leader.rank === 1 ? (
                        <span className="text-xl">🥇</span>
                      ) : leader.rank === 2 ? (
                        <span className="text-xl">🥈</span>
                      ) : leader.rank === 3 ? (
                        <span className="text-xl">🥉</span>
                      ) : (
                        <span className="text-gray-400 font-['Fredoka',sans-serif]">#{leader.rank}</span>
                      )}
                    </div>

                    <AvatarIcon avatarId={leader.avatar} size="sm" />

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm font-['Fredoka',sans-serif]">
                        {leader.username}
                      </h4>
                      <p className="text-[11px] text-gray-500">{leader.grade}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="flex items-center gap-1 bg-amber-100/70 text-amber-800 px-2.5 py-1 rounded-full text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{leader.stars}</span>
                    </div>
                    <div className="text-xs font-extrabold text-purple-700 min-w-16">
                      {leader.totalXP} XP
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-gray-500 text-center py-8">No players registered yet. Play a game to take 1st place!</p>
          )}
        </div>
      </div>
    </div>
  );
};

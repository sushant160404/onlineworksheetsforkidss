import React, { useState, useEffect } from 'react';
import { UserProfile, UserStats } from '../types';
import { api } from '../services/api';
import { AvatarIcon } from './AvatarIcon';
import { Star, Trophy, Flame, Target, Award, Calendar, BookOpen, Clock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface ProgressDashboardProps {
  user: UserProfile;
  onClose: () => void;
  onSignOut: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ user, onClose, onSignOut }) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'badges' | 'history'>('overview');

  useEffect(() => {
    loadProgress();
  }, [user.id]);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const data = await api.getProgress(user.id);
      setStats(data);
    } catch (err) {
      console.error('Failed to load user progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextLevelXP = (user.level || 1) * 200;
  const currentXPInLevel = (user.totalXP || 0) % 200;
  const levelProgressPct = Math.min(100, Math.round((currentXPInLevel / 200) * 100));

  return (
    <div id="progress-dashboard-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 p-6 text-white shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <AvatarIcon avatarId={user.avatar} size="lg" className="border-4 border-white/50" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black font-['Fredoka',sans-serif]">{user.username}</h2>
                  <span className="bg-amber-400 text-purple-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Lvl {user.level || 1}
                  </span>
                </div>
                <p className="text-xs text-purple-200 mt-0.5 font-medium">
                  {user.grade} • Registered Student Adventurer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-purple-200 hover:text-white transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-white text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="mt-5 space-y-1.5 bg-black/20 p-3 rounded-2xl border border-white/10">
            <div className="flex justify-between text-xs font-bold text-purple-200">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Level {user.level || 1} XP Progress
              </span>
              <span>{user.totalXP || 0} / {nextLevelXP} XP ({levelProgressPct}%)</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-gray-50/70 text-xs sm:text-sm font-bold shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'subjects'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Subject Mastery
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'badges'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Badges & Honors ({stats?.badges.length || user.badges?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Game Records ({stats?.recentSessions.length || 0})
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="py-16 text-center text-gray-400 space-y-2">
              <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-bold">Loading your gaming statistics from MongoDB database...</p>
            </div>
          ) : activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Stat Highlights Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <span className="text-xs font-bold uppercase">Stars</span>
                  </div>
                  <p className="text-2xl font-black text-amber-900 mt-1 font-['Fredoka',sans-serif]">
                    {user.stars || 0}
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Total collected</p>
                </div>

                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-bold uppercase">Level</span>
                  </div>
                  <p className="text-2xl font-black text-purple-900 mt-1 font-['Fredoka',sans-serif]">
                    {user.level || 1}
                  </p>
                  <p className="text-[11px] text-purple-700 mt-0.5">{user.totalXP || 0} Total XP</p>
                </div>

                <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Flame className="w-5 h-5 text-rose-500" />
                    <span className="text-xs font-bold uppercase">Streak</span>
                  </div>
                  <p className="text-2xl font-black text-rose-900 mt-1 font-['Fredoka',sans-serif]">
                    {user.streakDays || 1} Days
                  </p>
                  <p className="text-[11px] text-rose-700 mt-0.5">Daily practice</p>
                </div>

                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold uppercase">Accuracy</span>
                  </div>
                  <p className="text-2xl font-black text-emerald-900 mt-1 font-['Fredoka',sans-serif]">
                    {stats?.averageAccuracy || 95}%
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Average score</p>
                </div>
              </div>

              {/* Quick Subject Progress */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 text-sm font-['Fredoka',sans-serif]">
                    Curriculum Proficiency by Subject
                  </h3>
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-0.5"
                  >
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {(stats?.subjectMastery || []).slice(0, 4).map(m => (
                    <div key={m.subject} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-600">
                        <span>{m.subject}</span>
                        <span>{m.accuracy > 0 ? `${m.accuracy}%` : 'Not started yet'}</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          style={{ width: `${m.accuracy || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Games Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 text-sm font-['Fredoka',sans-serif]">
                    Recent Completed Worksheets
                  </h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-0.5"
                  >
                    View All ({stats?.recentSessions.length || 0}) <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {(stats?.recentSessions || []).length > 0 ? (
                  <div className="space-y-2">
                    {stats?.recentSessions.slice(0, 3).map(s => (
                      <div key={s.id} className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base">
                            {s.subject === 'Math' ? '🔢' : s.subject === 'Science' ? '🔬' : s.subject === 'Typing' ? '⌨️' : '📚'}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{s.worksheetTitle}</p>
                            <p className="text-xs text-gray-500">{s.subject} • {s.grade}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            {s.accuracy}% Accuracy
                          </span>
                          <span className="text-amber-600 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            +{s.starsEarned}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic text-center py-4 bg-gray-50 rounded-xl">
                    No games completed yet. Play your first worksheet game to unlock stars!
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === 'subjects' ? (
            /* Subject Mastery Tab */
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                Track curriculum standards mastery across Mathematics, Language Arts, Science, Typing, and Logic Puzzles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(stats?.subjectMastery || []).map(m => (
                  <div key={m.subject} className="p-4 rounded-2xl border-2 border-gray-200 bg-white space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 font-['Fredoka',sans-serif] text-base">{m.subject}</h4>
                      <span className="text-xs font-black text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        {m.accuracy}% Mastery
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                        style={{ width: `${m.accuracy}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>Worksheets Solved: <strong>{m.completedCount}</strong></span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {m.stars} Stars
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'badges' ? (
            /* Badges Tab */
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                Earn milestone badges as you master new skills, build streaks, and conquer worksheets:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(stats?.badges || []).map(b => (
                  <div key={b.id} className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/40 flex items-start gap-3.5 shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-['Fredoka',sans-serif] text-sm">{b.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{b.description}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        ✓ Unlocked
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Game Records History Tab */
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                Raw gaming records stored in the database session log:
              </p>
              {(stats?.recentSessions || []).length > 0 ? (
                <div className="space-y-2">
                  {stats?.recentSessions.map(s => (
                    <div key={s.id} className="p-3.5 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{s.worksheetTitle}</p>
                        <p className="text-gray-500 mt-0.5">
                          {s.subject} • {s.grade} • Completed {new Date(s.completedAt).toLocaleDateString()} at {new Date(s.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-bold text-purple-900 text-sm">{s.score}/{s.maxScore} ({s.accuracy}%)</div>
                        <div className="flex items-center justify-end gap-2 text-gray-500">
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-amber-400" /> +{s.starsEarned}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">+{s.xpEarned} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-8">No game sessions logged yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

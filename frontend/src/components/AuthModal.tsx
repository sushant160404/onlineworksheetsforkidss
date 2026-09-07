import React, { useState } from 'react';
import { UserProfile, GradeLevel } from '../types';
import { api } from '../services/api';
import { soundFX } from '../services/audio';
import { AVATAR_OPTIONS } from './AvatarIcon';
import { User, Lock, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

const GRADES: GradeLevel[] = ['Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('1st Grade');
  const [avatar, setAvatar] = useState('lion');
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    soundFX.pop();

    try {
      if (isSignUp) {
        const res = await api.register({
          username,
          password,
          grade,
          avatar,
          role
        });
        soundFX.star();
        onSuccess(res.user);
      } else {
        const res = await api.login({ username, password });
        soundFX.star();
        onSuccess(res.user);
      }
    } catch (err: any) {
      soundFX.wrong();
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    soundFX.pop();
    setLoading(true);
    setError('');
    try {
      const res = await api.guestLogin();
      soundFX.star();
      onSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-purple-200 overflow-hidden my-4">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sm:p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-white text-xs sm:text-sm"
          >
            ✕
          </button>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-2 shadow-inner border border-white/30">
            {isSignUp ? '🎨' : '🚀'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-['Fredoka',sans-serif]">
            {isSignUp ? 'Create Student Profile' : 'Welcome Back, Explorer!'}
          </h2>
          <p className="text-[10px] sm:text-xs text-purple-100 mt-1">
            {isSignUp
              ? 'Join 1,000+ worksheet games and track your stars!'
              : 'Sign in to access your progress, badges and saved games'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 md:p-7 space-y-3 sm:space-y-4 max-h-[85vh] overflow-y-auto">
          {error && (
            <div className="p-2.5 sm:p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[10px] sm:text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Student Nickname
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute left-3 top-2.5 sm:top-3.5" />
                <input
                  id="auth-username-input"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. Leo"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Secret Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute left-3 top-2.5 sm:top-3.5" />
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>
            </div>

            {/* Additional Fields for Sign Up */}
            {isSignUp && (
              <>
                {/* Grade Selection */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Grade Level
                  </label>
                  <select
                    id="auth-grade-select"
                    value={grade}
                    onChange={e => setGrade(e.target.value as GradeLevel)}
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold focus:bg-white focus:border-purple-500 outline-hidden"
                  >
                    {GRADES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Choose Your Avatar
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {AVATAR_OPTIONS.map(opt => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => {
                          soundFX.pop();
                          setAvatar(opt.id);
                        }}
                        className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border-2 flex flex-col items-center gap-0.5 sm:gap-1 transition-all ${
                          avatar === opt.id
                            ? 'bg-purple-100 border-purple-500 scale-105 shadow-sm'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl">{opt.emoji}</span>
                        <span className="text-[8px] sm:text-[10px] font-bold text-gray-700 truncate w-full text-center">{opt.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-base rounded-lg sm:rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5 sm:gap-2 font-['Fredoka',sans-serif] flex-wrap"
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Profile' : 'Log In'}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Student Login */}
          <div className="relative py-1.5 sm:py-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-2 sm:px-3 text-[9px] sm:text-xs text-gray-400 font-semibold uppercase">Or Play Instantly</span>
          </div>

          <button
            id="auth-guest-btn"
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full py-2 sm:py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-300 font-bold rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm transition-colors flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap px-2"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
            <span>Play as Guest</span>
          </button>

          {/* Toggle Login / Signup */}
          <div className="text-center pt-1 sm:pt-2">
            <button
              type="button"
              onClick={() => {
                soundFX.pop();
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-[10px] sm:text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline break-words"
            >
              {isSignUp ? 'Have an account? Sign in' : "No account? Create one (Free)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

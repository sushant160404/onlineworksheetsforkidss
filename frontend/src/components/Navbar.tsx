import React from 'react';
import { UserProfile } from '../types';
import { AvatarIcon } from './AvatarIcon';
import { soundFX } from '../services/audio';
import { Sparkles, Trophy, Star, Volume2, VolumeX, User, Search, Flame, Shield, BookOpen, Layers, Printer, HelpCircle, Award } from 'lucide-react';

export type SeoPageView = 'home' | 'grades' | 'subjects' | 'printables' | 'curriculum' | 'faqs';

interface NavbarProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProgress: () => void;
  onOpenLeaderboard: () => void;
  onOpenAdmin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSeoPage?: SeoPageView;
  onNavigateSeoPage?: (page: SeoPageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onOpenProgress,
  onOpenLeaderboard,
  onOpenAdmin,
  soundEnabled,
  onToggleSound,
  searchQuery,
  onSearchChange,
  activeSeoPage = 'home',
  onNavigateSeoPage
}) => {
  const handleNavClick = (page: SeoPageView) => {
    soundFX.pop();
    if (onNavigateSeoPage) {
      onNavigateSeoPage(page);
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with Ultra-Sharp Vector Favicon */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer" 
          onClick={() => handleNavClick('home')}
        >
          <div className="w-11 h-11 rounded-2xl bg-white shadow-md shadow-purple-500/20 overflow-hidden border-2 border-purple-200 flex items-center justify-center p-0.5 hover:scale-105 transition-transform">
            <img
              src="/favicon.svg"
              alt="onlineworksheetsforkidss"
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-[#2D2A4A] font-['Fredoka',sans-serif]">
                onlineworksheets<span className="text-purple-600">forkidss</span>
              </span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                1000+ Games
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
              Interactive Kids Worksheets & Online Games
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search math, phonics, science, typing games..."
              className="w-full pl-10 pr-4 py-2 bg-purple-50/60 hover:bg-purple-50 focus:bg-white border border-purple-100 rounded-full text-xs sm:text-sm font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="w-9 h-9 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors"
            title={soundEnabled ? 'Mute Game Sounds' : 'Unmute Game Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Leaderboard Button */}
          <button
            id="open-leaderboard-btn"
            onClick={() => {
              soundFX.pop();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs transition-colors"
            title="View Online Gaming Leaderboard"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline font-['Fredoka',sans-serif]">Top Kids</span>
          </button>

          {/* Admin Page Button */}
          <button
            id="open-admin-btn"
            onClick={() => {
              soundFX.pop();
              onOpenAdmin();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-900 font-bold text-xs transition-colors"
            title="Open Admin Page with Login Panel to manage platform, custom database tables and games"
          >
            <Shield className="w-3.5 h-3.5 text-purple-700" />
            <span className="hidden sm:inline font-['Fredoka',sans-serif]">Admin Page</span>
          </button>

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              id="user-profile-btn"
              onClick={() => {
                soundFX.pop();
                onOpenProgress();
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-2xl bg-purple-100/70 hover:bg-purple-100 border border-purple-300 transition-all text-left group"
            >
              <AvatarIcon avatarId={currentUser.avatar} size="sm" />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-gray-900 group-hover:text-purple-800 truncate max-w-24 font-['Fredoka',sans-serif]">
                    {currentUser.username}
                  </p>
                  <span className="text-[10px] bg-purple-600 text-white font-black px-1.5 py-0.2 rounded-full">
                    L{currentUser.level || 1}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-700 font-bold">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    {currentUser.stars || 0}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-rose-600">
                    <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                    {currentUser.streakDays || 1}d
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <button
              id="open-auth-btn"
              onClick={() => {
                soundFX.pop();
                onOpenAuth();
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-purple-500/20 text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5 font-['Fredoka',sans-serif]"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Play</span>
            </button>
          )}
        </div>
      </div>

      {/* SEO Sub-Navigation Links Strip */}
      <nav aria-label="Educational sections" className="border-t border-purple-50 bg-[#FCFBFF] px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'home'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>🏠</span>
              <span>1000+ Games</span>
            </button>

            <button
              onClick={() => handleNavClick('grades')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'grades'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Worksheets by Grade</span>
            </button>

            <button
              onClick={() => handleNavClick('subjects')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'subjects'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Subjects</span>
            </button>

            <button
              onClick={() => handleNavClick('printables')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'printables'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Printable Hub (PDF)</span>
            </button>

            <button
              onClick={() => handleNavClick('curriculum')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'curriculum'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Curriculum Guide</span>
            </button>

            <button
              onClick={() => handleNavClick('faqs')}
              className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                activeSeoPage === 'faqs'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Parents & Teachers FAQ</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
            <span>✓ 100% Free K-5 Educational Worksheets</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

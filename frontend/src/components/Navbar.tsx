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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto sm:h-18 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 sm:py-0">
        {/* Brand Logo with Ultra-Sharp Vector Favicon */}
        <div 
          className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer w-full sm:w-auto"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-md shadow-purple-500/20 overflow-hidden border-2 border-purple-200 flex items-center justify-center p-0.5 hover:scale-105 transition-transform flex-shrink-0">
            <img
              src="/Logos.png"
              alt="onlineworksheetsforkidss"
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-sm sm:text-lg md:text-2xl font-black tracking-tight text-[#2D2A4A] font-['Fredoka',sans-serif] truncate">
                online<span className="hidden xs:inline">worksheets</span><span className="hidden sm:inline">forki</span>ds<span className="text-purple-600 hidden sm:inline">s</span>
              </span>
              <span className="text-purple-600 sm:hidden">forkidss</span>
              <span className="bg-amber-100 text-amber-800 text-[8px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wider flex-shrink-0">
                1000+ Games
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium hidden md:block">
              Interactive Kids Worksheets & Online Games
            </p>
          </div>
        </div>

        {/* Mobile Search Toggle + Right Actions Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto flex-wrap justify-between">
          {/* Mobile Search Compact */}
          <div className="md:hidden flex-1 sm:flex-none">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-6 py-1.5 bg-purple-50/60 hover:bg-purple-50 focus:bg-white border border-purple-100 rounded-lg text-[10px] sm:text-xs font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600 text-base leading-none"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 lg:flex-none lg:max-w-md mx-2">
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
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-lg leading-none"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors flex-shrink-0"
            title={soundEnabled ? 'Mute Game Sounds' : 'Unmute Game Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />}
          </button>

          {/* Leaderboard Button */}
          <button
            id="open-leaderboard-btn"
            onClick={() => {
              soundFX.pop();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-[10px] sm:text-xs transition-colors flex-shrink-0"
            title="View Online Gaming Leaderboard"
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
            <span className="hidden md:inline font-['Fredoka',sans-serif]">Top Kids</span>
          </button>

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              id="user-profile-btn"
              onClick={() => {
                soundFX.pop();
                onOpenProgress();
              }}
              className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 pr-2 sm:pr-3 py-0.5 sm:py-1 rounded-2xl bg-purple-100/70 hover:bg-purple-100 border border-purple-300 transition-all text-left group flex-shrink-0"
            >
              <AvatarIcon avatarId={currentUser.avatar} size="xs" />
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 group-hover:text-purple-800 truncate max-w-20 font-['Fredoka',sans-serif]">
                    {currentUser.username}
                  </p>
                  <span className="text-[8px] sm:text-[10px] bg-purple-600 text-white font-black px-1 py-0 rounded-full flex-shrink-0">
                    L{currentUser.level || 1}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[8px] text-amber-700 font-bold">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 flex-shrink-0" />
                    {currentUser.stars || 0}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-rose-600">
                    <Flame className="w-2.5 h-2.5 fill-rose-500 text-rose-500 flex-shrink-0" />
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
              className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-purple-500/20 text-[10px] sm:text-xs md:text-sm transition-all active:scale-95 flex items-center gap-1 sm:gap-1.5 font-['Fredoka',sans-serif] flex-shrink-0 whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Sign In</span><span className="inline sm:hidden">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* SEO Sub-Navigation Links Strip */}
      <nav aria-label="Educational sections" className="border-t border-purple-50 bg-[#FCFBFF] px-2 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-between gap-1 sm:gap-2 text-xs font-bold shrink-0 overflow-x-auto">
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'home'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>🏠</span>
              <span className="hidden sm:inline">Games</span>
            </button>

            <button
              onClick={() => handleNavClick('grades')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'grades'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Grade</span>
            </button>

            <button
              onClick={() => handleNavClick('subjects')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'subjects'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden md:inline">Subjects</span>
            </button>

            <button
              onClick={() => handleNavClick('printables')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'printables'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Printer className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden md:inline">PDF</span>
            </button>

            <button
              onClick={() => handleNavClick('curriculum')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'curriculum'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden lg:inline">Guide</span>
            </button>

            <button
              onClick={() => handleNavClick('faqs')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-1 whitespace-nowrap text-[10px] sm:text-xs ${
                activeSeoPage === 'faqs'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden lg:inline">FAQ</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-[10px] sm:text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-200 shrink-0 ml-auto whitespace-nowrap">
            <span>✓ 100% Free K-5</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

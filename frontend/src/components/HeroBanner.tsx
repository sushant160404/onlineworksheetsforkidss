import React from 'react';
import { GradeLevel } from '../types';
import { soundFX } from '../services/audio';
import { Sparkles, Gamepad2, Award, BookOpen, ArrowRight, Star, Heart } from 'lucide-react';

interface HeroBannerProps {
  selectedGrade: GradeLevel | 'All';
  onSelectGrade: (grade: GradeLevel | 'All') => void;
  onExploreClick: () => void;
  totalGamesCount: number;
}

const GRADES: (GradeLevel | 'All')[] = [
  'All',
  'Pre-K',
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade'
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedGrade,
  onSelectGrade,
  onExploreClick,
  totalGamesCount
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-[#F8F7FF] via-purple-50/40 to-[#F8F7FF]">
      {/* Decorative background ambient blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Grid */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Fun Pills */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-200 shadow-xs">
            <span className="text-sm">🌟</span>
            <span className="text-xs font-bold text-purple-900 font-['Fredoka',sans-serif]">
              1,000+ Online Worksheet Games • TurtleDiary-Style Learning
            </span>
            <span className="text-[10px] bg-purple-100 text-purple-700 font-black px-2 py-0.5 rounded-full">
              K-5 Common Core
            </span>
          </div>

          {/* Headline inspired by uploaded Wonderkids Kit */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2D2A4A] font-['Fredoka',sans-serif] tracking-tight leading-[1.15]">
            The best place to{' '}
            <span className="text-purple-600 underline decoration-wavy decoration-purple-300">learn</span>{' '}
            and <span className="text-amber-500">play</span> for kids
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover thousands of fun and interactive learning activities, math quests, phonics spelling builders, typing racers, and printable worksheets with real-time progress tracking!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-get-started-btn"
              onClick={() => {
                soundFX.star();
                onExploreClick();
              }}
              className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 transition-all active:scale-95 flex items-center gap-2 font-['Fredoka',sans-serif] text-base"
            >
              <span>Explore 1000+ Games</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Cards Showcase (Directly honoring uploaded Wonderkids mockup cards: Fun Quiz, Creative Activities, Learn with Games) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto">
          {/* Fun Quiz */}
          <div className="bg-purple-100/70 border-2 border-purple-200 rounded-3xl p-6 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-md">
                🎯
              </span>
              <span className="text-xs font-bold text-purple-700 bg-white/80 px-2.5 py-1 rounded-full">
                #enjoy
              </span>
            </div>
            <h3 className="text-xl font-bold text-purple-950 font-['Fredoka',sans-serif] mt-4">
              Fun Quiz
            </h3>
            <p className="text-xs text-purple-800/80 mt-1 leading-relaxed">
              Test your understanding with short, engaging quizzes, instant hints, step-by-step answers and stars!
            </p>
          </div>

          {/* Creative Activities */}
          <div className="bg-indigo-900 text-white rounded-3xl p-6 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-md">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl backdrop-blur-md">
                🎨
              </span>
              <span className="text-xs font-bold text-indigo-200 bg-white/10 px-2.5 py-1 rounded-full">
                #happy
              </span>
            </div>
            <h3 className="text-xl font-bold text-white font-['Fredoka',sans-serif] mt-4">
              Creative Activities
            </h3>
            <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
              Discover printable coloring sheets, connect-the-dots, logic riddles, and science experiment diagrams.
            </p>
          </div>

          {/* Learn with Games */}
          <div className="bg-amber-100/80 border-2 border-amber-300 rounded-3xl p-6 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-amber-500 text-purple-950 flex items-center justify-center text-2xl shadow-md">
                🎮
              </span>
              <span className="text-xs font-bold text-amber-800 bg-white/80 px-2.5 py-1 rounded-full">
                #funny
              </span>
            </div>
            <h3 className="text-xl font-bold text-amber-950 font-['Fredoka',sans-serif] mt-4">
              Learn with Games
            </h3>
            <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
              Bubble Pop Math, Word Wizard Spelling, and Speed Typing Racers designed for pure educational delight!
            </p>
          </div>
        </div>

        {/* Grade Selection Filter Ribbon */}
        <div className="mt-12 max-w-4xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Select Your Grade Level:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {GRADES.map(grade => {
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => {
                    soundFX.pop();
                    onSelectGrade(grade);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 font-['Fredoka',sans-serif] ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100 shadow-2xs'
                  }`}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

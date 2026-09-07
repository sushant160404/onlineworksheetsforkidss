import React from 'react';
import { WorksheetGame } from '../types';
import { soundFX } from '../services/audio';
import { Star, Play, Printer, Sparkles, Users } from 'lucide-react';

interface WorksheetCardProps {
  game: WorksheetGame;
  onPlay: (game: WorksheetGame) => void;
  onPrint: (game: WorksheetGame) => void;
}

export const WorksheetCard: React.FC<WorksheetCardProps> = ({ game, onPlay, onPrint }) => {
  const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
    'Math': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    'Language Arts': { bg: 'bg-pink-50', text: 'text-pink-800', border: 'border-pink-200' },
    'Science': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    'Typing': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200' },
    'Logic & Puzzles': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    'Creative Arts': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' }
  };

  const style = subjectColors[game.subject] || { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' };

  return (
    <div
      id={`worksheet-card-${game.id}`}
      className="bg-white rounded-3xl border-2 border-purple-100 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
    >
      {/* Top Banner with Icon & Grade Tag */}
      <div className={`p-5 ${style.bg} border-b ${style.border} flex items-start justify-between relative`}>
        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {game.iconEmoji}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-purple-900 border border-purple-100 shadow-2xs">
            {game.grade}
          </span>
          {game.badgeText && (
            <span className="text-[10px] font-bold bg-amber-400 text-purple-950 px-2 py-0.5 rounded-md shadow-2xs">
              {game.badgeText}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <span>{game.subject}</span>
            <span>•</span>
            <span className="truncate">{game.topic}</span>
          </div>

          <h3 className="text-lg font-black text-gray-900 font-['Fredoka',sans-serif] group-hover:text-purple-700 transition-colors leading-snug line-clamp-1">
            {game.title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Meta Stats: Rating, Players, Difficulty */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{game.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span>{game.playsCount} plays</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            game.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
            game.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {game.difficulty}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            id={`play-btn-${game.id}`}
            onClick={() => {
              soundFX.pop();
              onPlay(game);
            }}
            className="flex-1 py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-['Fredoka',sans-serif]"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Game</span>
          </button>

          {game.isPrintable && (
            <button
              id={`print-btn-${game.id}`}
              onClick={() => {
                soundFX.pop();
                onPrint(game);
              }}
              className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-1 text-xs sm:text-sm font-['Fredoka',sans-serif]"
              title="Print formatted worksheet with optional answer key"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

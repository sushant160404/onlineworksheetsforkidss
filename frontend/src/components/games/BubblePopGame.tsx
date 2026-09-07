import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WorksheetGame, UserProfile } from '../../types';
import { soundFX } from '../../services/audio';
import { api } from '../../services/api';
import { Star, Trophy, RefreshCw, Clock, CheckCircle } from 'lucide-react';

interface BubblePopGameProps {
  game: WorksheetGame;
  currentUser: UserProfile | null;
  onClose: () => void;
  onUserUpdate?: (user: UserProfile) => void;
}

interface FloatingBubble {
  id: string;
  text: string;
  isCorrect: boolean;
  x: number; // percentage 10% - 80%
  color: string;
  size: number;
  popped: boolean;
}

const BUBBLE_COLORS = [
  'bg-pink-400/90 border-pink-200 shadow-pink-300/50',
  'bg-cyan-400/90 border-cyan-200 shadow-cyan-300/50',
  'bg-amber-400/90 border-amber-200 shadow-amber-300/50',
  'bg-emerald-400/90 border-emerald-200 shadow-emerald-300/50',
  'bg-purple-400/90 border-purple-200 shadow-purple-300/50',
  'bg-indigo-400/90 border-indigo-200 shadow-indigo-300/50'
];

export const BubblePopGame: React.FC<BubblePopGameProps> = ({
  game,
  currentUser,
  onClose,
  onUserUpdate
}) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const currentQ = game.questions[currentRound] || game.questions[0];

  // Spawn round bubbles
  useEffect(() => {
    if (isFinished) return;

    const options = currentQ.options && currentQ.options.length > 0
      ? currentQ.options
      : [String(currentQ.correctAnswer), '2', '7', '4'];

    const newBubbles: FloatingBubble[] = options.map((opt, i) => {
      const isCorrect = String(opt).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
      const x = 12 + i * 22 + (Math.random() * 8 - 4);
      const color = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
      return {
        id: `bubble-${currentRound}-${i}`,
        text: opt,
        isCorrect,
        x,
        size: 72 + Math.floor(Math.random() * 16),
        popped: false
      };
    });

    setBubbles(newBubbles);
  }, [currentRound, isFinished, currentQ]);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const handlePop = (bubble: FloatingBubble) => {
    if (bubble.popped || isFinished) return;

    soundFX.pop();

    setBubbles(prev =>
      prev.map(b => (b.id === bubble.id ? { ...b, popped: true } : b))
    );

    if (bubble.isCorrect) {
      soundFX.correct();
      setScore(s => s + 10 + streak * 2);
      setStreak(st => st + 1);

      // Advance round
      setTimeout(() => {
        if (currentRound + 1 < game.questions.length) {
          setCurrentRound(r => r + 1);
        } else {
          finishGame();
        }
      }, 500);
    } else {
      soundFX.wrong();
      setStreak(0);
    }
  };

  const finishGame = async () => {
    setIsFinished(true);
    soundFX.fanfare();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    const accuracy = Math.min(100, Math.round((score / (game.questions.length * 10)) * 100));

    if (currentUser) {
      try {
        await api.recordGame({
          userId: currentUser.id,
          worksheetId: game.id,
          worksheetTitle: game.title,
          subject: game.subject,
          grade: game.grade,
          score,
          maxScore: game.questions.length * 10,
          accuracy: Math.max(50, accuracy),
          timeSpentSec: 60 - timeLeft
        });
        const updated = await api.getCurrentUser();
        if (updated && onUserUpdate) onUserUpdate(updated);
      } catch (err) {
        console.error('Failed to save bubble pop session:', err);
      }
    }
  };

  const handleRestart = () => {
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsFinished(false);
  };

  return (
    <div id="bubble-pop-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-sky-300 via-indigo-200 to-purple-200 rounded-3xl shadow-2xl border-4 border-cyan-200 overflow-hidden flex flex-col h-[90vh] sm:h-[620px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between border-b border-white/50 gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-lg sm:text-2xl flex-shrink-0">🫧</span>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 text-xs sm:text-base lg:text-lg font-['Fredoka',sans-serif] truncate">
                Bubble Pop Arcade: {game.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Round {currentRound + 1} of {game.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 flex-wrap justify-end">
            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-500 flex-shrink-0" />
              <span className="hidden sm:inline">Score: </span>
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-1 bg-cyan-100 text-cyan-800 font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 flex-shrink-0" />
              <span>{timeLeft}s</span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game play area */}
        {!isFinished ? (
          <div className="relative flex-1 flex flex-col justify-between p-3 sm:p-6 select-none overflow-hidden">
            {/* Target equation or prompt banner */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-4 shadow-lg border-2 border-white/70 text-center max-w-md mx-auto w-full">
              <p className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider">🎯 Pop the Bubble with Correct Answer!</p>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-800 font-['Fredoka',sans-serif] mt-1 line-clamp-2">
                {currentQ.prompt}
              </h2>
            </div>

            {/* Floating bubbles zone */}
            <div className="relative flex-1 min-h-32 w-full">
              {bubbles.map((b) => {
                const scaledSize = Math.max(48, Math.min(88, b.size));
                return (
                  <button
                    key={b.id}
                    onClick={() => handlePop(b)}
                    disabled={b.popped}
                    style={{
                      left: `${b.x}%`,
                      width: `${scaledSize}px`,
                      height: `${scaledSize}px`
                    }}
                    className={`absolute bottom-2 sm:bottom-6 transform -translate-x-1/2 rounded-full border-4 text-white font-black text-xs sm:text-lg md:text-xl flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 hover:scale-110 cursor-pointer animate-pulse ${
                      b.popped ? 'scale-0 opacity-0 pointer-events-none' : b.color
                    }`}
                  >
                    <span className="drop-shadow-md text-[10px] sm:text-xs md:text-sm">{b.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom info */}
            <div className="text-center text-[10px] sm:text-xs font-bold text-indigo-900 bg-white/60 backdrop-blur-xs py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl mx-auto">
              {streak > 1 && <span className="text-amber-600 font-extrabold mr-2 block sm:inline">🔥 {streak}x Streak!</span>}
              <span className="block sm:inline">Tap bubbles before they float away!</span>
            </div>
          </div>
        ) : (
          /* Victory Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-white/95 space-y-3 sm:space-y-5 overflow-y-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-3xl sm:text-4xl shadow-lg animate-bounce flex-shrink-0">
              🫧
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-3xl font-black text-gray-900 font-['Fredoka',sans-serif]">Bubble Popping Master!</h2>
              <p className="text-xs sm:text-base text-gray-600 font-medium mt-1">You popped bubbles with lightning-fast accuracy!</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 sm:p-4 w-full max-w-60 text-center">
              <p className="text-[10px] sm:text-xs text-purple-600 font-bold uppercase">Final Score</p>
              <p className="text-2xl sm:text-3xl font-black text-purple-900 font-['Fredoka',sans-serif]">{score} PTS</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto justify-center">
              <button
                onClick={handleRestart}
                className="px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-purple-300 hover:bg-purple-50 text-purple-700 font-bold text-sm rounded-xl flex items-center justify-center gap-2 font-['Fredoka',sans-serif] flex-1 sm:flex-none"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Play Again</span><span className="inline sm:hidden">Retry</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 font-['Fredoka',sans-serif] flex-1 sm:flex-none"
              >
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Next Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

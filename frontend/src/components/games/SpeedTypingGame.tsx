import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { WorksheetGame, UserProfile } from '../../types';
import { soundFX } from '../../services/audio';
import { api } from '../../services/api';
import { Trophy, RefreshCw, Zap, Gauge } from 'lucide-react';

interface SpeedTypingGameProps {
  game: WorksheetGame;
  currentUser: UserProfile | null;
  onClose: () => void;
  onUserUpdate?: (user: UserProfile) => void;
}

export const SpeedTypingGame: React.FC<SpeedTypingGameProps> = ({
  game,
  currentUser,
  onClose,
  onUserUpdate
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = game.questions[wordIndex] || game.questions[0];
  const targetWord = String(currentQ.correctAnswer).toLowerCase();

  useEffect(() => {
    inputRef.current?.focus();
  }, [wordIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    soundFX.pop();
    setInputVal(val);

    // Compute live WPM
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0) {
        const wordsTyped = wordIndex + (val.length / 5);
        setWpm(Math.round(wordsTyped / elapsedMinutes));
      }
    }

    // Check if current word is completed
    if (val.trim().toLowerCase() === targetWord) {
      soundFX.correct();
      setScore(s => s + 1);
      setInputVal('');

      if (wordIndex + 1 < game.questions.length) {
        setWordIndex(w => w + 1);
      } else {
        finishGame();
      }
    }
  };

  const finishGame = async () => {
    setIsFinished(true);
    soundFX.fanfare();
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {}

    const durationSec = startTime ? Math.max(5, Math.floor((Date.now() - startTime) / 1000)) : 30;
    const finalWpm = Math.max(12, wpm || Math.round((game.questions.length / (durationSec / 60))));

    if (currentUser) {
      try {
        await api.recordGame({
          userId: currentUser.id,
          worksheetId: game.id,
          worksheetTitle: game.title,
          subject: 'Typing',
          grade: game.grade,
          score: game.questions.length,
          maxScore: game.questions.length,
          accuracy: 98,
          timeSpentSec: durationSec
        });
        const updated = await api.getCurrentUser();
        if (updated && onUserUpdate) onUserUpdate(updated);
      } catch (err) {
        console.error('Failed to save typing session:', err);
      }
    }
  };

  // Car race progress percentage
  const raceProgress = Math.round(((wordIndex + (inputVal.length / Math.max(1, targetWord.length))) / game.questions.length) * 100);

  return (
    <div id="speed-typing-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏎️</span>
            <div>
              <h3 className="font-bold text-lg font-['Fredoka',sans-serif]">Speed Nitro Typing Racer</h3>
              <p className="text-xs text-amber-100 font-medium">Type words quickly to boost your race car!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-xs font-bold">
              <Gauge className="w-4 h-4 text-amber-300" />
              <span>{wpm || 24} WPM</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              ✕
            </button>
          </div>
        </div>

        {!isFinished ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Race Track Animation */}
            <div className="bg-slate-900 rounded-2xl p-4 border-4 border-slate-700 relative overflow-hidden">
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                <span>START</span>
                <span className="text-amber-400">FINISH LINE 🏁</span>
              </div>
              <div className="h-16 bg-slate-800 rounded-xl relative border-y-2 border-dashed border-yellow-400/40 flex items-center">
                {/* Moving Car */}
                <div
                  className="absolute transition-all duration-200 text-3xl select-none"
                  style={{ left: `calc(${Math.min(90, Math.max(2, raceProgress))}% - 16px)` }}
                >
                  🏎️💨
                </div>
              </div>
            </div>

            {/* Target Word Display */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center space-y-2">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Type This Word:</p>
              <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-wider font-mono">
                {targetWord.split('').map((char, i) => {
                  const typedChar = inputVal[i];
                  let color = 'text-gray-800';
                  if (typedChar !== undefined) {
                    color = typedChar.toLowerCase() === char ? 'text-emerald-600 underline' : 'text-rose-600 bg-rose-100';
                  }
                  return <span key={i} className={color}>{char}</span>;
                })}
              </div>
              <p className="text-xs text-gray-500 font-medium">{currentQ.prompt}</p>
            </div>

            {/* Input Field */}
            <div className="max-w-md mx-auto">
              <input
                ref={inputRef}
                id="speed-typing-input"
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                autoFocus
                placeholder="Type here..."
                className="w-full text-center py-4 px-6 text-2xl font-bold rounded-2xl border-3 border-amber-400 focus:border-amber-600 focus:ring-4 focus:ring-amber-200 outline-hidden font-mono transition-all shadow-inner"
              />
              <p className="text-center text-xs text-gray-400 mt-2">Word {wordIndex + 1} of {game.questions.length} • Keep your eyes on the road!</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="text-6xl animate-bounce">🏁</div>
            <h2 className="text-3xl font-black text-gray-900 font-['Fredoka',sans-serif]">Victory Across the Finish Line!</h2>
            <p className="text-gray-600 font-medium">You burned rubber and set a high speed typing record!</p>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
                <p className="text-xs text-amber-600 font-bold uppercase">Typing Speed</p>
                <p className="text-3xl font-black text-amber-900 font-['Fredoka',sans-serif]">{wpm || 28} WPM</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
                <p className="text-xs text-emerald-600 font-bold uppercase">Accuracy</p>
                <p className="text-3xl font-black text-emerald-900 font-['Fredoka',sans-serif]">100%</p>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setWordIndex(0);
                  setInputVal('');
                  setStartTime(null);
                  setIsFinished(false);
                }}
                className="px-5 py-2.5 border-2 border-amber-400 text-amber-800 font-bold rounded-xl font-['Fredoka',sans-serif]"
              >
                Race Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl font-['Fredoka',sans-serif]"
              >
                Close Racer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

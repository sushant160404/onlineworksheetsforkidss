import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WorksheetGame, UserProfile } from '../../types';
import { soundFX } from '../../services/audio';
import { api } from '../../services/api';
import { Star, RefreshCw, Trophy, ArrowRight, Lightbulb } from 'lucide-react';

interface WordBuilderGameProps {
  game: WorksheetGame;
  currentUser: UserProfile | null;
  onClose: () => void;
  onUserUpdate?: (user: UserProfile) => void;
}

export const WordBuilderGame: React.FC<WordBuilderGameProps> = ({
  game,
  currentUser,
  onClose,
  onUserUpdate
}) => {
  const [round, setRound] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [scrambledPool, setScrambledPool] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = game.questions[round] || game.questions[0];
  const targetWord = String(currentQ.correctAnswer).toUpperCase();

  // Initialize letter tiles
  useEffect(() => {
    if (isFinished) return;

    setIsSuccess(false);
    setPlacedLetters([]);

    const letters = targetWord.split('');
    // add some decoy letters if word is short
    if (letters.length < 5) {
      const decoys = ['E', 'A', 'S', 'T', 'O'].filter(l => !letters.includes(l)).slice(0, 2);
      letters.push(...decoys);
    }

    // Shuffle
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledPool(shuffled.map((letter, idx) => ({ id: `${round}-${letter}-${idx}`, letter, used: false })));
  }, [round, isFinished, targetWord]);

  const handleTileClick = (tile: { id: string; letter: string; used: boolean }) => {
    if (tile.used || isSuccess) return;

    soundFX.pop();
    const newPlaced = [...placedLetters, tile.letter];
    setPlacedLetters(newPlaced);

    setScrambledPool(prev => prev.map(t => (t.id === tile.id ? { ...t, used: true } : t)));

    // Check if word complete
    if (newPlaced.length === targetWord.length) {
      const builtWord = newPlaced.join('');
      if (builtWord === targetWord) {
        soundFX.correct();
        setIsSuccess(true);
        setScore(s => s + 1);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch {}
      } else {
        soundFX.wrong();
      }
    }
  };

  const handleClearSlot = (index: number) => {
    if (isSuccess) return;
    soundFX.pop();

    const letterToReturn = placedLetters[index];
    const newPlaced = [...placedLetters];
    newPlaced.splice(index, 1);
    setPlacedLetters(newPlaced);

    // Unmark in scrambled pool
    setScrambledPool(prev => {
      let found = false;
      return prev.map(t => {
        if (!found && t.letter === letterToReturn && t.used) {
          found = true;
          return { ...t, used: false };
        }
        return t;
      });
    });
  };

  const handleNextWord = () => {
    soundFX.pop();
    if (round + 1 < game.questions.length) {
      setRound(r => r + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setIsFinished(true);
    soundFX.fanfare();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}

    if (currentUser) {
      try {
        await api.recordGame({
          userId: currentUser.id,
          worksheetId: game.id,
          worksheetTitle: game.title,
          subject: game.subject,
          grade: game.grade,
          score,
          maxScore: game.questions.length,
          accuracy: Math.round((score / game.questions.length) * 100),
          timeSpentSec: 45
        });
        const updated = await api.getCurrentUser();
        if (updated && onUserUpdate) onUserUpdate(updated);
      } catch (err) {
        console.error('Failed to save word builder game:', err);
      }
    }
  };

  return (
    <div id="word-builder-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-pink-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪄</span>
            <div>
              <h3 className="font-bold text-lg font-['Fredoka',sans-serif]">Word Wizard Builder</h3>
              <p className="text-xs text-pink-100 font-medium">Word {round + 1} of {game.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Score: {score}</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center">
              ✕
            </button>
          </div>
        </div>

        {!isFinished ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Clue area */}
            <div className="bg-pink-50/70 border-2 border-pink-100 rounded-2xl p-5 text-center space-y-2">
              <div className="text-5xl">{currentQ.imageEmoji || '✨'}</div>
              <h3 className="text-xl font-bold text-gray-800 font-['Fredoka',sans-serif]">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Target Slots */}
            <div className="flex justify-center gap-2 sm:gap-3 py-2">
              {Array.from({ length: targetWord.length }).map((_, idx) => {
                const letter = placedLetters[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => letter && handleClearSlot(idx)}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 font-black text-2xl flex items-center justify-center transition-all ${
                      letter
                        ? isSuccess
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-sm'
                          : 'bg-purple-100 border-purple-400 text-purple-900 shadow-sm hover:bg-purple-200'
                        : 'bg-gray-50 border-dashed border-gray-300 text-gray-400'
                    }`}
                  >
                    {letter || ''}
                  </button>
                );
              })}
            </div>

            {/* Letter Tiles Pool */}
            <div className="space-y-2">
              <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Tap letters to spell the word:
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {scrambledPool.map(tile => (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile)}
                    disabled={tile.used || isSuccess}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 font-black text-xl sm:text-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center ${
                      tile.used
                        ? 'opacity-20 pointer-events-none border-gray-200 bg-gray-100'
                        : 'bg-white hover:bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-400 cursor-pointer hover:-translate-y-0.5'
                    }`}
                  >
                    {tile.letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Success message */}
            {isSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-emerald-800 font-bold flex items-center justify-center gap-2 animate-fade-in">
                <span>🎉 Perfect spelling! "{targetWord}" is correct!</span>
              </div>
            )}

            {/* Footer controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setPlacedLetters([]);
                  setScrambledPool(prev => prev.map(t => ({ ...t, used: false })));
                }}
                disabled={isSuccess || placedLetters.length === 0}
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 font-semibold"
              >
                Reset Letters
              </button>

              {isSuccess && (
                <button
                  onClick={handleNextWord}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 font-['Fredoka',sans-serif] ml-auto"
                >
                  <span>{round + 1 === game.questions.length ? 'Finish' : 'Next Word'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="text-6xl animate-bounce">📚</div>
            <h2 className="text-3xl font-black text-gray-900 font-['Fredoka',sans-serif]">Spelling Champion!</h2>
            <p className="text-gray-600 font-medium">You spelled all the words correctly and unlocked vocabulary honors!</p>
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 w-52 mx-auto">
              <p className="text-xs text-pink-600 font-bold uppercase">Words Mastered</p>
              <p className="text-3xl font-black text-pink-900 font-['Fredoka',sans-serif]">{score}/{game.questions.length}</p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setRound(0);
                  setScore(0);
                  setIsFinished(false);
                }}
                className="px-5 py-2.5 border-2 border-pink-300 text-pink-700 font-bold rounded-xl font-['Fredoka',sans-serif]"
              >
                Play Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl font-['Fredoka',sans-serif]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

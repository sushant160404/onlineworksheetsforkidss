import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WorksheetGame, UserProfile } from '../../types';
import { soundFX } from '../../services/audio';
import { api } from '../../services/api';
import { Sparkles, Star, Trophy, RefreshCw, ArrowRight, Lightbulb, CheckCircle, XCircle, Clock } from 'lucide-react';

interface InteractiveWorksheetGameProps {
  game: WorksheetGame;
  currentUser: UserProfile | null;
  onClose: () => void;
  onUserUpdate?: (user: UserProfile) => void;
}

export const InteractiveWorksheetGame: React.FC<InteractiveWorksheetGameProps> = ({
  game,
  currentUser,
  onClose,
  onUserUpdate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState<{ question: string; chosen: string; correct: string; isCorrect: boolean }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [rewardDetails, setRewardDetails] = useState<{ xpEarned: number; starsEarned: number; newBadges: string[] } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const currentQ = game.questions[currentIndex] || game.questions[0];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isFinished) {
        setSecondsElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    soundFX.pop();
    setSelectedAnswer(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswerChecked) return;

    const isCorrect = String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    setIsAnswerChecked(true);

    if (isCorrect) {
      soundFX.correct();
      setScore(prev => prev + 1);
    } else {
      soundFX.wrong();
    }

    setAnswersLog(prev => [
      ...prev,
      {
        question: currentQ.prompt,
        chosen: selectedAnswer,
        correct: String(currentQ.correctAnswer),
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    soundFX.pop();
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowHint(false);

    if (currentIndex + 1 < game.questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setIsFinished(true);
    const finalScore = score + (selectedAnswer && String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase() ? 0 : 0);
    const accuracy = Math.round((finalScore / game.questions.length) * 100);
    const duration = Math.max(10, secondsElapsed);

    // Trigger celebration effects
    soundFX.fanfare();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Save progress to MongoDB backend
    if (currentUser) {
      setIsSaving(true);
      try {
        const res = await api.recordGame({
          userId: currentUser.id,
          worksheetId: game.id,
          worksheetTitle: game.title,
          subject: game.subject,
          grade: game.grade,
          score: finalScore,
          maxScore: game.questions.length,
          accuracy,
          timeSpentSec: duration
        });

        if (res?.rewards) {
          setRewardDetails(res.rewards);
        }

        // Refresh user profile
        const updated = await api.getCurrentUser();
        if (updated && onUserUpdate) {
          onUserUpdate(updated);
        }
      } catch (err) {
        console.error('Failed to record game session in backend:', err);
      } finally {
        setIsSaving(false);
      }
    } else {
      const calculatedStars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1;
      setRewardDetails({
        xpEarned: finalScore * 25,
        starsEarned: calculatedStars,
        newBadges: []
      });
    }
  };

  const handleRestart = () => {
    soundFX.pop();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setAnswersLog([]);
    setShowHint(false);
    setIsFinished(false);
    setRewardDetails(null);
  };

  // Star calculation
  const accuracy = Math.round((score / game.questions.length) * 100);
  const earnedStars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1;

  return (
    <div id="interactive-worksheet-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden my-auto">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{game.iconEmoji}</span>
            <div>
              <h3 className="font-bold text-lg leading-tight font-['Fredoka',sans-serif]">{game.title}</h3>
              <p className="text-xs text-purple-200 font-medium">
                {game.grade} • {game.subject} • {game.topic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}</span>
            </div>
            <button
              id="close-worksheet-game-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game Body */}
        {!isFinished ? (
          <div className="p-5 sm:p-8 space-y-6">
            {/* Progress Bar & Question Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-600">
                <span className="flex items-center gap-1.5 text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  Question {currentIndex + 1} of {game.questions.length}
                </span>
                <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  Score: {score}
                </span>
              </div>
              <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / game.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Prompt Box */}
            <div className="bg-purple-50/60 border-2 border-purple-100 rounded-2xl p-5 sm:p-7 text-center space-y-3">
              {currentQ.imageEmoji && (
                <div className="text-4xl sm:text-5xl tracking-widest animate-bounce">
                  {currentQ.imageEmoji}
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-['Fredoka',sans-serif] leading-snug">
                {currentQ.prompt}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(currentQ.options || []).map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = String(option).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();

                let btnStyles = 'bg-white hover:bg-purple-50 border-gray-200 text-gray-800';
                if (isSelected && !isAnswerChecked) {
                  btnStyles = 'bg-purple-100 border-purple-500 text-purple-900 ring-2 ring-purple-400';
                }
                if (isAnswerChecked) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    btnStyles = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`option-btn-${idx}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswerChecked}
                    className={`p-4 rounded-2xl border-2 font-bold text-base sm:text-lg flex items-center justify-between transition-all duration-150 active:scale-95 shadow-xs ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {isAnswerChecked && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerChecked && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback message when checked */}
            {isAnswerChecked && (
              <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 animate-fade-in ${
                String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase()
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                {String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase() ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p className="font-bold text-base">
                    {String(selectedAnswer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase()
                      ? '🎉 Fantastic Job!'
                      : 'Almost there!'}
                  </p>
                  <p className="mt-0.5">{currentQ.explanation || `Correct answer is: ${currentQ.correctAnswer}`}</p>
                </div>
              </div>
            )}

            {/* Hint Box (if toggled) */}
            {showHint && currentQ.hint && !isAnswerChecked && (
              <div className="p-3.5 bg-yellow-50 border border-yellow-200 rounded-xl text-xs sm:text-sm text-yellow-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 shrink-0" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              {!isAnswerChecked && currentQ.hint && (
                <button
                  id="hint-toggle-btn"
                  onClick={() => {
                    soundFX.pop();
                    setShowHint(!showHint);
                  }}
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-purple-700 hover:bg-purple-100 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                  {showHint ? 'Hide Clue' : 'Need a Clue?'}
                </button>
              )}
              <div className="ml-auto">
                {!isAnswerChecked ? (
                  <button
                    id="check-answer-btn"
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 font-['Fredoka',sans-serif] text-base"
                  >
                    <span>Check Answer</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="next-question-btn"
                    onClick={handleNext}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 font-['Fredoka',sans-serif] text-base"
                  >
                    <span>{currentIndex + 1 === game.questions.length ? 'See Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Victory Completion Screen */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-xl border-4 border-white text-4xl animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 font-['Fredoka',sans-serif]">
                Worksheet Completed!
              </h2>
              <p className="text-gray-600 font-medium">
                {accuracy >= 90
                  ? '🌟 Outstanding! You earned maximum stars and master honors!'
                  : accuracy >= 60
                  ? '👏 Great work! You are getting smarter every single day!'
                  : '💪 Keep practicing! You will master this in no time!'}
              </p>
            </div>

            {/* Stars Display */}
            <div className="flex items-center justify-center gap-3 py-2">
              {[1, 2, 3].map(starNum => (
                <div
                  key={starNum}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-transform ${
                    starNum <= earnedStars
                      ? 'bg-amber-100 border-amber-400 text-amber-500 scale-110 shadow-md'
                      : 'bg-gray-100 border-gray-300 text-gray-300'
                  }`}
                >
                  <Star className={`w-8 h-8 ${starNum <= earnedStars ? 'fill-amber-400' : 'fill-gray-200'}`} />
                </div>
              ))}
            </div>

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3">
                <p className="text-xs text-purple-600 font-bold uppercase">Accuracy</p>
                <p className="text-2xl font-black text-purple-900 font-['Fredoka',sans-serif]">{accuracy}%</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
                <p className="text-xs text-amber-600 font-bold uppercase">Score</p>
                <p className="text-2xl font-black text-amber-900 font-['Fredoka',sans-serif]">{score}/{game.questions.length}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
                <p className="text-xs text-emerald-600 font-bold uppercase">XP Gained</p>
                <p className="text-2xl font-black text-emerald-900 font-['Fredoka',sans-serif]">+{rewardDetails?.xpEarned || score * 20}</p>
              </div>
            </div>

            {/* Saved in MongoDB status */}
            <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
              {isSaving ? (
                <span>Saving progress to MongoDB database...</span>
              ) : currentUser ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Progress & score stored in MongoDB Atlas user profile!
                </span>
              ) : (
                <span>Guest mode session completed. Sign in to save permanent stars & badges!</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="replay-game-btn"
                onClick={handleRestart}
                className="px-5 py-3 border-2 border-purple-300 hover:bg-purple-50 text-purple-700 font-bold rounded-2xl transition-all flex items-center gap-2 font-['Fredoka',sans-serif]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              <button
                id="finish-and-close-btn"
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 font-['Fredoka',sans-serif]"
              >
                <Trophy className="w-4 h-4" />
                <span>Explore More Worksheets</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

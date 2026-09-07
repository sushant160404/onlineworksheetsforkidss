import React, { useState } from 'react';
import { WorksheetGame } from '../types';
import { Printer, Eye, EyeOff, CheckSquare, Sparkles } from 'lucide-react';

interface PrintableWorksheetModalProps {
  game: WorksheetGame;
  onClose: () => void;
}

export const PrintableWorksheetModal: React.FC<PrintableWorksheetModalProps> = ({ game, onClose }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="printable-worksheet-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden my-auto print:border-none print:shadow-none print:rounded-none">
        {/* Top Control Bar (Hidden on actual print) */}
        <div className="bg-purple-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <span className="font-bold font-['Fredoka',sans-serif]">Printable Worksheet View</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {showAnswerKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}</span>
            </button>
            <button
              id="print-action-btn"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-purple-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Worksheet Printable Sheet */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-gray-900 font-sans print:p-4">
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl font-black">
                  WK
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-['Fredoka',sans-serif] tracking-tight">WonderKids Academy</h1>
                  <p className="text-xs text-gray-500">Interactive Curriculum Worksheet Series • www.wonderkids.edu</p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-600">
                <span className="inline-block bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full border border-purple-200">
                  {game.grade} • {game.subject}
                </span>
              </div>
            </div>

            {/* Student metadata fill-in lines */}
            <div className="grid grid-cols-3 gap-4 pt-2 text-sm font-medium">
              <div className="border-b border-gray-400 pb-1">
                <span className="text-gray-500 text-xs mr-2">Name:</span>
                <span className="inline-block w-32 border-b border-gray-300"></span>
              </div>
              <div className="border-b border-gray-400 pb-1">
                <span className="text-gray-500 text-xs mr-2">Date:</span>
                <span className="inline-block w-24 border-b border-gray-300"></span>
              </div>
              <div className="border-b border-gray-400 pb-1 text-right">
                <span className="text-gray-500 text-xs mr-2">Score:</span>
                <span className="font-bold text-gray-800">____ / {game.questions.length}</span>
              </div>
            </div>
          </div>

          {/* Worksheet Title & Instructions */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{game.iconEmoji}</span>
              <h2 className="text-2xl font-bold text-gray-900 font-['Fredoka',sans-serif]">{game.title}</h2>
            </div>
            <p className="text-sm text-gray-600 italic">
              <strong>Instructions:</strong> Read each question carefully. Write your answer or check the correct box clearly in pencil.
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {game.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 break-inside-avoid">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-base text-gray-900">{q.prompt}</p>
                    {q.imageEmoji && (
                      <div className="text-2xl tracking-widest my-2">{q.imageEmoji}</div>
                    )}

                    {/* Multiple choice options */}
                    {q.options && q.options.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
                            <span className="w-5 h-5 rounded-md border border-gray-400 flex items-center justify-center text-xs font-semibold text-gray-600">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="text-gray-800">{opt}</span>
                            {showAnswerKey && String(opt).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase() && (
                              <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold">
                                ✓ Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                        <span className="text-xs text-gray-500 font-semibold">Your Answer: </span>
                        <div className="inline-block w-48 border-b-2 border-gray-400 ml-2">
                          {showAnswerKey && <span className="text-emerald-700 font-bold text-sm">{q.correctAnswer}</span>}
                        </div>
                      </div>
                    )}

                    {showAnswerKey && q.explanation && (
                      <div className="mt-2 text-xs text-emerald-700 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <strong>Answer Key Note:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer certification badge */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Great Job! Keep Learning Every Day!</span>
            </div>
            <div>Teacher / Parent Signature: _______________________</div>
          </div>
        </div>
      </div>
    </div>
  );
};

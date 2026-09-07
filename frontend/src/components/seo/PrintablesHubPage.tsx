import React, { useState } from 'react';
import { Printer, Download, Sparkles, Filter, CheckCircle2, ChevronRight, Play, Eye, FileText, Check } from 'lucide-react';
import { WorksheetGame, GradeLevel, Subject } from '../../types';

interface PrintablesHubPageProps {
  worksheets: WorksheetGame[];
  onPrintWorksheet: (game: WorksheetGame) => void;
  onPlayGame: (game: WorksheetGame) => void;
  onBackToHome: () => void;
}

export const PrintablesHubPage: React.FC<PrintablesHubPageProps> = ({
  worksheets,
  onPrintWorksheet,
  onPlayGame,
  onBackToHome
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = worksheets.filter(w => {
    const matchesGrade = selectedGrade === 'all' || w.grade === selectedGrade;
    const matchesSubject = selectedSubject === 'all' || w.subject === selectedSubject;
    const matchesSearch = !searchQuery || 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button onClick={onBackToHome} className="hover:text-purple-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-700 font-bold">Printable Worksheets Hub</span>
      </nav>

      {/* SEO Hero Header */}
      <header className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 rounded-3xl p-8 sm:p-12 text-white space-y-4 shadow-lg shadow-purple-900/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs border border-white/20 text-purple-100">
          <Printer className="w-3.5 h-3.5" />
          <span>100% Free Teacher & Parent Printables</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight leading-tight">
          Free Printable Worksheets for Kids (K-5)
        </h1>
        <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
          High-resolution, printer-friendly educational worksheets formatted with clean student name fields, date lines, problem sets, and full answer keys. Perfect for classroom morning work, homework, and homeschool practice.
        </p>
        <div className="flex flex-wrap gap-4 pt-2 text-xs text-purple-200">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clean Black & White Ink-Saver Layout</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Registration or Sign-Up Required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Aligned to Elementary Standards</span>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <Filter className="w-4 h-4 text-purple-600" />
            <span>Filter Printables:</span>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search printable sheets..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-purple-50/60 border border-purple-100 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-300 transition-all font-medium"
            />
          </div>
        </div>

        {/* Grade Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-gray-400 shrink-0">Grade:</span>
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedGrade === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Grades
          </button>
          {(['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'] as GradeLevel[]).map(g => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedGrade === g
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Subject Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-gray-400 shrink-0">Subject:</span>
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Subjects
          </button>
          {(['Math', 'Language Arts', 'Science', 'Typing', 'Logic & Puzzles'] as Subject[]).map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedSubject === s
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Printables Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
          <span>Showing {filtered.length} Printable Sheets</span>
          <span>Click &apos;Print Sheet&apos; for instant browser print preview & PDF</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(game => (
            <article
              key={game.id}
              className="bg-white rounded-2xl border border-purple-100/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{game.icon}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                      {game.grade}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {game.subject}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                    {game.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="bg-[#FBFBFE] rounded-xl p-3 border border-dashed border-gray-200 space-y-1 text-[11px] text-gray-600">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Questions: {game.questions.length} Items</span>
                    <span className="text-purple-600 font-bold">Includes Answer Key</span>
                  </div>
                  <p className="text-gray-400 text-[10px]">Formatted for Letter / A4 paper with Name & Date blanks</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => onPrintWorksheet(game)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet (PDF)</span>
                </button>
                <button
                  onClick={() => onPlayGame(game)}
                  className="px-3 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors flex items-center gap-1"
                  title="Play Online Instead"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span className="hidden sm:inline">Play</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

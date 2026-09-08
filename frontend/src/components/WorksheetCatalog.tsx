import React, { useState, useMemo } from 'react';
import { WorksheetGame, GradeLevel, Subject, Difficulty } from '../types';
import { WorksheetCard } from './WorksheetCard';
import { soundFX } from '../services/audio';
import { Filter, Search, Sparkles, Layers, SlidersHorizontal, BookOpen } from 'lucide-react';

interface WorksheetCatalogProps {
  worksheets: WorksheetGame[];
  selectedGrade: GradeLevel | 'All';
  onSelectGrade: (grade: GradeLevel | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPlayGame: (game: WorksheetGame) => void;
  onPrintWorksheet: (game: WorksheetGame) => void;
}

const SUBJECTS: (Subject | 'All')[] = [
  'All',
  'Math',
  'Language Arts',
  'Science',
  'Typing',
  'Logic & Puzzles',
  'Creative Arts'
];

const SUBJECT_ICONS: Record<string, string> = {
  'All': '🌟',
  'Math': '🔢',
  'Language Arts': '📚',
  'Science': '🔬',
  'Typing': '⌨️',
  'Logic & Puzzles': '🧩',
  'Creative Arts': '🎨'
};

export const WorksheetCatalog: React.FC<WorksheetCatalogProps> = ({
  worksheets,
  selectedGrade,
  onSelectGrade,
  searchQuery,
  onSearchChange,
  onPlayGame,
  onPrintWorksheet
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'interactive' | 'printable'>('All');
  const [displayLimit, setDisplayLimit] = useState(24);

  // Filter logic
  const filteredWorksheets = useMemo(() => {
    return worksheets.filter(w => {
      // Grade filter
      if (selectedGrade !== 'All' && w.grade !== selectedGrade) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'All' && w.subject !== selectedSubject) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && w.difficulty !== selectedDifficulty) {
        return false;
      }
      // Format filter
      if (selectedFormat === 'printable' && !w.isPrintable) {
        return false;
      }
      // Search query - improved matching with description field
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(q);
        const matchesTopic = w.topic.toLowerCase().includes(q);
        const matchesDescription = w.description.toLowerCase().includes(q);
        const matchesSubject = w.subject.toLowerCase().includes(q);
        const matchesGrade = w.grade.toLowerCase().includes(q);
        return matchesTitle || matchesTopic || matchesDescription || matchesSubject || matchesGrade;
      }
      return true;
    });
  }, [worksheets, selectedGrade, selectedSubject, selectedDifficulty, selectedFormat, searchQuery]);

  const displayedGames = filteredWorksheets.slice(0, displayLimit);

  const handleLoadMore = () => {
    soundFX.pop();
    setDisplayLimit(prev => prev + 24);
  };

  const handleResetFilters = () => {
    soundFX.pop();
    onSelectGrade('All');
    setSelectedSubject('All');
    setSelectedDifficulty('All');
    setSelectedFormat('All');
    onSearchChange('');
  };

  return (
    <section id="games-catalog-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Filter Bar Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 font-['Fredoka',sans-serif] flex items-center gap-2">
              <span>Interactive Worksheet Games Library</span>
              <span className="text-xs bg-purple-100 text-purple-800 font-black px-2.5 py-0.5 rounded-full">
                {filteredWorksheets.length.toLocaleString()} Worksheets
              </span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Filter by learning subject, grade level, and interactive format
            </p>
          </div>

          {/* Quick Search - Synchronized with Navbar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search topic or skill..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 hover:bg-purple-50/50 focus:bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:border-purple-500 outline-hidden transition-all"
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

        {/* Subject Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
          {SUBJECTS.map(subj => {
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                id={`subject-filter-${subj.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => {
                  soundFX.pop();
                  setSelectedSubject(subj);
                  setDisplayLimit(24); // Reset pagination when changing filters
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 font-['Fredoka',sans-serif] ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-xs scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-50 border border-transparent hover:border-purple-200'
                }`}
              >
                <span>{SUBJECT_ICONS[subj]}</span>
                <span>{subj}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Difficulty & Format */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-600">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Difficulty:</span>
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => {
                    soundFX.pop();
                    setSelectedDifficulty(diff);
                    setDisplayLimit(24); // Reset pagination when changing filters
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-purple-100 text-purple-900 font-bold'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <span className="text-gray-300 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Type:</span>
              <button
                onClick={() => {
                  setSelectedFormat('All');
                  setDisplayLimit(24); // Reset pagination when changing filters
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFormat === 'All' ? 'bg-purple-100 text-purple-900 font-bold' : 'hover:bg-gray-100'
                }`}
              >
                All Formats
              </button>
              <button
                onClick={() => {
                  setSelectedFormat('printable');
                  setDisplayLimit(24); // Reset pagination when changing filters
                }}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFormat === 'printable' ? 'bg-purple-100 text-purple-900 font-bold' : 'hover:bg-gray-100'
                }`}
              >
                Printable Sheets Only
              </button>
            </div>
          </div>

          {(selectedSubject !== 'All' || selectedDifficulty !== 'All' || selectedFormat !== 'All' || selectedGrade !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-purple-600 hover:text-purple-800 font-bold underline cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Games Grid */}
      {displayedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedGames.map(game => (
            <WorksheetCard
              key={game.id}
              game={game}
              onPlay={onPlayGame}
              onPrint={onPrintWorksheet}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-300 space-y-3 max-w-md mx-auto">
          <div className="text-5xl">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 font-['Fredoka',sans-serif]">No Worksheets Found</h3>
          <p className="text-xs text-gray-500">
            We couldn't find any worksheet games matching your search criteria. Try clearing some filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-xs font-['Fredoka',sans-serif]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination / Load More */}
      {displayedGames.length < filteredWorksheets.length && (
        <div className="text-center pt-6">
          <button
            id="load-more-games-btn"
            onClick={handleLoadMore}
            className="px-8 py-3.5 bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 text-purple-800 font-black rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 font-['Fredoka',sans-serif] text-base"
          >
            Load More Worksheets ({displayedGames.length} of {filteredWorksheets.length.toLocaleString()})
          </button>
        </div>
      )}
    </section>
  );
};

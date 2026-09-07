import React from 'react';
import { Sparkles, ArrowRight, Play, Printer, ChevronRight, CheckCircle, Calculator, BookOpen, Compass, Keyboard } from 'lucide-react';
import { Subject, WorksheetGame, GradeLevel } from '../../types';

interface SubjectWorksheetsPageProps {
  currentSubject?: Subject | 'all';
  onSelectSubject: (subject: Subject) => void;
  onPlayGame: (game: WorksheetGame) => void;
  onPrintWorksheet: (game: WorksheetGame) => void;
  worksheets: WorksheetGame[];
  onBackToHome: () => void;
}

interface SubjectDetail {
  id: Subject;
  title: string;
  headline: string;
  description: string;
  icon: string;
  topics: string[];
  bannerColor: string;
  badgeBg: string;
}

const SUBJECT_DETAILS: SubjectDetail[] = [
  {
    id: 'Math',
    title: 'Kids Math Worksheets & Games',
    headline: 'From Number Bonds to Multi-Digit Operations & Fractions',
    description: 'Help kids fall in love with mathematics through visual counting, bubble pop addition, times tables mastery, and interactive geometry puzzles designed to build number sense without frustration.',
    icon: '🧮',
    topics: ['Counting & Number Bonds (1-20)', 'Addition & Subtraction Facts', 'Multiplication & Division Tables', 'Fractions, Decimals & Shapes'],
    bannerColor: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  {
    id: 'Language Arts',
    title: 'Phonics & Reading Worksheets (Language Arts)',
    headline: 'Building Confident Young Readers from A to Z',
    description: 'Comprehensive literacy practice featuring alphabet letter tracing, consonant-vowel-consonant (CVC) word blending, sight words flashcards, and interactive story comprehension quizzes.',
    icon: '📖',
    topics: ['Alphabet Recognition & Letter Sounds', 'CVC Word Blending & Rhymes', 'Dolch & Fry High-Frequency Sight Words', 'Reading Comprehension Sentences'],
    bannerColor: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200'
  },
  {
    id: 'Science',
    title: 'Science & Discovery Worksheets',
    headline: 'Hands-On Inquiry into Nature, Space & Physics',
    description: 'Spark curiosity about our planet with animal habitat matching, plant and butterfly life cycles, solar system planets exploration, and weather pattern charts.',
    icon: '🔬',
    topics: ['Living vs Non-Living Organisms', 'Plant & Butterfly Life Cycles', 'Solar System, Sun & Moon Phases', 'Weather, Seasons & Water Cycle'],
    bannerColor: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
  },
  {
    id: 'Typing',
    title: 'Kids Typing & Keyboarding Games',
    headline: 'Master Finger Placement, Accuracy & WPM Speed',
    description: 'Essential 21st-century digital literacy skills taught through exciting meteor speed-typing challenges, home-row finger placement exercises, and keyboard word builders.',
    icon: '⌨️',
    topics: ['Home Row Keys Mastery (ASDF JKL;)', 'Number Row & Punctuation Practice', 'Typing Accuracy & Rhythm Building', 'Speed Challenge Drills (10 to 50+ WPM)'],
    bannerColor: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200'
  }
];

export const SubjectWorksheetsPage: React.FC<SubjectWorksheetsPageProps> = ({
  currentSubject = 'all',
  onSelectSubject,
  onPlayGame,
  onPrintWorksheet,
  worksheets,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = React.useState<Subject | 'all'>(currentSubject);

  const displayedSubjects = activeTab === 'all'
    ? SUBJECT_DETAILS
    : SUBJECT_DETAILS.filter(s => s.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button onClick={onBackToHome} className="hover:text-purple-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-700 font-bold">Subject Worksheets</span>
        {activeTab !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-bold">{activeTab}</span>
          </>
        )}
      </nav>

      {/* SEO Heading Banner */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Multi-Subject Elementary Learning Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight text-gray-900 leading-tight">
          Explore Free Worksheets by <span className="text-purple-600">Subject</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Comprehensive curriculum coverage featuring interactive math games, phonics reading practice, science discoveries, and typing skills with instant audio-visual feedback.
        </p>
      </header>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          ✨ All Subjects
        </button>
        {SUBJECT_DETAILS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === s.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.id}</span>
          </button>
        ))}
      </div>

      {/* Subject Cards */}
      <div className="space-y-12">
        {displayedSubjects.map(sub => {
          const sampleGames = worksheets.filter(w => w.subject === sub.id).slice(0, 4);

          return (
            <article
              key={sub.id}
              className="bg-white rounded-3xl border border-purple-100/80 shadow-sm p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sub.icon}</span>
                    <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka',sans-serif] text-gray-900">
                      {sub.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-purple-700">
                    {sub.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectSubject(sub.id);
                      onBackToHome();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <span>Browse All {sub.id} Games</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Core Topics Covered */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Core Subject Curriculum:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {sub.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 bg-purple-50/50 rounded-xl p-2.5 text-xs font-semibold text-gray-800 border border-purple-100/50">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Worksheets List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-['Fredoka',sans-serif] text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Featured {sub.id} Interactive Activities</span>
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">Free instant access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sampleGames.map(game => (
                    <div
                      key={game.id}
                      className="bg-[#FAF9FF] rounded-2xl p-4 border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{game.icon}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-purple-100 text-purple-700">
                            {game.grade}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                          {game.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-2">
                          {game.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-purple-50">
                        <button
                          onClick={() => onPlayGame(game)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Play</span>
                        </button>
                        <button
                          onClick={() => onPrintWorksheet(game)}
                          className="p-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
                          title="Print Worksheet"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

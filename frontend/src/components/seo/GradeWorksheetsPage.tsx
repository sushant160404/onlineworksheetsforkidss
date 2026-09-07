import React from 'react';
import { BookOpen, Star, CheckCircle2, ArrowRight, Printer, Play, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';
import { GradeLevel, WorksheetGame } from '../../types';

interface GradeWorksheetsPageProps {
  currentGrade?: GradeLevel | 'all';
  onSelectGrade: (grade: GradeLevel) => void;
  onPlayGame: (game: WorksheetGame) => void;
  onPrintWorksheet: (game: WorksheetGame) => void;
  worksheets: WorksheetGame[];
  onBackToHome: () => void;
}

interface GradeDetail {
  id: GradeLevel;
  title: string;
  ageGroup: string;
  headline: string;
  description: string;
  keySkills: string[];
  color: string;
  badgeBg: string;
  borderColor: string;
  accentIcon: string;
}

const GRADE_DETAILS: GradeDetail[] = [
  {
    id: 'Kindergarten',
    title: 'Kindergarten Worksheets',
    ageGroup: 'Ages 4 - 6',
    headline: 'Foundational Phonics, Number Counting & Early Science',
    description: 'Empower early learners with visual counting games, uppercase and lowercase letter tracing, color sorting, and simple CVC word recognition worksheets.',
    keySkills: ['Number Counting 1-20', 'Alphabet Recognition & Tracing', 'Phonics & Beginning Letter Sounds', 'Basic Shapes & Color Sorting'],
    color: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    borderColor: 'border-amber-200 hover:border-amber-400',
    accentIcon: '🐣'
  },
  {
    id: '1st Grade',
    title: '1st Grade Worksheets',
    ageGroup: 'Ages 6 - 7',
    headline: 'Addition under 20, Sight Words & Simple Sentences',
    description: 'Support first graders with single-digit addition and subtraction, clock reading to the hour, sight words flashcard games, and animal classification.',
    keySkills: ['Addition & Subtraction within 20', 'Sight Words & Sentence Building', 'Telling Time on Analog Clocks', 'Living vs Non-Living Science'],
    color: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    accentIcon: '🚀'
  },
  {
    id: '2nd Grade',
    title: '2nd Grade Worksheets',
    ageGroup: 'Ages 7 - 8',
    headline: 'Double-Digit Math, Compound Words & Life Cycles',
    description: 'Master place value to 100, 2-digit addition with regrouping, reading comprehension stories, and plant & butterfly life cycle worksheets.',
    keySkills: ['Double-Digit Addition with Regrouping', 'Place Value (Hundreds, Tens, Ones)', 'Compound Words & Contractions', 'Plant & Animal Life Cycles'],
    color: 'text-blue-600',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    borderColor: 'border-blue-200 hover:border-blue-400',
    accentIcon: '🌟'
  },
  {
    id: '3rd Grade',
    title: '3rd Grade Worksheets',
    ageGroup: 'Ages 8 - 9',
    headline: 'Multiplication Tables, Cursive & Earth Science',
    description: 'Build confidence with times tables 1-12, introductory division, parts of speech (nouns, verbs, adjectives), cursive handwriting, and water cycles.',
    keySkills: ['Multiplication Facts 0-12', 'Introductory Division & Fractions', 'Parts of Speech & Punctuation', 'Water Cycle & Weather Patterns'],
    color: 'text-indigo-600',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    borderColor: 'border-indigo-200 hover:border-indigo-400',
    accentIcon: '🧩'
  },
  {
    id: '4th Grade',
    title: '4th Grade Worksheets',
    ageGroup: 'Ages 9 - 10',
    headline: 'Fractions, Decimals, Advanced Grammar & Geography',
    description: 'Deepen problem solving with equivalent fractions, long division, reading inference, state capitals, and electricity science concepts.',
    keySkills: ['Equivalent Fractions & Decimals', 'Long Division & Multi-Digit Math', 'Reading Comprehension Inferences', 'States, Capitals & Solar System'],
    color: 'text-purple-600',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    borderColor: 'border-purple-200 hover:border-purple-400',
    accentIcon: '🔬'
  },
  {
    id: '5th Grade',
    title: '5th Grade Worksheets',
    ageGroup: 'Ages 10 - 11',
    headline: 'Algebra Prep, Advanced Vocabulary & Typing Drills',
    description: 'Prepare students for middle school with order of operations (PEMDAS), volume & coordinate geometry, touch typing speed drills, and cell biology.',
    keySkills: ['Order of Operations (PEMDAS)', 'Geometry, Volume & Coordinates', 'Touch Typing Speed Drills (40+ WPM)', 'Human Body Systems & Ecosystems'],
    color: 'text-rose-600',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
    borderColor: 'border-rose-200 hover:border-rose-400',
    accentIcon: '🎓'
  }
];

export const GradeWorksheetsPage: React.FC<GradeWorksheetsPageProps> = ({
  currentGrade = 'all',
  onSelectGrade,
  onPlayGame,
  onPrintWorksheet,
  worksheets,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = React.useState<GradeLevel | 'all'>(currentGrade);

  const displayedGrades = activeTab === 'all' 
    ? GRADE_DETAILS 
    : GRADE_DETAILS.filter(g => g.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* SEO Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button onClick={onBackToHome} className="hover:text-purple-600 transition-colors flex items-center gap-1">
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-700 font-bold">Grade-Wise Worksheets</span>
        {activeTab !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-bold">{activeTab}</span>
          </>
        )}
      </nav>

      {/* Page SEO Heading */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <GraduationCap className="w-4 h-4 text-purple-600" />
          <span>Curriculum Aligned • Kindergarten to 5th Grade</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight text-gray-900 leading-tight">
          Free Online Worksheets for Kids by <span className="text-purple-600">Grade Level</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Select your child&apos;s grade to explore curated worksheets with interactive games, instant automated scoring, and print-ready classroom practice sheets.
        </p>
      </header>

      {/* Grade Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          🌟 All Grades (K-5)
        </button>
        {GRADE_DETAILS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveTab(g.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === g.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{g.accentIcon}</span>
            <span>{g.id}</span>
          </button>
        ))}
      </div>

      {/* Grade Sections Grid */}
      <div className="space-y-12">
        {displayedGrades.map(grade => {
          const gradeWorksheets = worksheets.filter(w => w.grade === grade.id).slice(0, 4);

          return (
            <article
              key={grade.id}
              className="bg-white rounded-3xl border border-purple-100/80 shadow-sm p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{grade.accentIcon}</span>
                    <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka',sans-serif] text-gray-900">
                      {grade.title}
                    </h2>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${grade.badgeBg}`}>
                      {grade.ageGroup}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-purple-700">
                    {grade.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
                    {grade.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectGrade(grade.id);
                      onBackToHome();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    <span>View All {grade.id} Games</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Key Skills Tags */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Core Learning Milestones:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {grade.keySkills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 bg-purple-50/50 rounded-xl p-2.5 text-xs font-semibold text-gray-800 border border-purple-100/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Worksheets for this grade */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-['Fredoka',sans-serif] text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Popular {grade.id} Interactive Worksheets</span>
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">Auto-scored & Print-ready</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {gradeWorksheets.map(game => (
                    <div
                      key={game.id}
                      className="bg-[#FAF9FF] rounded-2xl p-4 border border-purple-100 hover:border-purple-300 transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{game.icon}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-purple-100 text-purple-700">
                            {game.subject}
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

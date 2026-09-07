import React from 'react';
import { BookOpen, Award, CheckCircle, ShieldCheck, Target, Heart, ChevronRight, Zap, Sparkles } from 'lucide-react';

interface CurriculumGuidePageProps {
  onBackToHome: () => void;
  onExploreWorksheets: () => void;
}

export const CurriculumGuidePage: React.FC<CurriculumGuidePageProps> = ({
  onBackToHome,
  onExploreWorksheets
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button onClick={onBackToHome} className="hover:text-purple-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-700 font-bold">Curriculum & Pedagogical Standards</span>
      </nav>

      {/* SEO Title Banner */}
      <header className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <Award className="w-4 h-4 text-purple-600" />
          <span>Educational Standards & Research-Backed Design</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight text-gray-900 leading-tight">
          Curriculum Alignment & <span className="text-purple-600">Learning Framework</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          How onlineworksheetsforkidss merges rigorous elementary educational standards with intrinsic gamification to turn daily homework practice into confident mastery.
        </p>
      </header>

      {/* Core Educational Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold">
            🎯
          </div>
          <h2 className="text-xl font-bold font-['Fredoka',sans-serif] text-gray-900">
            Standard Curriculum Match
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Every worksheet and interactive challenge is mapped directly to elementary benchmarks, including Common Core State Standards (CCSS) for Mathematics and English Language Arts, plus Next Generation Science Standards (NGSS).
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
            ✨
          </div>
          <h2 className="text-xl font-bold font-['Fredoka',sans-serif] text-gray-900">
            Positive Behavioral Feedback
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Immediate celebratory audio-visual cues, streak milestone badges, and star rewards reinforce active recall. Errors are treated as stepping stones with clear step-by-step guidance rather than punitive penalties.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
            📝
          </div>
          <h2 className="text-xl font-bold font-['Fredoka',sans-serif] text-gray-900">
            Dual Modality: Screen & Paper
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We champion cognitive flexibility: interactive digital game modes build speed and instant feedback, while 1-click printable worksheets foster critical fine motor pencil grip, handwriting, and test-taking readiness.
          </p>
        </div>
      </section>

      {/* Grade-by-Grade Curriculum Matrix */}
      <section className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-['Fredoka',sans-serif] text-gray-900">
            Curriculum Breakdown by Grade Level
          </h2>
          <p className="text-sm text-gray-600">
            Detailed learning scope mapped across Kindergarten through 5th Grade.
          </p>
        </div>

        <div className="divide-y divide-gray-100 text-sm">
          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span>Kindergarten</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Foundational Phonics, Counting & Tactile Discovery</p>
              <p className="text-xs text-gray-500">
                Number recognition 1-20, one-to-one correspondence, letter-sound identification, uppercase & lowercase pairing, basic 2D geometric shapes (circle, square, triangle), and sensory color sorting.
              </p>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span>1st Grade</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Early Arithmetic, CVC Words & Basic Life Sciences</p>
              <p className="text-xs text-gray-500">
                Addition and subtraction facts within 20, missing addends, time to the half-hour, Dolch 1st grade sight words, sentence capitalization, ending punctuation, and living versus non-living science classifications.
              </p>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              <span>2nd Grade</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Place Value, Reading Comprehension & Life Cycles</p>
              <p className="text-xs text-gray-500">
                Two-digit addition and subtraction with regrouping, skip counting by 2s, 5s, and 10s up to 1,000, money values and coins, compound words, contractions, main idea reading comprehension, and butterfly/frog life cycles.
              </p>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-400" />
              <span>3rd Grade</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Multiplication, Introductory Fractions & Earth Science</p>
              <p className="text-xs text-gray-500">
                Mastery of times tables 0 through 12, introductory division concepts, understanding fractions on a number line, parts of speech (nouns, verbs, adjectives, adverbs), cursive writing, water cycle, and weather charts.
              </p>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              <span>4th Grade</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Fractions, Decimals, Advanced Grammar & Solar System</p>
              <p className="text-xs text-gray-500">
                Equivalent fractions, decimal notation to hundredths, multi-digit long division, area and perimeter calculations, reading inference questions, prefixes and suffixes, state geography, and planetary orbits.
              </p>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span>5th Grade</span>
            </div>
            <div className="md:col-span-3 space-y-1">
              <p className="font-semibold text-purple-700">Pre-Algebra, Geometry, Keyboard Touch Typing & Human Body</p>
              <p className="text-xs text-gray-500">
                Order of operations (PEMDAS), volume of 3D solids, coordinate grids, decimal arithmetic, literary devices (metaphors, similes), touch typing speed drills up to 50+ WPM, and human body circulatory and respiratory systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="bg-purple-50 rounded-3xl p-6 sm:p-8 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-purple-600 flex items-center justify-center text-xl shadow-xs shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">COPPA Compliant & 100% Kid-Safe</h3>
            <p className="text-xs text-gray-600 max-w-xl">
              Zero predatory third-party advertising. No student tracking or selling of student records. Pure educational enjoyment crafted for peaceful parent and teacher peace of mind.
            </p>
          </div>
        </div>

        <button
          onClick={onExploreWorksheets}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 shrink-0 transition-colors"
        >
          Explore All 1,000+ Worksheets
        </button>
      </section>
    </div>
  );
};

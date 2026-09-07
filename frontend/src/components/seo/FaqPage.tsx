import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    category: 'General & Pricing',
    question: 'Are the online worksheets and printable games on onlineworksheetsforkidss completely free?',
    answer: 'Yes! Every single one of our 1,000+ interactive educational worksheets, gamified challenges, and printable PDF worksheets is 100% free for children, parents, teachers, and homeschool families. There are no hidden paywalls, credit card requirements, or locked levels.'
  },
  {
    category: 'General & Pricing',
    question: 'Do kids or parents need to create an account to play or print?',
    answer: 'No account is required to start practicing immediately! Anyone can click "Play" or "Print" and begin learning in seconds. Creating a free explorer nickname allows kids to save their star collection, unlock achievements, track continuous daily streaks, and compete on the classroom leaderboard.'
  },
  {
    category: 'Grades & Curriculum',
    question: 'Which grades and age levels do you support?',
    answer: 'We provide structured educational content for Kindergarten through 5th Grade (approximately ages 4 through 11). Each grade level is carefully calibrated to match official elementary school curriculum benchmarks, from letter tracing in Kindergarten to order of operations (PEMDAS) in 5th Grade.'
  },
  {
    category: 'Grades & Curriculum',
    question: 'Are your learning games aligned with Common Core or educational standards?',
    answer: 'Yes. Our math, phonics, reading, and science worksheets are intentionally designed in alignment with standard US elementary frameworks (Common Core State Standards for Math & ELA, and Next Generation Science Standards), as well as international elementary curricula.'
  },
  {
    category: 'Printing & Offline Practice',
    question: 'How do I print worksheets for classroom or homework practice?',
    answer: 'Simply click the "Print Sheet (PDF)" button located on any worksheet card or inside any game modal. A clean, ink-friendly printable preview will open with student name and date headers, clear problem grids, and an automated answer key. You can print directly to your physical printer or save as a PDF.'
  },
  {
    category: 'Safety & Privacy',
    question: 'Is onlineworksheetsforkidss safe for young children and COPPA compliant?',
    answer: 'Absolutely. We take child privacy with utmost seriousness. We do not run invasive behavioral tracking, we do not require personal identifiable information, and there are no external chat rooms or unmoderated communications. The platform provides a safe, distraction-free digital sandbox.'
  },
  {
    category: 'Gameplay & Engagement',
    question: 'What types of interactive game modes are available?',
    answer: 'We offer four distinct gamified engines: Bubble Pop (fast-paced math facts and sight word balloon bursting), Word Builder (interactive letter tile phonics anagrams), Speed Typing (falling meteors keyboard drills for home row typing), and Classic Interactive Worksheets (auto-scored multiple choice, fill-in-the-blank, and true/false problem sets).'
  },
  {
    category: 'Teachers & Schools',
    question: 'Can teachers use onlineworksheetsforkidss on interactive smartboards?',
    answer: 'Yes! The entire platform is built with responsive touch targets and high-contrast typography, making it seamless to run on classroom Smart Boards, iPads, Android tablets, Chromebooks, and computer lab desktops with zero app installations required.'
  }
];

export const FaqPage: React.FC<{ onBackToHome: () => void; onExploreClick: () => void }> = ({
  onBackToHome,
  onExploreClick
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <button onClick={onBackToHome} className="hover:text-purple-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-700 font-bold">Frequently Asked Questions (FAQ)</span>
      </nav>

      {/* SEO Title */}
      <header className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>Parents & Teachers Help Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Fredoka',sans-serif] tracking-tight text-gray-900 leading-tight">
          Frequently Asked <span className="text-purple-600">Questions</span>
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Everything you need to know about using onlineworksheetsforkidss at home, in the classroom, or for homeschool learning.
        </p>
      </header>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <article
              key={idx}
              className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-purple-50/40 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    {faq.category}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold font-['Fredoka',sans-serif] text-gray-900 leading-snug">
                    {faq.question}
                  </h2>
                </div>
                <div className={`p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-purple-100' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-purple-50 bg-[#FDFCFF]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-purple-600/20">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold font-['Fredoka',sans-serif]">Ready to start learning?</h3>
          <p className="text-xs sm:text-sm text-purple-100">
            Join thousands of kids mastering math, reading, science, and typing every day!
          </p>
        </div>
        <button
          onClick={onExploreClick}
          className="px-6 py-3 rounded-xl bg-white hover:bg-purple-50 text-purple-700 font-bold text-xs shadow-sm shrink-0 transition-colors"
        >
          Browse 1,000+ Games Now
        </button>
      </div>
    </div>
  );
};

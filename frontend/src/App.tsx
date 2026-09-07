import React, { useState, useEffect } from 'react';
import { WorksheetGame, UserProfile, GradeLevel, Subject } from './types';
import { ALL_WORKSHEETS } from './data/catalog';
import { api } from './services/api';
import { soundFX } from './services/audio';
import { Navbar, SeoPageView } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WorksheetCatalog } from './components/WorksheetCatalog';
import { GradeWorksheetsPage } from './components/seo/GradeWorksheetsPage';
import { SubjectWorksheetsPage } from './components/seo/SubjectWorksheetsPage';
import { PrintablesHubPage } from './components/seo/PrintablesHubPage';
import { CurriculumGuidePage } from './components/seo/CurriculumGuidePage';
import { FaqPage } from './components/seo/FaqPage';
import { InteractiveWorksheetGame } from './components/games/InteractiveWorksheetGame';
import { BubblePopGame } from './components/games/BubblePopGame';
import { WordBuilderGame } from './components/games/WordBuilderGame';
import { SpeedTypingGame } from './components/games/SpeedTypingGame';
import { PrintableWorksheetModal } from './components/PrintableWorksheetModal';
import { AuthModal } from './components/AuthModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { LeaderboardModal } from './components/LeaderboardModal';
import { DatabaseStatusModal } from './components/DatabaseStatusModal';
import { AdminPanel } from './components/AdminPanel';
import { Heart, Sparkles, ShieldCheck, Database, Award, BookOpen, Star, Shield, ArrowRight, Printer, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [worksheetsList, setWorksheetsList] = useState<WorksheetGame[]>(ALL_WORKSHEETS);
  const [activeGame, setActiveGame] = useState<WorksheetGame | null>(null);
  const [printableGame, setPrintableGame] = useState<WorksheetGame | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isDbStatusOpen, setIsDbStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'kids' | 'admin'>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.pathname === '/admin')) {
      return 'admin';
    }
    return 'kids';
  });
  const [activeSeoPage, setActiveSeoPage] = useState<SeoPageView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['grades', 'subjects', 'printables', 'curriculum', 'faqs'].includes(hash)) {
        return hash as SeoPageView;
      }
    }
    return 'home';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync hash routing for admin and SEO pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('kids');
        if (['grades', 'subjects', 'printables', 'curriculum', 'faqs'].includes(hash)) {
          setActiveSeoPage(hash as SeoPageView);
        } else {
          setActiveSeoPage('home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundFX.pop();
  };

  const navigateToKids = () => {
    window.location.hash = '';
    setCurrentPage('kids');
    setActiveSeoPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundFX.pop();
  };

  const navigateToSeoPage = (page: SeoPageView) => {
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage('kids');
    setActiveSeoPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundFX.pop();
  };

  const refreshWorksheets = async () => {
    try {
      const custom = await api.getCustomWorksheets();
      if (custom && custom.length > 0) {
        const customIds = new Set(custom.map(w => w.id));
        const standardRemaining = ALL_WORKSHEETS.filter(w => !customIds.has(w.id));
        setWorksheetsList([...custom, ...standardRemaining]);
      } else {
        setWorksheetsList(ALL_WORKSHEETS);
      }
    } catch {
      setWorksheetsList(ALL_WORKSHEETS);
    }
  };

  // Load current user profile on app start and custom worksheets
  useEffect(() => {
    async function loadInitial() {
      try {
        const user = await api.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Error loading current user:', err);
      }
      refreshWorksheets();
    }
    loadInitial();
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.pop();
  };

  const handlePlayGame = (game: WorksheetGame) => {
    setActiveGame(game);
  };

  const handlePrintWorksheet = (game: WorksheetGame) => {
    setPrintableGame(game);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleSignOut = () => {
    api.clearToken();
    setCurrentUser(null);
    setIsProgressOpen(false);
    soundFX.pop();
  };

  // Dedicated Full Page for Admin Panel (with Admin Login Panel)
  if (currentPage === 'admin') {
    return (
      <AdminPanel
        currentUser={currentUser}
        onBackToKids={navigateToKids}
        onClose={navigateToKids}
        onAdminAuthenticated={(user) => {
          setCurrentUser(user);
        }}
        onSignOut={handleSignOut}
        onRefreshCatalog={refreshWorksheets}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FF] text-[#2D2A4A] selection:bg-purple-200">
      {/* Top Navigation with SEO Subnav */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAdmin={navigateToAdmin}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSeoPage={activeSeoPage}
        onNavigateSeoPage={navigateToSeoPage}
      />

      {/* Primary Content View - Switchable between Home Catalog and Dedicated SEO Hubs */}
      {activeSeoPage === 'home' && (
        <>
          {/* Main Hero & Features Banner */}
          <HeroBanner
            selectedGrade={selectedGrade}
            onSelectGrade={setSelectedGrade}
            onExploreClick={() => {
              const el = document.getElementById('games-catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            totalGamesCount={worksheetsList.length}
          />

          {/* 1000+ Interactive Worksheet Games Library */}
          <main className="flex-1">
            <WorksheetCatalog
              worksheets={worksheetsList}
              selectedGrade={selectedGrade}
              onSelectGrade={setSelectedGrade}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onPlayGame={handlePlayGame}
              onPrintWorksheet={handlePrintWorksheet}
            />
          </main>
        </>
      )}

      {activeSeoPage === 'grades' && (
        <main className="flex-1">
          <GradeWorksheetsPage
            currentGrade={selectedGrade === 'All' ? 'all' : selectedGrade}
            onSelectGrade={(grade) => {
              setSelectedGrade(grade);
              navigateToSeoPage('home');
            }}
            onPlayGame={handlePlayGame}
            onPrintWorksheet={handlePrintWorksheet}
            worksheets={worksheetsList}
            onBackToHome={() => navigateToSeoPage('home')}
          />
        </main>
      )}

      {activeSeoPage === 'subjects' && (
        <main className="flex-1">
          <SubjectWorksheetsPage
            onSelectSubject={(subject) => {
              navigateToSeoPage('home');
            }}
            onPlayGame={handlePlayGame}
            onPrintWorksheet={handlePrintWorksheet}
            worksheets={worksheetsList}
            onBackToHome={() => navigateToSeoPage('home')}
          />
        </main>
      )}

      {activeSeoPage === 'printables' && (
        <main className="flex-1">
          <PrintablesHubPage
            worksheets={worksheetsList}
            onPrintWorksheet={handlePrintWorksheet}
            onPlayGame={handlePlayGame}
            onBackToHome={() => navigateToSeoPage('home')}
          />
        </main>
      )}

      {activeSeoPage === 'curriculum' && (
        <main className="flex-1">
          <CurriculumGuidePage
            onBackToHome={() => navigateToSeoPage('home')}
            onExploreWorksheets={() => navigateToSeoPage('home')}
          />
        </main>
      )}

      {activeSeoPage === 'faqs' && (
        <main className="flex-1">
          <FaqPage
            onBackToHome={() => navigateToSeoPage('home')}
            onExploreClick={() => navigateToSeoPage('home')}
          />
        </main>
      )}

      {/* Interactive Game Modals by Game Engine */}
      {activeGame && activeGame.gameType === 'bubble_pop' && (
        <BubblePopGame
          game={activeGame}
          currentUser={currentUser}
          onClose={() => setActiveGame(null)}
          onUserUpdate={setCurrentUser}
        />
      )}

      {activeGame && activeGame.gameType === 'word_builder' && (
        <WordBuilderGame
          game={activeGame}
          currentUser={currentUser}
          onClose={() => setActiveGame(null)}
          onUserUpdate={setCurrentUser}
        />
      )}

      {activeGame && activeGame.gameType === 'speed_typing' && (
        <SpeedTypingGame
          game={activeGame}
          currentUser={currentUser}
          onClose={() => setActiveGame(null)}
          onUserUpdate={setCurrentUser}
        />
      )}

      {activeGame && activeGame.gameType === 'interactive_worksheet' && (
        <InteractiveWorksheetGame
          game={activeGame}
          currentUser={currentUser}
          onClose={() => setActiveGame(null)}
          onUserUpdate={setCurrentUser}
        />
      )}

      {/* Printable Worksheet Modal */}
      {printableGame && (
        <PrintableWorksheetModal
          game={printableGame}
          onClose={() => setPrintableGame(null)}
        />
      )}

      {/* Authentication Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Progress Tracking Dashboard */}
      {isProgressOpen && currentUser && (
        <ProgressDashboard
          user={currentUser}
          onClose={() => setIsProgressOpen(false)}
          onSignOut={handleSignOut}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {/* MongoDB Atlas Database & Table Inspector */}
      {isDbStatusOpen && (
        <DatabaseStatusModal
          onClose={() => setIsDbStatusOpen(false)}
        />
      )}

      {/* Comprehensive SEO & Navigation Footer */}
      <footer className="bg-white border-t border-purple-100 py-12 px-4 sm:px-6 lg:px-8 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="space-y-4 lg:col-span-2">
              <div 
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => navigateToSeoPage('home')}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-purple-200 overflow-hidden flex items-center justify-center p-0.5">
                  <img
                    src="/favicon.svg"
                    alt="onlineworksheetsforkidss icon"
                    className="w-full h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xl font-black font-['Fredoka',sans-serif] text-gray-900">
                  onlineworksheets<span className="text-purple-600">forkidss</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                Empowering children from Pre-K to 5th Grade with over 1,000+ interactive worksheet games, automated grading, audio feedback, and progress tracking. Free printable PDFs for classroom and homeschooling parents.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>COPPA Compliant & 100% Kid-Safe</span>
              </div>
            </div>

            {/* Worksheets by Grade (SEO Links) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-['Fredoka',sans-serif]">
                Worksheets by Grade
              </h4>
              <ul className="text-xs text-gray-500 space-y-1.5 font-medium">
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    Kindergarten Worksheets
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    1st Grade Worksheets
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    2nd Grade Worksheets
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    3rd Grade Worksheets
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    4th Grade Worksheets
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('grades')} className="hover:text-purple-700 transition-colors">
                    5th Grade Worksheets
                  </button>
                </li>
              </ul>
            </div>

            {/* Learning Subjects (SEO Links) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-['Fredoka',sans-serif]">
                Learning Subjects
              </h4>
              <ul className="text-xs text-gray-500 space-y-1.5 font-medium">
                <li>
                  <button onClick={() => navigateToSeoPage('subjects')} className="hover:text-purple-700 transition-colors">
                    🔢 Math Games & Drills
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('subjects')} className="hover:text-purple-700 transition-colors">
                    📖 Phonics & Sight Words
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('subjects')} className="hover:text-purple-700 transition-colors">
                    🔬 Science Explorations
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('subjects')} className="hover:text-purple-700 transition-colors">
                    ⌨️ Touch Typing & WPM
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('printables')} className="hover:text-purple-700 transition-colors">
                    🖨️ Free Printable Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources & Admin */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-['Fredoka',sans-serif]">
                Resources & Data
              </h4>
              <ul className="text-xs text-gray-500 space-y-1.5 font-medium">
                <li>
                  <button onClick={() => navigateToSeoPage('curriculum')} className="hover:text-purple-700 transition-colors">
                    📋 Curriculum Standards
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSeoPage('faqs')} className="hover:text-purple-700 transition-colors">
                    ❓ Parents & Teachers FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsLeaderboardOpen(true)} className="hover:text-purple-700 transition-colors">
                    🏆 Student Leaderboard
                  </button>
                </li>
              </ul>

              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  id="footer-db-inspect-btn"
                  onClick={() => setIsDbStatusOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 transition-colors w-fit"
                >
                  <Database className="w-3.5 h-3.5 text-purple-600" />
                  <span>Inspect DB Tables</span>
                </button>
                <button
                  id="footer-admin-btn"
                  onClick={navigateToAdmin}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 transition-colors w-fit"
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Admin Gateway</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© 2026 onlineworksheetsforkidss. All educational rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for young minds everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

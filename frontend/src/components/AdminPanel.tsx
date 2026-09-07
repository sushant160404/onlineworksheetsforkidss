import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  Users,
  Gamepad2,
  Database,
  BarChart3,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  RefreshCw,
  Sparkles,
  FolderPlus,
  Star,
  Award,
  BookOpen,
  Clock,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Layers,
  FileText,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  LogOut,
  LogIn,
  UserCheck,
  Server,
  Zap,
  CheckSquare
} from 'lucide-react';
import { UserProfile, AdminStats, CustomTableInfo, WorksheetGame, GameSessionRecord, Subject, GradeLevel } from '../types';
import { api } from '../services/api';
import { soundFX } from '../services/audio';
import { AvatarIcon } from './AvatarIcon';

export interface AdminPanelProps {
  currentUser: UserProfile | null;
  onBackToKids?: () => void;
  onClose?: () => void;
  onAdminAuthenticated?: (user: UserProfile) => void;
  onSignOut?: () => void;
  onRefreshCatalog?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isOpen?: boolean;
}

type AdminTab = 'overview' | 'users' | 'worksheets' | 'tables' | 'sessions';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  onBackToKids,
  onClose,
  onAdminAuthenticated,
  onSignOut,
  onRefreshCatalog,
  soundEnabled,
  onToggleSound,
  isOpen = true
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Admin Login Panel Form State
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [sessions, setSessions] = useState<GameSessionRecord[]>([]);
  const [worksheets, setWorksheets] = useState<WorksheetGame[]>([]);
  const [customTables, setCustomTables] = useState<CustomTableInfo[]>([]);

  // Table Data Viewer State
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);

  // Modals inside Admin
  const [showCreateWorksheetModal, setShowCreateWorksheetModal] = useState(false);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // Search filters
  const [userSearch, setUserSearch] = useState('');
  const [worksheetSearch, setWorksheetSearch] = useState('');
  const [sessionSearch, setSessionSearch] = useState('');

  // New Table Form
  const [newTableName, setNewTableName] = useState('');
  const [newTableDesc, setNewTableDesc] = useState('');
  const [newTableCols, setNewTableCols] = useState('title, category, notes, status');

  // New Row Form data
  const [newRowData, setNewRowData] = useState<Record<string, string>>({});

  // New Worksheet Form State
  const [newWsTitle, setNewWsTitle] = useState('');
  const [newWsSubject, setNewWsSubject] = useState<Subject>('Math');
  const [newWsGrade, setNewWsGrade] = useState<GradeLevel>('1st Grade');
  const [newWsDesc, setNewWsDesc] = useState('');
  const [newWsEmoji, setNewWsEmoji] = useState('⭐');
  const [newWsDifficulty, setNewWsDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [newWsQuestions, setNewWsQuestions] = useState<
    { prompt: string; options: string[]; correctAnswer: string; explanation: string }[]
  >([
    {
      prompt: 'What is 5 + 5?',
      options: ['8', '10', '12', '15'],
      correctAnswer: '10',
      explanation: '5 plus 5 equals 10!'
    },
    {
      prompt: 'Which number is greater: 14 or 9?',
      options: ['14', '9', 'They are equal', 'Neither'],
      correctAnswer: '14',
      explanation: '14 is bigger than 9.'
    }
  ]);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, usersData, sessionsData, wsData, tablesData] = await Promise.all([
        api.getAdminStats().catch(() => null),
        api.getAdminUsers().catch(() => []),
        api.getAdminSessions(100).catch(() => []),
        api.getAdminWorksheets().catch(() => []),
        api.getAdminTables().catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      setUsers(usersData);
      setSessions(sessionsData);
      setWorksheets(wsData);
      setCustomTables(tablesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentTableRows = async (tableName: string) => {
    setLoadingRows(true);
    try {
      const res = await fetch(`/api/db/tables/${tableName}`);
      if (res.ok) {
        const data = await res.json();
        setTableRows(data.rows || []);
      }
    } catch {
      setTableRows([]);
    } finally {
      setLoadingRows(false);
    }
  };

  const handleExit = () => {
    soundFX.pop();
    if (onBackToKids) {
      onBackToKids();
    } else if (onClose) {
      onClose();
    } else if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
  };

  const handleAdminLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both administrator username/email and password.');
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    try {
      soundFX.pop();
      const res = await api.adminLogin({
        username: loginUsername.trim(),
        password: loginPassword.trim()
      });
      if (onAdminAuthenticated) {
        onAdminAuthenticated(res.user);
      }
      showNotification(`Welcome, Administrator ${res.user.username}!`);
      loadAllData();
    } catch (err: any) {
      setLoginError(err.message || 'Administrator authentication failed');
      soundFX.wrong();
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminDemoLogin = async () => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      soundFX.fanfare();
      const res = await api.adminDemoLogin();
      if (onAdminAuthenticated) {
        onAdminAuthenticated(res.user);
      }
      showNotification(`Logged in as Administrator ${res.user.username}`);
      loadAllData();
    } catch (err: any) {
      setLoginError(err.message || 'Demo administrator authentication failed');
      soundFX.wrong();
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadAllData();
    }
  }, [currentUser?.role]);

  useEffect(() => {
    if (currentUser?.role === 'admin' && activeTab === 'tables' && selectedTable) {
      loadCurrentTableRows(selectedTable);
    }
  }, [currentUser?.role, activeTab, selectedTable]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // User management handlers
  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      await api.updateAdminUser(editingUser.id, {
        role: editingUser.role,
        grade: editingUser.grade,
        stars: editingUser.stars,
        totalXP: editingUser.totalXP,
        level: editingUser.level
      });
      showNotification(`User @${editingUser.username} updated successfully`);
      setEditingUser(null);
      loadAllData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to remove user @${username}?`)) return;
    try {
      await api.deleteAdminUser(userId);
      showNotification(`User @${username} removed`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      loadAllData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Session deletion handler
  const handleDeleteSession = async (sessionId: string) => {
    try {
      await api.deleteAdminSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      showNotification('Session record deleted');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Worksheet Creation handler
  const handleCreateWorksheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsTitle.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const payload: Partial<WorksheetGame> = {
        title: newWsTitle.trim(),
        subject: newWsSubject,
        grade: newWsGrade,
        topic: 'Custom Challenge',
        description: newWsDesc.trim() || `Interactive ${newWsSubject} worksheet game for ${newWsGrade} students.`,
        iconEmoji: newWsEmoji || '⭐',
        difficulty: newWsDifficulty,
        gameType: 'interactive_worksheet',
        isPrintable: true,
        questionsCount: newWsQuestions.length,
        playsCount: 0,
        rating: 5.0,
        questions: newWsQuestions.map((q, idx) => ({
          id: `q_${Date.now()}_${idx}`,
          prompt: q.prompt,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }))
      };

      await api.createAdminWorksheet(payload);
      showNotification(`Worksheet "${newWsTitle}" published to game catalog!`);
      setShowCreateWorksheetModal(false);
      // Reset form
      setNewWsTitle('');
      setNewWsDesc('');
      loadAllData();
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteWorksheet = async (wsId: string, title: string) => {
    if (!window.confirm(`Delete worksheet "${title}"?`)) return;
    try {
      await api.deleteAdminWorksheet(wsId);
      setWorksheets(prev => prev.filter(w => w.id !== wsId));
      showNotification(`Worksheet "${title}" removed`);
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Custom Table creation handler
  const handleCreateTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) {
      setError('Table name is required');
      return;
    }

    try {
      const cols = newTableCols
        .split(',')
        .map(c => c.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_'))
        .filter(Boolean);

      const table = await api.createAdminTable(newTableName.trim(), newTableDesc.trim(), cols);
      showNotification(`Table "${table.name}" created and synced to database!`);
      setShowCreateTableModal(false);
      setNewTableName('');
      setNewTableDesc('');
      setSelectedTable(table.name);
      loadAllData();
      loadCurrentTableRows(table.name);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Add row to selected table
  const handleAddRow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.insertTableRow(selectedTable, newRowData);
      showNotification(`Row inserted into table "${selectedTable}"!`);
      setShowAddRowModal(false);
      setNewRowData({});
      loadCurrentTableRows(selectedTable);
      loadAllData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteRow = async (rowId: string) => {
    try {
      await api.deleteTableRow(selectedTable, rowId);
      setTableRows(prev => prev.filter(r => (r._id || r.id) !== rowId));
      showNotification('Row deleted');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Filtered views
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.grade.toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredWorksheets = worksheets.filter(w =>
    w.title.toLowerCase().includes(worksheetSearch.toLowerCase()) ||
    w.subject.toLowerCase().includes(worksheetSearch.toLowerCase()) ||
    w.grade.toLowerCase().includes(worksheetSearch.toLowerCase())
  );

  const filteredSessions = sessions.filter(s =>
    (s.username || '').toLowerCase().includes(sessionSearch.toLowerCase()) ||
    (s.worksheetTitle || '').toLowerCase().includes(sessionSearch.toLowerCase()) ||
    (s.subject || '').toLowerCase().includes(sessionSearch.toLowerCase())
  );

  // Selected table info
  const selectedTableMeta = customTables.find(t => t.name === selectedTable);
  const activeColumns = selectedTableMeta?.columns || (
    selectedTable === 'users' ? ['_id', 'username', 'role', 'grade', 'totalXP', 'stars', 'level'] :
    selectedTable === 'game_sessions' ? ['_id', 'username', 'worksheetTitle', 'subject', 'score', 'accuracy', 'completedAt'] :
    selectedTable === 'worksheets' ? ['_id', 'title', 'subject', 'grade', 'playsCount', 'rating'] :
    ['id', 'title', 'description', 'createdAt']
  );

  const isAdmin = currentUser && currentUser.role === 'admin';

  // If user is NOT an admin, render the dedicated Admin Login Panel Page
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-purple-500 selection:text-white">
        {/* Admin Gateway Top Bar */}
        <header className="bg-slate-950/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                id="admin-login-back-btn"
                onClick={handleExit}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all shadow-xs"
                title="Return to Kids Learning Portal"
              >
                <ArrowLeft className="w-4 h-4 text-purple-400" />
                <span>Return to Kids Portal</span>
              </button>
              <div className="h-5 w-px bg-slate-800 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold shadow-xs border border-purple-300 overflow-hidden p-0.5">
                  <img
                    src="/favicon.svg"
                    alt="onlineworksheetsforkidss logo"
                    className="w-full h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-base font-bold font-['Fredoka',sans-serif] text-white tracking-tight">
                  onlineworksheets<span className="text-purple-400">forkidss</span> <span className="text-xs bg-purple-900/60 text-purple-300 border border-purple-700/50 font-mono px-2 py-0.5 rounded-md ml-1 font-bold">ADMIN GATEWAY</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SECURE ACCESS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Center Login Panel */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Badge */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-purple-500/20 border-2 border-purple-400/40 p-1 overflow-hidden">
                  <img
                    src="/favicon.svg"
                    alt="onlineworksheetsforkidss favicon"
                    className="w-full h-full object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white font-['Fredoka',sans-serif]">
                  Admin Login Console
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Sign in to manage 1000+ interactive worksheets, curriculum, users, and database tables
                </p>
              </div>

              {/* Status banner if non-admin logged in */}
              {currentUser && currentUser.role !== 'admin' && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Student Account Detected:</span> Currently signed in as{' '}
                    <span className="underline font-mono">@{currentUser.username}</span>. Administrator credentials are required to enter the Admin Command Center.
                  </div>
                </div>
              )}

              {/* Error banner */}
              {loginError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                  <button onClick={() => setLoginError(null)} className="text-rose-400 hover:text-rose-200 font-bold">×</button>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Admin Username or Email
                  </label>
                  <div className="relative">
                    <input
                      id="admin-username-input"
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="admin or admin@wonderkids.edu"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                    />
                    <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Administrator Password
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Remember admin session</span>
                  </label>
                  <span
                    className="text-purple-400 hover:underline cursor-pointer font-semibold"
                    onClick={() => {
                      setLoginUsername('admin');
                      setLoginPassword('Admin@123');
                    }}
                  >
                    Use default
                  </span>
                </div>

                <button
                  id="admin-login-submit-btn"
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In to Admin Console</span>
                    </>
                  )}
                </button>
              </form>

              {/* Demo 1-Click Login Button */}
              <div className="pt-2">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-xs uppercase tracking-wider text-slate-500 font-mono">Quick Evaluation</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <button
                  id="admin-demo-login-btn"
                  type="button"
                  onClick={handleAdminDemoLogin}
                  disabled={loginLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/80 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>⚡ 1-Click Demo Admin Sign-In (Instant Access)</span>
                </button>
              </div>

              {/* Default credentials card */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 font-semibold">
                  <span>Pre-Configured Credentials:</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px] pt-1">
                  <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">USERNAME</span>
                    <span className="font-bold text-white">admin</span>
                  </div>
                  <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">PASSWORD</span>
                    <span className="font-bold text-white">Admin@123</span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>RBAC Access</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                  <span>MongoDB Atlas</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Encrypted Session</span>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Admin Dashboard - Full Page Layout (Not a pop-up modal)
  return (
    <div className="min-h-screen bg-[#F8F9FE] text-[#2D2A4A] flex flex-col selection:bg-purple-200">
      {/* Top Admin Page Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="admin-exit-btn"
              onClick={handleExit}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all shadow-xs"
              title="Return to Kids Learning Portal"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Exit to Kids Portal</span>
              <span className="sm:hidden">Exit</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20 border border-purple-300 overflow-hidden p-0.5">
                <img
                  src="/favicon.svg"
                  alt="onlineworksheetsforkidss"
                  className="w-full h-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Fredoka',sans-serif] font-bold text-base tracking-tight text-white">
                    onlineworksheets<span className="text-purple-400">forkidss</span> Admin
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    SUPER ADMIN
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] hidden md:block">
                  Curriculum Architecture & Database Engine Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="admin-refresh-button"
              onClick={loadAllData}
              disabled={loading}
              title="Refresh all records"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh Data</span>
            </button>

            <button
              id="admin-inspect-db-tables-btn"
              onClick={() => setActiveTab('tables')}
              title="View and manage database tables"
              className="px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 hover:text-purple-100 border border-purple-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">DB Tables</span>
            </button>

            {/* Admin User Chip */}
            {currentUser && (
              <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                <AvatarIcon avatarId={currentUser.avatar || 'owl'} size="sm" />
                <div className="text-left hidden sm:block">
                  <p className="font-bold text-white leading-tight text-xs">{currentUser.username}</p>
                  <p className="text-[10px] text-purple-400 leading-tight font-mono">Administrator</p>
                </div>
              </div>
            )}

            {/* Logout / Switch User */}
            {onSignOut && (
              <button
                id="admin-signout-btn"
                onClick={() => {
                  soundFX.pop();
                  onSignOut();
                }}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
                title="Sign Out of Admin Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-purple-100 overflow-hidden">
          {/* Admin Header Banner */}
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 text-white">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight">Admin Command Center</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    Full Control
                  </span>
                </div>
                <p className="text-purple-200 text-xs sm:text-sm mt-0.5">
                  Manage 1000+ interactive worksheets, monitor student progress, and create custom database tables.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                id="admin-return-portal-btn"
                onClick={handleExit}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all text-xs font-bold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-purple-200" />
                <span>Return to Kids Portal</span>
              </button>
            </div>
          </div>

        {/* Notifications & Error alerts */}
        {error && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-rose-700 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-rose-600 hover:text-rose-800 text-xs font-bold">Dismiss</button>
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-emerald-700 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 bg-slate-50/70 overflow-x-auto">
          <button
            id="admin-tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-purple-600'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            id="admin-tab-users"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-purple-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students & Users ({users.length})</span>
          </button>

          <button
            id="admin-tab-worksheets"
            onClick={() => setActiveTab('worksheets')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'worksheets'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-purple-600'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Worksheet Games ({worksheets.length} custom)</span>
          </button>

          <button
            id="admin-tab-tables"
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'tables'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-purple-600'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Custom Tables</span>
          </button>

          <button
            id="admin-tab-sessions"
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === 'sessions'
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-purple-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Game Logs ({sessions.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50/40">
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Highlights Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-purple-600 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.totalUsers ?? users.length}</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">Active Learners</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Games Played</span>
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.totalGamesPlayed ?? sessions.length}</div>
                  <div className="text-xs text-indigo-600 font-medium mt-1">Sessions Logged</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-amber-500 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Worksheets</span>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.totalWorksheets ?? '1,000+'}</div>
                  <div className="text-xs text-amber-600 font-medium mt-1">Curriculum Ready</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Accuracy</span>
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.avgAccuracy ?? 94}%</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">High Mastery</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-yellow-500 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stars Given</span>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.totalStarsAwarded ?? 240}</div>
                  <div className="text-xs text-yellow-600 font-medium mt-1">Rewards Claimed</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
                  <div className="flex items-center justify-between text-violet-600 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total XP</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{stats?.totalXpEarned ?? 4250}</div>
                  <div className="text-xs text-violet-600 font-medium mt-1">XP Distributed</div>
                </div>
              </div>

              {/* Subject Breakdown & Grade Level Spread */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject engagement */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Subject Play Engagement
                  </h3>
                  <div className="space-y-3">
                    {(stats?.subjectDistribution || [
                      { subject: 'Math', count: 12 },
                      { subject: 'Language Arts', count: 8 },
                      { subject: 'Science', count: 6 },
                      { subject: 'Typing', count: 9 },
                      { subject: 'Logic & Puzzles', count: 5 },
                      { subject: 'Creative Arts', count: 3 }
                    ]).map(item => {
                      const max = Math.max(...(stats?.subjectDistribution || []).map(s => s.count), 10);
                      const pct = Math.min(100, Math.round((item.count / max) * 100));
                      return (
                        <div key={item.subject}>
                          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                            <span>{item.subject}</span>
                            <span>{item.count} sessions</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(pct, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Platform Actions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Quick Admin Actions
                    </h3>
                    <p className="text-slate-500 text-xs mb-5">
                      Fast shortcuts to expand educational content and manage custom datasets.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        id="admin-quick-new-worksheet"
                        onClick={() => {
                          setActiveTab('worksheets');
                          setShowCreateWorksheetModal(true);
                        }}
                        className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-800 font-semibold text-xs flex items-center gap-2.5 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Create Worksheet</div>
                          <div className="text-[11px] text-purple-600 font-normal">Add interactive game</div>
                        </div>
                      </button>

                      <button
                        id="admin-quick-new-table"
                        onClick={() => {
                          setActiveTab('tables');
                          setShowCreateTableModal(true);
                        }}
                        className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 font-semibold text-xs flex items-center gap-2.5 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <FolderPlus className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Create New Table</div>
                          <div className="text-[11px] text-indigo-600 font-normal">Custom schema & records</div>
                        </div>
                      </button>

                      <button
                        id="admin-quick-view-tables"
                        onClick={() => setActiveTab('tables')}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-2.5 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div>Database Inspector</div>
                          <div className="text-[11px] text-slate-500 font-normal">View Atlas collections</div>
                        </div>
                      </button>

                      <button
                        id="admin-quick-view-users"
                        onClick={() => setActiveTab('users')}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-2.5 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div>User Accounts</div>
                          <div className="text-[11px] text-slate-500 font-normal">Promote or edit kids</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Logged in as <strong>{currentUser?.username || 'Admin'}</strong> with full privileges. Changes update immediately in the database.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS & USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="admin-user-search"
                    type="text"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    placeholder="Search users by name, role, grade..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  Showing <strong>{filteredUsers.length}</strong> of {users.length} accounts
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Student / User</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Grade</th>
                        <th className="py-3 px-4">Level & XP</th>
                        <th className="py-3 px-4">Stars</th>
                        <th className="py-3 px-4">Badges</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-400">
                            No users matched your search filter.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map(user => (
                          <tr key={user.id || user._id} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm shadow-inner">
                                  {user.avatar === 'lion' ? '🦁' :
                                   user.avatar === 'dino' ? '🦖' :
                                   user.avatar === 'unicorn' ? '🦄' :
                                   user.avatar === 'astronaut' ? '🚀' :
                                   user.avatar === 'fox' ? '🦊' :
                                   user.avatar === 'robot' ? '🤖' : '⭐'}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">{user.username}</div>
                                  <div className="text-[10px] text-slate-400">{user.id || user._id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                    : user.role === 'teacher'
                                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {user.role || 'student'}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-700">{user.grade}</td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-800">Lvl {user.level || 1}</div>
                              <div className="text-[10px] text-purple-600 font-semibold">{user.totalXP || 0} XP</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 font-bold text-amber-600">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{user.stars || 0}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-700">{(user.badges || []).length} badges</span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  id={`edit-user-${user.id}`}
                                  onClick={() => setEditingUser({ ...user })}
                                  className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                                  title="Edit role, grade, and stars"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  id={`delete-user-${user.id}`}
                                  onClick={() => handleDeleteUser(user.id || (user as any)._id, user.username)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                                  title="Delete user"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKSHEET GAMES MANAGER */}
          {activeTab === 'worksheets' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="admin-worksheet-search"
                    type="text"
                    value={worksheetSearch}
                    onChange={e => setWorksheetSearch(e.target.value)}
                    placeholder="Search custom worksheets by title, subject, grade..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
                  />
                </div>
                <button
                  id="admin-create-worksheet-button"
                  onClick={() => setShowCreateWorksheetModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create New Worksheet Game</span>
                </button>
              </div>

              {worksheets.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No Custom Worksheets Created Yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    The platform currently runs 1,000+ pre-seeded interactive worksheet games. Click the button below to create your own custom educational games!
                  </p>
                  <button
                    onClick={() => setShowCreateWorksheetModal(true)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all"
                  >
                    + Create First Custom Game
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorksheets.map(ws => (
                    <div key={ws.id} className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{ws.iconEmoji || '⭐'}</span>
                            <div>
                              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10px] uppercase">
                                {ws.subject}
                              </span>
                              <span className="ml-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[10px]">
                                {ws.grade}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteWorksheet(ws.id, ws.title)}
                            className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                            title="Delete worksheet"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">{ws.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ws.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{ws.questionsCount || (ws.questions || []).length} Questions</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          {ws.rating || '5.0'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DATABASE & CUSTOM TABLES (CREATE NEW TABLE & STORE DATA) */}
          {activeTab === 'tables' && (
            <div className="space-y-6">
              {/* Tables selector & action bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-purple-600" />
                    Select Table:
                  </span>
                  {/* Default collections */}
                  {['users', 'game_sessions', 'worksheets', ...customTables.map(t => t.name)].map(tbl => (
                    <button
                      key={tbl}
                      id={`select-table-${tbl}`}
                      onClick={() => setSelectedTable(tbl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedTable === tbl
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tbl}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    id="admin-create-custom-table-button"
                    onClick={() => setShowCreateTableModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>+ Create New Table</span>
                  </button>
                  <button
                    id="admin-add-row-button"
                    onClick={() => {
                      setNewRowData({});
                      setShowAddRowModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Record</span>
                  </button>
                </div>
              </div>

              {/* Table Data View */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm capitalize">
                        Table: <span className="text-purple-600 font-mono">{selectedTable}</span>
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                        {tableRows.length} rows loaded
                      </span>
                    </div>
                    {selectedTableMeta?.description && (
                      <p className="text-xs text-slate-500 mt-0.5">{selectedTableMeta.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => loadCurrentTableRows(selectedTable)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
                    title="Reload rows"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingRows ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="overflow-x-auto max-h-96">
                  {loadingRows ? (
                    <div className="p-8 text-center text-xs text-slate-400">Loading table records...</div>
                  ) : tableRows.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No records found in table "{selectedTable}". Click <strong>"+ Add Record"</strong> to insert new rows.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[10px] sticky top-0">
                        <tr>
                          {activeColumns.map(col => (
                            <th key={col} className="py-2.5 px-3 whitespace-nowrap">{col}</th>
                          ))}
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {tableRows.map((row, idx) => (
                          <tr key={row._id || row.id || idx} className="hover:bg-purple-50/20 transition-colors">
                            {activeColumns.map(col => (
                              <td key={col} className="py-2 px-3 whitespace-nowrap max-w-xs truncate">
                                {typeof row[col] === 'object'
                                  ? JSON.stringify(row[col])
                                  : String(row[col] !== undefined ? row[col] : '-')}
                              </td>
                            ))}
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => handleDeleteRow(row._id || row.id)}
                                className="text-rose-500 hover:bg-rose-50 p-1 rounded transition-colors"
                                title="Delete row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GAME SESSIONS & AUDIT LOGS */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="admin-session-search"
                    type="text"
                    value={sessionSearch}
                    onChange={e => setSessionSearch(e.target.value)}
                    placeholder="Search game sessions by student, worksheet title, subject..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50/50"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  Showing <strong>{filteredSessions.length}</strong> logged game plays
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 sticky top-0">
                      <tr>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Worksheet Game</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Accuracy</th>
                        <th className="py-3 px-4">Rewards Earned</th>
                        <th className="py-3 px-4">Completed At</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSessions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-400">
                            No game session logs recorded yet. Play games on the catalog to generate live activity.
                          </td>
                        </tr>
                      ) : (
                        filteredSessions.map(session => (
                          <tr key={session.id || session._id} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {session.username || 'Student'}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-700">
                              {session.worksheetTitle || 'Game'}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10px]">
                                {session.subject}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold">
                              <span
                                className={
                                  (session.accuracy || 0) >= 90
                                    ? 'text-emerald-600'
                                    : (session.accuracy || 0) >= 70
                                    ? 'text-amber-600'
                                    : 'text-rose-600'
                                }
                              >
                                {session.accuracy || 0}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-amber-400" /> +{session.starsEarned || 0}
                                </span>
                                <span className="text-purple-600 font-semibold text-[10px]">
                                  +{session.xpEarned || 0} XP
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-400 text-[11px]">
                              {session.completedAt ? new Date(session.completedAt).toLocaleString() : 'Just now'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDeleteSession(session.id || (session as any)._id)}
                                className="p-1 rounded text-rose-500 hover:bg-rose-50"
                                title="Delete session log"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MongoDB Atlas / Persistent Storage Live</span>
          </div>
          <button
            id="admin-bottom-exit-btn"
            onClick={handleExit}
            className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold transition-colors flex items-center gap-1.5 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Kids Learning Portal</span>
          </button>
        </div>
      </div>

      {/* SUB-MODAL 1: CREATE NEW WORKSHEET GAME */}
      {showCreateWorksheetModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-scale-up">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Publish New Interactive Worksheet Game</h3>
                  <p className="text-xs text-slate-500">Creates a playable worksheet game with real-time scoring.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateWorksheetModal(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorksheet} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Game Title *</label>
                  <input
                    id="new-ws-title"
                    type="text"
                    required
                    value={newWsTitle}
                    onChange={e => setNewWsTitle(e.target.value)}
                    placeholder="e.g. Space Math: Planet Multiplication"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Emoji Icon</label>
                  <input
                    id="new-ws-emoji"
                    type="text"
                    value={newWsEmoji}
                    onChange={e => setNewWsEmoji(e.target.value)}
                    placeholder="🚀"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden text-center text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    id="new-ws-subject"
                    value={newWsSubject}
                    onChange={e => setNewWsSubject(e.target.value as Subject)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="Math">Math</option>
                    <option value="Language Arts">Language Arts</option>
                    <option value="Science">Science</option>
                    <option value="Typing">Typing</option>
                    <option value="Logic & Puzzles">Logic & Puzzles</option>
                    <option value="Creative Arts">Creative Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Grade</label>
                  <select
                    id="new-ws-grade"
                    value={newWsGrade}
                    onChange={e => setNewWsGrade(e.target.value as GradeLevel)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="Pre-K">Pre-K</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="1st Grade">1st Grade</option>
                    <option value="2nd Grade">2nd Grade</option>
                    <option value="3rd Grade">3rd Grade</option>
                    <option value="4th Grade">4th Grade</option>
                    <option value="5th Grade">5th Grade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    id="new-ws-difficulty"
                    value={newWsDifficulty}
                    onChange={e => setNewWsDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  >
                    <option value="easy">Easy (Friendly)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="hard">Hard (Challenge)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  id="new-ws-desc"
                  rows={2}
                  value={newWsDesc}
                  onChange={e => setNewWsDesc(e.target.value)}
                  placeholder="Explain what skills students will learn in this worksheet game..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              {/* Questions Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Interactive Questions ({newWsQuestions.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setNewWsQuestions(prev => [
                        ...prev,
                        {
                          prompt: 'New Question Prompt',
                          options: ['Option A', 'Option B', 'Option C', 'Option D'],
                          correctAnswer: 'Option A',
                          explanation: 'Explain why Option A is correct.'
                        }
                      ])
                    }
                    className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Question
                  </button>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {newWsQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-700">Question {idx + 1}</span>
                        {newWsQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setNewWsQuestions(prev => prev.filter((_, i) => i !== idx))}
                            className="text-rose-500 hover:text-rose-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={q.prompt}
                        onChange={e => {
                          const updated = [...newWsQuestions];
                          updated[idx].prompt = e.target.value;
                          setNewWsQuestions(updated);
                        }}
                        placeholder="Question prompt..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500 font-semibold">Options (comma separated)</span>
                          <input
                            type="text"
                            value={q.options.join(', ')}
                            onChange={e => {
                              const updated = [...newWsQuestions];
                              updated[idx].options = e.target.value.split(',').map(s => s.trim());
                              setNewWsQuestions(updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-semibold">Correct Answer (exact text)</span>
                          <input
                            type="text"
                            value={q.correctAnswer}
                            onChange={e => {
                              const updated = [...newWsQuestions];
                              updated[idx].correctAnswer = e.target.value.trim();
                              setNewWsQuestions(updated);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white font-bold text-emerald-700"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateWorksheetModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  id="admin-save-worksheet-submit"
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs"
                >
                  Publish Worksheet Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL 2: CREATE NEW CUSTOM TABLE IN DATABASE */}
      {showCreateTableModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 w-full max-w-lg p-6 animate-scale-up">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Create New Database Table</h3>
                  <p className="text-xs text-slate-500">Defines a new collection in MongoDB / local database.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateTableModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTable} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Table Name *</label>
                <input
                  id="new-table-name"
                  type="text"
                  required
                  value={newTableName}
                  onChange={e => setNewTableName(e.target.value)}
                  placeholder="e.g. curriculum_badges, classroom_rosters, rewards"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">Letters, numbers, and underscores only.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <input
                  id="new-table-desc"
                  type="text"
                  value={newTableDesc}
                  onChange={e => setNewTableDesc(e.target.value)}
                  placeholder="e.g. School district curriculum milestones & rubrics"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Custom Columns (comma separated) *</label>
                <input
                  id="new-table-cols"
                  type="text"
                  required
                  value={newTableCols}
                  onChange={e => setNewTableCols(e.target.value)}
                  placeholder="title, category, standard_code, points, status"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateTableModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  id="admin-create-table-submit"
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Create Table in Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL 3: ADD RECORD INTO TABLE */}
      {showAddRowModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-md p-6 animate-scale-up">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Insert Record into "{selectedTable}"</h3>
                  <p className="text-xs text-slate-500">Stores structured row data in database.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddRowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRow} className="space-y-3 text-xs">
              {activeColumns.filter(c => c !== '_id' && c !== 'id' && c !== 'createdAt').map(col => (
                <div key={col}>
                  <label className="block font-bold text-slate-700 mb-1 capitalize">{col}</label>
                  <input
                    type="text"
                    value={newRowData[col] || ''}
                    onChange={e => setNewRowData({ ...newRowData, [col]: e.target.value })}
                    placeholder={`Enter ${col}...`}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddRowModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  id="admin-insert-row-submit"
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Insert Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL 4: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 w-full max-w-md p-6 animate-scale-up">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">Edit User @{editingUser.username}</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Role</label>
                <select
                  id="edit-user-role"
                  value={editingUser.role}
                  onChange={e => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grade</label>
                <select
                  id="edit-user-grade"
                  value={editingUser.grade}
                  onChange={e => setEditingUser({ ...editingUser, grade: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value="Pre-K">Pre-K</option>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="1st Grade">1st Grade</option>
                  <option value="2nd Grade">2nd Grade</option>
                  <option value="3rd Grade">3rd Grade</option>
                  <option value="4th Grade">4th Grade</option>
                  <option value="5th Grade">5th Grade</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Stars</label>
                  <input
                    type="number"
                    value={editingUser.stars || 0}
                    onChange={e => setEditingUser({ ...editingUser, stars: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total XP</label>
                  <input
                    type="number"
                    value={editingUser.totalXP || 0}
                    onChange={e => setEditingUser({ ...editingUser, totalXP: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  id="admin-save-user-submit"
                  type="button"
                  onClick={handleSaveUser}
                  className="px-5 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>

      {/* Admin Page Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 onlineworksheetsforkidss • Administrative Control Center</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleExit}
              className="text-purple-700 hover:text-purple-900 font-bold hover:underline"
            >
              ← Return to Student & Kids Learning Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const AdminPage = AdminPanel;

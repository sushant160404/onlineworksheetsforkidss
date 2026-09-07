import { UserProfile, GameSessionRecord, UserStats, LeaderboardEntry, MongoStatusResponse, AdminStats, CustomTableInfo, WorksheetGame } from '../types';

const TOKEN_KEY = 'wonderkids_token';

// Base URL of the backend API. Empty string keeps requests relative
// (works with the dev proxy or a same-origin production deployment).
// Set VITE_API_URL when the frontend and backend are hosted on different origins.
const API_BASE: string = (import.meta as any).env?.VITE_API_URL || '';

export const api = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  async getHealth() {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.json();
  },

  async getDbStatus(): Promise<MongoStatusResponse> {
    const res = await fetch(`${API_BASE}/api/db/status`);
    if (!res.ok) throw new Error('Failed to fetch DB status');
    return res.json();
  },

  async getTableRows(tableName: string) {
    const res = await fetch(`${API_BASE}/api/db/tables/${tableName}`);
    if (!res.ok) throw new Error('Failed to fetch table data');
    return res.json();
  },

  async seedDatabase() {
    const res = await fetch(`${API_BASE}/api/db/seed`, { method: 'POST' });
    return res.json();
  },

  async register(params: { username: string; password: string; grade: string; avatar: string; role: string }): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async login(params: { username: string; password: string }): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async guestLogin(): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/api/auth/guest`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Guest login failed');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async adminLogin(params: { username: string; password: string }): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Admin authentication failed');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async adminDemoLogin(): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/api/auth/admin-demo`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Admin demo authentication failed');
    if (data.token) this.setToken(data.token);
    return data;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        this.clearToken();
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  async recordGame(record: {
    userId: string;
    worksheetId: string;
    worksheetTitle: string;
    subject: string;
    grade: string;
    score: number;
    maxScore: number;
    accuracy: number;
    timeSpentSec: number;
  }): Promise<{ success: boolean; session: GameSessionRecord; rewards: { xpEarned: number; starsEarned: number; newLevel: number; newBadges: string[] } }> {
    const res = await fetch(`${API_BASE}/api/games/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to record game session');
    }
    return res.json();
  },

  async getProgress(userId: string): Promise<UserStats> {
    const res = await fetch(`${API_BASE}/api/progress/${userId}`);
    if (!res.ok) throw new Error('Failed to load user progress');
    return res.json();
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const res = await fetch(`${API_BASE}/api/leaderboard`);
    if (!res.ok) throw new Error('Failed to load leaderboard');
    const data = await res.json();
    return data.leaderboard || [];
  },

  // Admin Panel APIs
  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/api/admin/stats`);
    if (!res.ok) throw new Error('Failed to load admin stats');
    return res.json();
  },

  async getAdminUsers(): Promise<UserProfile[]> {
    const res = await fetch(`${API_BASE}/api/admin/users`);
    if (!res.ok) throw new Error('Failed to load users');
    const data = await res.json();
    return data.users || [];
  },

  async updateAdminUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update user');
    }
    const data = await res.json();
    return data.user;
  },

  async deleteAdminUser(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/users/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete user');
    }
  },

  async getAdminSessions(limit = 100): Promise<GameSessionRecord[]> {
    const res = await fetch(`${API_BASE}/api/admin/sessions?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to load sessions');
    const data = await res.json();
    return data.sessions || [];
  },

  async deleteAdminSession(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/sessions/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete session');
  },

  async getCustomWorksheets(): Promise<WorksheetGame[]> {
    try {
      const res = await fetch(`${API_BASE}/api/worksheets`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.worksheets || [];
    } catch {
      return [];
    }
  },

  async getAdminWorksheets(): Promise<WorksheetGame[]> {
    const res = await fetch(`${API_BASE}/api/admin/worksheets`);
    if (!res.ok) throw new Error('Failed to load custom worksheets');
    const data = await res.json();
    return data.worksheets || [];
  },

  async createAdminWorksheet(worksheet: Partial<WorksheetGame>): Promise<WorksheetGame> {
    const res = await fetch(`${API_BASE}/api/admin/worksheets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(worksheet)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create worksheet');
    }
    const data = await res.json();
    return data.worksheet;
  },

  async updateAdminWorksheet(id: string, worksheet: Partial<WorksheetGame>): Promise<WorksheetGame> {
    const res = await fetch(`${API_BASE}/api/admin/worksheets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(worksheet)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update worksheet');
    }
    const data = await res.json();
    return data.worksheet;
  },

  async deleteAdminWorksheet(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/worksheets/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete worksheet');
  },

  async getAdminTables(): Promise<CustomTableInfo[]> {
    const res = await fetch(`${API_BASE}/api/admin/tables`);
    if (!res.ok) throw new Error('Failed to load custom tables');
    const data = await res.json();
    return data.tables || [];
  },

  async createAdminTable(name: string, description: string, columns: string[]): Promise<CustomTableInfo> {
    const res = await fetch(`${API_BASE}/api/admin/tables/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, columns })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create table');
    }
    const data = await res.json();
    return data.table;
  },

  async insertTableRow(tableName: string, rowData: any): Promise<any> {
    const res = await fetch(`${API_BASE}/api/admin/tables/${tableName}/rows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rowData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to insert row');
    }
    const data = await res.json();
    return data.row;
  },

  async deleteTableRow(tableName: string, rowId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/tables/${tableName}/rows/${rowId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete table row');
  }
};

import React, { useState, useEffect } from 'react';
import { MongoStatusResponse } from '../types';
import { api } from '../services/api';
import { Database, Server, RefreshCw, CheckCircle2, AlertCircle, Table, PlusCircle, ExternalLink, ShieldCheck } from 'lucide-react';

interface DatabaseStatusModalProps {
  onClose: () => void;
}

export const DatabaseStatusModal: React.FC<DatabaseStatusModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState<MongoStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableData, setTableData] = useState<{ rows: any[]; count: number } | null>(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetchTableData(selectedTable);
    }
  }, [selectedTable]);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await api.getDbStatus();
      setStatus(data);
    } catch (err) {
      console.error('Failed to get DB status:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTableData = async (table: string) => {
    setLoadingTable(true);
    try {
      const data = await api.getTableRows(table);
      setTableData(data);
    } catch (err) {
      console.error('Failed to get table data:', err);
    } finally {
      setLoadingTable(false);
    }
  };

  const handleSeed = async () => {
    try {
      setSeedMessage('Seeding sample student players and sessions...');
      const res = await api.seedDatabase();
      setSeedMessage(res.message || 'Seeded successfully!');
      fetchStatus();
      fetchTableData(selectedTable);
      setTimeout(() => setSeedMessage(''), 4000);
    } catch (err: any) {
      setSeedMessage('Failed: ' + err.message);
    }
  };

  return (
    <div id="database-status-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl font-bold">
              🍃
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg font-['Fredoka',sans-serif]">MongoDB Atlas & Backend Storage</h3>
                {status?.connected ? (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Atlas Connected
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active (Persistent Store)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Database: <span className="text-slate-200 font-semibold">{status?.databaseName || 'wonderkids_education'}</span> • Port: 3000
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchStatus}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
          {/* Status Alert */}
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            status?.connected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-white border-slate-200 text-slate-800 shadow-xs'
          }`}>
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {status?.connected
                  ? 'MongoDB Atlas Cluster Live & Healthy'
                  : 'Backend Document Store Active (Zero-Setup Ready)'}
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                {status?.message}
              </p>
              {!status?.connectionUriConfigured && (
                <p className="text-slate-500 text-[11px] mt-1 bg-slate-100 p-2 rounded-lg font-mono">
                  Tip: To link your own live MongoDB Atlas cluster, set <strong className="text-slate-800">MONGODB_URI</strong> in your environment secrets.
                </p>
              )}
            </div>
          </div>

          {/* Seed button */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h4 className="font-bold text-sm text-slate-900">Seed Demo Data</h4>
              <p className="text-xs text-slate-500">Insert sample student profiles, stars, and game session logs to test tables.</p>
              {seedMessage && <p className="text-xs font-bold text-purple-700 mt-1">{seedMessage}</p>}
            </div>
            <button
              id="seed-database-btn"
              onClick={handleSeed}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Seed Sample Data</span>
            </button>
          </div>

          {/* Collections / Tables Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Table className="w-4 h-4 text-purple-600" />
                <span>MongoDB Collections / Tables</span>
              </h4>
              <span className="text-xs text-slate-500">Click a table to inspect live rows</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {(status?.collections || []).map(col => (
                <button
                  key={col.name}
                  onClick={() => setSelectedTable(col.name)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedTable === col.name
                      ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold font-mono truncate">{col.name}</p>
                  <p className="text-lg font-black text-slate-900 font-['Fredoka',sans-serif] mt-0.5">
                    {col.count} <span className="text-[10px] font-normal text-slate-500">rows</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Table Data Viewer */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Collection: <code className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">{selectedTable}</code> ({tableData?.count || 0} items)</span>
              <span>JSON Document Viewer</span>
            </div>

            <div className="p-4 max-h-72 overflow-y-auto font-mono text-xs text-slate-800 bg-slate-950 text-emerald-400">
              {loadingTable ? (
                <div className="py-8 text-center text-slate-400">Loading collection documents...</div>
              ) : tableData?.rows && tableData.rows.length > 0 ? (
                <pre className="whitespace-pre-wrap">{JSON.stringify(tableData.rows, null, 2)}</pre>
              ) : (
                <div className="py-8 text-center text-slate-400">No documents in this collection yet. Play a game to record the first row!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

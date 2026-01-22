'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getHistory, deleteHistoryEntry, clearHistory, formatDate, HistoryEntry } from '@/lib/history';

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getHistory();
    setHistory(data.reverse()); // Show newest first
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(history.filter(entry => entry.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all history? This cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleViewDetails = (entry: HistoryEntry) => {
    sessionStorage.setItem('historyDetail', JSON.stringify(entry));
    router.push('/history/detail');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12 pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              Financial History
            </h1>
            <p className="text-slate-400">Track your financial journey over time</p>
          </div>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-slate-300 mb-2">No History Yet</h2>
            <p className="text-slate-500 mb-8">Run your first financial analysis to start building history</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
            >
              Start Analysis
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-400">{history.length} analysis{history.length !== 1 ? 'es' : ''}</p>
              {history.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/30 hover:bg-red-500/20 transition-all"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid gap-4">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => handleViewDetails(entry)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-slate-500">{formatDate(entry.date)}</p>
                      <p className="text-slate-300 font-medium capitalize">Goal: {entry.goal}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry.id);
                      }}
                      className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Income</p>
                      <p className="text-lg font-bold text-blue-400">${entry.income}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Expenses</p>
                      <p className="text-lg font-bold text-orange-400">${Object.values(entry.expenses).reduce((a, b) => a + b, 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Savings</p>
                      <p className={`text-lg font-bold ${entry.savings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ${entry.savings}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Categories</p>
                      <p className="text-lg font-bold text-slate-300">{Object.keys(entry.expenses).length}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                    {entry.analysis.split('\n')[0]}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

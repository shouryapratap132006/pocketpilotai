'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HistoryEntry, formatDate } from '@/lib/history';

export default function HistoryDetailPage() {
  const router = useRouter();
  const [entry, setEntry] = useState<HistoryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawData = sessionStorage.getItem('historyDetail');
    if (rawData) {
      setEntry(JSON.parse(rawData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white pt-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12 pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Entry not found</h1>
          <Link href="/history" className="text-blue-400 hover:text-blue-300">
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  const totalExpenses = Object.values(entry.expenses).reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-slate-500 mb-2">{formatDate(entry.date)}</p>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Financial Analysis
            </h1>
          </div>
          <Link
            href="/history"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <p className="text-sm text-slate-500 uppercase mb-2">Monthly Income</p>
            <p className="text-3xl font-bold text-blue-400">${entry.income}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <p className="text-sm text-slate-500 uppercase mb-2">Total Expenses</p>
            <p className="text-3xl font-bold text-orange-400">${totalExpenses}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <p className="text-sm text-slate-500 uppercase mb-2">Monthly Savings</p>
            <p className={`text-3xl font-bold ${entry.savings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${entry.savings}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <p className="text-sm text-slate-500 uppercase mb-2">Goal</p>
            <p className="text-lg font-bold text-slate-300 capitalize">{entry.goal}</p>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(entry.expenses)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: '100%',
                        maxWidth: `${(amount / entry.income) * 100}%`,
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                      }}
                    ></div>
                    <span className="text-slate-300 capitalize min-w-32">{category}</span>
                  </div>
                  <span className="text-slate-400 font-mono">${amount}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Budget Analysis</h2>
          <div className="text-sm font-mono text-slate-400 whitespace-pre-wrap leading-relaxed">
            {entry.analysis}
          </div>
        </div>

        {/* Advice */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Financial Advice</h2>
          <div className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">
            {entry.advice}
          </div>
        </div>

        {/* Savings Plan */}
        {entry.savings_plan && (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Savings Plan</h2>
            <div className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">
              {entry.savings_plan}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors font-medium"
          >
            New Analysis
          </button>
          <Link
            href="/history"
            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-medium text-center"
          >
            Back to History
          </Link>
        </div>
      </div>
    </main>
  );
}

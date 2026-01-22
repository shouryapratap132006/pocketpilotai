'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitFinanceData } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [income, setIncome] = useState<string>('');
  const [goal, setGoal] = useState<string>('emergency fund');
  const [expenses, setExpenses] = useState<{ category: string; amount: string }[]>([
    { category: 'rent', amount: '' },
    { category: 'food', amount: '' },
  ]);
  const [loading, setLoading] = useState(false);

  const addExpense = () => {
    setExpenses([...expenses, { category: '', amount: '' }]);
  };

  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const updateExpense = (index: number, field: 'category' | 'amount', value: string) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const expenseMap: Record<string, number> = {};
    expenses.forEach((exp) => {
      if (exp.category && exp.amount) {
        expenseMap[exp.category] = parseInt(exp.amount);
      }
    });

    const data = {
      income: parseInt(income),
      goal,
      expenses: expenseMap,
    };

    // Store data in localStorage/sessionStorage to pass to result page for simplicity (stateless backend)
    sessionStorage.setItem('financeRequest', JSON.stringify(data));
    router.push('/result');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            PocketPilot AI
          </h1>
          <p className="text-slate-400">Your intelligent partner for financial clarity.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Income Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Monthly Income ($)</label>
            <input
              type="number"
              required
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
            />
          </div>

          {/* Goal Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Financial Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="saving">Saving for a purchase</option>
              <option value="emergency fund">Build Emergency Fund</option>
              <option value="expense control">Control Monthly Expenses</option>
            </select>
          </div>

          {/* Expenses Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-slate-300">Monthly Expenses</label>
              <button
                type="button"
                onClick={addExpense}
                className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-all"
              >
                + Add Category
              </button>
            </div>

            <div className="space-y-3">
              {expenses.map((exp, index) => (
                <div key={index} className="flex gap-3 group animate-in fade-in slide-in-from-top-1">
                  <input
                    type="text"
                    required
                    placeholder="Rent, Food, etc."
                    value={exp.category}
                    onChange={(e) => updateExpense(index, 'category', e.target.value)}
                    className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Amount"
                    value={exp.amount}
                    onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                    className="w-24 md:w-32 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                  />
                  {expenses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExpense(index)}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Analyzing your profile...' : 'Generate AI Copilot Analysis'}
          </button>
        </form>

        <footer className="mt-8 text-center text-[10px] text-slate-500 uppercase tracking-widest">
          Production Quality • LangGraph Powered • Educational Tool
        </footer>
      </div>
    </main>
  );
}

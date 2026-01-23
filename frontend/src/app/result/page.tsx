'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitFinanceData, FinanceResponse, FinanceRequest } from '@/lib/api';
import { saveToHistory } from '@/lib/history';

export default function ResultPage() {
    const router = useRouter();
    const [result, setResult] = useState<FinanceResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const rawData = sessionStorage.getItem('financeRequest');
        if (!rawData) {
            router.push('/');
            return;
        }

        const fetchData = async () => {
            try {
                const data: FinanceRequest = JSON.parse(rawData);
                const response = await submitFinanceData(data);
                setResult(response);
                
                // Save to history
                saveToHistory({
                    income: data.income,
                    expenses: data.expenses,
                    goal: data.goal,
                    savings: response.savings,
                    analysis: response.analysis,
                    advice: response.advice,
                    savings_plan: response.savings_plan,
                });
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white pt-32">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 animate-pulse">Consulting PocketPilot AI...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white p-6 pt-32">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-12" style={{ paddingTop: '100px' }}>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Edit
                    </button>
                    <div className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase tracking-tighter">
                        LangGraph Session: {Math.random().toString(36).substring(7)}
                    </div>
                </div>

                <header className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        PocketPilot Insights
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Summary Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-slate-300 mb-4">Budget Health</h3>
                            <div className={`text-4xl font-bold font-mono mb-2 ${result!.savings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                ${result!.savings}
                            </div>
                            <p className="text-sm text-slate-500 uppercase font-medium">Monthly Savings</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-slate-300 mb-4">Analysis</h3>
                            <div className="text-sm font-mono text-slate-400 whitespace-pre-wrap leading-relaxed">
                                {result!.analysis}
                            </div>
                        </div>
                    </div>

                    {/* Advice/Plan Card */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-100">AI Financial Guidance</h3>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed space-y-4">
                                    {result!.advice}
                                </div>
                            </div>

                            {result!.savings_plan && (
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Personalized Savings Plan</h4>
                                    <div className="text-slate-400 whitespace-pre-wrap text-sm italic">
                                        {result!.savings_plan}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

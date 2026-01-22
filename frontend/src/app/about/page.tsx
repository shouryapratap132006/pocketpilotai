'use client';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 p-6 md:p-12"style={{ paddingTop: '100px' }}>
            <div className="max-w-3xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                        How PocketPilot AI Works
                    </h1>
                    <p className="text-slate-400 text-lg">Built with LangGraph state machines for precision and reliability.</p>
                </header>

                <div className="space-y-12">
                    <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm font-mono text-blue-300">01</span>
                            Structured Reasoning
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Unlike traditional AI that provides a single response, our copilot uses a <strong>LangGraph State Machine</strong>. This ensures the AI follows a strict logical flow:
                        </p>
                        <div className="bg-slate-950/50 p-6 rounded-2xl font-mono text-sm border border-slate-800 text-slate-400">
                            <div className="flex items-center gap-4">
                                <span className="text-emerald-500">INIT</span>
                                <span>→</span>
                                <span className="text-blue-400">Analyze Budget</span>
                                <span>→</span>
                                <span className="text-yellow-400">Check Overspending</span>
                                <span>→</span>
                                <span className="text-purple-400">Route Logic</span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-sm font-mono text-emerald-300">02</span>
                            Dynamic Routing
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            If the system detects you are spending more than you earn, it automatically routes to a <strong>Reduction Strategy</strong> node. If you have a surplus, it routes to a <strong>Goal Optimization</strong> node. This prevents generic advice and ensures the guidance is tailored to your specific situation.
                        </p>
                    </section>

                    <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm font-mono text-white">03</span>
                            Safety First
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            Our AI is strictly limited to <strong>educational financial guidance</strong>. We have implemented guardrails to ensure it never suggests specific stocks, trading platforms, or high-risk investments.
                        </p>
                    </section>
                </div>

                <footer className="mt-20 text-center text-slate-500 text-sm">
                    Technical Stack: FastAPI, LangGraph, Gemini 1.5 Flash, Next.js, Tailwind CSS
                </footer>
            </div>
        </main>
    );
}

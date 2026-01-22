'use client';

export default function EducationPage() {
    const tips = [
        {
            title: 'The 50/30/20 Rule',
            content: 'A simple budgeting method: spend 50% on needs, 30% on wants, and put 20% toward savings or debt.',
            icon: '📊',
        },
        {
            title: 'Emergency Fund 101',
            content: 'Aim to save 3-6 months of essential living expenses. This acts as a financial shock absorber.',
            icon: '🛡️',
        },
        {
            title: 'The Latte Factor',
            content: 'Small, recurring daily expenses (like coffee) can add up to huge amounts over years if invested instead.',
            icon: '☕',
        },
        {
            title: 'High-Interest Debt',
            content: 'Always prioritize paying off debt with interest rates above 7-8% before aggressive long-term saving.',
            icon: '💸',
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 p-6 md:p-12 "style={{ paddingTop: '100px' }}>
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                        Financial Wisdom
                    </h1>
                    <p className="text-slate-400 text-lg">Mastering your money starts with understanding these core concepts.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
                        >
                            <div className="text-4xl mb-6">{tip.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {tip.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{tip.content}</p>
                        </div>
                    ))}
                </div>

                <section className="mt-20 bg-blue-500/10 border border-blue-500/20 p-8 rounded-3xl text-center">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Ready to analyze your own?</h2>
                    <p className="text-slate-300 mb-6">Use PocketPilot AI to get personalized advice based on these principles.</p>
                    <a
                        href="/"
                        className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
                    >
                        Start Analysis
                    </a>
                </section>
            </div>
        </main>
    );
}

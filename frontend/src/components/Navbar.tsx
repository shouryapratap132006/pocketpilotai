'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { name: 'Copilot', href: '/' },
        { name: 'History', href: '/history' },
        { name: 'Education', href: '/education' },
        { name: 'About AI', href: '/about' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900 to-slate-900/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-center">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-8 shadow-2xl">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-all hover:text-blue-400 ${pathname === link.href ? 'text-blue-400' : 'text-slate-400'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            </div>
        </nav>
    );
}

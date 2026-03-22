"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
    {
        href: "/",
        label: "The Journey",
        icon: "道",
        description: "XP & Progress",
        accentColor: "var(--indigo)",
    },
    {
        href: "/immersion",
        label: "Immersion",
        icon: "📝",
        description: "Log Activities",
        accentColor: "var(--jade)",
    },
    {
        href: "/dojo",
        label: "The Dojo",
        icon: "⚔️",
        description: "Arcade Drills",
        accentColor: "var(--gold)",
    },
    {
        href: "/library",
        label: "AI Library",
        icon: "📚",
        description: "Contextual Reading",
        accentColor: "var(--sakura)",
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar flex flex-col h-screen">
            {/* Logo */}
            <div className="px-5 py-6 flex items-center gap-3">
                <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
                    style={{ background: "var(--gradient-road)" }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    道
                </motion.div>
                <div>
                    <h1 className="text-base font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        Michi
                    </h1>
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                        The Path
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-2">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebar-link ${isActive ? "active" : ""}`}
                            >
                                <motion.div
                                    className="sidebar-icon"
                                    style={{
                                        background: isActive
                                            ? `${item.accentColor}18`
                                            : "var(--bg-tertiary)",
                                    }}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div>
                                    <div className="text-sm font-medium">{item.label}</div>
                                    <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                                        {item.description}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom section - Settings */}
            <div className="px-3 pb-4">
                <div
                    className="h-px mb-3"
                    style={{ background: "var(--border-subtle)" }}
                />
                <Link
                    href="/settings"
                    className={`sidebar-link ${pathname === "/settings" ? "active" : ""}`}
                >
                    <div
                        className="sidebar-icon"
                        style={{ background: "var(--bg-tertiary)" }}
                    >
                        ⚙️
                    </div>
                    <div>
                        <div className="text-sm font-medium">Settings</div>
                        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                            API Keys & Config
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

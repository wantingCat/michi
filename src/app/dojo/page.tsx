"use client";

import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const drillModes = [
    {
        mode: "hiragana",
        label: "Hiragana",
        icon: "あ",
        description: "46 base + dakuten + combos",
        count: 107,
        accent: "var(--jade)",
        gradient: "var(--gradient-jade)",
    },
    {
        mode: "katakana",
        label: "Katakana",
        icon: "ア",
        description: "46 base + dakuten + combos",
        count: 107,
        accent: "var(--indigo)",
        gradient: "var(--gradient-road)",
    },
    {
        mode: "kanji_n5",
        label: "Kanji N5",
        icon: "漢",
        description: "~100 essential kanji",
        count: 100,
        accent: "var(--gold)",
        gradient: "var(--gradient-gold)",
    },
];

export default function DojoPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
                <h1 className="page-title">The Dojo ⚔️</h1>
                <p className="page-subtitle">
                    Sharpen your skills with arcade-style drills
                </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div variants={item} className="grid grid-cols-3 gap-4 mb-8">
                <div className="stat-card">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">🏆</span>
                        <span className="stat-label">Today&apos;s Best</span>
                    </div>
                    <div className="stat-value" style={{ color: "var(--gold)" }}>0</div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">🔥</span>
                        <span className="stat-label">Current Streak</span>
                    </div>
                    <div className="stat-value" style={{ color: "var(--crimson)" }}>0</div>
                </div>
                <div className="stat-card">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">⚡</span>
                        <span className="stat-label">XP from Drills</span>
                    </div>
                    <div className="stat-value" style={{ color: "var(--jade)" }}>0</div>
                </div>
            </motion.div>

            {/* Drill Mode Selection */}
            <motion.div variants={item}>
                <h2 className="text-base font-semibold mb-4">Choose Your Drill</h2>
                <div className="grid grid-cols-3 gap-4">
                    {drillModes.map((drill) => (
                        <motion.button
                            key={drill.mode}
                            className="glass-card p-6 text-left cursor-pointer group"
                            whileHover={{ y: -4, boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 24px ${drill.accent}20` }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4"
                                style={{ background: drill.gradient, color: "white" }}
                                whileHover={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.4 }}
                            >
                                {drill.icon}
                            </motion.div>
                            <h3 className="text-lg font-semibold mb-1">{drill.label}</h3>
                            <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                                {drill.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span
                                    className="badge"
                                    style={{ background: `${drill.accent}15`, color: drill.accent }}
                                >
                                    {drill.count} characters
                                </span>
                                <motion.span
                                    className="text-sm font-medium"
                                    style={{ color: drill.accent }}
                                    whileHover={{ x: 4 }}
                                >
                                    Start →
                                </motion.span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

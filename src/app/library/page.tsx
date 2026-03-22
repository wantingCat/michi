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

const difficultyLevels = [
    { level: "N5", label: "Beginner", color: "var(--jade)" },
    { level: "N4", label: "Elementary", color: "var(--indigo)" },
    { level: "N3", label: "Intermediate", color: "var(--gold)" },
    { level: "N2", label: "Upper Int.", color: "var(--sakura)" },
    { level: "N1", label: "Advanced", color: "var(--crimson)" },
];

export default function LibraryPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
                <h1 className="page-title">AI Library 📚</h1>
                <p className="page-subtitle">
                    Read AI-generated stories and build vocabulary with contextual learning
                </p>
            </motion.div>

            {/* Difficulty Selection */}
            <motion.div variants={item} className="glass-card p-6 mb-8">
                <h2 className="text-base font-semibold mb-4">Generate a Story</h2>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                    Choose a difficulty level to generate a short story using vocabulary from that JLPT level.
                </p>
                <div className="flex gap-3 mb-6">
                    {difficultyLevels.map((d) => (
                        <motion.button
                            key={d.level}
                            className="flex-1 py-3 px-4 rounded-xl text-center border cursor-pointer"
                            style={{
                                borderColor: "var(--border-subtle)",
                                background: "var(--bg-tertiary)",
                            }}
                            whileHover={{
                                borderColor: d.color,
                                background: `${d.color}10`,
                                y: -2,
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <div className="text-lg font-bold" style={{ color: d.color }}>
                                {d.level}
                            </div>
                            <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                                {d.label}
                            </div>
                        </motion.button>
                    ))}
                </div>
                <button className="btn-sakura w-full">
                    ✨ Generate Story with Gemini
                </button>
            </motion.div>

            {/* Reading Area */}
            <motion.div variants={item} className="glass-card p-6 mb-8">
                <h3 className="text-base font-semibold mb-4">Reading Area</h3>
                <div
                    className="text-center py-16 rounded-xl"
                    style={{ background: "var(--bg-tertiary)" }}
                >
                    <div className="text-4xl mb-3">📖</div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Generate a story to start reading
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Click any word to see its definition via Jisho
                    </p>
                </div>
            </motion.div>

            {/* Saved Words */}
            <motion.div variants={item} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold">Saved Words</h3>
                    <span className="badge badge-sakura">0 words</span>
                </div>
                <div
                    className="text-center py-8 rounded-xl"
                    style={{ background: "var(--bg-tertiary)" }}
                >
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Words you save will appear here for Migaku export
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

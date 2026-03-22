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

const immersionTypes = [
    {
        type: "anime",
        label: "Anime",
        icon: "🎬",
        description: "Track via AniList",
        accent: "var(--indigo)",
        gradient: "var(--gradient-road)",
    },
    {
        type: "manga",
        label: "Manga",
        icon: "📖",
        description: "Track via AniList",
        accent: "var(--sakura)",
        gradient: "var(--gradient-sakura)",
    },
    {
        type: "game",
        label: "Games",
        icon: "🎮",
        description: "Session timer + IGDB",
        accent: "var(--jade)",
        gradient: "var(--gradient-jade)",
    },
    {
        type: "youtube",
        label: "YouTube",
        icon: "▶️",
        description: "Manual session timer",
        accent: "var(--crimson)",
        gradient: "linear-gradient(135deg, #f87171, #dc2626)",
    },
];

export default function ImmersionPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
                <h1 className="page-title">Immersion Logger</h1>
                <p className="page-subtitle">
                    Track your Japanese immersion across anime, manga, games, and YouTube
                </p>
            </motion.div>

            {/* Immersion Type Cards */}
            <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-8">
                {immersionTypes.map((imm) => (
                    <motion.div
                        key={imm.type}
                        className="glass-card p-6 cursor-pointer group"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                style={{ background: `${imm.accent}15` }}
                            >
                                {imm.icon}
                            </div>
                            <div
                                className="badge"
                                style={{ background: `${imm.accent}15`, color: imm.accent }}
                            >
                                0 sessions
                            </div>
                        </div>
                        <h3 className="text-base font-semibold mb-1">{imm.label}</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {imm.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-xl font-bold" style={{ color: imm.accent }}>
                                0
                            </span>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                XP earned
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Sessions */}
            <motion.div variants={item} className="glass-card p-6">
                <h3 className="text-base font-semibold mb-4">Recent Sessions</h3>
                <div
                    className="text-center py-12 rounded-xl"
                    style={{ background: "var(--bg-tertiary)" }}
                >
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        No immersion sessions yet
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Start tracking your first anime, manga, game, or YouTube session
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

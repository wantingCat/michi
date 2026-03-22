"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SettingsPage() {
    const [geminiKey, setGeminiKey] = useState("");
    const [anilistConnected, setAnilistConnected] = useState(false);
    const [igdbConnected, setIgdbConnected] = useState(false);

    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
                <h1 className="page-title">Settings ⚙️</h1>
                <p className="page-subtitle">
                    Configure API connections and app preferences
                </p>
            </motion.div>

            {/* API Keys Section */}
            <motion.div variants={item} className="glass-card p-6 mb-6">
                <h2 className="text-base font-semibold mb-4">API Connections</h2>
                <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
                    🔒 All keys are stored locally in an encrypted Stronghold vault. They never leave your machine.
                </p>

                {/* Gemini */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <span className="text-sm font-medium">Gemini API Key</span>
                        </div>
                        <a
                            href="https://aistudio.google.com/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs"
                            style={{ color: "var(--indigo)" }}
                        >
                            Get key →
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            placeholder="Enter your Gemini API key..."
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                            style={{
                                background: "var(--bg-tertiary)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-primary)",
                            }}
                        />
                        <button className="btn-primary text-sm px-4">Save</button>
                    </div>
                </div>

                {/* AniList */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎬</span>
                            <span className="text-sm font-medium">AniList</span>
                        </div>
                        {anilistConnected ? (
                            <span className="badge badge-jade">Connected</span>
                        ) : (
                            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
                                Not connected
                            </span>
                        )}
                    </div>
                    <button
                        className="w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                        style={{
                            background: anilistConnected ? "var(--bg-tertiary)" : "rgba(129, 140, 248, 0.1)",
                            color: anilistConnected ? "var(--text-secondary)" : "var(--indigo)",
                            border: `1px solid ${anilistConnected ? "var(--border-subtle)" : "rgba(129, 140, 248, 0.2)"}`,
                        }}
                    >
                        {anilistConnected ? "Disconnect" : "Connect AniList Account"}
                    </button>
                </div>

                {/* IGDB / Twitch */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎮</span>
                            <span className="text-sm font-medium">IGDB (Twitch)</span>
                        </div>
                        {igdbConnected ? (
                            <span className="badge badge-jade">Connected</span>
                        ) : (
                            <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
                                Not connected
                            </span>
                        )}
                    </div>
                    <button
                        className="w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                        style={{
                            background: igdbConnected ? "var(--bg-tertiary)" : "rgba(52, 211, 153, 0.1)",
                            color: igdbConnected ? "var(--text-secondary)" : "var(--jade)",
                            border: `1px solid ${igdbConnected ? "var(--border-subtle)" : "rgba(52, 211, 153, 0.2)"}`,
                        }}
                    >
                        {igdbConnected ? "Disconnect" : "Connect Twitch Account"}
                    </button>
                </div>
            </motion.div>

            {/* Privacy Section */}
            <motion.div variants={item} className="glass-card p-6 mb-6">
                <h2 className="text-base font-semibold mb-4">Privacy & Security</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 py-2">
                        <span className="text-lg">🔒</span>
                        <div>
                            <p className="text-sm font-medium">Encrypted Storage</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                API keys stored in Tauri Stronghold encrypted vault
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                        <span className="text-lg">🛡️</span>
                        <div>
                            <p className="text-sm font-medium">Local-Only Data</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                All study data stays on your machine in SQLite
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                        <span className="text-lg">🚫</span>
                        <div>
                            <p className="text-sm font-medium">No Telemetry</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                Zero analytics. No data leaves your machine without your action.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Data Management */}
            <motion.div variants={item} className="glass-card p-6">
                <h2 className="text-base font-semibold mb-4">Data Management</h2>
                <div className="flex gap-3">
                    <button className="btn-primary text-sm flex-1">
                        Export Data (JSON)
                    </button>
                    <button
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                        style={{
                            background: "rgba(248, 113, 113, 0.1)",
                            color: "var(--crimson)",
                            border: "1px solid rgba(248, 113, 113, 0.2)",
                        }}
                    >
                        Reset All Data
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

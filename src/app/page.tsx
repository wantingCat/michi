"use client";

import { motion } from "framer-motion";

const xpThresholds = [
  { level: "N5", xp: 0, target: 5000, color: "var(--jade)" },
  { level: "N4", xp: 5000, target: 15000, color: "var(--indigo)" },
  { level: "N3", xp: 15000, target: 35000, color: "var(--gold)" },
  { level: "N2", xp: 35000, target: 70000, color: "var(--sakura)" },
  { level: "N1", xp: 70000, target: 100000, color: "var(--crimson)" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function DashboardPage() {
  // Mock data — will be wired to SQLite later
  const totalXp = 0;
  const currentLevel: string = "N5";
  const streak = 0;
  const dailyAvg = 0;
  const todayXp = 0;

  const currentThreshold = xpThresholds.find((t) => t.level === currentLevel) || xpThresholds[0];
  const progress = currentThreshold.target > 0
    ? Math.min((totalXp / currentThreshold.target) * 100, 100)
    : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="page-title">The Grand Journey</h1>
        <p className="page-subtitle">Your path to Japanese mastery</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total XP"
          value={totalXp.toLocaleString()}
          icon="⚡"
          accent="var(--gold)"
        />
        <StatCard
          label="Current Level"
          value={currentLevel}
          icon="🏯"
          accent="var(--indigo)"
        />
        <StatCard
          label="Day Streak"
          value={streak.toString()}
          icon="🔥"
          accent="var(--crimson)"
        />
        <StatCard
          label="Daily Average"
          value={`${dailyAvg} XP`}
          icon="📊"
          accent="var(--jade)"
        />
      </motion.div>

      {/* Road Visualization */}
      <motion.div variants={item} className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">The Road (道)</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {totalXp.toLocaleString()} / {currentThreshold.target.toLocaleString()} XP to {currentLevel === "N1" ? "mastery" : `next level`}
            </p>
          </div>
          <div className="badge badge-gold">
            {currentLevel}
          </div>
        </div>

        {/* The Path */}
        <div className="relative">
          {/* Progress bar */}
          <div className="progress-bar h-3 mb-6">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Checkpoints */}
          <div className="flex justify-between relative">
            {xpThresholds.map((threshold, i) => {
              const isReached = totalXp >= threshold.xp;
              const isCurrent = threshold.level === currentLevel;
              return (
                <motion.div
                  key={threshold.level}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2"
                    style={{
                      background: isReached ? threshold.color : "var(--bg-tertiary)",
                      borderColor: isCurrent ? threshold.color : "transparent",
                      color: isReached ? "white" : "var(--text-muted)",
                      boxShadow: isCurrent ? `0 0 16px ${threshold.color}40` : "none",
                    }}
                    animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {threshold.level}
                  </motion.div>
                  <span
                    className="text-[11px]"
                    style={{ color: isReached ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    {threshold.xp > 0 ? `${(threshold.xp / 1000).toFixed(0)}k` : "0"}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Today's Activity */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
            Today&apos;s XP
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="stat-value" style={{ color: "var(--gold)" }}>
              {todayXp}
            </span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>XP earned</span>
          </div>
          <div className="progress-bar mt-4">
            <motion.div
              className="progress-fill"
              style={{ background: "var(--gradient-gold)" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((todayXp / 100) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Daily goal: 100 XP
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
            Pace Estimate
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="stat-value" style={{ color: "var(--indigo)" }}>
              {dailyAvg > 0
                ? Math.ceil(
                  (currentThreshold.target - totalXp) / dailyAvg
                )
                : "∞"}
            </span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              days until {currentLevel === "N1" ? "mastery" : "next level"}
            </span>
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Based on your 7-day rolling average
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: string;
  accent: string;
}) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -2, boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 16px ${accent}15` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: `${accent}15` }}
        >
          {icon}
        </div>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value" style={{ color: accent }}>
        {value}
      </div>
    </motion.div>
  );
}

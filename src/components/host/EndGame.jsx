import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GAME_CONFIG, assignTitles, computeCompositeScore, getPlayerTitles } from "../../data/missions";
import AnimatedBackground from "../shared/AnimatedBackground";

const EndGame = ({ players, onRestart }) => {
  const [activeTab, setActiveTab] = useState("LEADERBOARD");
  const titles = assignTitles(players);

  // Rank by composite score
  const ranked = [...players]
    .map((p) => ({
      ...p,
      composite: computeCompositeScore(p),
      playerTitles: getPlayerTitles(p, players),
    }))
    .sort((a, b) => b.composite.total - a.composite.total);

  const winner = ranked[0];

  const handleExport = () => {
    const headers = "Rank,Name,MSSV,Composite Score,Accuracy,Title\n";
    const rows = ranked
      .map((p, idx) => {
        const title = p.playerTitles.primary?.label || "—";
        return `${idx + 1},"${p.name}","${p.studentId || ""}",${p.composite.total},${p.composite.accuracy}%,"${title}"`;
      })
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `council_results_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent="#38BDF8" showGrid intensity={1.2} />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2
              className="text-lg font-bold uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F1F5F9" }}
            >
              Mission Complete
            </h2>
            <div className="text-xs" style={{ color: "#475569" }}>
              {GAME_CONFIG.subject}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="btn btn-ghost">
            Export CSV
          </button>
          <button onClick={onRestart} className="btn btn-primary">
            New Mission
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center p-8 overflow-y-auto">
        <div className="max-w-6xl w-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-4xl sm:text-5xl font-black mb-2"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F1F5F9" }}
            >
              MISSION COMPLETE
            </h1>
            <p
              className="text-base sm:text-lg mb-6 max-w-xl mx-auto"
              style={{ color: "#64748B" }}
            >
              The National Crisis Council has completed all emergency meetings.
              Every decision has been recorded and analyzed.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("LEADERBOARD")}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === "LEADERBOARD"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              Council Ranking
            </button>
            <button
              onClick={() => setActiveTab("HALL_OF_FAME")}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === "HALL_OF_FAME"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              Hall of Fame
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "LEADERBOARD" && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-4xl mx-auto"
              >
                {/* Winner highlight */}
                {winner && (
                  <div
                    className="glass-card max-w-md mx-auto p-6 mb-8 text-left"
                    style={{
                      background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(56,189,248,0.05))",
                      border: "1.5px solid rgba(56,189,248,0.4)",
                      boxShadow: "0 0 40px rgba(56,189,248,0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                          National Crisis Advisor
                        </div>
                        <h3
                          className="text-2xl font-black text-white"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {winner.name}
                        </h3>
                        {winner.playerTitles.primary && (
                          <div className="text-sm text-sky-300 mt-1">
                            {winner.playerTitles.primary.label}
                          </div>
                        )}
                      </div>
                      <div className="ml-auto text-right">
                        <div
                          className="text-3xl font-black text-sky-400"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {winner.composite.total}
                        </div>
                        <div className="text-xs text-sky-400/70">Overall Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {ranked.slice(0, 3).map((p, i) => (
                    <div
                      key={p.id}
                      className="glass-card p-5 flex flex-col items-center gap-2"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                        style={{
                          background: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : "#CD7F32",
                          color: "#0a0f1c",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold text-white truncate w-full">{p.name}</span>
                      {p.playerTitles.primary && (
                        <span className="text-xs text-sky-400">{p.playerTitles.primary.label}</span>
                      )}
                      <span className="text-lg font-black text-blue-400">
                        {p.composite.total} pts
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rest of players */}
                <div className="glass-card p-2 text-left max-h-[300px] overflow-y-auto">
                  {ranked.slice(3).map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl border-b border-white/5 last:border-0"
                    >
                      <div className="text-slate-500 font-bold w-6">{i + 4}</div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-200">{p.name}</div>
                        {p.playerTitles.primary && (
                          <div className="text-xs text-sky-400/70">{p.playerTitles.primary.label}</div>
                        )}
                      </div>
                      <div className="font-black text-blue-400">{p.composite.total}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "HALL_OF_FAME" && (
              <motion.div
                key="hall_of_fame"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto pb-10"
              >
                {titles.length === 0 ? (
                  <div className="col-span-full text-slate-400 py-10">
                    Chưa có danh hiệu nào được trao.
                  </div>
                ) : (
                  titles.map((t, idx) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass-card p-5 text-left relative overflow-hidden group"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-sky-500/10 transition-colors" />
                      <div className="flex items-start gap-4 relative z-10">
                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-1">{t.desc}</div>
                          <div
                            className="text-lg font-black text-white mb-2"
                            style={{ fontFamily: "'Outfit', sans-serif", color: "#38BDF8" }}
                          >
                            {t.label}
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit">
                            <span className="font-bold text-sm text-slate-200">{t.player.name}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EndGame;

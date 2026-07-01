import { motion } from "framer-motion";
import { computeCompositeScore, getPlayerTitles, STAT_CONFIG, statToStars, MISSIONS } from "../../data/missions";

const StarRating = ({ count }) => {
  const filled = "★";
  const empty = "☆";
  return (
    <span className="text-yellow-400 tracking-wider text-base">
      {filled.repeat(count)}{empty.repeat(5 - count)}
    </span>
  );
};

const PlayerEndGame = ({ player, players }) => {
  const composite = computeCompositeScore(player);
  const { primary, badges } = getPlayerTitles(player, players);
  const stats = player.stats || {};
  const totalQuestions = MISSIONS.length;

  // Rank by composite
  const ranked = [...players]
    .map((p) => ({ ...p, _c: computeCompositeScore(p).total }))
    .sort((a, b) => b._c - a._c);
  const myRank = ranked.findIndex((p) => p.id === player.id) + 1;

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen overflow-y-auto">
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center gap-5 pb-10">
        {/* Mission Complete Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-xs font-bold uppercase tracking-wider"
          style={{
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.3)",
            color: "#38BDF8",
            boxShadow: "0 0 30px rgba(56,189,248,0.15)",
          }}
        >
          COMPLETE
        </motion.div>

        <div>
          <h2
            className="text-2xl font-black mb-1 text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Mission Complete
          </h2>
          <p className="text-sm text-slate-400">
            Council Member #{myRank} of {players.length}
          </p>
        </div>

        {/* Primary Title */}
        {primary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-xs p-4 rounded-xl text-left"
            style={{
              background: "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(59,130,246,0.05))",
              border: "1px solid rgba(56,189,248,0.2)",
            }}
          >
            <div className="text-xs text-sky-400 font-bold uppercase mb-1">Primary Title</div>
            <div className="text-lg font-black text-white">{primary.label}</div>
            <div className="text-xs text-slate-300">{primary.desc}</div>
          </motion.div>
        )}

        {/* Secondary Badges */}
        {badges.length > 0 && (
          <div className="flex gap-2 w-full max-w-xs">
            {badges.map((b) => (
              <div
                key={b.id}
                className="flex-1 px-3 py-2 rounded-lg text-left"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xs text-sky-400/70 font-bold mb-0.5">Badge</div>
                <div className="text-sm font-bold text-white">{b.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Council Performance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 w-full max-w-xs text-left"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#64748B" }}>
            Council Performance
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Knowledge Score</span>
              <span className="text-lg font-black text-sky-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {composite.accuracy}%
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Decision Accuracy</span>
              <span className="text-lg font-black text-sky-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {Math.round((stats.correctCount || 0) / totalQuestions * 100)}%
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Avg Response Time</span>
              <span className="text-lg font-black text-sky-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {composite.avgTime}s
              </span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Overall Score</span>
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {composite.total}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Competency Radar (Star Ratings) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-xs text-left bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#38BDF8" }}>
            Competency Profile
          </h3>
          <div className="flex flex-col gap-3">
            {STAT_CONFIG.map((sc, i) => {
              const val = stats[sc.key] || 0;
              const stars = statToStars(val);
              return (
                <motion.div
                  key={sc.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-slate-300 font-medium">{sc.label}</span>
                  <StarRating count={stars} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 text-center text-xs text-slate-600 mt-4">
        Kinh tế Chính trị Mác-Lênin · MLN122
      </div>
    </div>
  );
};

export default PlayerEndGame;

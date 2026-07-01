import { motion } from "framer-motion";
import { computeCompositeScore, getPlayerTitles } from "../../data/missions";
import AnimatedBackground from "../shared/AnimatedBackground";

const Leaderboard = ({ players, mission, onNext, isLastMission }) => {
  // Rank by composite score
  const ranked = [...players]
    .map((p) => ({
      ...p,
      composite: computeCompositeScore(p),
      titles: getPlayerTitles(p, players),
    }))
    .sort((a, b) => b.composite.total - a.composite.total);

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent={mission?.color || "#2563EB"} showGrid intensity={0.6} />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F1F5F9" }}
            >
              COUNCIL RANKING
            </h2>
            <div className="text-xs" style={{ color: "#475569" }}>
              {mission
                ? `Emergency Meeting #${mission.chapter}`
                : "Final Results"}
            </div>
          </div>
        </div>
        <button onClick={onNext} className="btn btn-primary">
          {isLastMission ? "Mission Complete" : "Next Meeting →"}
        </button>
      </div>

      {/* Main Leaderboard List */}
      <div className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-8 py-8 overflow-y-auto">
        {ranked.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="text-sm text-center" style={{ color: "#475569" }}>
              Không có thành viên hội đồng nào trong phòng
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {ranked.map((player, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card relative flex items-center gap-4 px-6 py-4 overflow-hidden"
                  style={{
                    background: isTop3
                      ? "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                      : "rgba(255,255,255,0.03)",
                    border: isTop3
                      ? `1px solid rgba(255, 215, 0, ${0.4 - rank * 0.1})`
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Rank Badge */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg ${
                      rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : ""
                    }`}
                    style={{
                      background: !isTop3 ? "rgba(255,255,255,0.06)" : undefined,
                      color: isTop3 ? "#0A0F1C" : "#94A3B8",
                    }}
                  >
                    {rank}
                  </div>

                  {/* Name + Title */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold truncate" style={{ color: "#F1F5F9" }}>
                      {player.name}
                    </div>
                    {player.titles.primary && (
                      <div className="text-xs font-semibold" style={{ color: "#38BDF8" }}>
                        {player.titles.primary.label}
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {player.titles.badges.map((badge) => (
                      <div
                        key={badge.id}
                        title={badge.desc}
                        className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#94A3B8",
                        }}
                      >
                        {badge.label}
                      </div>
                    ))}
                  </div>

                  {/* Composite Score */}
                  <div className="text-right">
                    <div
                      className="text-2xl font-black font-display"
                      style={{
                        color: isTop3 ? "#60A5FA" : "#E2E8F0",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {player.composite.total}
                    </div>
                    <div className="text-xs" style={{ color: "#475569" }}>
                      Overall Score
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

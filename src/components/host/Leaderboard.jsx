import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "../../data/missions";
import AnimatedBackground from "../shared/AnimatedBackground";

const Leaderboard = ({ players, mission, onNext, isLastMission }) => {
  // Sort players by score desc
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground
        accent={mission?.color || "#2563EB"}
        showGrid
        intensity={0.6}
      />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl"></span>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F1F5F9" }}
            >
              BẢNG XẾP HẠNG
            </h2>
            <div className="text-xs" style={{ color: "#475569" }}>
              {mission
                ? `Chương ${mission.chapter} · ${mission.chapterName}`
                : "Kết quả chung cuộc"}
            </div>
          </div>
        </div>
        <button onClick={onNext} className="btn btn-primary">
          {isLastMission ? "Hoàn thành nhiệm vụ" : "Chương tiếp theo →"}
        </button>
      </div>

      {/* Main Leaderboard List */}
      <div className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-8 py-8 overflow-y-auto">
        {sortedPlayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-6xl opacity-30">👥</span>
            <div className="text-sm text-center" style={{ color: "#475569" }}>
              Không có người chơi nào trong phòng
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedPlayers.map((player, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;
              const comboColor =
                player.combo >= 3
                  ? "#EF4444"
                  : player.combo >= 2
                    ? "#F59E0B"
                    : "#64748B";

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card relative flex items-center gap-4 px-6 py-4 overflow-hidden"
                  style={{
                    background: isTop3
                      ? `linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
                      : "rgba(255,255,255,0.03)",
                    border: isTop3
                      ? `1px solid rgba(255, 215, 0, ${0.4 - rank * 0.1})`
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Rank Badge */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg ${
                      rank === 1
                        ? "rank-1"
                        : rank === 2
                          ? "rank-2"
                          : rank === 3
                            ? "rank-3"
                            : ""
                    }`}
                    style={{
                      background: !isTop3
                        ? "rgba(255,255,255,0.06)"
                        : undefined,
                      color: isTop3 ? "#0A0F1C" : "#94A3B8",
                    }}
                  >
                    {rank === 1
                      ? "🥇"
                      : rank === 2
                        ? "🥈"
                        : rank === 3
                          ? "🥉"
                          : rank}
                  </div>

                  {/* Avatar & Name */}
                  <span className="text-3xl">{player.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-base font-bold truncate"
                      style={{ color: "#F1F5F9" }}
                    >
                      {player.name}
                    </div>
                    {player.studentId && (
                      <div className="text-xs" style={{ color: "#475569" }}>
                        MSSV: {player.studentId}
                      </div>
                    )}
                  </div>

                  {/* Achievements */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {(player.achievements || []).slice(0, 3).map((achId) => {
                      const ach = ACHIEVEMENTS.find((a) => a.id === achId);
                      if (!ach) return null;
                      return (
                        <div
                          key={achId}
                          title={ach.desc}
                          className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#94A3B8",
                          }}
                        >
                          {/* Icon removed */}
                          <span>{ach.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Combo bonus */}
                  {player.combo >= 2 && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="px-2.5 py-1 rounded-full text-xs font-bold font-display"
                      style={{
                        background: `${comboColor}15`,
                        border: `1px solid ${comboColor}40`,
                        color: comboColor,
                      }}
                    >
                      Combo x{player.combo}
                    </motion.div>
                  )}

                  {/* Score */}
                  <div className="text-right">
                    <div
                      className="text-2xl font-black font-display"
                      style={{
                        color: isTop3 ? "#60A5FA" : "#E2E8F0",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {player.score}
                    </div>
                    <div className="text-xs" style={{ color: "#475569" }}>
                      Điểm tích luỹ
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

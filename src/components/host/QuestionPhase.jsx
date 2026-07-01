import { motion } from "framer-motion";
import AnimatedBackground from "../shared/AnimatedBackground";
import CountdownTimer from "../shared/CountdownTimer";

const CHOICE_STYLES = {
  A: {
    bg: "linear-gradient(135deg,#1D4ED8,#2563EB)",
    border: "#2563EB",
    label: "▲",
  },
  B: {
    bg: "linear-gradient(135deg,#0F766E,#14B8A6)",
    border: "#14B8A6",
    label: "◆",
  },
  C: {
    bg: "linear-gradient(135deg,#D97706,#F59E0B)",
    border: "#F59E0B",
    label: "●",
  },
  D: {
    bg: "linear-gradient(135deg,#DC2626,#EF4444)",
    border: "#EF4444",
    label: "■",
  },
};

const QuestionPhase = ({
  mission,
  votes,
  votedCount,
  totalPlayers,
  timeRemaining,
  onForceEnd,
}) => {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const participation = totalPlayers > 0 ? votedCount / totalPlayers : 0;

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent={mission.color} showGrid intensity={0.7} />

      {/* Top bar */}
      <div
        className="relative z-10 flex items-center gap-4 px-8 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full animate-pulse flex items-center gap-2"
          style={{
            background: `rgba(239, 68, 68, 0.1)`,
            border: `1px solid rgba(239, 68, 68, 0.4)`,
            color: '#EF4444',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          EMERGENCY MEETING #{mission.chapter}
        </span>
        <div className="flex-1" />
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "#475569" }}
        >
          <span>👥</span>
          <span>
            {votedCount} / {totalPlayers > 0 ? totalPlayers : "—"} đã trả lời
          </span>
        </div>
        <button
          onClick={onForceEnd}
          className="text-xs px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#64748B",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Kết thúc sớm →
        </button>
      </div>

      {/* Main: Question + Timer + Live votes */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* LEFT – Question & Choices */}
        <div className="flex flex-col justify-center px-10 py-8">
          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              {/* Icon removed */}
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#94A3B8" }}
              >
                {mission.title}
              </h2>
            </div>

            <p
              className="text-2xl font-semibold leading-snug mb-8"
              style={{
                color: "#F1F5F9",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(18px, 2.2vw, 26px)",
              }}
            >
              {mission.question}
            </p>
          </motion.div>

          {/* Answer grid */}
          <div className="grid grid-cols-2 gap-3">
            {mission.choices.map((choice, i) => {
              const style = CHOICE_STYLES[choice.id];
              const count = votes[choice.id] || 0;
              const pct =
                totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

              return (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background: style.bg,
                    boxShadow: `0 4px 20px ${style.border}30`,
                  }}
                >
                  <div className="px-4 py-3 flex items-center gap-3">
                    <span
                      className="text-2xl font-black flex-shrink-0"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        opacity: 0.6,
                      }}
                    >
                      {style.label}
                    </span>
                    <span className="font-semibold text-sm leading-snug text-white flex-1">
                      <span className="font-black mr-1">{choice.id}.</span>{" "}
                      {choice.text}
                    </span>
                    {totalVotes > 0 && (
                      <span className="text-xs font-bold text-white opacity-70 ml-auto">
                        {pct}%
                      </span>
                    )}
                  </div>
                  {/* Vote progress bar */}
                  <div style={{ height: 3, background: "rgba(0,0,0,0.2)" }}>
                    <motion.div
                      style={{
                        height: "100%",
                        background: "rgba(255,255,255,0.5)",
                        width: `${pct}%`,
                      }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT – Timer + Live participation */}
        <div
          className="flex flex-col items-center justify-center gap-8 px-10 py-8"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Countdown */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="flex flex-col items-center gap-4"
          >
            <CountdownTimer
              total={mission.timeLimit}
              remaining={timeRemaining}
              size={160}
            />
            <div className="text-sm font-semibold" style={{ color: "#475569" }}>
              Thời gian còn lại
            </div>
          </motion.div>

          {/* Participation bar */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: "#475569" }}
              >
                Đã trả lời
              </span>
              <span
                className="text-lg font-black"
                style={{ fontFamily: "'JetBrains Mono'", color: "#60A5FA" }}
              >
                {votedCount}{" "}
                <span style={{ color: "#334155", fontSize: 14 }}>
                  / {totalPlayers || "∞"}
                </span>
              </span>
            </div>
            <div className="progress-bar-track" style={{ height: 12 }}>
              <motion.div
                className="progress-bar-fill"
                animate={{ width: `${Math.min(participation * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "linear-gradient(90deg, #2563EB, #00D4FF)",
                  boxShadow: "0 0 15px rgba(0,212,255,0.3)",
                }}
              />
            </div>
            <div className="mt-2 text-xs" style={{ color: "#334155" }}>
              {participation >= 1
                ? "Tất cả đã trả lời!"
                : "Đang chờ sinh viên trả lời..."}
            </div>
          </div>

          {/* Live vote dots */}
          {totalVotes > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2 flex-wrap justify-center max-w-xs"
            >
              {Array.from({ length: Math.min(votedCount, 30) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#22C55E", opacity: 0.7 }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPhase;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getVotePercentages } from "../../data/missions";
import AnimatedBackground from "../shared/AnimatedBackground";

const CHOICE_META = {
  A: { label: "▲", color: "#2563EB", bg: "rgba(37,99,235,0.15)", border: "rgba(37,99,235,0.4)" },
  B: { label: "◆", color: "#14B8A6", bg: "rgba(20,184,166,0.15)", border: "rgba(20,184,166,0.4)" },
  C: { label: "●", color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)" },
  D: { label: "■", color: "#EF4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)" },
};

const ResultsChart = ({ mission, votes, onRevealExplain, onNext, isLastMission }) => {
  const [animated, setAnimated] = useState(false);
  const pcts = getVotePercentages(votes);
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Find the most voted option (Council Decision)
  const councilDecision = Object.entries(votes).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent={mission.color} showGrid intensity={0.6} />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-2"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#EF4444",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500" />
          BOARD VOTE RESULTS
        </span>
        <div className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
          <span>{total} phiếu</span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center gap-8 px-10 py-8">
        {/* LEFT – Bar Chart */}
        <div className="flex-1 w-full">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#94A3B8" }}
          >
            Kết quả biểu quyết hội đồng
          </motion.h2>

          <div className="flex flex-col gap-4">
            {mission.choices.map((choice, i) => {
              const meta = CHOICE_META[choice.id];
              const pct = pcts[choice.id] || 0;
              const isCouncilPick = choice.id === councilDecision && total > 0;
              const count = votes[choice.id] || 0;

              return (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  {/* Label row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          background: meta.bg,
                          color: meta.color,
                          border: `1px solid ${meta.border}`,
                        }}
                      >
                        {choice.id}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: isCouncilPick ? "#38BDF8" : "#94A3B8" }}
                      >
                        {choice.text}
                        {isCouncilPick && (
                          <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{
                            background: "rgba(56,189,248,0.15)",
                            color: "#38BDF8",
                            border: "1px solid rgba(56,189,248,0.3)",
                          }}>
                            COUNCIL DECISION
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {count} phiếu
                      </span>
                      <span
                        className="text-2xl font-black w-16 text-right"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: isCouncilPick ? "#38BDF8" : meta.color,
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      height: 36,
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${meta.border}`,
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={animated ? { width: `${pct}%` } : { width: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        height: "100%",
                        background: isCouncilPick
                          ? "linear-gradient(90deg, #0284C7, #38BDF8)"
                          : `linear-gradient(90deg, ${meta.color}88, ${meta.color})`,
                        boxShadow: isCouncilPick
                          ? "0 0 20px rgba(56,189,248,0.4)"
                          : `0 0 15px ${meta.color}40`,
                        borderRadius: "inherit",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {total === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-sm"
              style={{ color: "#334155" }}
            >
              Chưa có phiếu bầu nào trong vòng này
            </motion.div>
          )}
        </div>

        {/* RIGHT – Info + Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:w-80 w-full flex flex-col gap-4"
        >
          {/* Question recap */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: "#475569" }}>
              Agenda
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              {mission.question}
            </p>
          </div>

          {/* Council Decision highlight */}
          {total > 0 && councilDecision && (
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
              }}
            >
              <div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#38BDF8" }}>
                Official Council Decision
              </div>
              <div className="text-lg font-bold" style={{ color: "#7DD3FC" }}>
                {mission.choices.find((c) => c.id === councilDecision)?.text}
              </div>
              <div className="text-sm mt-1" style={{ color: "#334155" }}>
                Được chọn bởi {pcts[councilDecision] || 0}% thành viên hội đồng
              </div>
            </div>
          )}

          {/* Action buttons */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRevealExplain}
            className="btn btn-primary btn-lg w-full"
          >
            Xem Council Briefing
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="btn btn-ghost w-full"
          >
            {isLastMission ? "Kết thúc nhiệm vụ" : "Council Ranking →"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsChart;

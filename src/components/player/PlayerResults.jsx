import { motion } from "framer-motion";
import { STAT_CONFIG } from "../../data/missions";

const PlayerResults = ({ mission, choiceId }) => {
  // Find the choice the player selected to show Decision Analysis
  const selectedChoice = mission.choices.find((c) => c.id === choiceId);
  const indicators = selectedChoice?.indicators || {};

  // Get non-zero indicator changes for display
  const changes = STAT_CONFIG.map((sc) => ({
    ...sc,
    value: indicators[sc.key] || 0,
  })).filter((c) => c.value !== 0);

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen">
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center gap-6">
        {/* Decision Recorded Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(56,189,248,0.12)",
            border: "2px solid rgba(56,189,248,0.4)",
            boxShadow: "0 0 30px rgba(56,189,248,0.15)",
          }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            className="text-sky-400 text-3xl font-bold"
          >
            ✓
          </motion.div>
        </motion.div>

        <div>
          <h2
            className="text-2xl font-black mb-1"
            style={{
              color: "#38BDF8",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Decision Recorded
          </h2>
          <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            Your recommendation has been submitted to the National Crisis Council.
          </p>
        </div>

        {/* Decision Analysis Card */}
        {changes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-xs rounded-2xl p-5 text-left"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#64748B" }}>
              Decision Analysis
            </div>
            <div className="flex flex-col gap-2.5">
              {changes.map((c) => (
                <div key={c.key} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">
                    {c.label}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: c.value > 0 ? "#4ADE80" : "#F87171",
                    }}
                  >
                    {c.value > 0 ? `+${c.value}` : c.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Selected choice reminder */}
        <div className="text-xs text-slate-500">
          Bạn đã chọn phương án{" "}
          <span className="font-bold text-slate-300">{choiceId}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-slate-500 mt-4">
        Đang chờ kết quả biểu quyết của Hội đồng...
      </div>
    </div>
  );
};

export default PlayerResults;

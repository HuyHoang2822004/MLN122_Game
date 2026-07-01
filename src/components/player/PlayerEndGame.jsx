import { motion } from "framer-motion";
import { assignTitles } from "../../data/missions";

const PlayerEndGame = ({ player, players }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const myRank = sorted.findIndex((p) => p.id === player.id) + 1;
  const titles = assignTitles(players);
  const myTitle = titles.find((t) => t.player.id === player.id);
  const stats = player.stats || {};

  const getAnalysis = () => {
    if (myTitle) {
      return `Hệ thống phân tích: Bạn có phong cách nổi bật mang dấu ấn ${myTitle.label}. Chúc mừng bạn đã hoàn thành nhiệm vụ và đưa ra những quyết định sáng suốt!`;
    }
    return `Hệ thống phân tích: Bạn đã hoàn thành tốt các tình huống và đóng góp vào nỗ lực chung.`;
  };

  const statConfig = [
    { key: "innovation", label: "Innovation" },
    { key: "strategy", label: "Strategy" },
    { key: "collaboration", label: "Collaboration" },
    { key: "risk", label: "Risk Management" },
    { key: "publicHealth", label: "Public Health" },
    { key: "economy", label: "Economic Thinking" },
  ];

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen overflow-y-auto">
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center gap-6 pb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold bg-blue-500/10 border border-blue-500/30 glow-blue text-blue-400"
        >
          MISSION
        </motion.div>

        <div>
          <h2
            className="text-2xl font-black mb-1 text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Hoàn Thành Nhiệm Vụ!
          </h2>
          <p className="text-sm text-slate-400">
            Bạn đã nỗ lực hoàn tất mọi hồ sơ giả lập.
          </p>
        </div>

        {/* Rank Card */}
        <div
          className="rounded-2xl p-6 w-full max-w-xs flex flex-col gap-4 text-left"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-bold uppercase">
              Thứ hạng phòng
            </span>
            <span
              className="text-2xl font-black text-yellow-400"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              #{myRank}{" "}
              <span className="text-xs text-slate-500 font-normal">
                / {players.length}
              </span>
            </span>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-bold uppercase">
              Tổng điểm
            </span>
            <span
              className="text-2xl font-black text-blue-400"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {player.score}{" "}
              <span className="text-xs text-slate-500 font-normal">pts</span>
            </span>
          </div>
        </div>

        {/* Title Award */}
        {myTitle && (
          <div
            className="w-full max-w-xs p-4 rounded-xl text-left"
            style={{
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(59,130,246,0.05))",
              border: "1px solid rgba(56,189,248,0.2)",
            }}
          >
            <div className="text-xs text-sky-400 font-bold uppercase mb-1">
              Danh Hiệu
            </div>
            <div className="flex items-center gap-3">
              <div>
                <div className="text-lg font-black text-white">
                  {myTitle.label}
                </div>
                <div className="text-xs text-slate-300">{myTitle.desc}</div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Card (Hồ sơ năng lực) */}
        <div className="w-full max-w-xs text-left bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50 mt-2">
          <h3 className="text-sm text-sky-400 font-bold uppercase mb-3">Hồ Sơ Năng Lực</h3>
          <div className="flex flex-col gap-2">
            {statConfig.map((sc) => {
              const val = stats[sc.key] || 0;
              // Map score to 5 points. Roughly every 10 points = 1 star, up to 5 max, minimum 1.
              const score = Math.max(1, Math.min(5, Math.ceil(val / 10) + 2)); 
              return (
                <div key={sc.key} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">{sc.label}</span>
                  <span className="text-yellow-400 font-bold">{score}/5</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Analysis */}
        <div className="w-full max-w-xs text-left bg-slate-800/40 p-4 rounded-xl border border-slate-700 mt-2">
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{getAnalysis()}"
          </p>
        </div>

        {/* Achievements list */}
        {player.achievements && player.achievements.length > 0 && (
          <div className="w-full max-w-xs mt-2">
            <div className="text-xs text-slate-500 font-bold uppercase mb-2 text-left">
              Huy hiệu ({player.achievements.length})
            </div>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {player.achievements.map((ach) => (
                <span
                  key={ach}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300"
                >
                  {ach === "vaccine_hero"
                    ? "Vaccine Hero"
                    : ach === "perfect_combo"
                      ? "Perfect Combo"
                      : ach === "warp_speed"
                        ? "Warp Speed"
                        : ach}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 text-center text-xs text-slate-600 mt-6">
        Kinh tế Chính trị Mác-Lênin · MLN122
      </div>
    </div>
  );
};

export default PlayerEndGame;

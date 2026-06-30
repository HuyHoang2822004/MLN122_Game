import { motion } from 'framer-motion';

const PlayerResults = ({ mission, choiceId, score, combo }) => {
  const isCorrect = choiceId === mission.correct;

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen">
      <div className="relative z-10 text-center flex-1 flex flex-col justify-center items-center gap-6">

        {/* Correct/Incorrect Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl celebrate ${
            isCorrect ? 'glow-green' : 'glow-danger'
          }`}
          style={{
            background: isCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: isCorrect ? '2px solid #22C55E' : '2px solid #EF4444',
          }}
        >
          {isCorrect ? '🎉' : '❌'}
        </motion.div>

        <div>
          <h2
            className="text-2xl font-black mb-1"
            style={{ color: isCorrect ? '#22C55E' : '#EF4444', fontFamily: "'Outfit', sans-serif" }}
          >
            {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
          </h2>
          <p className="text-sm text-slate-400">
            Bạn đã chọn đáp án <span className="font-bold text-white">{choiceId}</span>
          </p>
        </div>

        {/* Score indicator */}
        <div
          className="rounded-2xl px-8 py-5 text-center min-w-[200px]"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Điểm số hiện tại</div>
          <div
            className="text-4xl font-black font-display text-blue-400"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {score}
          </div>
          {isCorrect && (
            <div className="text-xs text-green-400 font-semibold mt-1">
              {combo >= 2 ? `🔥 Nhân đôi Combo x${combo}!` : '+ Vòng này'}
            </div>
          )}
        </div>

        {/* Combo flame */}
        {combo >= 2 && (
          <div
            className="px-3 py-1 rounded-full text-xs font-bold font-display"
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#EF4444',
            }}
          >
            🔥 CHUỖI LIÊN TIẾP x{combo}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-slate-500">
        Đang chờ giảng viên chuyển tiếp sang chương sau...
      </div>
    </div>
  );
};

export default PlayerResults;

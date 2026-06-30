import { motion } from 'framer-motion';
import AnimatedBackground from '../shared/AnimatedBackground';

const PlayerWaiting = ({ player, roomCode, playersCount }) => {
  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen">
      <AnimatedBackground intensity={0.4} showGrid={false} />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <span className="text-sm font-bold text-white tracking-wider font-display">MISSION DECISION</span>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-mono"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Phòng: {roomCode}
        </div>
      </div>

      {/* Center status */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-6">
        {/* Animated join orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl glow-blue"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.05) 70%)',
            border: '2px solid rgba(96,165,250,0.3)',
          }}
        >
          {player.avatar}
        </motion.div>

        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Chào mừng, {player.name}!
          </h3>
          <p className="text-sm text-slate-400">
            Bạn đã kết nối thành công vào phòng thi đấu.
          </p>
        </div>

        {/* Live waiting indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">ĐANG ĐỢI GIẢNG VIÊN KHỞI ĐỘNG</span>
          </div>
          <span className="text-xs text-slate-500 mt-2">
            Đang có {playersCount} người chơi cùng trong phòng
          </span>
        </div>
      </div>

      {/* Footer Profile review */}
      <div
        className="relative z-10 rounded-2xl p-4 flex items-center gap-3"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span className="text-2xl">{player.avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Hồ sơ cá nhân</div>
          <div className="text-sm font-bold text-white truncate">{player.name}</div>
          {player.studentId && <div className="text-xs text-slate-400">MSSV: {player.studentId}</div>}
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-blue-400 font-display">0 pts</div>
          <div className="text-xs text-slate-500">Bắt đầu</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerWaiting;

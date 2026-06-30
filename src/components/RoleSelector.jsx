import { motion } from 'framer-motion';
import AnimatedBackground from './shared/AnimatedBackground';

const RoleSelector = () => {
  const goHost = () => {
    window.location.href = '/?role=host';
  };
  const goPlayer = () => {
    const code = prompt('Nhập mã phòng (Room Code):');
    if (code) window.location.href = `/?role=player&room=${code.trim()}`;
  };

  return (
    <div className="host-layout flex items-center justify-center min-h-screen px-6">
      <AnimatedBackground />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
          style={{
            background: 'rgba(37,99,235,0.12)',
            border: '1px solid rgba(37,99,235,0.25)',
            color: '#60A5FA',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Kinh tế Chính trị Mác-Lênin · MLN122
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h1
            className="font-black tracking-tight leading-none mb-2"
            style={{
              fontSize: 'clamp(48px,10vw,80px)',
              fontFamily: "'Outfit', sans-serif",
              background: 'linear-gradient(135deg, #00D4FF 0%, #2563EB 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MISSION
          </h1>
          <h1
            className="font-black tracking-tight leading-none"
            style={{
              fontSize: 'clamp(48px,10vw,80px)',
              fontFamily: "'Outfit', sans-serif",
              color: '#F1F5F9',
            }}
          >
            DECISION
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 mb-12 text-base leading-relaxed"
          style={{ color: '#64748B' }}
        >
          Trò chơi học tập thời gian thực về<br />
          <span style={{ color: '#94A3B8' }}>Hiện tượng Moderna &amp; Độc quyền Nhà nước trong CNTB</span>
        </motion.p>

        {/* Role cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Host card */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={goHost}
            className="group relative rounded-2xl p-6 text-left cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.05))',
              border: '1px solid rgba(37,99,235,0.3)',
            }}
          >
            <div className="text-4xl mb-3">🖥️</div>
            <div
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#60A5FA' }}
            >
              Giảng viên / Host
            </div>
            <div className="text-sm" style={{ color: '#475569' }}>
              Điều khiển trò chơi, hiển thị màn hình chiếu, xem bảng xếp hạng và phân tích
            </div>
            <div
              className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(37,99,235,0.2)', color: '#60A5FA' }}
            >
              HOST
            </div>
          </motion.button>

          {/* Player card */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={goPlayer}
            className="group relative rounded-2xl p-6 text-left cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))',
              border: '1px solid rgba(34,197,94,0.25)',
            }}
          >
            <div className="text-4xl mb-3">📱</div>
            <div
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#4ADE80' }}
            >
              Sinh viên / Player
            </div>
            <div className="text-sm" style={{ color: '#475569' }}>
              Tham gia bằng mã phòng, đưa ra quyết định và cạnh tranh trên bảng xếp hạng
            </div>
            <div
              className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(34,197,94,0.2)', color: '#4ADE80' }}
            >
              PLAYER
            </div>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs"
          style={{ color: '#334155' }}
        >
          Sinh viên có thể tham gia từ điện thoại qua QR code trên màn hình của giảng viên
        </motion.p>
      </div>
    </div>
  );
};

export default RoleSelector;

import { motion } from 'framer-motion';
import { GAME_CONFIG, ACHIEVEMENTS } from '../../data/missions';
import AnimatedBackground from '../shared/AnimatedBackground';

const EndGame = ({ players, onRestart }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  const handleExport = () => {
    const headers = 'Xếp hạng,Tên,MSSV,Điểm số,Achievements\n';
    const rows = sorted
      .map((p, idx) => {
        const achList = (p.achievements || []).map((a) => ACHIEVEMENTS.find((ac) => ac.id === a)?.label || a).join('; ');
        return `${idx + 1},"${p.name}","${p.studentId || ''}",${p.score},"${achList}"`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ket_qua_mission_decision_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent="#22C55E" showGrid intensity={1.2} />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <h2
              className="text-lg font-bold uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#F1F5F9' }}
            >
              Hoàn Thành Nhiệm Vụ
            </h2>
            <div className="text-xs" style={{ color: '#475569' }}>
              {GAME_CONFIG.subject}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="btn btn-ghost">
            📊 Xuất kết quả CSV
          </button>
          <button onClick={onRestart} className="btn btn-primary">
            🔄 Chơi lại
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center">
          {/* Trophy pop out */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 celebrate"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(20,184,166,0.1))',
              border: '1.5px solid rgba(34,197,94,0.3)',
              boxShadow: '0 0 50px rgba(34,197,94,0.25)',
            }}
          >
            <span className="text-5xl">🏆</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-4xl sm:text-5xl font-black mb-2"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#F1F5F9' }}
            >
              MISSION COMPLETE
            </h1>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto" style={{ color: '#64748B' }}>
              Quy trình phát triển và phân phối vaccine của Moderna kết thúc thắng lợi. Sinh viên đã nắm vững các biểu hiện
              mới của Độc quyền Nhà nước trong nền kinh tế tư bản.
            </p>
          </motion.div>

          {/* Winner highlight card */}
          {winner && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card max-w-md mx-auto p-6 mb-8 text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.03))',
                border: '1.5px solid rgba(255,215,0,0.35)',
                boxShadow: '0 0 45px rgba(255,215,0,0.15)',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{winner.avatar}</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                    👑 Nhà tư vấn xuất sắc nhất
                  </div>
                  <h3
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {winner.name}
                  </h3>
                  {winner.studentId && (
                    <div className="text-xs text-yellow-400/70">
                      MSSV: {winner.studentId}
                    </div>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-black text-yellow-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {winner.score}
                  </div>
                  <div className="text-xs text-yellow-400/50">Điểm số</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Podium overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {sorted.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass-card p-5 flex flex-col items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-xs"
                  style={{
                    background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32',
                    color: '#0a0f1c',
                  }}
                >
                  {i === 0 ? '1st' : i === 1 ? '2nd' : '3rd'}
                </div>
                <span className="text-3xl">{p.avatar}</span>
                <span className="text-sm font-bold text-white truncate w-full">{p.name}</span>
                <span className="text-lg font-black text-blue-400">{p.score} pts</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;

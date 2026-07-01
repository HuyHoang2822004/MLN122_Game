import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_CONFIG, ACHIEVEMENTS, assignTitles } from '../../data/missions';
import AnimatedBackground from '../shared/AnimatedBackground';

const EndGame = ({ players, onRestart }) => {
  const [activeTab, setActiveTab] = useState('LEADERBOARD');
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const titles = assignTitles(players);

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

      <div className="relative z-10 flex-1 flex flex-col items-center p-8 overflow-y-auto">
        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1
              className="text-4xl sm:text-5xl font-black mb-2"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#F1F5F9' }}
            >
              MISSION COMPLETE
            </h1>
            <p className="text-base sm:text-lg mb-6 max-w-xl mx-auto" style={{ color: '#64748B' }}>
              Quy trình phát triển và phân phối vaccine của Moderna kết thúc thắng lợi. Sinh viên đã nắm vững các biểu hiện
              mới của Độc quyền Nhà nước trong nền kinh tế tư bản.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('LEADERBOARD')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'LEADERBOARD'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              📊 Bảng Xếp Hạng
            </button>
            <button
              onClick={() => setActiveTab('HALL_OF_FAME')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'HALL_OF_FAME'
                  ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              🌟 Hall of Fame (Danh Hiệu)
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'LEADERBOARD' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-4xl mx-auto"
              >
                {/* Winner highlight card */}
                {winner && (
                  <div className="glass-card max-w-md mx-auto p-6 mb-8 text-left"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))',
                      border: '1.5px solid rgba(255,215,0,0.4)',
                      boxShadow: '0 0 40px rgba(255,215,0,0.2)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{winner.avatar}</span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                          Top 1 Cố Vấn
                        </div>
                        <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {winner.name}
                        </h3>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-3xl font-black text-yellow-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {winner.score}
                        </div>
                        <div className="text-xs text-yellow-400/70">Điểm số</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {sorted.slice(0, 3).map((p, i) => (
                    <div key={p.id} className="glass-card p-5 flex flex-col items-center gap-2"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                        style={{ background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : '#CD7F32', color: '#0a0f1c' }}>
                        {i === 0 ? '1st' : i === 1 ? '2nd' : '3rd'}
                      </div>
                      <span className="text-3xl">{p.avatar}</span>
                      <span className="text-sm font-bold text-white truncate w-full">{p.name}</span>
                      <span className="text-lg font-black text-blue-400">{p.score} pts</span>
                    </div>
                  ))}
                </div>

                {/* Rest of players */}
                <div className="glass-card p-2 text-left max-h-[300px] overflow-y-auto">
                  {sorted.slice(3).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl border-b border-white/5 last:border-0">
                      <div className="text-slate-500 font-bold w-6">{i + 4}</div>
                      <div className="text-2xl">{p.avatar}</div>
                      <div className="font-bold text-slate-200 flex-1">{p.name}</div>
                      <div className="font-black text-blue-400">{p.score} pts</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'HALL_OF_FAME' && (
              <motion.div
                key="hall_of_fame"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto pb-10"
              >
                {titles.length === 0 ? (
                  <div className="col-span-full text-slate-400 py-10">Chưa có danh hiệu nào được trao.</div>
                ) : (
                  titles.map((t, idx) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass-card p-5 text-left relative overflow-hidden group"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="text-4xl">{t.icon}</div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-1">{t.desc}</div>
                          <div className="text-lg font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: '#38BDF8' }}>
                            {t.label}
                          </div>
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-fit">
                            <span>{t.player.avatar}</span>
                            <span className="font-bold text-sm text-slate-200">{t.player.name}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EndGame;

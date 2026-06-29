import { motion } from 'framer-motion';
import { MISSIONS } from '../data/missions';
import StageIcon from './StageIcon';

const FinalScreen = ({ score, totalTime, onRestart, onHome, darkMode }) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const timelineItems = MISSIONS.map((m) => ({
    title: m.shortTitle,
    icon: m.icon,
    color: m.color,
  }));

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
      {/* Celebration background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34,197,94,0.08) 0%, rgba(10,15,28,1) 60%)'
            : 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(220,252,231,0.9) 0%, rgba(248,250,255,1) 60%)',
        }}
      />

      {/* Subtle floating particles - elegant, not confetti */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full -z-10"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 15}%`,
            background: ['#2563EB', '#14B8A6', '#22C55E', '#F59E0B'][i % 4],
            opacity: 0.25,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto">
        {/* Mission complete badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="text-center mb-8"
        >
          {/* Trophy icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(20,184,166,0.1))',
              border: '1.5px solid rgba(34,197,94,0.3)',
              boxShadow: '0 0 40px rgba(34,197,94,0.2)',
            }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5">
              <path d="M12 15c4.41 0 8-3.59 8-8V4H4v3c0 4.41 3.59 8 8 8z" />
              <path d="M8 19h8M12 15v4" />
              <path d="M4 4H2v3a5 5 0 0 0 5 5M20 4h2v3a5 5 0 0 1-5 5" />
            </svg>
          </div>

          <div className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: '#22C55E' }}>
            Hồ sơ Moderna hoàn chỉnh
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2"
            style={{ color: darkMode ? '#F1F5F9' : '#0F172A' }}>
            MISSION
            <span style={{
              background: 'linear-gradient(135deg, #22C55E, #14B8A6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}> COMPLETE</span>
          </h1>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mt-4"
            style={{
              background: darkMode ? 'rgba(34,197,94,0.08)' : 'rgba(220,252,231,0.8)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}>
            <span className="text-3xl font-black" style={{ color: '#22C55E' }}>{score}</span>
            <span className="text-xl font-light" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>/</span>
            <span className="text-3xl font-black" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>7</span>
            <div className="w-px h-8 mx-1" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
            <div>
              <div className="text-xs" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>Thời gian</div>
              <div className="text-sm font-mono font-bold" style={{ color: darkMode ? '#CBD5E1' : '#334155' }}>
                {formatTime(totalTime)}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl overflow-hidden mb-6"
          style={{
            background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(30px)',
            border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}
        >
          <div className="p-6">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5"
              style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>
              Hành trình vaccine
            </h3>

            <div className="flex flex-col gap-0">
              {timelineItems.map((item, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 py-3"
                  >
                    {/* Left: check + icon */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 300 }}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: '#22C55E' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${item.color}15` }}>
                        <StageIcon type={item.icon} size={17} color={item.color} />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <span className="text-sm font-semibold"
                        style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>
                        {item.title}
                      </span>
                    </div>

                    {/* Color dot */}
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: item.color }} />
                  </motion.div>

                  {/* Connector */}
                  {index < timelineItems.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="ml-3.5 w-px h-4"
                      style={{
                        background: `linear-gradient(180deg, ${item.color}40, ${timelineItems[index + 1].color}40)`,
                        transformOrigin: 'top',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="rounded-3xl p-6 mb-6"
          style={{
            background: darkMode ? 'rgba(37,99,235,0.08)' : 'rgba(219,234,254,0.7)',
            border: '1px solid rgba(37,99,235,0.2)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: '#2563EB' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#2563EB' }}>
                Key Takeaway
              </div>
              <p className="text-sm leading-relaxed"
                style={{ color: darkMode ? '#94A3B8' : '#475569' }}>
                Case Moderna cho thấy trong chủ nghĩa tư bản hiện đại, Nhà nước không đứng ngoài thị trường mà phối hợp chặt chẽ với doanh nghiệp lớn thông qua{' '}
                <strong style={{ color: darkMode ? '#93C5FD' : '#2563EB' }}>tài trợ nghiên cứu, cấp phép, hợp đồng mua trước</strong>{' '}
                và hỗ trợ chuỗi cung ứng.
              </p>
              <p className="text-sm font-semibold mt-2"
                style={{ color: darkMode ? '#CBD5E1' : '#334155' }}>
                Đây là một biểu hiện mới của độc quyền nhà nước.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={onHome}
            className="flex-1 py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
              color: darkMode ? '#CBD5E1' : '#475569',
            }}
          >
            Quay về màn hình chính
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
            }}
          >
            Chơi lại
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalScreen;

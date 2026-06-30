import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from '../shared/AnimatedBackground';

const StoryPhase = ({ mission, onReady }) => {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (countdown <= 0) { onReady(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [visible, countdown, onReady]);

  // Split story text into paragraphs
  const paragraphs = (mission.storyText || '').split('\n\n').filter(Boolean);

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground accent={mission.color} intensity={1.5} />

      {/* Chapter badge at top */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              background: `${mission.color}18`,
              border: `1px solid ${mission.color}40`,
              color: mission.color,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Chương {mission.chapter} · {mission.chapterName}
          </span>
        </motion.div>

        {/* Countdown pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span className="text-xs" style={{ color: '#64748B' }}>Câu hỏi bắt đầu sau</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={countdown}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 15, opacity: 0 }}
              className="text-lg font-black w-5 text-center"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: mission.color }}
            >
              {countdown}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main story content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-4">
        <div className="max-w-4xl w-full">

          {/* Story icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-4 mb-8"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: `${mission.color}18`,
                border: `1.5px solid ${mission.color}35`,
                boxShadow: `0 0 40px ${mission.color}25`,
              }}
            >
              {mission.icon}
            </div>
            <div>
              <div
                className="text-xs font-bold tracking-widest uppercase mb-1"
                style={{ color: mission.color }}
              >
                {mission.stage}
              </div>
              <h2
                className="text-2xl font-black"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#F1F5F9' }}
              >
                {mission.title}
              </h2>
            </div>
          </motion.div>

          {/* Story paragraphs with staggered reveal */}
          <div className="flex flex-col gap-5">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl leading-relaxed"
                style={{
                  color: i === 0 ? '#CBD5E1' : '#94A3B8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(16px, 2vw, 20px)',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Cinematic bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${mission.color}60, transparent)`,
              transformOrigin: 'left',
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="text-sm italic" style={{ color: '#334155' }}>
              Bạn đang là cố vấn chiến lược của Chính phủ —
            </span>
            <span className="text-sm font-semibold" style={{ color: mission.color }}>
              {mission.description}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Progress bar countdown */}
      <div className="relative z-10 px-8 pb-6">
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: '100%' }}
            animate={{ width: `${(countdown / 5) * 100}%` }}
            transition={{ duration: 0.9, ease: 'linear' }}
            style={{ background: `linear-gradient(90deg, ${mission.color}88, ${mission.color})` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryPhase;

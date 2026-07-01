import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BUTTON_STYLES = {
  A: { bg: 'linear-gradient(135deg,#1D4ED8,#2563EB)', activeShadow: 'rgba(37,99,235,0.4)', shape: '▲' },
  B: { bg: 'linear-gradient(135deg,#0F766E,#14B8A6)', activeShadow: 'rgba(20,184,166,0.4)', shape: '◆' },
  C: { bg: 'linear-gradient(135deg,#D97706,#F59E0B)', activeShadow: 'rgba(245,158,11,0.4)', shape: '●' },
  D: { bg: 'linear-gradient(135deg,#DC2626,#EF4444)', activeShadow: 'rgba(239,68,68,0.4)', shape: '■' },
};

const DecisionCard = ({ mission, onVote }) => {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(mission.timeLimit);

  // Time Limit Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSelect = (choiceId) => {
    if (selected) return;
    setSelected(choiceId);
    onVote(choiceId, timeLeft);
  };

  return (
    <div className="player-layout flex flex-col justify-between p-6 min-h-screen">
      {/* Top details */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: `${mission.color}15`,
              border: `1px solid ${mission.color}30`,
              color: mission.color,
            }}
          >
            Chương {mission.chapter} · {mission.chapterName}
          </span>

          {/* Time text indicator */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">Giới hạn thời gian</span>
            <span
              className="text-sm font-bold font-mono"
              style={{ color: timeLeft <= 5 ? '#EF4444' : timeLeft <= 10 ? '#F59E0B' : '#22C55E' }}
            >
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question Header */}
        <h2 className="text-lg font-bold text-white mb-4 leading-snug">
          {mission.question}
        </h2>

        {/* Progress Bar timer */}
        <div className="progress-bar-track w-full mb-6">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${(timeLeft / mission.timeLimit) * 100}%` }}
            transition={{ duration: 0.9, ease: 'linear' }}
            style={{
              background: timeLeft <= 5 ? '#EF4444' : timeLeft <= 10 ? '#F59E0B' : '#22C55E',
            }}
          />
        </div>
      </div>

      {/* Decision choice buttons */}
      <div className="relative z-10 flex-1 flex flex-col gap-3 justify-center">
        {mission.choices.map((choice) => {
          const style = BUTTON_STYLES[choice.id];
          const isSelected = selected === choice.id;
          const isLocked = selected !== null;

          return (
            <motion.button
              key={choice.id}
              disabled={isLocked}
              whileTap={!isLocked ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(choice.id)}
              className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all relative overflow-hidden cursor-pointer"
              style={{
                background: style.bg,
                boxShadow: isSelected ? `0 0 25px ${style.activeShadow}` : 'none',
                opacity: isLocked && !isSelected ? 0.35 : 1,
                border: isSelected ? '2px solid rgba(255,255,255,0.7)' : '2px solid transparent',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
              >
                {style.shape}
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-white leading-tight">
                  {choice.id}. {choice.text}
                </span>
              </div>
              {isSelected && <span className="text-white text-lg">✓</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Locked vote feedback */}
      <div className="relative z-10 mt-6 text-center">
        {selected ? (
          <div className="text-sm font-semibold text-blue-400">
            Đã gửi quyết định! Đang chờ kết quả...
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            Hãy chọn một quyết định phù hợp nhất trước khi hết giờ.
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionCard;

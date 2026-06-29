import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MISSIONS } from '../data/missions';

const TopBar = ({ unlockedStages, currentStage, elapsed, onRestart, darkMode, onToggleDark, soundOn, onToggleSound }) => {
  const progress = (unlockedStages / MISSIONS.length) * 100;
  const mission = MISSIONS[currentStage] || MISSIONS[0];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        background: darkMode
          ? 'rgba(10,15,28,0.9)'
          : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563EB, #14B8A6)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase"
            style={{ color: darkMode ? '#94A3B8' : '#64748B' }}>
            Mission Moderna
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>
              Hồ sơ Moderna
            </span>
            <span className="text-xs font-bold" style={{ color: mission.color }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden"
            style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2563EB, #14B8A6)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Current stage */}
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-xs" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>Hồ sơ</span>
          <span className="text-sm font-bold" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>
            {currentStage + 1} / {MISSIONS.length}
          </span>
        </div>

        {/* Timer */}
        <div className="hidden sm:flex flex-col items-center">
          <span className="text-xs" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>Thời gian</span>
          <span className="text-sm font-mono font-bold" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>
            {formatTime(elapsed)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              color: soundOn ? (darkMode ? '#E2E8F0' : '#334155') : (darkMode ? '#475569' : '#94A3B8'),
            }}
            title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundOn ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: darkMode ? '#E2E8F0' : '#334155' }}
            title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {darkMode ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Restart button */}
          <button
            onClick={onRestart}
            className="h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all"
            style={{
              background: darkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.08)',
              color: '#EF4444',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
            title="Bắt đầu lại"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
            </svg>
            <span className="hidden sm:inline">Lại</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

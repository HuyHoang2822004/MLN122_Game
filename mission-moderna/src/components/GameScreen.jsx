import { motion, AnimatePresence } from 'framer-motion';
import MissionMap from './MissionMap';
import QuestionCard from './QuestionCard';
import { MISSIONS } from '../data/missions';

const GameScreen = ({ currentStage, unlockedStages, onCorrect, onSelectStage, darkMode }) => {
  const mission = MISSIONS[currentStage];

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 60,
        paddingBottom: 12,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dynamic background gradient */}
      <motion.div
        key={currentStage}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: darkMode
            ? `radial-gradient(ellipse 90% 60% at 50% 0%, ${mission.color}09 0%, rgba(10,15,28,1) 65%)`
            : `radial-gradient(ellipse 90% 60% at 50% 0%, ${mission.color}11 0%, rgba(248,250,255,1) 65%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />

      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 16px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* ── Mission Map (Hồ sơ roadmap) ── */}
        <div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: 6,
              color: darkMode ? '#475569' : '#94A3B8',
            }}
          >
            Mở khóa hồ sơ Moderna
          </div>
          <MissionMap
            unlockedStages={unlockedStages}
            currentStage={currentStage}
            onSelectStage={onSelectStage}
            darkMode={darkMode}
          />
        </div>

        {/* ── Current stage location badge ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentStage}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            style={{ textAlign: 'center' }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 14px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                background: darkMode ? `${mission.color}14` : `${mission.color}10`,
                border: `1px solid ${mission.color}30`,
                color: mission.color,
              }}
            >
              <span style={{ fontSize: 13 }}>
                {currentStage < MISSIONS.length - 1 ? '🔍' : '🏆'}
              </span>
              {mission.stage} — {mission.title}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* ── Question Card ── */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={`question-${currentStage}`}
            mission={mission}
            onCorrect={onCorrect}
            darkMode={darkMode}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameScreen;

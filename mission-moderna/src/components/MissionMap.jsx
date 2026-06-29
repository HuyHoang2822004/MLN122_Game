import { motion } from 'framer-motion';
import { MISSIONS } from '../data/missions';

const MissionMap = ({ unlockedStages, currentStage, onSelectStage, darkMode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="flex items-center justify-center gap-0"
        style={{ minWidth: 'fit-content', padding: '0 8px' }}
      >
        {MISSIONS.map((mission, index) => {
          const isUnlocked = unlockedStages > index;
          const isCompleted = unlockedStages > index + 1;
          const isCurrent = currentStage === index;
          const isLocked = !isUnlocked;

          return (
            <div key={mission.id} className="flex items-center">
              {/* Stage Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => isUnlocked && onSelectStage(index)}
                title={isLocked ? `🔒 ${mission.stage}` : mission.stage}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '6px 8px',
                  borderRadius: 14,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  minWidth: 62,
                  transition: 'all 0.25s',
                  background: isCurrent
                    ? (darkMode ? `${mission.color}22` : `${mission.color}18`)
                    : isCompleted
                    ? (darkMode ? 'rgba(34,197,94,0.12)' : 'rgba(220,252,231,0.9)')
                    : (darkMode ? 'rgba(30,41,59,0.5)' : 'rgba(241,245,249,0.8)'),
                  border: isCurrent
                    ? `1.5px solid ${mission.color}55`
                    : isCompleted
                    ? '1.5px solid rgba(34,197,94,0.35)'
                    : darkMode
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid rgba(0,0,0,0.07)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isCurrent
                    ? `0 0 16px ${mission.color}28, 0 2px 10px rgba(0,0,0,0.1)`
                    : isCompleted
                    ? '0 0 10px rgba(34,197,94,0.12)'
                    : 'none',
                  opacity: isLocked ? 0.55 : 1,
                }}
                whileHover={isUnlocked ? { scale: 1.06, y: -2 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                {/* Lock / Check / Number icon */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    background: isLocked
                      ? darkMode ? 'rgba(71,85,105,0.4)' : 'rgba(203,213,225,0.5)'
                      : isCompleted
                      ? '#22C55E'
                      : `${mission.color}22`,
                    color: isLocked
                      ? darkMode ? '#64748B' : '#94A3B8'
                      : isCompleted
                      ? 'white'
                      : mission.color,
                  }}
                >
                  {isLocked ? '🔒' : isCompleted ? '✓' : index + 1}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    color: isLocked
                      ? darkMode ? '#475569' : '#94A3B8'
                      : isCompleted
                      ? '#22C55E'
                      : isCurrent
                      ? mission.color
                      : darkMode ? '#CBD5E1' : '#334155',
                  }}
                >
                  {mission.id < 7 ? `Hồ sơ\n${mission.id}` : 'Tổng\nkết'}
                </div>

                {/* Pulse ring for current */}
                {isCurrent && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 14,
                      border: `2px solid ${mission.color}`,
                      pointerEvents: 'none',
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Connector */}
              {index < MISSIONS.length - 1 && (
                <div style={{ width: 14, height: 2, position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      background: darkMode ? 'rgba(71,85,105,0.5)' : 'rgba(203,213,225,0.9)',
                    }}
                  />
                  {isCompleted && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #22C55E, #14B8A6)',
                        transformOrigin: 'left',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionMap;

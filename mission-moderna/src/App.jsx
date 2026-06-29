import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import FinalScreen from './components/FinalScreen';
import TopBar from './components/TopBar';
import { MISSIONS } from './data/missions';
import './index.css';

const SCREENS = {
  LANDING: 'landing',
  GAME: 'game',
  FINAL: 'final',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [currentStage, setCurrentStage] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState(1); // stage index up to which is unlocked
  const [score, setScore] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  // Timer
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Apply dark mode to body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.background = darkMode ? '#0A0F1C' : '#F8FAFF';
    document.body.style.color = darkMode ? '#F1F5F9' : '#0F172A';
  }, [darkMode]);

  const handleStart = useCallback(() => {
    setScreen(SCREENS.GAME);
    setTimerActive(true);
  }, []);

  const handleCorrect = useCallback(() => {
    setScore((s) => s + 1);
    const nextStage = currentStage + 1;

    if (nextStage >= MISSIONS.length) {
      // All done
      setTimerActive(false);
      setTotalTime(elapsed);
      setTimeout(() => {
        setScreen(SCREENS.FINAL);
      }, 1800);
    } else {
      setUnlockedStages((u) => Math.max(u, nextStage + 1));
      setTimeout(() => {
        setCurrentStage(nextStage);
      }, 1800);
    }
  }, [currentStage, elapsed]);

  const handleSelectStage = useCallback((stageIndex) => {
    if (stageIndex < unlockedStages) {
      setCurrentStage(stageIndex);
    }
  }, [unlockedStages]);

  const handleRestart = useCallback(() => {
    setCurrentStage(0);
    setUnlockedStages(1);
    setScore(0);
    setElapsed(0);
    setTotalTime(0);
    setScreen(SCREENS.GAME);
    setTimerActive(true);
  }, []);

  const handleHome = useCallback(() => {
    setCurrentStage(0);
    setUnlockedStages(1);
    setScore(0);
    setElapsed(0);
    setTotalTime(0);
    setScreen(SCREENS.LANDING);
    setTimerActive(false);
  }, []);

  return (
    <div style={{ minHeight: '100vh', transition: 'background 0.4s, color 0.4s' }}>
      {/* Top bar - only during game */}
      <AnimatePresence>
        {screen === SCREENS.GAME && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TopBar
              unlockedStages={unlockedStages}
              currentStage={currentStage}
              elapsed={elapsed}
              onRestart={handleRestart}
              darkMode={darkMode}
              onToggleDark={() => setDarkMode((d) => !d)}
              soundOn={soundOn}
              onToggleSound={() => setSoundOn((s) => !s)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark/light toggle on non-game screens */}
      {screen !== SCREENS.GAME && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
              color: darkMode ? '#94A3B8' : '#64748B',
            }}
          >
            {darkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {screen === SCREENS.LANDING && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStart={handleStart} darkMode={darkMode} />
          </motion.div>
        )}

        {screen === SCREENS.GAME && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GameScreen
              currentStage={currentStage}
              unlockedStages={unlockedStages}
              onCorrect={handleCorrect}
              onSelectStage={handleSelectStage}
              darkMode={darkMode}
            />
          </motion.div>
        )}

        {screen === SCREENS.FINAL && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalScreen
              score={score}
              totalTime={totalTime}
              onRestart={handleRestart}
              onHome={handleHome}
              darkMode={darkMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

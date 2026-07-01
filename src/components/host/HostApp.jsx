import { useState, useEffect, useCallback } from 'react';
import Lobby from './Lobby';
import StoryPhase from './StoryPhase';
import QuestionPhase from './QuestionPhase';
import ResultsChart from './ResultsChart';
import AIExplanation from './AIExplanation';
import CinematicIntro from './CinematicIntro';
import Leaderboard from './Leaderboard';
import EndGame from './EndGame';
import { MISSIONS, GAME_CONFIG, createDefaultStats } from '../../data/missions';
import { useGameSync, HOST_MSG, PLAYER_MSG } from '../../store/useGameSync';

const PHASES = {
  LOBBY: 'LOBBY',
  CINEMATIC: 'CINEMATIC',
  STORY: 'STORY',
  QUESTION: 'QUESTION',
  RESULTS: 'RESULTS',
  EXPLANATION: 'EXPLANATION',
  LEADERBOARD: 'LEADERBOARD',
  END: 'END',
};

const HostApp = ({ roomCode }) => {
  const [players, setPlayers] = useState([]);
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [phase, setPhase] = useState(PHASES.LOBBY);
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [votedPlayerIds, setVotedPlayerIds] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(GAME_CONFIG.timeLimit);
  const [timerActive, setTimerActive] = useState(false);

  const mission = MISSIONS[currentMissionIdx];

  // Game channel syncing
  const { send } = useGameSync((msg) => {
    switch (msg.type) {
      case PLAYER_MSG.JOIN:
        setPlayers((prev) => {
          if (prev.some((p) => p.id === msg.player.id)) return prev;
          const updated = [...prev, {
            ...msg.player,
            score: 0,
            combo: 0,
            achievements: [],
            stats: createDefaultStats(),
          }];
          broadcastState(phase, currentMissionIdx, updated, votes, votedPlayerIds);
          return updated;
        });
        break;

      case PLAYER_MSG.VOTE:
        if (phase !== PHASES.QUESTION) return;
        setVotedPlayerIds((prev) => {
          if (prev.has(msg.playerId)) return prev;
          const next = new Set(prev);
          next.add(msg.playerId);

          // Update vote counts
          setVotes((v) => {
            const nextVotes = { ...v, [msg.choiceId]: (v[msg.choiceId] || 0) + 1 };
            if (next.size >= players.length && players.length > 0) {
              setTimerActive(false);
              setPhase(PHASES.RESULTS);
            }
            return nextVotes;
          });

          // Calculate and update player stats
          setPlayers((prevPlayers) => {
            const correctChoice = mission.correct;
            const isCorrect = msg.choiceId === correctChoice;
            const updated = prevPlayers.map((p) => {
              if (p.id !== msg.playerId) return p;
              const nextCombo = isCorrect ? p.combo + 1 : 0;
              const addedScore = isCorrect
                ? Math.round((100 + 30 * (msg.timeRemaining / mission.timeLimit)) * (nextCombo >= 3 ? 1.5 : nextCombo >= 2 ? 1.25 : 1))
                : 0;

              // Accumulate choice indicators
              const choiceObj = mission.choices.find(c => c.id === msg.choiceId);
              const nextStats = { ...p.stats } || createDefaultStats();
              if (choiceObj && choiceObj.indicators) {
                Object.entries(choiceObj.indicators).forEach(([key, val]) => {
                  nextStats[key] = (nextStats[key] || 0) + val;
                });
              }
              nextStats.choices = [...(nextStats.choices || []), msg.choiceId];
              nextStats.correctCount = (nextStats.correctCount || 0) + (isCorrect ? 1 : 0);
              nextStats.questionsAnswered = (nextStats.questionsAnswered || 0) + 1;
              const timeUsed = mission.timeLimit - msg.timeRemaining;
              nextStats.totalTimeUsed = (nextStats.totalTimeUsed || 0) + timeUsed;
              if (timeUsed <= 5) {
                nextStats.speedCount = (nextStats.speedCount || 0) + 1;
              }
              nextStats.maxCombo = Math.max(nextStats.maxCombo || 0, nextCombo);

              // Compute achievements (kept for internal tracking)
              const nextAchievements = [...p.achievements];
              if (isCorrect && !nextAchievements.includes('warp_speed') && msg.timeRemaining >= mission.timeLimit - 3) {
                nextAchievements.push('warp_speed');
              }
              if (nextCombo >= 3 && !nextAchievements.includes('perfect_combo')) {
                nextAchievements.push('perfect_combo');
              }

              return {
                ...p,
                score: p.score + addedScore,
                combo: nextCombo,
                achievements: nextAchievements,
                stats: nextStats,
              };
            });
            return updated;
          });

          return next;
        });
        break;

      case PLAYER_MSG.LEAVE:
        setPlayers((prev) => prev.filter((p) => p.id !== msg.playerId));
        setVotedPlayerIds((prev) => {
          const next = new Set(prev);
          next.delete(msg.playerId);
          return next;
        });
        break;
      default:
        break;
    }
  });

  // Broadcast current state to all players
  const broadcastState = useCallback((nextPhase, nextIdx, nextPlayers, currentVotes, votedIds) => {
    send({
      type: HOST_MSG.GAME_STATE,
      roomCode,
      phase: nextPhase,
      missionIdx: nextIdx,
      players: nextPlayers.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        score: p.score,
        combo: p.combo,
        achievements: p.achievements,
        stats: p.stats,
      })),
      votes: currentVotes,
      votedCount: votedIds.size,
    });
  }, [roomCode, send]);

  // Sync state on phase change
  useEffect(() => {
    broadcastState(phase, currentMissionIdx, players, votes, votedPlayerIds);
  }, [phase, currentMissionIdx, players, votes, votedPlayerIds, broadcastState]);

  // Question countdown timer
  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining((t) => t - 1), 1000);
    } else if (timerActive && timeRemaining === 0) {
      setTimerActive(false);
      setPhase(PHASES.RESULTS);
    }
    return () => clearTimeout(timer);
  }, [timerActive, timeRemaining]);

  const handleStartGame = () => {
    setPhase(PHASES.CINEMATIC);
  };

  const handleCinematicComplete = () => {
    setPhase(PHASES.STORY);
  };

  const handleStoryReady = () => {
    setVotes({ A: 0, B: 0, C: 0, D: 0 });
    setVotedPlayerIds(new Set());
    setTimeRemaining(mission.timeLimit);
    setPhase(PHASES.QUESTION);
    setTimerActive(true);
  };

  const handleForceEnd = () => {
    setTimerActive(false);
    setPhase(PHASES.RESULTS);
  };

  const handleRevealExplain = () => {
    setPhase(PHASES.EXPLANATION);
  };

  const handleCloseExplain = () => {
    setPhase(PHASES.LEADERBOARD);
  };

  const handleNextFromLeaderboard = () => {
    if (currentMissionIdx >= MISSIONS.length - 1) {
      setPhase(PHASES.END);
    } else {
      setCurrentMissionIdx((idx) => idx + 1);
      setPhase(PHASES.STORY);
    }
  };

  const handleRestart = () => {
    setPlayers((prev) => prev.map((p) => ({
      ...p,
      score: 0,
      combo: 0,
      achievements: [],
      stats: createDefaultStats(),
    })));
    setCurrentMissionIdx(0);
    setVotes({ A: 0, B: 0, C: 0, D: 0 });
    setVotedPlayerIds(new Set());
    setPhase(PHASES.LOBBY);
  };

  return (
    <>
      {phase === PHASES.LOBBY && (
        <Lobby players={players} onStart={handleStartGame} roomCode={roomCode} />
      )}
      {phase === PHASES.CINEMATIC && (
        <CinematicIntro onComplete={handleCinematicComplete} />
      )}
      {phase === PHASES.STORY && (
        <StoryPhase mission={mission} onReady={handleStoryReady} />
      )}
      {phase === PHASES.QUESTION && (
        <QuestionPhase
          mission={mission}
          votes={votes}
          votedCount={votedPlayerIds.size}
          totalPlayers={players.length}
          timeRemaining={timeRemaining}
          onForceEnd={handleForceEnd}
        />
      )}
      {phase === PHASES.RESULTS && (
        <ResultsChart
          mission={mission}
          votes={votes}
          onRevealExplain={handleRevealExplain}
          onNext={handleCloseExplain}
          isLastMission={currentMissionIdx === MISSIONS.length - 1}
        />
      )}
      {phase === PHASES.EXPLANATION && (
        <AIExplanation
          mission={mission}
          onClose={handleCloseExplain}
        />
      )}
      {phase === PHASES.LEADERBOARD && (
        <Leaderboard
          players={players}
          mission={mission}
          onNext={handleNextFromLeaderboard}
          isLastMission={currentMissionIdx === MISSIONS.length - 1}
        />
      )}
      {phase === PHASES.END && (
        <EndGame players={players} onRestart={handleRestart} />
      )}
    </>
  );
};

export default HostApp;

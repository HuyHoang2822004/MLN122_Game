import { useState, useEffect } from 'react';
import PlayerJoin from './PlayerJoin';
import PlayerWaiting from './PlayerWaiting';
import DecisionCard from './DecisionCard';
import PlayerResults from './PlayerResults';
import PlayerEndGame from './PlayerEndGame';
import { MISSIONS } from '../../data/missions';
import { useGameSync, HOST_MSG, PLAYER_MSG } from '../../store/useGameSync';

const PHASES = {
  JOIN: 'JOIN',
  WAITING: 'WAITING',
  STORY: 'STORY',
  DECISION: 'DECISION',
  RESULTS: 'RESULTS',
  END: 'END',
};

const PlayerApp = ({ roomCode }) => {
  const [player, setPlayer] = useState(null);
  const [hostPhase, setHostPhase] = useState(null);
  const [playersList, setPlayersList] = useState([]);
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [currentVoteChoiceId, setCurrentVoteChoiceId] = useState(null);
  const [phase, setPhase] = useState(PHASES.JOIN);

  const mission = MISSIONS[currentMissionIdx];

  const { send } = useGameSync((msg) => {
    switch (msg.type) {
      case HOST_MSG.GAME_STATE:
        if (msg.roomCode !== roomCode) return;
        setPlayersList(msg.players);
        setCurrentMissionIdx(msg.missionIdx);
        setHostPhase(msg.phase);

        // Sync player state with host phase transitions
        if (player) {
          // Update own score & achievements from host list if host has modified them
          const me = msg.players.find((p) => p.id === player.id);
          if (me) {
            setPlayer((p) => ({ ...p, score: me.score, combo: me.combo, achievements: me.achievements }));
          }

          if (msg.phase === 'LOBBY') {
            setPhase(PHASES.WAITING);
            setCurrentVoteChoiceId(null);
          } else if (msg.phase === 'STORY') {
            setPhase(PHASES.STORY);
            setCurrentVoteChoiceId(null);
          } else if (msg.phase === 'QUESTION') {
            setPhase(PHASES.DECISION);
          } else if (msg.phase === 'RESULTS' || msg.phase === 'EXPLANATION') {
            setPhase(PHASES.RESULTS);
          } else if (msg.phase === 'LEADERBOARD') {
            setPhase(PHASES.RESULTS);
          } else if (msg.phase === 'END') {
            setPhase(PHASES.END);
          }
        }
        break;
      default:
        break;
    }
  });

  const handleJoin = (joinedPlayer) => {
    setPlayer(joinedPlayer);
    setPhase(PHASES.WAITING);
    send({
      type: PLAYER_MSG.JOIN,
      player: joinedPlayer,
    });
  };

  const handleVote = (choiceId, timeRemaining) => {
    setCurrentVoteChoiceId(choiceId);
    send({
      type: PLAYER_MSG.VOTE,
      playerId: player.id,
      choiceId,
      timeRemaining,
    });
  };

  // Broadcast exit on leave
  useEffect(() => {
    const handleUnload = () => {
      if (player) {
        send({
          type: PLAYER_MSG.LEAVE,
          playerId: player.id,
        });
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [player, send]);

  return (
    <>
      {phase === PHASES.JOIN && (
        <PlayerJoin roomCode={roomCode} onJoin={handleJoin} />
      )}
      {phase === PHASES.WAITING && (
        <PlayerWaiting player={player} roomCode={roomCode} playersCount={playersList.length} />
      )}
      {phase === PHASES.STORY && (
        <div className="player-layout flex flex-col justify-center items-center p-6 min-h-screen text-center gap-6">
          <span className="text-5xl animate-bounce">📖</span>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Chương {mission.chapter}</h3>
            <p className="text-sm text-slate-400">
              Hãy quan sát màn hình chiếu để theo dõi cốt truyện.
            </p>
          </div>
        </div>
      )}
      {phase === PHASES.DECISION && (
        <DecisionCard mission={mission} onVote={handleVote} />
      )}
      {phase === PHASES.RESULTS && (
        <PlayerResults
          mission={mission}
          choiceId={currentVoteChoiceId}
          score={player?.score || 0}
          combo={player?.combo || 0}
        />
      )}
      {phase === PHASES.END && (
        <PlayerEndGame player={player} players={playersList} />
      )}
    </>
  );
};

export default PlayerApp;

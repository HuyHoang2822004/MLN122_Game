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
  CINEMATIC: 'CINEMATIC',
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
          // Update own stats from host
          const me = msg.players.find((p) => p.id === player.id);
          if (me) {
            setPlayer((p) => ({
              ...p,
              score: me.score,
              combo: me.combo,
              achievements: me.achievements,
              stats: me.stats,
            }));
          }

          if (msg.phase === 'LOBBY') {
            setPhase(PHASES.WAITING);
            setCurrentVoteChoiceId(null);
          } else if (msg.phase === 'CINEMATIC') {
            setPhase(PHASES.CINEMATIC);
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
      {phase === PHASES.CINEMATIC && (
        <div className="player-layout flex flex-col justify-center items-center p-6 min-h-screen text-center gap-6">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
          <div>
            <h3 className="text-xl font-bold text-red-400 mb-2 uppercase tracking-widest">ALERT</h3>
            <p className="text-sm text-slate-400">
              National Emergency — Hãy theo dõi màn hình chiếu.
            </p>
          </div>
        </div>
      )}
      {phase === PHASES.STORY && (
        <div className="player-layout flex flex-col justify-center items-center p-6 min-h-screen text-center gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
            }}
          >
            FILE {mission.chapter}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Emergency Meeting #{mission.chapter}</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Hãy quan sát màn hình chiếu để nắm bắt tình huống trước khi đưa ra quyết định.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            BACKGROUND BRIEFING
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
        />
      )}
      {phase === PHASES.END && (
        <PlayerEndGame player={player} players={playersList} />
      )}
    </>
  );
};

export default PlayerApp;

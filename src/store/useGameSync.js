// ──────────────────────────────────────────────────────
//  useGameSync – ntfy.sh WebSocket / POST sync hook
//  Enables real-time cross-device state synchronization.
// ──────────────────────────────────────────────────────
import { useEffect, useRef, useCallback } from 'react';

// Message types from Host → Players
export const HOST_MSG = {
  GAME_STATE:  'HOST_GAME_STATE',   // full state broadcast
  PHASE_CHANGE:'HOST_PHASE_CHANGE', // phase transition
};

// Message types from Player → Host
export const PLAYER_MSG = {
  JOIN:  'PLAYER_JOIN',  // player joining the room
  VOTE:  'PLAYER_VOTE',  // player casting a vote
  LEAVE: 'PLAYER_LEAVE', // player leaving
};

// Simple compression dictionary to keep payload under ntfy's 4KB recommended size limit
function compress(msg) {
  if (!msg) return msg;
  const c = {};
  if (msg.type) c.t = msg.type;
  if (msg.roomCode) c.r = msg.roomCode;
  if (msg.phase) c.p = msg.phase;
  if (msg.missionIdx !== undefined) c.m = msg.missionIdx;
  if (msg.votedCount !== undefined) c.vc = msg.votedCount;
  if (msg.votes) c.v = msg.votes;
  
  if (msg.players) {
    c.pl = msg.players.map(p => ({
      i: p.id,
      n: p.name,
      a: p.avatar,
      s: p.score,
      c: p.combo,
      h: p.achievements
    }));
  }

  if (msg.player) {
    c.pl = {
      i: msg.player.id,
      n: msg.player.name,
      si: msg.player.studentId,
      a: msg.player.avatar
    };
  }
  if (msg.playerId) c.pi = msg.playerId;
  if (msg.choiceId) c.ci = msg.choiceId;
  if (msg.timeRemaining !== undefined) c.tr = msg.timeRemaining;

  return c;
}

function decompress(c) {
  if (!c) return c;
  const msg = {};
  if (c.t) msg.type = c.t;
  if (c.r) msg.roomCode = c.r;
  if (c.p) msg.phase = c.p;
  if (c.m !== undefined) msg.missionIdx = c.m;
  if (c.vc !== undefined) msg.votedCount = c.vc;
  if (c.v) msg.votes = c.v;

  if (c.pl) {
    if (Array.isArray(c.pl)) {
      msg.players = c.pl.map(p => ({
        id: p.i,
        name: p.n,
        avatar: p.a,
        score: p.s,
        combo: p.c,
        achievements: p.h
      }));
    } else {
      msg.player = {
        id: c.pl.i,
        name: c.pl.n,
        studentId: c.pl.si,
        avatar: c.pl.a
      };
    }
  }
  if (c.pi) msg.playerId = c.pi;
  if (c.ci) msg.choiceId = c.ci;
  if (c.tr !== undefined) msg.timeRemaining = c.tr;

  return msg;
}

/**
 * useGameSync – subscribe to ntfy.sh pub/sub topics
 * @param {function} onMessage - callback invoked with each message object
 * @returns {{ send }} - call send(message) to publish to the other role
 */
export function useGameSync(onMessage) {
  // Parse role and room code from URL params
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') || 'player';
  const roomCode = params.get('room') || '847291';

  // Host publishes to "host" topic and subscribes to "player" topic
  // Player publishes to "player" topic and subscribes to "host" topic
  const subscribeTopic = role === 'host' 
    ? `mln122_game_${roomCode}_player` 
    : `mln122_game_${roomCode}_host`;

  const publishTopic = role === 'host' 
    ? `mln122_game_${roomCode}_host` 
    : `mln122_game_${roomCode}_player`;

  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    let ws;
    let reconnectTimeout;
    let isClosed = false;

    function connect() {
      if (isClosed) return;
      
      // Use ntfy.sh raw WebSocket connection
      ws = new WebSocket(`wss://ntfy.sh/${subscribeTopic}/ws`);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'message') {
            const decompressed = decompress(JSON.parse(data.message));
            onMessageRef.current?.(decompressed);
          }
        } catch {
          // Silent catch to handle any non-JSON/malformed external messages
        }
      };

      ws.onclose = () => {
        if (!isClosed) {
          reconnectTimeout = setTimeout(connect, 3000);
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      isClosed = true;
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [subscribeTopic]);

  const send = useCallback((message) => {
    const payload = JSON.stringify(compress(message));
    fetch(`https://ntfy.sh/${publishTopic}`, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'text/plain',
      },
    }).catch((err) => {
      console.error("Failed to publish message:", err);
    });
  }, [publishTopic]);

  return { send };
}

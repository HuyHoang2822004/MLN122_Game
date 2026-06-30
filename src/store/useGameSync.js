// ──────────────────────────────────────────────────────
//  useGameSync – BroadcastChannel hook for real-time sync
//  Works across tabs/windows in the same browser on the
//  same device. For cross-device (phone) use, run with
//  `npm run dev` then access via your LAN IP:
//    http://[your-ip]:5173/?role=player&room=847291
// ──────────────────────────────────────────────────────
import { useEffect, useRef, useCallback } from 'react';

const CHANNEL_NAME = 'mission-decision-sync';

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

/**
 * useGameSync – subscribe to BroadcastChannel messages
 * @param {function} onMessage - callback invoked with each message object
 * @returns {{ send }} - call send(message) to broadcast to other tabs
 */
export function useGameSync(onMessage) {
  const channelRef = useRef(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event) => {
      onMessageRef.current?.(event.data);
    };
    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  const send = useCallback((message) => {
    channelRef.current?.postMessage(message);
  }, []);

  return { send };
}

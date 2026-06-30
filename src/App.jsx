import { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import HostApp from './components/host/HostApp';
import PlayerApp from './components/player/PlayerApp';
import { GAME_CONFIG } from './data/missions';
import './index.css';

function App() {
  const [role, setRole] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get('role');
    const rm = params.get('room');

    if (r === 'host') {
      setRole('host');
      setRoom(rm || GAME_CONFIG.roomCode);
    } else if (r === 'player') {
      setRole('player');
      setRoom(rm || GAME_CONFIG.roomCode);
    } else {
      setRole(null);
    }
  }, []);

  if (role === 'host') {
    return <HostApp roomCode={room} />;
  }

  if (role === 'player') {
    return <PlayerApp roomCode={room} />;
  }

  return <RoleSelector />;
}

export default App;

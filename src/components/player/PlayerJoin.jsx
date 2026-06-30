import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../shared/AnimatedBackground';

const AVATARS = ['🦊', '🐼', '🦁', '🐺', 'Eagle', '🐉', '🤖', '🧠', '⚡', '🔥', '🎯', '💎', '🌟', '🏆'];

const PlayerJoin = ({ roomCode, onJoin }) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    setError('');
    onJoin({
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      studentId: studentId.trim(),
      avatar,
    });
  };

  return (
    <div className="player-layout flex items-center justify-center p-6 min-h-screen">
      <AnimatedBackground intensity={0.5} showGrid={false} />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
          style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 inline-block">🎯</span>
            <h2
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Tham Gia Nhiệm Vụ
            </h2>
            <p className="text-xs text-blue-400 font-mono mt-1">Phòng: {roomCode}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Hoàng Nam"
                maxLength={20}
                className="input-field"
                required
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Mã số sinh viên (Không bắt buộc)
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Ví dụ: B20DCCN123"
                maxLength={15}
                className="input-field"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Chọn Avatar Emoji
              </label>
              <div className="grid grid-cols-7 gap-2">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatar(emoji)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer"
                    style={{
                      background: avatar === emoji ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.03)',
                      border: avatar === emoji ? '1.5px solid #2563EB' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {emoji === 'Eagle' ? '🦅' : emoji}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="text-xs text-red-400 font-semibold">{error}</div>}

            {/* Join CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full mt-2"
            >
              Vào phòng chờ 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerJoin;

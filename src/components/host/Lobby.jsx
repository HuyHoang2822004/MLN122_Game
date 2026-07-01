import { motion, AnimatePresence } from 'framer-motion';
import { GAME_CONFIG } from '../../data/missions';
import AnimatedBackground from '../shared/AnimatedBackground';


const Lobby = ({ players, onStart, roomCode }) => {
  const joinUrl = `${window.location.origin}/?role=player&room=${roomCode}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}&bgcolor=0a0f1c&color=60a5fa&margin=2&qzone=1`;

  return (
    <div className="host-layout flex flex-col min-h-screen">
      <AnimatedBackground intensity={1.2} />

      {/* Header bar */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎯</div>
          <div>
            <div
              className="text-base font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: '#F1F5F9' }}
            >
              MISSION DECISION
            </div>
            <div className="text-xs" style={{ color: '#475569' }}>{GAME_CONFIG.subject}</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold" style={{ color: '#4ADE80' }}>PHÒNG CHỜ</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-6">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* LEFT – Title + Start */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-1 flex flex-col gap-6"
            >
              <div>
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: '#60A5FA', fontFamily: "'Outfit', sans-serif" }}
                >
                  🎯 Interactive Mission
                </div>
                <h1
                  className="font-black leading-none mb-2"
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(135deg, #00D4FF 0%, #2563EB 60%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MISSION
                </h1>
                <h1
                  className="font-black leading-none mb-4"
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#F1F5F9',
                  }}
                >
                  DECISION
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  {GAME_CONFIG.missionTitle}<br />
                  <span style={{ color: '#475569' }}>{GAME_CONFIG.missionSubtitle}</span>
                </p>
              </div>

              {/* Player count */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: '#475569' }}>
                  Sinh viên đã tham gia
                </div>
                <div className="flex items-end gap-2">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={players.length}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-5xl font-black"
                      style={{ fontFamily: "'Outfit', sans-serif", color: '#60A5FA' }}
                    >
                      {players.length}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-2xl font-light mb-2" style={{ color: '#334155' }}>/</span>
                  <span className="text-2xl font-semibold mb-2" style={{ color: '#334155' }}>∞</span>
                </div>
                <div className="text-xs mt-1" style={{ color: '#334155' }}>
                  {players.length === 0
                    ? 'Đang chờ sinh viên tham gia...'
                    : `${players.length} người đã sẵn sàng`}
                </div>
              </div>

              {/* Start button */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="btn btn-primary btn-xl w-full"
                style={{ fontSize: '1.1rem' }}
              >
                <span>🚀</span>
                <span>Bắt đầu nhiệm vụ</span>
              </motion.button>

              <div className="text-xs text-center" style={{ color: '#334155' }}>
                Sinh viên vẫn có thể tham gia sau khi bắt đầu
              </div>
            </motion.div>

            {/* CENTER – QR Code */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-1 flex flex-col items-center gap-6"
            >
              {/* QR Card */}
              <div
                className="w-full rounded-3xl p-8 flex flex-col items-center gap-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 0 60px rgba(37,99,235,0.1)',
                }}
              >
                <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#475569' }}>
                  📱 Quét để tham gia
                </div>

                {/* QR code */}
                <div
                  className="rounded-2xl p-3 flex items-center justify-center"
                  style={{
                    background: '#0A0F1C',
                    border: '2px solid rgba(96,165,250,0.3)',
                    boxShadow: '0 0 40px rgba(37,99,235,0.2)',
                  }}
                >
                  <img
                    src={qrUrl}
                    alt="QR Code để tham gia"
                    width={200}
                    height={200}
                    style={{ display: 'block', borderRadius: 8 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback if no internet */}
                  <div
                    style={{
                      display: 'none',
                      width: 200,
                      height: 200,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 8,
                      color: '#475569',
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: 32 }}>📱</span>
                    <span>Truy cập URL bên dưới</span>
                  </div>
                </div>

                {/* Room Code */}
                <div className="text-center">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#475569' }}>
                    Mã phòng
                  </div>
                  <div
                    className="text-5xl font-black tracking-[0.2em]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#60A5FA',
                      textShadow: '0 0 30px rgba(96,165,250,0.4)',
                    }}
                  >
                    {roomCode}
                  </div>
                </div>

                {/* URL */}
                <div
                  className="w-full rounded-xl px-4 py-3 text-center text-xs font-mono break-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#475569',
                  }}
                >
                  {joinUrl}
                </div>
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-2 w-full">
                {[
                  { n: 1, text: 'Kết nối cùng WiFi với màn hình chiếu' },
                  { n: 2, text: 'Quét QR code hoặc nhập URL trên điện thoại' },
                  { n: 3, text: 'Nhập tên & chờ giảng viên bắt đầu' },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-center gap-3 text-xs" style={{ color: '#475569' }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'rgba(37,99,235,0.2)', color: '#60A5FA' }}
                    >
                      {n}
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT – Player list */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  minHeight: 400,
                }}
              >
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#94A3B8' }}>
                    👥 Danh sách tham gia
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: 'rgba(96,165,250,0.15)', color: '#60A5FA' }}
                  >
                    {players.length}
                  </span>
                </div>

                <div className="p-4">
                  {players.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-16 gap-3"
                    >
                      <div className="text-5xl opacity-20">👥</div>
                      <div className="text-sm text-center" style={{ color: '#334155' }}>
                        Chưa có sinh viên tham gia<br />
                        <span style={{ color: '#1E293B', fontSize: 11 }}>Sinh viên quét QR hoặc nhập URL để vào</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                      <AnimatePresence>
                        {players.map((player, i) => (
                          <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            <span className="text-xl">{player.avatar}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate" style={{ color: '#E2E8F0' }}>
                                {player.name}
                              </div>
                              {player.studentId && (
                                <div className="text-xs" style={{ color: '#475569' }}>
                                  MSSV: {player.studentId}
                                </div>
                              )}
                            </div>
                            <span className="text-xs" style={{ color: '#334155' }}>✓</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;

import { motion } from 'framer-motion';

const LandingPage = ({ onStart, darkMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(37,99,235,0.12) 0%, rgba(10,15,28,1) 70%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(219,234,254,0.8) 0%, rgba(248,250,255,1) 70%)',
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)'
            : 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.08), transparent)',
          filter: 'blur(40px)',
        }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-1/4 w-64 h-64 rounded-full -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent)',
          filter: 'blur(40px)',
        }}
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Vaccine journey line illustration */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 flex items-center justify-center pointer-events-none">
        <svg width="800" height="500" viewBox="0 0 800 500" className="opacity-5" fill="none">
          <path d="M100 400 C200 350 300 200 400 250 C500 300 600 150 700 100"
            stroke={darkMode ? '#2563EB' : '#1E40AF'} strokeWidth="1.5" strokeDasharray="8,8" />
          <circle cx="100" cy="400" r="6" stroke={darkMode ? '#2563EB' : '#1E40AF'} strokeWidth="1.5" />
          <circle cx="250" cy="300" r="6" stroke={darkMode ? '#14B8A6' : '#0F766E'} strokeWidth="1.5" />
          <circle cx="400" cy="250" r="6" stroke={darkMode ? '#8B5CF6' : '#7C3AED'} strokeWidth="1.5" />
          <circle cx="550" cy="180" r="6" stroke={darkMode ? '#F59E0B' : '#D97706'} strokeWidth="1.5" />
          <circle cx="700" cy="100" r="6" stroke={darkMode ? '#22C55E' : '#16A34A'} strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="text-center max-w-2xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
          style={{
            background: darkMode ? 'rgba(37,99,235,0.12)' : 'rgba(219,234,254,0.8)',
            border: '1px solid rgba(37,99,235,0.2)',
            color: '#2563EB',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Interactive Mission
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h1 className="font-black tracking-tight mb-2 leading-none"
            style={{
              fontSize: 'clamp(52px, 10vw, 96px)',
              background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #14B8A6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            MISSION
          </h1>
          <h1 className="font-black tracking-tight leading-none"
            style={{
              fontSize: 'clamp(52px, 10vw, 96px)',
              color: darkMode ? '#F1F5F9' : '#0F172A',
            }}>
            MODERNA
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg leading-relaxed mt-6 mb-12 max-w-lg mx-auto"
          style={{ color: darkMode ? '#94A3B8' : '#64748B' }}
        >
          Đồng hành cùng Chính phủ Mỹ đưa vaccine từ phòng nghiên cứu đến cộng đồng.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white text-base transition-all"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            boxShadow: '0 8px 32px rgba(37,99,235,0.35), 0 2px 8px rgba(37,99,235,0.2)',
          }}
        >
          <span>Bắt đầu nhiệm vụ</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          {/* Button glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
          />
        </motion.button>

        {/* Journey preview pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-10"
        >
          {['Nghiên cứu', 'BARDA', 'FDA', 'Mua trước', 'Warp Speed', 'Độc quyền'].map((label, i) => (
            <span key={label}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
                color: darkMode ? '#64748B' : '#94A3B8',
              }}>
              {i + 1}. {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-xs text-center"
        style={{ color: darkMode ? '#475569' : '#CBD5E1' }}
      >
        Kinh tế Chính trị Mác-Lênin · MLN122 · Hành trình vaccine COVID-19
      </motion.p>
    </div>
  );
};

export default LandingPage;

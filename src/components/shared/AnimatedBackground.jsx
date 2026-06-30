import { motion } from 'framer-motion';

const orbs = [
  { w: 500, h: 500, x: '10%',  y: '10%',  color: 'rgba(37,99,235,0.07)',  dur: 12, delay: 0 },
  { w: 400, h: 400, x: '60%',  y: '50%',  color: 'rgba(0,212,255,0.05)',  dur: 10, delay: 3 },
  { w: 350, h: 350, x: '30%',  y: '70%',  color: 'rgba(139,92,246,0.06)', dur: 14, delay: 6 },
  { w: 300, h: 300, x: '80%',  y: '20%',  color: 'rgba(34,197,94,0.05)',  dur: 9,  delay: 1 },
];

const AnimatedBackground = ({ accent = '#2563EB', showGrid = true, intensity = 1 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    {/* Grid lines */}
    {showGrid && (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    )}

    {/* Ambient orbs */}
    {orbs.map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width:  orb.w * intensity,
          height: orb.h * intensity,
          left:   orb.x,
          top:    orb.y,
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: orb.dur,
          delay: orb.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}

    {/* Accent glow at bottom */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2"
      style={{
        width: '80%',
        height: 200,
        background: `radial-gradient(ellipse, ${accent}08 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
    />

    {/* Noise texture overlay */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}
    />
  </div>
);

export default AnimatedBackground;

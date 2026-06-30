import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Circular countdown timer with SVG stroke animation.
 * Changes color green → amber → red as time runs out.
 */
const CountdownTimer = ({ total, remaining, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = remaining / total;
  const offset = circumference * (1 - progress);

  const { color, bgColor, urgency } = useMemo(() => {
    if (progress > 0.5) return { color: '#22C55E', bgColor: 'rgba(34,197,94,0.15)', urgency: false };
    if (progress > 0.25) return { color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)', urgency: false };
    return { color: '#EF4444', bgColor: 'rgba(239,68,68,0.15)', urgency: true };
  }, [progress]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={urgency ? { scale: [1, 1.06, 1] } : {}}
      transition={urgency ? { duration: 0.4, repeat: Infinity } : {}}
    >
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        className="absolute top-0 left-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={4}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' }}
        />
      </svg>

      {/* Center display */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width:  size - 16,
          height: size - 16,
          background: bgColor,
          transition: 'background 0.5s ease',
        }}
      >
        <span
          className="font-display font-bold"
          style={{
            fontSize: size * 0.3,
            color,
            transition: 'color 0.5s ease',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {remaining}
        </span>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;

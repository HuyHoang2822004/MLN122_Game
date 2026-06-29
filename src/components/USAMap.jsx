import { motion } from 'framer-motion';

// Stylized USA Map SVG - minimal, clean line illustration
const USAMap = ({ activeStageIndex, completedStages, darkMode }) => {
  const strokeColor = darkMode ? 'rgba(148,163,184,0.3)' : 'rgba(37,99,235,0.15)';
  const fillColor = darkMode ? 'rgba(30,41,59,0.4)' : 'rgba(219,234,254,0.3)';

  // Journey points on the map (normalized to SVG viewBox 0 0 960 600)
  const journeyPoints = [
    { x: 780, y: 165, label: "Research Lab", city: "Cambridge, MA" },
    { x: 720, y: 200, label: "BARDA", city: "Washington D.C." },
    { x: 730, y: 195, label: "FDA", city: "Silver Spring, MD" },
    { x: 718, y: 205, label: "Contract", city: "Washington D.C." },
    { x: 430, y: 240, label: "Warp Speed", city: "Nationwide" },
    { x: 280, y: 330, label: "Public", city: "All Americans" },
  ];

  const stageColors = [
    '#2563EB', '#14B8A6', '#8B5CF6', '#F59E0B', '#EF4444', '#22C55E'
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 960 600"
        className="w-full h-full object-contain opacity-60"
        style={{ maxHeight: '100%' }}
      >
        {/* USA outline - simplified stylized path */}
        <g fill={fillColor} stroke={strokeColor} strokeWidth="2">
          {/* Continental USA simplified shape */}
          <path d="
            M 180 120
            L 220 100 L 280 95 L 340 90 L 400 88 L 460 90 L 520 92 L 580 88 L 620 80
            L 660 78 L 700 75 L 740 70 L 770 80 L 790 100 L 800 130
            L 820 140 L 830 160 L 825 180 L 810 190
            L 820 210 L 815 230 L 800 240 L 790 260 L 780 270
            L 760 280 L 750 300 L 740 310 L 720 320
            L 710 340 L 700 360 L 690 370 L 670 380
            L 650 390 L 620 400 L 600 410 L 580 420
            L 550 425 L 520 430 L 490 432 L 460 430
            L 430 435 L 400 440 L 370 445 L 340 450
            L 310 455 L 290 460 L 270 465 L 250 470
            L 230 460 L 210 445 L 200 430
            L 185 415 L 175 400 L 170 380 L 165 360
            L 160 340 L 158 320 L 160 300 L 162 280
            L 165 260 L 168 240 L 170 220 L 172 200
            L 175 180 L 178 160 L 180 140 L 180 120
            Z
          " />
          {/* Florida */}
          <path d="M 660 390 L 670 400 L 680 420 L 690 440 L 695 460 L 685 475 L 670 478 L 655 465 L 650 445 L 648 420 L 650 400 Z" />
          {/* Great Lakes region simplified */}
          <path d="M 640 140 L 660 120 L 690 115 L 710 125 L 720 145 L 710 155 L 690 150 L 670 145 L 650 150 Z" fill={darkMode ? 'rgba(30,58,138,0.2)' : 'rgba(191,219,254,0.4)'} />
          <path d="M 700 130 L 730 125 L 750 135 L 755 145 L 740 150 L 720 145 Z" fill={darkMode ? 'rgba(30,58,138,0.2)' : 'rgba(191,219,254,0.4)'} />
        </g>

        {/* State grid lines - very subtle */}
        <g stroke={strokeColor} strokeWidth="0.5" fill="none" strokeDasharray="4,8">
          <line x1="400" y1="90" x2="390" y2="450" />
          <line x1="520" y1="92" x2="510" y2="432" />
          <line x1="640" y1="82" x2="628" y2="398" />
          <line x1="300" y1="200" x2="650" y2="200" />
          <line x1="270" y1="300" x2="720" y2="300" />
        </g>

        {/* Journey path line */}
        <g>
          {journeyPoints.map((point, i) => {
            if (i === 0) return null;
            const prev = journeyPoints[i - 1];
            const isCompleted = i <= completedStages;
            return (
              <motion.line
                key={`path-${i}`}
                x1={prev.x} y1={prev.y}
                x2={point.x} y2={point.y}
                stroke={isCompleted ? stageColors[i] : (darkMode ? 'rgba(100,116,139,0.3)' : 'rgba(148,163,184,0.3)')}
                strokeWidth={isCompleted ? 2.5 : 1.5}
                strokeDasharray={isCompleted ? "none" : "6,6"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.3 }}
              />
            );
          })}
        </g>

        {/* Journey points */}
        {journeyPoints.map((point, i) => {
          const isCompleted = i < completedStages;
          const isActive = i === activeStageIndex;
          const color = stageColors[i];

          return (
            <g key={`point-${i}`}>
              {/* Glow ring for active */}
              {isActive && (
                <motion.circle
                  cx={point.x} cy={point.y} r={20}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.5}
                  opacity={0.4}
                  animate={{ r: [16, 24, 16], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Outer ring */}
              <circle
                cx={point.x} cy={point.y} r={isActive ? 10 : 7}
                fill={isCompleted || isActive ? color : (darkMode ? '#1E293B' : '#E2E8F0')}
                stroke={isCompleted || isActive ? color : (darkMode ? '#475569' : '#CBD5E1')}
                strokeWidth={2}
                opacity={isCompleted || isActive ? 1 : 0.5}
              />
              {/* Inner dot */}
              {(isCompleted || isActive) && (
                <circle cx={point.x} cy={point.y} r={3} fill="white" />
              )}
              {/* Checkmark for completed */}
              {isCompleted && (
                <text
                  x={point.x} y={point.y + 1.5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fill="white"
                  fontWeight="bold"
                >✓</text>
              )}
              {/* Label */}
              <text
                x={point.x + (i < 4 ? 14 : (i === 4 ? 0 : 0))}
                y={point.y + (i < 4 ? 0 : (i === 4 ? -16 : 18))}
                textAnchor={i < 4 ? "start" : "middle"}
                dominantBaseline="middle"
                fontSize="9"
                fill={isCompleted || isActive ? color : (darkMode ? '#64748B' : '#94A3B8')}
                fontWeight={isActive ? "700" : "500"}
                fontFamily="Inter, sans-serif"
              >
                {point.label}
              </text>
              <text
                x={point.x + (i < 4 ? 14 : 0)}
                y={point.y + (i < 4 ? 10 : (i === 4 ? -6 : 28))}
                textAnchor={i < 4 ? "start" : "middle"}
                dominantBaseline="middle"
                fontSize="7"
                fill={darkMode ? '#475569' : '#94A3B8'}
                fontFamily="Inter, sans-serif"
              >
                {point.city}
              </text>
            </g>
          );
        })}

        {/* Compass rose - bottom right */}
        <g transform="translate(880, 520)" opacity={0.3}>
          <circle cx={0} cy={0} r={15} fill="none" stroke={darkMode ? '#94A3B8' : '#64748B'} strokeWidth={0.8} />
          <line x1={0} y1={-12} x2={0} y2={12} stroke={darkMode ? '#94A3B8' : '#64748B'} strokeWidth={0.8} />
          <line x1={-12} y1={0} x2={12} y2={0} stroke={darkMode ? '#94A3B8' : '#64748B'} strokeWidth={0.8} />
          <text x={0} y={-16} textAnchor="middle" fontSize="8" fill={darkMode ? '#94A3B8' : '#64748B'} fontFamily="Inter">N</text>
        </g>
      </svg>
    </div>
  );
};

export default USAMap;

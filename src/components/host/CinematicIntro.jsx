import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinematicIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 1200), // COVID-19
      setTimeout(() => setStep(2), 2400), // National Emergency
      setTimeout(() => setStep(3), 3600), // Mission Start
      setTimeout(() => onComplete(), 5500), // Transition to game
    ];

    return () => sequence.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-mono">
      {/* Red alert overlay */}
      <motion.div
        className="absolute inset-0 bg-red-600/10 mix-blend-overlay"
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
      
      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Step 0: ALERT */}
        <AnimatePresence>
          {step >= 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-red-500 text-6xl md:text-8xl font-black tracking-widest mb-4"
              style={{ textShadow: "0 0 20px rgba(239, 68, 68, 0.8)" }}
            >
              ALERT
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: COVID-19 */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-4"
            >
              COVID-19
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: National Emergency */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-500 text-3xl md:text-5xl font-bold uppercase tracking-widest mb-12"
              style={{ textShadow: "0 0 15px rgba(234, 179, 8, 0.5)" }}
            >
              National Emergency
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Mission Start */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="text-green-400 text-5xl md:text-7xl font-black uppercase tracking-tighter"
              style={{ textShadow: "0 0 25px rgba(74, 222, 128, 0.6)" }}
            >
              Mission Start
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CinematicIntro;

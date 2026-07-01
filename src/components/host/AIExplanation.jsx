import { motion } from "framer-motion";

const AIExplanation = ({ mission, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative w-full max-w-2xl mx-4 rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #0A0F1C 100%)",
        border: "1px solid rgba(34,197,94,0.3)",
        boxShadow: "0 0 80px rgba(34,197,94,0.15), 0 25px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Green top strip */}
      <div
        style={{
          height: 4,
          background: "linear-gradient(90deg, #16A34A, #22C55E, #14B8A6)",
        }}
      />

      {/* Particle burst animation */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              left: `${10 + i * 11}%`,
              top: 0,
              background: i % 2 === 0 ? "#22C55E" : "#14B8A6",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
            transition={{ delay: i * 0.08, duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 250 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,163,74,0.3), rgba(20,184,166,0.2))",
              border: "1.5px solid rgba(34,197,94,0.4)",
              boxShadow: "0 0 30px rgba(34,197,94,0.25)",
            }}
          ></motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "#22C55E", fontFamily: "'Outfit', sans-serif" }}
            >
              Phân tích chuyên sâu
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xl font-black"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F1F5F9" }}
            >
              {mission.title}
            </motion.h3>
          </div>
        </div>

        {/* Correct answer banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl px-4 py-3 mb-6 flex items-center gap-3"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          <span style={{ color: "#22C55E", fontSize: 18 }}></span>
          <div>
            <span
              className="text-xs font-semibold uppercase"
              style={{ color: "#22C55E" }}
            >
              Đáp án đúng:{" "}
            </span>
            <span className="text-sm font-bold" style={{ color: "#4ADE80" }}>
              {mission.correct}.{" "}
              {mission.choices.find((c) => c.id === mission.correct)?.text}
            </span>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p
            className="text-base leading-7"
            style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}
          >
            {mission.explanation}
          </p>
        </motion.div>

        {/* References */}
        {mission.references && mission.references.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="rounded-xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#475569" }}
            >
              Tài liệu tham khảo
            </div>
            <ul className="flex flex-col gap-1.5">
              {mission.references.map((ref, i) => (
                <li
                  key={i}
                  className="text-xs flex items-start gap-2"
                  style={{ color: "#475569" }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#334155" }}
                  >
                    •
                  </span>
                  {ref}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="btn btn-success btn-lg w-full mt-6"
        >
          Tiếp theo →
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

export default AIExplanation;

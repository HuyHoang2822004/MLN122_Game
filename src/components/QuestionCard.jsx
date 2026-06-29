import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StageIcon from "./StageIcon";

const QuestionCard = ({ mission, onCorrect, darkMode }) => {
  const [selected, setSelected] = useState(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);

  const handleSelect = useCallback(
    (choiceId) => {
      if (isCorrect) return;
      setSelected(choiceId);
      setIsWrong(false);

      if (choiceId === mission.correct) {
        setIsCorrect(true);
        // Không hiển thị explanation dưới card khi trả lời đúng
        setShowExplanation(false);
        setShowCorrectPopup(true);

        setTimeout(() => {
          setShowCorrectPopup(false);
          // Đợi thêm 250ms để animation đóng popup mượt hơn
          setTimeout(() => {
            onCorrect();
          }, 250);
        }, 4000);
      } else {
        setIsWrong(true);
        setShowExplanation(true);
        setTimeout(() => {
          setIsWrong(false);
        }, 600);
      }
    },
    [isCorrect, mission.correct, onCorrect],
  );

  const handleRetry = () => {
    setSelected(null);
    setIsWrong(false);
    setShowExplanation(false);
    setShowCorrectPopup(false);
  };

  const getChoiceStyle = (choiceId) => {
    const isSelected = selected === choiceId;
    const isThisCorrect = choiceId === mission.correct;

    if (isSelected && isCorrect && isThisCorrect) {
      return {
        background: "rgba(34,197,94,0.15)",
        border: "1.5px solid #22C55E",
        boxShadow: "0 0 20px rgba(34,197,94,0.25)",
      };
    }
    if (isSelected && !isCorrect) {
      return {
        background: "rgba(239,68,68,0.1)",
        border: "1.5px solid #EF4444",
      };
    }
    if (isCorrect && isThisCorrect) {
      return {
        background: "rgba(34,197,94,0.1)",
        border: "1.5px solid rgba(34,197,94,0.4)",
      };
    }
    return {
      background: darkMode ? "rgba(30,41,59,0.6)" : "rgba(255,255,255,0.7)",
      border: darkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(255,255,255,0.8)",
    };
  };

  return (
    <motion.div
      key={mission.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto"
    >
      {/* Question Card */}
      <motion.div
        animate={isWrong ? { x: [-6, 6, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl overflow-hidden"
        style={{
          background: darkMode
            ? "rgba(15,23,42,0.85)"
            : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(30px)",
          border: darkMode
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(255,255,255,0.9)",
          boxShadow: darkMode
            ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)"
            : "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6)",
        }}
      >
        {/* Card header strip */}
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${mission.color}, ${mission.color}88)`,
          }}
        />

        <div className="p-5">
          {/* Stage badge + icon */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: `${mission.color}18` }}
            >
              <StageIcon type={mission.icon} size={22} color={mission.color} />
            </div>
            <div>
              <div
                className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                style={{ color: mission.color }}
              >
                {mission.stage}
              </div>
              <div
                className="text-lg font-bold leading-tight"
                style={{ color: darkMode ? "#F1F5F9" : "#0F172A" }}
              >
                {mission.title}
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: darkMode ? "#94A3B8" : "#64748B" }}
          >
            {mission.description}
          </p>

          {/* Divider */}
          <div
            className="mb-5"
            style={{
              borderTop: darkMode
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)",
            }}
          />

          {/* Question */}
          <p
            className="text-base font-semibold mb-5 leading-snug"
            style={{ color: darkMode ? "#E2E8F0" : "#1E293B" }}
          >
            {mission.question}
          </p>

          {/* Choices */}
          <div className="flex flex-col gap-3">
            {mission.choices.map((choice) => {
              const isThisCorrect = choice.id === mission.correct;
              const isSelected = selected === choice.id;
              const showCheck = isCorrect && isThisCorrect;
              const showX = !isCorrect && isSelected;

              return (
                <motion.button
                  key={choice.id}
                  onClick={() => handleSelect(choice.id)}
                  disabled={isCorrect}
                  whileHover={!isCorrect ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!isCorrect ? { scale: 0.98 } : {}}
                  className="w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-3 transition-all duration-200"
                  style={{
                    ...getChoiceStyle(choice.id),
                    cursor: isCorrect ? "default" : "pointer",
                  }}
                >
                  {/* Choice letter badge */}
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200"
                    style={{
                      background: showCheck
                        ? "#22C55E"
                        : showX
                          ? "#EF4444"
                          : isCorrect && isThisCorrect
                            ? "rgba(34,197,94,0.2)"
                            : darkMode
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(37,99,235,0.08)",
                      color:
                        showCheck || showX
                          ? "white"
                          : isCorrect && isThisCorrect
                            ? "#22C55E"
                            : mission.color,
                    }}
                  >
                    {showCheck ? "✓" : showX ? "✗" : choice.id}
                  </div>

                  {/* Choice text */}
                  <span
                    className="text-sm font-medium leading-snug"
                    style={{
                      color: showCheck
                        ? "#22C55E"
                        : showX
                          ? "#EF4444"
                          : darkMode
                            ? "#CBD5E1"
                            : "#334155",
                    }}
                  >
                    {choice.text}
                  </span>

                  {/* Correct answer glow dot */}
                  {showCheck && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ background: "#22C55E" }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && !isCorrect && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: isCorrect
                      ? "rgba(34,197,94,0.08)"
                      : "rgba(239,68,68,0.06)",
                    border: isCorrect
                      ? "1px solid rgba(34,197,94,0.25)"
                      : "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  {isCorrect ? (
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "#22C55E" }}
                      >
                        <StageIcon type="check" size={11} color="white" />
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: "#22C55E" }}
                        >
                          Chính xác!
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: darkMode ? "#94A3B8" : "#64748B" }}
                        >
                          {mission.explanation}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "#EF4444", color: "white" }}
                      >
                        ✗
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: "#EF4444" }}
                        >
                          Chưa đúng
                        </div>
                        <p
                          className="text-sm leading-relaxed mb-3"
                          style={{ color: darkMode ? "#94A3B8" : "#64748B" }}
                        >
                          Hãy xem lại nội dung bài thuyết trình và thử lại.
                        </p>
                        <button
                          onClick={handleRetry}
                          className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                          style={{
                            background: "rgba(239,68,68,0.12)",
                            color: "#EF4444",
                            border: "1px solid rgba(239,68,68,0.25)",
                          }}
                        >
                          Thử lại
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {isCorrect && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-3 text-xs font-medium"
                    style={{ color: darkMode ? "#64748B" : "#94A3B8" }}
                  >
                    🔓 Đang mở khóa hồ sơ tiếp theo...
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {showCorrectPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex items-center justify-center z-[9999]"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

              {/* Popup */}
              <div
                className="relative rounded-3xl p-6 w-[520px] max-w-[90vw]"
                style={{
                  background: darkMode ? "#0F172A" : "#FFFFFF",
                  boxShadow: "0 25px 60px rgba(0,0,0,.25)",
                }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500">
                    <StageIcon type="check" size={22} color="white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-500">
                      🎉 Chính xác!
                    </h3>

                    <p
                      className="mt-2 text-sm leading-7"
                      style={{
                        color: darkMode ? "#CBD5E1" : "#475569",
                      }}
                    >
                      {mission.explanation}
                    </p>

                    <div className="mt-5 text-xs" style={{ color: "#94A3B8" }}>
                      🔓 Đang mở khóa hồ sơ tiếp theo...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;

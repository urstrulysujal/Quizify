import React from "react";
import { motion } from "framer-motion";

export default function QuestionPalette({ totalQuestions, answers, currentIndex, onNavigate }) {
  // Determine status for each question
  const getStatus = (i) => {
    if (answers[i] !== null) return "answered";
    if (i === currentIndex) return "current";
    if (i < currentIndex) return "notAnswered";
    return "notVisited";
  };

  // Color mapping matching project theme
  const statusColors = {
    answered: "bg-gradient-to-br from-green-400 to-green-600 text-white",
    notAnswered: "bg-gradient-to-br from-orange-400 to-orange-500 text-white",
    notVisited: "bg-gray-600 text-gray-300",
    current: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-700/50 w-full max-w-sm"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold text-white">Questions</h2>
      </div>

      {/* Question grid */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {Array.from({ length: totalQuestions }).map((_, i) => {
          const status = getStatus(i);
          return (
            <motion.button
              key={i}
              onClick={() => onNavigate(i)}
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm font-bold shadow-lg transition-all duration-200 ${statusColors[status]}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Question ${i + 1} - ${status}`}
            >
              {i + 1}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600"></span>
          <span className="text-sm text-gray-300">Answered</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500"></span>
          <span className="text-sm text-gray-300">Not Answered</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-gray-600"></span>
          <span className="text-sm text-gray-300">Not Visited</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></span>
          <span className="text-sm text-gray-300">Current</span>
        </div>
      </div>
    </motion.div>
  );
}

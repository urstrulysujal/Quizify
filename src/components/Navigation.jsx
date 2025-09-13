import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Navigation Component
const Navigation = React.memo(({ currentIndex, totalQuestions, answers, onNavigate, canNavigate }) => (
  <div className="flex items-center justify-center space-x-2 mt-4">
    <div className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 dark:border-gray-600/30">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const isAnswered = answers[index] !== null;
        const isCurrent = index === currentIndex;

        return (
          <motion.button
            key={index}
            onClick={() => canNavigate && onNavigate(index)}
            disabled={!canNavigate}
            className={`relative w-3 h-3 rounded-full transition-all duration-200 will-change-transform ${
              isCurrent
                ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-md scale-125'
                : isAnswered
                ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-sm hover:scale-110'
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
            }`}
            whileHover={{ scale: isCurrent ? 1.3 : 1.15 }}
            whileTap={{ scale: isCurrent ? 1.2 : 1.05 }}
            aria-label={`${isAnswered ? 'Answered' : 'Unanswered'} question ${index + 1}${isCurrent ? ' (current)' : ''}`}
          >
            {isCurrent && (
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400 will-change-transform"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {isAnswered && !isCurrent && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
));

export default Navigation;

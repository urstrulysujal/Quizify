import React, { useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Optimized Answer Option with 3D Effects
const AnswerOption = React.memo(({ option, isSelected, onSelect, disabled, index, showResult, isCorrect, userAnswer }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [15, -15]);
  const rotateY = useTransform(mouseX, [-50, 50], [-15, 15]);

  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.5);
    mouseY.set((e.clientY - centerY) * 0.5);
  }, [disabled, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const optionStyles = useMemo(() => {
    if (showResult) {
      if (isCorrect) {
        return 'bg-gradient-to-br from-green-600 to-green-800 text-white border-green-600 shadow-green-400/50';
      } else if (userAnswer === index) {
        return 'bg-gradient-to-br from-red-600 to-red-800 text-white border-red-600 shadow-red-400/50';
      } else {
        return 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 border-gray-700';
      }
    }

    if (isSelected) {
      return 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-blue-500 shadow-blue-300/50 transform scale-[1.02]';
    }

    return 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200 border-gray-600 hover:border-blue-400 hover:shadow-blue-200/50';
  }, [showResult, isCorrect, userAnswer, index, isSelected]);

  return (
    <motion.div
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={disabled ? {} : { z: 5 }}
      className="perspective-1000 will-change-transform"
    >
      <motion.button
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => !disabled && onSelect(index)}
        disabled={disabled}
        className={`
          min-h-[44px] px-4 py-3 rounded-xl border-2 text-left w-full font-medium text-sm
          transition-all duration-200 ease-out relative overflow-hidden backdrop-blur-sm
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          shadow-md hover:shadow-lg transform-gpu will-change-transform
          ${optionStyles}
          ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
        `}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 dark:from-black/10 dark:to-black/0 rounded-2xl" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <span className={`w-6 h-6 rounded-full mr-3 border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
              isSelected || showResult ? 'border-white bg-white/20' : 'border-current'
            }`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span>{option}</span>
          </div>

          {showResult && isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}

          {showResult && userAnswer === index && !isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-black/10 -skew-x-12 will-change-transform"
          animate={{
            x: [-200, 300],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </motion.div>
  );
});

export default AnswerOption;

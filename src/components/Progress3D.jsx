import React from 'react';
import { motion } from 'framer-motion';

const Progress3D = React.memo(({ answered, total, current }) => {
  const percentage = (answered / total) * 100;
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex items-center justify-center mb-2">
      <div className="relative will-change-transform">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 shadow-inner flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90 will-change-transform" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent will-change-transform"
                key={current}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {current}
              </motion.span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">of {total}</span>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-1 py-0.5 rounded-full shadow-lg will-change-transform"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        >
          {answered}/{total}
        </motion.div>
      </div>
    </div>
  );
});

export default Progress3D;

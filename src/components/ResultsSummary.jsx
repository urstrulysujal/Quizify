import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Optimized Results Summary with 3D Charts
const ResultsSummary = React.memo(({ questions, answers, totalPoints }) => {
  const correctCount = questions.filter((q, idx) => answers[idx] === q.correctAnswer).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const performanceData = useMemo(() => {
    if (scorePercentage >= 90) return { message: "Outstanding Performance! 🌟", color: "from-yellow-400 to-orange-500", emoji: "🏆" };
    if (scorePercentage >= 80) return { message: "Excellent Work! 🎉", color: "from-green-400 to-green-600", emoji: "🎊" };
    if (scorePercentage >= 70) return { message: "Well Done! 👏", color: "from-blue-400 to-blue-600", emoji: "💪" };
    if (scorePercentage >= 60) return { message: "Good Effort! 👍", color: "from-purple-400 to-purple-600", emoji: "📈" };
    return { message: "Keep Practicing! 💪", color: "from-gray-400 to-gray-600", emoji: "🎯" };
  }, [scorePercentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        delayChildren: 0.2,
        staggerChildren: 0.05
      }}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-600/20 p-8 mb-8 relative overflow-hidden will-change-transform"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-600/15 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-400/15 to-blue-500/15 rounded-full blur-2xl will-change-transform" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="text-8xl mb-4"
          >
            {performanceData.emoji}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl font-bold bg-gradient-to-r ${performanceData.color} bg-clip-text text-transparent mb-6`}
          >
            {performanceData.message}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { value: `${correctCount}/${totalQuestions}`, label: "Correct Answers", color: "from-blue-500 to-purple-600", delay: 0.4 },
              { value: `${scorePercentage}%`, label: "Success Rate", color: "from-green-500 to-green-600", delay: 0.5 },
              { value: totalPoints, label: "Points Earned", color: "from-purple-500 to-pink-600", delay: 0.6 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: item.delay, type: "spring", stiffness: 300 }}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform will-change-transform cursor-pointer`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl font-bold mb-2">{item.value}</div>
                <div className="text-white/90">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-white/95 to-white/80 dark:from-gray-800/95 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-600/20 p-8 will-change-transform"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Question Analysis 📊
        </h3>

        <div className="space-y-6">
          {questions.map((question, idx) => {
            const isCorrect = answers[idx] === question.correctAnswer;
            const earnedPoints = isCorrect ? question.points : 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.8 + idx * 0.05, type: "spring", stiffness: 300 }}
                className={`p-6 rounded-2xl border-2 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 will-change-transform ${
                  isCorrect
                    ? 'bg-gradient-to-br from-green-50/90 to-green-100/70 dark:from-green-900/90 dark:to-green-800/70 border-green-300 dark:border-green-700'
                    : 'bg-gradient-to-br from-red-50/90 to-orange-100/70 dark:from-red-900/90 dark:to-orange-800/70 border-red-300 dark:border-red-700'
                }`}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <motion.span
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold mr-4 shadow-lg will-change-transform ${
                          isCorrect
                            ? 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-800 text-white'
                            : 'bg-gradient-to-br from-red-400 to-red-600 dark:from-red-700 dark:to-red-800 text-white'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.05, type: "spring" }}
                      >
                        {isCorrect ? '✓' : '✗'}
                      </motion.span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          Question {idx + 1} {question.icon}
                        </h4>
                        <p className="text-sm text-gray-600">{question.category}</p>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-3 font-medium">
                      {question.question}
                    </p>

                    <div className="space-y-2 text-sm">
                      <p className={`p-2 rounded-lg ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <span className="font-semibold">Your answer:</span>{' '}
                        {answers[idx] !== null ? question.options[answers[idx]] : 'Not answered'}
                      </p>

                      {!isCorrect && (
                        <p className="p-2 rounded-lg bg-blue-100 text-blue-800">
                          <span className="font-semibold">Correct answer:</span>{' '}
                          {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center ml-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + idx * 0.05, type: "spring" }}
                      className={`text-3xl font-bold mb-2 ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {earnedPoints}/{question.points}
                    </motion.div>
                    <div className="text-xs text-gray-500 font-medium">points</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-2 ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {question.difficulty}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
});

export default ResultsSummary;

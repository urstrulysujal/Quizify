import React from 'react';
import { motion } from 'framer-motion';
import AnswerOption from './AnswerOption.jsx';
import Navigation from './Navigation.jsx';

// Enhanced Question Card with optimized 3D Effects
const QuestionCard = React.memo(({ question, questionIndex, selectedAnswer, onSelectAnswer, disabled, showResults, onPrevious, onNext, onSubmit, isFirstQuestion, isLastQuestion, allAnswered, totalQuestions, answers, onNavigate }) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -30, rotateX: 5 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.03
      }}
      className="relative will-change-transform flex-1 flex flex-col"
    >
    <div className="w-full bg-gradient-to-br lg:w-[600px] from-gray-900 to-black backdrop-blur-xl rounded-xl shadow-lg border border-gray-800 p-4 md:p-6 relative overflow-hidden will-change-transform flex-1 flex flex-col">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full blur-2xl will-change-transform" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-full blur-xl will-change-transform" />

        <div className="relative z-10 flex-1 flex flex-col">
          <motion.div
            className="flex items-center justify-between mb-3"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-2">{question.icon}</span>
              <div>
                <span className="text-xs font-medium text-gray-400 block">
                  {question.category}
                </span>
                <span className="text-xs text-gray-500">
                  Q{questionIndex + 1}/5
                </span>
              </div>
            </div>

            <motion.div
              className={`px-2 py-1 rounded-full text-xs font-bold shadow-md will-change-transform ${
                question.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
                question.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                'bg-gradient-to-r from-red-400 to-pink-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question.difficulty} • {question.points}pts
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-lg font-bold text-white mb-4 leading-relaxed flex-shrink-0"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {question.question}
          </motion.h2>

          <motion.div
            className="space-y-2 mb-3 flex-1 overflow-y-auto"
            role="radiogroup"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {question.options.map((option, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
              >
                <AnswerOption
                  index={idx}
                  option={option}
                  isSelected={selectedAnswer === idx}
                  onSelect={onSelectAnswer}
                  disabled={disabled}
                  showResult={showResults}
                  isCorrect={showResults && idx === question.correctAnswer}
                  userAnswer={selectedAnswer}
                />
              </motion.div>
            ))}
          </motion.div>



          <div className="md:hidden mb-4">
            <Navigation
              currentIndex={questionIndex}
              totalQuestions={totalQuestions}
              answers={answers}
              onNavigate={onNavigate}
              canNavigate={!disabled}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <motion.button
              type="button"
              onClick={onPrevious}
              disabled={isFirstQuestion}
              className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 backdrop-blur-sm will-change-transform ${
                isFirstQuestion
                  ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/20'
                  : 'bg-white/20 text-white hover:bg-white/30 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-white/30'
              }`}
              whileTap={!isFirstQuestion ? { scale: 0.95 } : {}}
              whileHover={!isFirstQuestion ? { scale: 1.05 } : {}}
            >
              ← Previous
            </motion.button>

            {allAnswered ? (
              <motion.button
                type="button"
                onClick={onSubmit}
                className="px-8 py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm will-change-transform"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                🚀 Submit
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={onNext}
                disabled={isLastQuestion}
                className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-200 backdrop-blur-sm will-change-transform ${
                  isLastQuestion
                    ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/20'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
                whileTap={!isLastQuestion ? { scale: 0.95 } : {}}
                whileHover={!isLastQuestion ? { scale: 1.05 } : {}}
              >
                Next →
              </motion.button>
            )}
          </div>

          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                type: "spring",
                stiffness: 300
              }}
              className={`p-3 rounded-xl border-2 backdrop-blur-sm will-change-transform flex-shrink-0 ${
                isCorrect
                  ? 'bg-gradient-to-br from-green-50/90 to-green-100/70 dark:from-green-900/90 dark:to-green-800/70 border-green-200 dark:border-green-700'
                  : 'bg-gradient-to-br from-orange-50/90 to-red-100/70 dark:from-orange-900/90 dark:to-red-800/70 border-orange-200 dark:border-orange-700'
              }`}
            >
              <div className={`flex items-center mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
                <motion.div
                  className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center shadow-md will-change-transform ${
                    isCorrect ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-orange-400 to-red-500'
                  }`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isCorrect ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </motion.div>
                <span className="font-bold text-base">
                  {isCorrect ? 'Perfect! 🎉' : 'Not quite right 🤔'}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-11 text-sm">
                {question.explanation}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default QuestionCard;

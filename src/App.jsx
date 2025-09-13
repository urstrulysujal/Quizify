import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionsData } from "./data/questions.js";
import ParticleBackground from "./components/ParticleBackground.jsx";
import Progress3D from "./components/Progress3D.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import ResultsSummary from "./components/ResultsSummary.jsx";
import QuestionPalette from "./components/QuestionPalette.jsx";


// Main App Component with Advanced Features
export default function App() {
  const [answers, setAnswers] = useState(() => Array(questionsData.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const submitButtonRef = useRef(null);

  const answeredCount = useMemo(() => answers.filter(answer => answer !== null).length, [answers]);
  const allAnswered = answeredCount === questionsData.length;
  const currentQuestion = questionsData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSelectAnswer = useCallback((optionIndex) => {
    if (submitted) return;

    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = optionIndex;
      return newAnswers;
    });
  }, [submitted, currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    if (!allAnswered) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
      return;
    }
    setSubmitted(true);
  }, [allAnswered]);

  const handleRestart = useCallback(() => {
    setAnswers(Array(questionsData.length).fill(null));
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  }, []);

  const calculateTotalPoints = useCallback(() => {
    return questionsData.reduce((total, question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      return total + (isCorrect ? question.points : 0);
    }, 0);
  }, [answers]);

  useEffect(() => {
    if (submitted) {
      const totalPoints = calculateTotalPoints();
      const correctCount = answers.filter((answer, idx) => answer === questionsData[idx].correctAnswer).length;

      const announcement = `Quiz completed! You scored ${correctCount} out of ${questionsData.length} questions correctly, earning ${totalPoints} points.`;

      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.textContent = announcement;
      document.body.appendChild(liveRegion);

      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
  }, [submitted, answers, calculateTotalPoints]);

  return (
    <div className="min-h-screen relative will-change-transform flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <ParticleBackground />

      <div className="absolute inset-0 backdrop-blur-sm will-change-transform bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />

      <header className="relative z-10 backdrop-blur-xl border-b flex-shrink-0 bg-white/10 border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold bg-clip-text text-transparent mb-1 bg-gradient-to-r from-white via-blue-100 to-purple-100">
              🧠 Neural Quiz Challenge
            </h1>
            <p className="text-sm text-white/80">
              Test your knowledge with our advanced interactive experience
            </p>
          </motion.div>
        </div>
      </header>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-2 flex-1 flex flex-col min-h-0 ${submitted ? 'overflow-y-auto' : ''}`} style={submitted ? { paddingBottom: '80px', marginBottom: '80px' } : {}}>
        {!submitted && (
          <div className="block lg:hidden">
            <Progress3D
              answered={answeredCount}
              total={questionsData.length}
              current={currentQuestionIndex + 1}
            />
          </div>
        )}

        <div className="flex flex-row gap-6 w-full max-w-6xl mx-auto">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 100, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 200
                  }}
                  className="flex flex-col"
                >
                  <QuestionCard
                    question={currentQuestion}
                    questionIndex={currentQuestionIndex}
                    selectedAnswer={answers[currentQuestionIndex]}
                    onSelectAnswer={handleSelectAnswer}
                    disabled={submitted}
                    showResults={false}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                    isFirstQuestion={isFirstQuestion}
                    isLastQuestion={isLastQuestion}
                    allAnswered={allAnswered}
                    totalQuestions={questionsData.length}
                    answers={answers}
                    onNavigate={setCurrentQuestionIndex}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <ResultsSummary
                    questions={questionsData}
                    answers={answers}
                    totalPoints={calculateTotalPoints()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!submitted && (
            <div className="hidden lg:block w-72">
              <QuestionPalette
                totalQuestions={questionsData.length}
                answers={answers}
                currentIndex={currentQuestionIndex}
                onNavigate={setCurrentQuestionIndex}
              />
            </div>
          )}
        </div>
      </main>

      {submitted && (
        <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t p-4 z-20 bg-white/10 border-white/20" style={{ height: '80px' }}>
          <div className="max-w-4xl mx-auto flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 300 }}
              type="button"
              onClick={handleRestart}
              className="px-8 py-2 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm will-change-transform"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              🔄 Restart
            </motion.button>
          </div>
        </footer>
      )}
    </div>
  );
}

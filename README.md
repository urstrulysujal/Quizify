🎯 Quizify – Animated & Responsive Questionnaire Application
🌟 Overview

Quizify is a frontend internship assignment project built as an animated, responsive, and user-friendly questionnaire app.
It allows users to answer a short set of multiple-choice questions (MCQs) and view a results summary upon submission.

This project is UI/UX-first — focusing on visual quality, smooth interactions, and clarity.

🚀 Features

✅ Modern UI/UX – Clean spacing, hierarchy, and accessible typography.

📱 Responsive design – Works seamlessly on 320px → desktop screens.

🎬 Animations & Micro-interactions – Smooth transitions, hover/focus effects, feedback states.

📝 Question flow with validation – Submit button enabled only when all questions are answered.

📊 Results summary – Score, feedback, explanations, difficulty levels, and points.

♿ Accessibility – Keyboard navigation & screen-reader friendly.

🖼️ Demo

🔗 Live Demo: Deployed on Vercel

📹 Video Walkthrough: (Loom link here once recorded)

⚙️ Tech Stack

Frontend: React (Vite)

Styling: Tailwind CSS (+ custom animations, shadcn/ui optional)

Animations: Framer Motion

State Management: Local component state / React Context

Linting & Formatting: ESLint + Prettier

📂 Project Structure
Quizify/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── QuestionCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ResultSummary.jsx
│   ├── data/        # Dummy JSON questions
│   ├── App.jsx      # Main app flow
│   └── index.jsx    # Entry point
├── package.json
└── README.md

📋 User Flow

User starts the quiz (5 questions).

Each question appears with answer options (chips/buttons).

Progress is tracked (3/5 answered or progress bar).

Submit button remains disabled until all answers are given.

On submit:

✅ Score summary (e.g., 3/5 correct)

✅ Per-question feedback (correct/incorrect chips)

✅ Explanations & points earned

✅ Difficulty levels shown

🎨 UI/UX Highlights

Brand Colors:

Primary: #2563EB (Blue), #00B75F (Green)

Secondary: #FF9D33 (Orange), #FF6CA1 (Pink)

Neutral grays for backgrounds, text, borders.

Feedback States:

✅ Correct → Green chip

❌ Incorrect → Orange chip

🔲 Default → Light gray chip

Animations:

Fade/slide-in for components

Scale & color transition on selection

Smooth progress updates

Shake effect on invalid submit

🛠️ Installation & Setup
# Clone the repository
git clone https://github.com/urstrulysujal/Quizify.git

# Navigate to project directory
cd Quizify

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

🧪 Sample Data (MCQ JSON)
[
  {
    "id": "q1",
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "correctAnswer": 2,
    "explanation": "Paris is the capital and most populous city of France.",
    "points": 2,
    "difficulty": "Easy"
  },
  {
    "id": "q2",
    "question": "Which planet is known as the Red Planet?",
    "options": ["Earth", "Mars", "Jupiter", "Saturn"],
    "correctAnswer": 1,
    "explanation": "Mars is often called the Red Planet due to its reddish appearance.",
    "points": 2,
    "difficulty": "Easy"
  }
]

📹 Submission Checklist

✅ GitHub repo with clear structure

✅ Live demo (Vercel)

✅ This README.md

✅ Loom video walkthrough (to be added)

🏆 Assessment Alignment

🎥 Video Walkthrough (40%) – Explains UI, states, animations, and code.

⚡ Functionality (20%) – Complete flow with validation & results.

🎨 UI/UX & Motion (20%) – Visual polish, transitions, feedback.

📱 Responsiveness (10%) – Works on mobile → desktop.

🔍 Attention to Detail (10%) – Consistency & accessibility.

📜 License

This project is open-sourced for educational & internship assessment purposes.

# Stumate — Make Student Life Easier

**Stumate** is a comprehensive web application built with React and Next.js, designed to streamline and simplify the daily life of a student. It helps students **organize classes, plan study, track money, and prepare for exams** — all in one app.

Stumate is designed to tackle typical pain points students face: missed classes, disorganized study plans, unmanaged budgets, and lack of focused practice. The app brings scheduling, budgeting, exam prep, and an intelligent study planner together, synced to the cloud.

![StudentSavvy Dashboard](https://i.ibb.co/L67Xm9F/dashboard.png)

## ✨ Core Features

Stumate is packed with features to help you stay organized, focused, and on top of your finances.

### 1. 📅 Class Schedule Tracker

Never miss a lecture again! The schedule tracker provides a clear, color-coded calendar to manage all your classes and important events.

- **Multiple Views:** View your schedule by month, week, or day.
- **Easy Management:** Quickly add, edit, and delete class entries.
- **Color Coding:** Assign unique colors to different subjects for at-a-glance clarity.

![Schedule View](https://i.ibb.co/VvZf6cW/schedule.png)

### 2. 💰 Budget Tracker

Take control of your finances with a simple yet powerful budget tracker. Monitor your income and expenses to stay on budget throughout the semester.

- **Track Transactions:** Log income (allowance, part-time job) and expenses (food, books, transport).
- **Categorize Spending:** Understand where your money is going with custom categories.
- **Visual Breakdown:** An interactive pie chart visualizes your expenses, making it easy to see your spending habits.

![Budget Tracker](https://i.ibb.co/F8bLzR8/budget.png)

### 3. 📝 Study Planner

Break down large study goals into small, manageable tasks with a drag-and-drop Kanban board.

- **Organize Tasks:** Create tasks for different subjects, set priority levels (low, medium, high), and add deadlines.
- **Visual Progress:** Move tasks between "To Do," "In Progress," and "Done" columns to track your progress visually.
- **Flexible & Intuitive:** The drag-and-drop interface makes it easy to re-prioritize and manage your workload.

![Study Planner](https://i.ibb.co/yQJ4y9M/planner.png)

---

## 🚀 Unique Features

What makes Stumate stand out? We've added creative, AI-powered, and user-centric features to provide a truly enhanced experience.

### ⭐ Unique Feature 1: AI-Powered Exam Prep

Supercharge your study sessions with an AI-driven exam question generator. Instead of just tracking what to study, Stumate helps you _actually study_.

- **Generate Custom Quizzes:** Enter any topic, select a difficulty level (easy, medium, hard), and choose the number of questions.
- **Get Instant Questions & Answers:** Our AI generates relevant practice questions and their corresponding answers in seconds.
- **Endless Practice:** Prepare for any exam by creating unlimited practice tests on any subject.

![AI Exam Prep](https://i.ibb.co/Wp0yXnF/exam-prep.png)

### ⭐ Unique Feature 2: Persistent Focus Mode

Improve your concentration and productivity with a built-in Pomodoro timer designed for a seamless study experience.

- **Classic Pomodoro Technique:** Work in focused 25-minute intervals, with short and long breaks.
- **Persistent Timer:** The timer's state is saved in your browser. **If you refresh the page or accidentally close the tab, your timer continues right where you left off**, ensuring your focus is never truly broken.
- **Audible Alerts:** Get a clear audio notification when a session ends, so you know when to take a break or get back to work.

![Focus Mode](https://i.ibb.co/WkP8W2q/focus.png)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** TanStack Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Generative AI:** Google's Gemini Pro via Genkit

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/Stumate.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file and adding your Firebase and MongoDB credentials.
4. Run the development server
   ```sh
   npm run dev
   ```

---

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Implement code & tests.
4. Open a PR with description and screenshots.

Coding standards: follow ESLint config in repo; Tailwind for styling; prefer functional components and hooks.

---

## Troubleshooting (common)

- Blank app: ensure `.env` keys exist and your Firebase Project ID matches the one in your Firebase project.
- Auth fails in production: add your domain to Firebase Auth **Authorized domains**.
- Charts empty: confirm date range and that budget entries exist.

---

## Roadmap

- Calendar import/export (.ics)
- OCR for timetable image import
- Multi-user collaborative study groups
- More question types in Q&A (code, image-based)

---

## License

MIT © Abdul Jabbar al Nahid

import PrivateRoute from "@/context/PrivateRoute";

import ContactPage from "@/Page/ContactPage";

import LoginPage from "@/Page/LoginPage";
import Register from "@/Page/Register";
import UpcomingPage from "@/Page/UpcomingPage";

import Dashboard from "@/layouts/Dashboard";
import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/Page/ErrorPage";

// Student Dashboard Pages
import NotificationSettings from "@/Page/Dashboard/Settings/NotificationSettings";
import PasswordSettings from "@/Page/Dashboard/Settings/PasswordSettings";
import ProfileSettings from "@/Page/Dashboard/Settings/ProfileSettings";
import SettingsLayout from "@/Page/Dashboard/Settings/SettingsLayout";

// Admin Dashboard Pages
import AboutPage from "@/Page/About/AboutPage";

import { createBrowserRouter } from "react-router-dom";
import BillingSettings from "../Page/Dashboard/Settings/BillingSettings";
import Plan from "../Page/Dashboard/Settings/Plan";
import { BudgetTracker } from "../Page/Dashboard/UserHome/budget/BudgetTracker";
import { Overview } from "../Page/Dashboard/UserHome/dashboard/Overview";
import ExamGenerator from "../Page/Dashboard/UserHome/exam/ExamGenerator";
import { QuizHistory } from "../Page/Dashboard/UserHome/exam/QuizHistory";
import { FocusTimer } from "../Page/Dashboard/UserHome/focus/FocusTimer";
import { HelpPage } from "../Page/Dashboard/UserHome/HelpPage";
import { StudyJournal } from "../Page/Dashboard/UserHome/journal/StudyJournal";
import { PlannerBoard } from "../Page/Dashboard/UserHome/planner/PlannerBoard";
import { ScheduleView } from "../Page/Dashboard/UserHome/schedule/ScheduleView";
import HeroHome from "../Page/Home/HeroHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HeroHome /> },
            { path: "/about-us", element: <AboutPage /> },
            { path: "/contact-us", element: <ContactPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <Register /> },
            { path: "/up-coming-page", element: <UpcomingPage /> },
        ],
    },

    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: "userHome", element: <Overview /> },

            // Student Routes
            { path: "schedule", element: <ScheduleView /> },
            { path: "budget", element: <BudgetTracker /> },
            { path: "planner", element: <PlannerBoard /> },
            { path: "focus", element: <FocusTimer /> },
            { path: "journal", element: <StudyJournal /> },
            { path: "exam-prep", element: <ExamGenerator /> },
            { path: "exam-history", element: <QuizHistory /> },
            { path: "help", element: <HelpPage /> },

            // Settings (for both user/admin)
            {
                path: "settings",
                element: <SettingsLayout />,
                children: [
                    { path: "profile", element: <ProfileSettings /> },
                    { path: "password", element: <PasswordSettings /> },
                    { path: "notifications", element: <NotificationSettings /> },
                    { path: "billings", element: <BillingSettings /> },
                    { path: "plan", element: <Plan /> },
                    { index: true, element: <ProfileSettings /> },
                ],
            },


        ],

        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    },
]);

export default router;

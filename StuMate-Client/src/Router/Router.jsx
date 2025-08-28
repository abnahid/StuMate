import AdminRoute from "@/context/AdminRoute";
import PrivateRoute from "@/context/PrivateRoute";

import ContactPage from "@/Page/ContactPage";

import Home from "@/Page/Home/Home";
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
import MyBudget from "@/Page/Dashboard/UserHome/MyBudget";
import MyClasses from "@/Page/Dashboard/UserHome/MyClasses";
import MyPlans from "@/Page/Dashboard/UserHome/MyPlans";
import UserHome from "@/Page/Dashboard/UserHome/UserHome";

// Admin Dashboard Pages
import AboutPage from "@/Page/About/AboutPage";
import AdminHome from "@/Page/Dashboard/AdminHome/AdminHome";
import ManageUsers from "@/Page/Dashboard/AdminHome/ManageUsers";
import Reports from "@/Page/Dashboard/AdminHome/Reports";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
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
            { path: "userHome", element: <UserHome /> },

            // Student Routes
            { path: "my-classes", element: <MyClasses /> },
            { path: "my-budget", element: <MyBudget /> },
            { path: "my-plans", element: <MyPlans /> },

            // Settings (for both user/admin)
            {
                path: "settings",
                element: <SettingsLayout />,
                children: [
                    { path: "profile", element: <ProfileSettings /> },
                    { path: "password", element: <PasswordSettings /> },
                    { path: "notifications", element: <NotificationSettings /> },
                    { index: true, element: <ProfileSettings /> },
                ],
            },

            // Admin Routes
            {
                path: "adminHome",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "reports",
                element: (
                    <AdminRoute>
                        <Reports />
                    </AdminRoute>
                ),
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

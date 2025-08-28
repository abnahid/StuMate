import AdminRoute from "@/context/AdminRoute";
import PrivateRoute from "@/context/PrivateRoute";
import AboutPage from "@/Page/AboutPage/AboutPage";
import BiodataDetailsPage from "@/Page/BiodataDetailsPage";
import ContactPage from "@/Page/ContactPage";
import ApprovedContactRequest from "@/Page/Dashboard/AdminHome/ApprovedContactRequest";
import AffiliatesB2B from "@/Page/Dashboard/Content/AffiliatesB2B";
import HelpAndSupport from "@/Page/Dashboard/Content/HelpAndSupport";
import MissionVision from "@/Page/Dashboard/Content/MissionVision";
import PrivacyPolicy from "@/Page/Dashboard/Content/PrivacyPolicy";
import SitemapPage from "@/Page/Dashboard/Content/SitemapPage";
import TermsAndConditions from "@/Page/Dashboard/Content/TermsAndConditions";
import AllPayment from "@/Page/Dashboard/Payment/allPayment";
import CheckoutPage from "@/Page/Dashboard/Payment/CheckoutPage";
import PaymentHistory from "@/Page/Dashboard/Payment/PaymentHistory";
import PaymentSuccess from "@/Page/Dashboard/Payment/PaymentSuccess";
import BillingSettings from "@/Page/Dashboard/Settings/BillingSettings";
import NotificationSettings from "@/Page/Dashboard/Settings/NotificationSettings";
import PasswordSettings from "@/Page/Dashboard/Settings/PasswordSettings";
import Plan from "@/Page/Dashboard/Settings/Plan";
import ProfileSettings from "@/Page/Dashboard/Settings/ProfileSettings";
import SettingsLayout from "@/Page/Dashboard/Settings/SettingsLayout";
import EditBiodataPage from "@/Page/Dashboard/UserHome/EditBiodataPage";
import MyContactRequestPage from "@/Page/Dashboard/UserHome/MyContactRequestPage";
import MyFavouritesPage from "@/Page/Dashboard/UserHome/MyFavouritesPage";
import ViewBiodataPage from "@/Page/Dashboard/UserHome/ViewBiodataPage";
import MembershipPlansPage from "@/Page/MembershipPlansPage";
import UpcomingPage from "@/Page/UpcomingPage";
import { createBrowserRouter } from "react-router-dom";
import GotMarried from "../Page/Dashboard/UserHome/GotMarried";
import UserHome from "../Page/Dashboard/UserHome/UserHome";
import Dashboard from "./../layouts/Dashboard";
import MainLayout from "./../layouts/MainLayout";
import AppSidebar from "./../Page/Biodata/appSidebar";
import AdminHome from "./../Page/Dashboard/AdminHome/AdminHome";
import ApprovedPremium from "./../Page/Dashboard/AdminHome/ApprovedPremium";
import ManageUsers from "./../Page/Dashboard/AdminHome/ManageUsers";
import ErrorPage from "./../Page/ErrorPage";
import Home from "./../Page/Home";
import LoginPage from "./../Page/LoginPage";
import Register from "./../Page/Register";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/about-us", element: <AboutPage /> },
                { path: "/contact-us", element: <ContactPage /> },
                { path: "/biodatas", element: <AppSidebar /> },
                {
                    path: "/biodata-details/:biodataId",
                    element: (
                        <PrivateRoute>
                            <BiodataDetailsPage />
                        </PrivateRoute>
                    ),
                    loader: ({ params }) =>
                        fetch(`https://matrimony-nexus-server.vercel.app/biodatas/${params.biodataId}`),
                },
                { path: "/login", element: <LoginPage /> },
                {
                    path: "/membership-plans-page",
                    element: (
                        <PrivateRoute>
                            <MembershipPlansPage />
                        </PrivateRoute>
                    ),
                },
                { path: "/mission-vision", element: <MissionVision /> },
                { path: "/affiliates-b2b", element: <AffiliatesB2B /> },
                { path: "/privacy-policy", element: <PrivacyPolicy /> },
                { path: "/terms-and-conditions", element: <TermsAndConditions /> },
                { path: "/sitemap", element: <SitemapPage /> },
                { path: "/help-and-support", element: <HelpAndSupport /> },
                { path: "/register", element: <Register /> },
                { path: "/up-coming-page", element: <UpcomingPage /> },
                {
                    path: "payments/:transactionId",
                    element: <PaymentSuccess />,
                    loader: ({ params }) =>
                        fetch(`https://matrimony-nexus-server.vercel.app/payment/${params.transactionId}`),
                },
                {
                    path: "/checkout/:biodataId",
                    element: (
                        <PrivateRoute>
                            <CheckoutPage />
                        </PrivateRoute>
                    ),
                    loader: ({ params }) =>
                        fetch(`https://matrimony-nexus-server.vercel.app/biodatas/${params.biodataId}`),
                },
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

                { path: "editBiodata", element: <EditBiodataPage /> },
                { path: "viewBiodata", element: <ViewBiodataPage /> },
                { path: "myContactRequests", element: <MyContactRequestPage /> },
                {
                    path: "favouritesBiodata",
                    element: <MyFavouritesPage />,
                    loader: () => fetch("https://matrimony-nexus-server.vercel.app/biodatas"),
                },
                { path: "paymentHistory", element: <PaymentHistory /> },
                { path: "GotMarried", element: <GotMarried /> },
                {
                    path: "settings",
                    element: <SettingsLayout />,
                    children: [
                        { path: "profile", element: <ProfileSettings /> },
                        { path: "password", element: <PasswordSettings /> },
                        { path: "billings", element: <BillingSettings /> },
                        { path: "notifications", element: <NotificationSettings /> },
                        { index: true, element: <ProfileSettings /> },
                        { path: "plan", element: <Plan /> },

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
                            path: "manageUsers",
                            element: (
                                <AdminRoute>
                                    <ManageUsers />
                                </AdminRoute>
                            ),
                        },
                        {
                            path: "approvedPremium",
                            element: (
                                <AdminRoute>
                                    <ApprovedPremium />
                                </AdminRoute>
                            ),
                        },
                        {
                            path: "approvedContactRequests",
                            element: (
                                <AdminRoute>
                                    <ApprovedContactRequest />
                                </AdminRoute>
                            ),
                        },
                        {
                            path: "all-payment",
                            element: (
                                <AdminRoute>
                                    <AllPayment />
                                </AdminRoute>
                            ),
                        },
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
    ]
);

export default router;


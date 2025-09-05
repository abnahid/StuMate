import {
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import ThemeContext from "../context/ThemeContext";
import { FullscreenButton } from "./FullscreenButton";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, signOutUser } = useContext(AuthContext);

  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Set page titles for different routes
  const pageTitles = {
    "/dashboard/": "Dashboard",
    "/dashboard/schedule": "Class Schedule",
    "/dashboard/budget": "Budget Tracker",
    "/dashboard/planner": "Study Planner",
    "/dashboard/exam-prep": "Exam Prep",
    "/dashboard/focus": "Focus Mode",
    "/dashboard/journal": "Study Journal",
    "/dashboard/help": "Get Help",
    "/dashboard/community": "Community",
    "/dashboard/achievements": "Achievements",
    "/dashboard/settings": "Settings",
    "/dashboard/settings/plan": "Manage Plan",
    "/dashboard/settings/billings": "Billing Information",
    "/dashboard/exam-history": "Quiz History",
  };

  const pathname = useLocation().pathname;
  const title = pageTitles[pathname] || "Dashboard";
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll to add shadow when not at top
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode class on root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Close profile dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    if (signOutUser) {
      signOutUser();
    } else {
      console.log("Logging out...");
    }
  };

  return (
    <header
      className={`sticky top-0 z-10 flex items-center gap-4 bg-background px-4 py-3.5 mb-6 dark:bg-gray-900 rounded-[16px] ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="flex justify-between w-full items-center gap-2 min-w-0">
        {/* Sidebar trigger only on mobile/tablet (lg:hidden) */}
        <SidebarTrigger className="lg:hidden" />

        {/* Page title, truncates if space is tight */}
        <h1 className="text-lg font-semibold md:text-2xl flex-1 truncate">{title}</h1>

        {/* Right controls: Fullscreen, Theme, Profile */}
        <div className="flex items-center space-x-1 md:space-x-4 min-w-0">
          <FullscreenButton />

          <Button
            variant="outline"
            className="shadow-none border-none bg-sidebar rounded-full"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-7 w-7 rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-7 w-7 rotate-0 scale-100 transition-all" />
            )}
          </Button>

          {user && (
            <div className="relative min-w-0" ref={profileRef}>
              <button
                className="flex items-center gap-2 rounded-full  w-10 h-10 md:w-48 px-2 md:px-0 min-w-0"
                onClick={() => setIsProfileOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isProfileOpen}
                aria-controls="profile-dropdown"
              >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`h-full w-full flex items-center justify-center ${isDarkMode ? "bg-purple-800" : "bg-purple-600"} text-white font-bold`}
                    >
                      {(user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                    </div>
                  )}
                </div>

                {/* User info hidden on mobile */}
                <div className="hidden md:block flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm truncate ">
                    {user.name || "User"}
                  </p>
                  <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {user.role || "Student"}
                  </p>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 sr-only md:not-sr-only
                    ${isProfileOpen ? "rotate-180" : ""}
                    ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div
                  id="profile-dropdown"
                  className={`absolute right-0 top-full mt-2 w-44 max-w-[calc(100vw-2rem)] min-w-32
                    rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.15)] border border-[#e3e5ec] bg-background p-2 z-50
                    overflow-auto
                    ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100"}`}
                  tabIndex={-1}
                >
                  {/* Header */}
                  <div className={`p-3 border-b bg-[#f2f3f8] dark:bg-gray-800 rounded-md ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {user.email}
                    </p>
                  </div>
                  {/* Menu Items */}
                  <div className="py-1 flex flex-col gap-1">
                    <Link to="/dashboard/userHome">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                      >
                        <User className="h-5 w-5" />
                        Profile
                      </button>
                    </Link>
                    <Link to="/dashboard/settings">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </button>
                    </Link>
                    <button
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${isDarkMode
                        ? "text-red-400 hover:bg-gray-700"
                        : "text-red-600 hover:bg-gray-100"
                        }`}
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
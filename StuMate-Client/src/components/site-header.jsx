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

  const pageTitles = {
    '/dashboard/': 'Dashboard',
    '/dashboard/schedule': 'Class Schedule',
    '/dashboard/budget': 'Budget Tracker',
    '/dashboard/planner': 'Study Planner',
    '/dashboard/exam-prep': 'Exam Prep',
    '/dashboard/focus': 'Focus Mode',
    '/dashboard/journal': 'Study Journal',
    '/dashboard/help': 'Get Help',
  };

  const pathname = useLocation().pathname;
  const title = pageTitles[pathname] || 'Dashboard';
  // Handle dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Click outside to close profile dropdown
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
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 sm:px-6  py-4 dark:bg-gray-900">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-4 lg:px-6 ">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold md:text-xl flex-1">{title}</h1>
        <div className="flex items-center space-x-1 md:space-x-4">

          <FullscreenButton />



          <Button variant="outline"
            className="shadow-none border-none"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-7 w-7 text-3xl rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-7 w-7 rotate-0 scale-100 transition-all" />
            )}
          </Button>


        </div>

        {user && (
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center space-x-3 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800  w-56"
              onClick={() => setIsProfileOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              aria-controls="profile-dropdown"
            >
              {/* Avatar */}
              <div
                className={`h-10 w-10 rounded-full border-2 overflow-hidden flex-shrink-0
          ${isDarkMode ? "border-purple-600" : "border-purple-400"}`}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`h-full w-full flex items-center justify-center
              ${isDarkMode ? "bg-purple-800" : "bg-purple-600"} text-white font-bold`}
                  >
                    {(user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="hidden md:block flex-1 text-left">
                <p className="font-medium text-sm truncate ">{user.name || "User"}</p>
                <p
                  className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {user.role || "Student"}
                </p>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 flex-shrink-0
          ${isProfileOpen ? "rotate-180" : ""}
          ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div
                id="profile-dropdown"
                className={`absolute right-0 mt-2 w-56 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.15)] border border-[#e3e5ec] bg-background p-2 z-50
          ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100"}`}
                tabIndex={-1}
              >
                {/* Header */}
                <div
                  className={`p-3 border-b bg-[#f2f3f8] dark:bg-gray-800 rounded-md ${isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                >
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p
                    className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    {user.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link to="/dashboard/userHome">
                    <button
                      className={`w-full flex items-center px-4 py-2 text-sm
                ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                  </Link>
                  <Link to="/dashboard/settings">
                    <button
                      className={`w-full flex items-center px-4 py-2 text-sm
                ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                  </Link>
                  <button
                    className={`w-full flex items-center px-4 py-2 text-sm
              ${isDarkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-gray-100"}`}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
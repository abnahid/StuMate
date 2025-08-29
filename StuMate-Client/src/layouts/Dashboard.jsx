import {
  ChevronDown,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { FullscreenButton } from "../components/FullscreenButton";
import { AuthContext } from "../context/AuthProvider";
import ThemeContext from "../context/ThemeContext";

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, signOutUser } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <div className={`relative min-h-screen max-w-screen 
      ${isDarkMode
        ? 'bg-BgDarkPrimary'
        : 'bg-white'} lg:flex`}>

      {/* Sidebar - static on desktop, toggle on mobile */}
      <div className="hidden lg:block h-screen w-64 fixed left-0 top-0 z-40">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">

        <div className="lg:ml-64">
          <header
            className={`sticky top-0 z-30 ${isDarkMode ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-md shadow-sm border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
          >

            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Left Side: Menu Toggle & Page Title */}
                <div className="flex items-center space-x-4">


                  <div className="hidden md:block">

                    <p
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                      Welcome back to your dashboard
                    </p>
                  </div>
                </div>

                {/* Right Side: Search, Notifications, Theme Toggle, Profile */}
                <div className="flex items-center space-x-1 md:space-x-4">
                  <FullscreenButton />

                  {/* Dark Mode Toggle */}
                  <button
                    className={`p-2 rounded-full ${isDarkMode
                      ? "hover:bg-gray-700 text-yellow-400"
                      : "hover:bg-gray-100 text-gray-700"
                      } transition-colors duration-200`}
                    onClick={toggleTheme}
                    aria-label={
                      isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                  </button>

                  {/* User Profile Dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      className="flex items-center space-x-2 focus:outline-none"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <div
                        className={`h-10 w-10 rounded-full border-2 overflow-hidden ${isDarkMode ? "border-purple-600" : "border-purple-400"
                          }`}
                      >
                        {user.photoURL ? (
                          <img
                            src={user.photoURL || "/placeholder.svg"}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className={`h-full w-full flex items-center justify-center ${isDarkMode ? "bg-purple-800" : "bg-purple-600"
                              } text-white`}
                          >
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p
                          className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                          {user.role}
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                          } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                    </button>

                    {isProfileOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg overflow-hidden ${isDarkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border border-gray-200"
                          }`}
                      >
                        <div
                          className={`p-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"
                            }`}
                        >
                          <p className="text-sm font-medium">{user.name}</p>
                          <p
                            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                          >
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link to="/dashboard/userHome">
                            <button
                              className={`w-full flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                            >
                              <User className="h-4 w-4 mr-2" />
                              Profile
                            </button>
                          </Link>
                          <Link to="/dashboard/settings">
                            <button
                              className={`w-full flex items-center px-4 py-2 text-sm ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </button>
                          </Link>

                          <button
                            className={`w-full flex items-center px-4 py-2 text-sm ${isDarkMode
                              ? "text-red-400 hover:bg-gray-700"
                              : "text-red-600 hover:bg-gray-100"
                              }`}
                            onClick={handleLogout}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
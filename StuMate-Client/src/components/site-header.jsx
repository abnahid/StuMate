import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import ThemeContext from "../context/ThemeContext";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext); // ✅ Get user + logout from context

  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    if (logout) {
      logout(); // ✅ Call context logout if available
    } else {
      console.log("Logging out...");
    }
  };

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>

        {/* Dark Mode Toggle */}
        <button
          className={`p-2 rounded-full ${isDarkMode
              ? "hover:bg-gray-700 text-yellow-400"
              : "hover:bg-gray-100 text-gray-700"
            } transition-colors duration-200`}
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* User Profile Dropdown */}
        {user && (
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
                    src={user.photoURL}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`h-full w-full flex items-center justify-center ${isDarkMode ? "bg-purple-800" : "bg-purple-600"
                      } text-white`}
                  >
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="font-medium text-sm">{user.name || "User"}</p>
                <p
                  className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {user.role || "Member"}
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
        )}
      </div>
    </header>
  );
}

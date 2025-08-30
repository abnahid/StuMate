import ThemeContext from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const defaultProfilePicture = "/avatars/default-user.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStyle = `font-semibold text-primary`;

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-primary px-3 py-1 rounded-lg`
              : "hover:text-primary px-3 py-1 rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/about-us" className={({ isActive }) =>
          isActive ? activeStyle : "hover:text-primary px-3 py-1 rounded-lg"
        }>
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact-us" className={({ isActive }) =>
          isActive ? activeStyle : "hover:text-primary px-3 py-1 rounded-lg"
        }>
          Contact Us
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard/userHome" className={({ isActive }) =>
              isActive ? activeStyle : "hover:text-primary px-3 py-1 rounded-lg"
            }>
              Dashboard
            </NavLink>
          </li>

        </>
      ) : (null
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? isDarkMode
          ? "bg-gray-900 shadow-lg"
          : "bg-white shadow-lg"
        : "bg-transparent"
        }`}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/SVG/logo.svg" alt="" className="h-12" />
        </Link>

        <div className="hidden lg:flex">
          <ul
            className={`flex space-x-6 transition-colors duration-300 ${isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
          >
            {links}
          </ul>
        </div>

        <div
          className={`flex items-center space-x-4 transition-colors duration-300 ${isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
        >
          {user ? (
            <button
              className={`p-2 rounded-full transition-all duration-300 relative overflow-hidden ${isDarkMode
                ? "bg-gray-800 text-primary hover:bg-gray-700"
                : "bg-[var(--primary-foreground)] text-primary hover:bg-gray-200"
                } hover:scale-110`}
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FaSun className="relative z-10 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <FaMoon className="relative z-10 transition-transform duration-300 hover:rotate-12" />
              )}
            </button>
          ) : null}


          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center p-1 rounded-lg focus:outline-none`}>
                  <img
                    src={user?.photoURL || defaultProfilePicture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                  <p className="text-xs">{user?.email || "user@example.com"}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard/help">Help & Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="#">Write a Review</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={signOutUser}
                    className="w-full text-left text-primary"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-[var(--primary-foreground)]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
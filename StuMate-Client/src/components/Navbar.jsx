"use client";

import ThemeContext from "@/context/ThemeContext";
import { Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/logo.svg";
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
  const activeStyle = `font-semibold ${isDarkMode ? "text-BgPrimary" : "text-BgPrimary"}`;

  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
              : "hover:text-gray-700 px-3 py-1 rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/userHome"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/classes"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              My Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/budget"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              Budget
            </NavLink>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                  : "hover:text-gray-700 px-3 py-1 rounded-lg"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </>
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
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`p-2 text-gray-500 rounded-lg focus:outline-none ${isDarkMode ? "dark:text-gray-400 hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="right" className="w-48">
              <ul className="space-y-2">{links}</ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Student Dashboard Logo" className="h-12" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className={`flex space-x-6 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
            {links}
          </ul>
        </div>

        {/* User Dropdown + Dark Mode */}
        <div className="flex items-center space-x-4">
          <button
            className={`p-2 lg:p-2 rounded-full transition-all duration-300 relative overflow-hidden ${isDarkMode
              ? "bg-BgDarkPrimary text-BgDarkAccent hover:bg-BgDarkSecondary/70"
              : "bg-red-100/50 text-red-700 hover:bg-red-200/70"
              } hover:scale-110`}
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <FaSun className="text-red-400 relative z-10 transition-transform duration-300 hover:rotate-12" />
            ) : (
              <FaMoon className="text-red-700 relative z-10 transition-transform duration-300 hover:rotate-12" />
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center p-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"} rounded-lg focus:outline-none`}>
                  <img
                    src={user?.photoURL || defaultProfilePicture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.displayName || "User Name"}</p>
                  <p className="text-xs">{user?.email || "user@example.com"}</p>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/help-and-support" className="w-full text-left">
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/GotMarried" className="w-full text-left">
                    Write a Review
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={signOutUser}
                    className={`w-full text-left ${isDarkMode ? "text-red-400" : "text-red-500"}`}
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-BgPrimary text-white">
                Sign In
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg border border-primary text-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

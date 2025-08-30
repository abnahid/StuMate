import {
  IconBook2, IconCalendar, IconClock, IconCurrencyDollar, IconDashboard,
  IconHelp, IconReport, IconSettings
} from "@tabler/icons-react";
import { BookMarked } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import ThemeContext from "../context/ThemeContext";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "./ui/sidebar";

// Sidebar navigation data only
const navMain = [
  { title: "Dashboard", url: "/dashboard/userHome", icon: IconDashboard },
  { title: "Schedule", url: "/dashboard/schedule", icon: IconCalendar },
  { title: "Budget", url: "/dashboard/budget", icon: IconCurrencyDollar },
  { title: "Study Planner", url: "/dashboard/planner", icon: IconBook2 },
  { title: "Exam Prep", url: "/dashboard/exam-prep", icon: IconReport },
  { title: "Focus Mode", url: "/dashboard/focus", icon: IconClock },
  { title: 'Study Journal', url: '/dashboard/journal', icon: BookMarked },
];
const navSecondary = [
  { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
  { title: "Get Help", url: "/help", icon: IconHelp },
];

export function AppSidebar(props) {
  const location = useLocation();
  const { user, signOutUser } = useContext(AuthContext); // Get user from AuthContext
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Profile dropdown logic (if needed)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

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

  const isActive = (url) =>
    location.pathname === url ||
    location.pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              data-active={isActive("/dashboard/userHome") ? "true" : undefined}
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <IconDashboard className="!size-5" />
                <span className="text-base font-semibold">Student Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* User Footer - get user from AuthContext */}
      <SidebarFooter>
        <NavUser
          user={user}
          onLogout={handleLogout}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          profileRef={profileRef}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
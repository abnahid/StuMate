import {
  IconBook2, IconCalendar, IconClock, IconCurrencyDollar,
  IconHelp, IconReport, IconSettings
} from "@tabler/icons-react";
import { BookMarked, Trophy, Users } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader
} from "./ui/sidebar";

const navMain = [
  { title: "Dashboard", url: "/dashboard/userHome", icon: RxDashboard },
  { title: "Schedule", url: "/dashboard/schedule", icon: IconCalendar },
  { title: "Budget", url: "/dashboard/budget", icon: IconCurrencyDollar },
  { title: "Study Planner", url: "/dashboard/planner", icon: IconBook2 },
  { title: "Exam Prep", url: "/dashboard/exam-prep", icon: IconReport },
  { title: "Focus Mode", url: "/dashboard/focus", icon: IconClock },
  { title: 'Study Journal', url: '/dashboard/journal', icon: BookMarked },
  { title: 'Achievements', url: '/dashboard/achievements', icon: Trophy },
];
const navSecondary = [
  { title: 'Community', url: '/dashboard/community', icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
  { title: "Get Help", url: "/dashboard/help", icon: IconHelp },
];

export function AppSidebar(props) {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link to="/">
          <img src="/assets/SVG/logo.svg" alt="StuMate" className="h-12" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} pathname={location.pathname} />
        <NavSecondary items={navSecondary} className="mt-auto" pathname={location.pathname} />
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-gray-500 text-center">v1.0.0 Ab Nahid</p>
      </SidebarFooter>
    </Sidebar>
  );
}
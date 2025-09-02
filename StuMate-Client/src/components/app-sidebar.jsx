import {
  IconBook2,
  IconClock, IconCurrencyDollar,
  IconHelp, IconReport, IconSettings
} from "@tabler/icons-react";
import { BookMarked, Calendar, LogOut, Trophy, Users } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import {
  Sidebar, SidebarContent,
  SidebarHeader
} from "./ui/sidebar";

const navMain = [
  { title: "Dashboard", url: "/dashboard/userHome", icon: RxDashboard, id: 'tour-dashboard' },
  { title: "Schedule", url: "/dashboard/schedule", icon: Calendar, id: 'tour-schedule' },
  { title: "Budget", url: "/dashboard/budget", icon: IconCurrencyDollar, id: 'tour-budget' },
  { title: "Study Planner", url: "/dashboard/planner", icon: IconBook2, id: 'tour-planner' },
  { title: "Exam Prep", url: "/dashboard/exam-prep", icon: IconReport, id: 'tour-exam-prep' },
  { title: "Focus Mode", url: "/dashboard/focus", icon: IconClock, id: 'tour-focus-mode' },
  { title: 'Study Journal', url: '/dashboard/journal', icon: BookMarked, id: 'tour-study-journal' },
  { title: 'Achievements', url: '/dashboard/achievements', icon: Trophy, id: 'tour-achievements' },
];
const navSecondary = [
  { title: 'Community', url: '/dashboard/community', icon: Users, id: 'tour-community' },
  { title: "Settings", url: "/dashboard/settings", icon: IconSettings, id: 'tour-settings' },
  { title: "Get Help", url: "/dashboard/help", icon: IconHelp, id: 'tour-help' },
  { title: "Log Out", icon: LogOut }
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
    </Sidebar>
  );
}
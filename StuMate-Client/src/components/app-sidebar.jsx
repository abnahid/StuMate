"use client";

import {
  IconBook2,
  IconCalendar,
  IconClock,
  IconCurrencyDollar,
  IconDashboard,
  IconHelp,
  IconReport,
  IconSettings
} from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";

// 🎓 Sidebar Data (Student Project) - Updated
const data = {
  user: {
    name: "John Doe",
    email: "john@student.edu",
    avatar: "/avatars/student.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: IconCalendar,
    },
    {
      title: "Budget",
      url: "/dashboard/budget",
      icon: IconCurrencyDollar,
    },
    {
      title: "Study Planner",
      url: "/dashboard/planner",
      icon: IconBook2,
    },
    {
      title: "Exam Prep",
      url: "/dashboard/exam-prep",
      icon: IconReport,
    },
    {
      title: "Focus Mode",
      url: "/dashboard/focus",
      icon: IconClock,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
}

// ✨ Updated: UI Button state for active navigation
export function AppSidebar({ ...props }) {
  const location = useLocation();

  const isActive = (url) => {
    // Consider exact match or partial for subroutes
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas" {...props}>
        {/* 🔹 Header with brand name */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
                data-active={isActive("/dashboard") ? "true" : undefined}
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <IconDashboard className="!size-5" />
                  <span className="text-base font-semibold">Student Portal</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* 🔹 Sidebar Content */}
        <SidebarContent>
          <NavMain items={data.navMain} />

          <NavSecondary items={data.navSecondary} className="mt-auto" />

        </SidebarContent>

        {/* 🔹 User Footer */}
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
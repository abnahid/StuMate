import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import ThemeContext from "../context/ThemeContext";

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <SidebarProvider>

      {/* Sidebar - static on desktop, toggle on mobile */}
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="p-4 lg:p-6"><Outlet /> </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { SiteHeader } from "../components/site-header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import ThemeContext from "../context/ThemeContext";
import { GlobalFocusTimer } from "../Page/Dashboard/UserHome/focus/GlobalFocusTimer";

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

      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main ><Outlet /> </main>
        <GlobalFocusTimer />

      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
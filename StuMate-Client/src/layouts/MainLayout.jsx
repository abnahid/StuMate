import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer2 from "../components/Footer2";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-BgDarkPrimary text-gray-100" : "bg-BgMainColor text-gray-900"
        }`}
    >
      {!noHeaderFooter && <Navbar />}
      <div className={`${isDarkMode ? "bg-BgDarkPrimary" : "bg-gray-50"} transition-colors duration-300`}>
        <Outlet />
      </div>
      {!noHeaderFooter && <Footer2 />}
    </div>
  );
};

export default MainLayout;

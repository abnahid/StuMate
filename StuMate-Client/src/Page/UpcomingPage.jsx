import ThemeContext from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UpcomingPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const defaultDuration = 90 * 60 * 60;

  const getStoredTime = () => {
    const savedEndTime = localStorage.getItem("maintenanceEndTime");
    if (savedEndTime) {
      const remainingTime = Math.floor((savedEndTime - Date.now()) / 1000);
      return remainingTime > 0 ? remainingTime : defaultDuration;
    }
    return defaultDuration;
  };

  const [timeLeft, setTimeLeft] = useState(getStoredTime);

  useEffect(() => {
    if (!localStorage.getItem("maintenanceEndTime")) {
      localStorage.setItem("maintenanceEndTime", Date.now() + defaultDuration * 1000);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          toast("Maintenance extended! Restarting countdown.");
          localStorage.setItem("maintenanceEndTime", Date.now() + defaultDuration * 1000);
          return defaultDuration;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
    >
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Maintenance Logo"
        className="mb-8 h-40"
      />
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-700"
          }`}
      >
        Site is under maintenance
      </h1>
      <p
        className={`text-center text-lg md:text-xl lg:text-2xl mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
      >
        We're working hard to improve the user experience. Stay tuned!
      </p>
      <p
        className={`text-center text-lg font-semibold mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
      >
        Estimated Time Remaining: <span className="text-red-500">{formatTime(timeLeft)}</span>
      </p>
      <div className="flex space-x-4">
        <Link
          to="/contact-us"
          className={`font-bold py-3 px-6 rounded ${isDarkMode
            ? "bg-BgDarkSecondary hover:bg-gray-600 text-white"
            : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
        >
          Contact Us
        </Link>
        <button
          onClick={() => window.location.reload()}
          className={`border-2 font-bold py-3 px-6 rounded ${isDarkMode
            ? "dark:text-white dark:border-white"
            : "text-black border-gray-800"
            }`}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default UpcomingPage;
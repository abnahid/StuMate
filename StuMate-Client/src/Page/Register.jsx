import { RegisterForm } from "@/Components/register-form";
import ThemeContext from "@/context/ThemeContext";
import Lottie from "lottie-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LogoLogin from "../assets/logo.svg";
import LottieLogin from "../assets/lottie/loginPage.json";

export default function Register() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`grid min-h-screen lg:grid-cols-2 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/">
            <img src={LogoLogin} alt="" className="size-32" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div
        className={`relative hidden lg:block ${isDarkMode ? "bg-BgDarkSecondary" : "bg-muted"
          }`}
      >
        <Lottie
          animationData={LottieLogin}
          loop={true}
          className={`absolute inset-0 h-full w-full object-cover ${isDarkMode ? "brightness-[0.2] grayscale" : ""
            }`}
        />
      </div>
    </div>
  );
}
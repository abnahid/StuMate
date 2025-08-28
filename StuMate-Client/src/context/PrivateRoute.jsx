import Lottie from "lottie-react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LottieLoding from "../assets/lottie/Loding.json";
import { AuthContext } from "./AuthProvider";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // false
    return (
      <div className="flex justify-center items-center min-h-screen min-w-full bg-gray-50">
        <Lottie
          animationData={LottieLoding}
          loop={true}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;

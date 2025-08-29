import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5012',

});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    // Add request interceptor to include token from localStorage
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Redirect to login on auth errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.warn("Token invalid or expired. Logging out the user...");
          await signOutUser();
          localStorage.removeItem("accessToken"); // Clear token
          setShouldNavigate(true);
        }
        return Promise.reject(error);
      }
    );

    if (shouldNavigate) {
      navigate("/login");
    }

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, shouldNavigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
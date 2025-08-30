/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    localStorage.removeItem("accessToken");
    setLoading(true);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // JWT request
    if (user?.email) {
      try {
        const res = await axiosPublic.post("/jwt", { email: user.email });
        localStorage.setItem("accessToken", res.data.token);
      } catch (err) {
        console.error("JWT token request failed:", err);
      }
    }

    return userCredential;
  };


  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    localStorage.removeItem("accessToken");
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    const updateData = {};

    if (name && typeof name === "string") {
      updateData.displayName = name;
    }

    if (photo && typeof photo === "string") {
      updateData.photoURL = photo;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    return updateProfile(auth.currentUser, updateData).catch((error) => {
      console.error("Error updating user profile:", error);
      throw error;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(null); // reset first

      if (currentUser?.email) {
        try {
          // 1. Request JWT
          const res = await axiosPublic.post("/jwt", { email: currentUser.email });
          const token = res?.data?.token;

          if (token) {
            localStorage.setItem("accessToken", token);

            // 2. Fetch user profile from backend
            const userRes = await axiosPublic.get(`/users/${currentUser.email}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (userRes.data) {
              // merge firebase + backend data
              setUser({
                ...currentUser,
                ...userRes.data,
              });
            } else {
              setUser(currentUser); // fallback
            }
          }
        } catch (err) {
          console.error("User fetch or JWT failed:", err);
          localStorage.removeItem("accessToken");
          setUser(currentUser); // fallback
        }
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);


  const authInfo = {
    createUser,
    loginUser,
    signOutUser,
    loading,
    user,
    auth,
    setUser,
    updateUserProfile,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

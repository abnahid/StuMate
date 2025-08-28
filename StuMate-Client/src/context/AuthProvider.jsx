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
    localStorage.removeItem("accessToken"); // Always remove token on sign out
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    const updateData = {};

    // Only include displayName if it is a valid string
    if (name && typeof name === "string") {
      updateData.displayName = name;
    }

    // Only include photoURL if it is a valid string
    if (photo && typeof photo === "string") {
      updateData.photoURL = photo;
    }

    // Ensure at least one field is being updated
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
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const userInfo = { email: currentUser.email };
          const res = await axiosPublic.post("/jwt", userInfo);
          const token = res?.data?.token;

          if (token) {
            localStorage.setItem("accessToken", token);
          }
        } catch (err) {
          console.error("JWT token request failed:", err);
          localStorage.removeItem("accessToken");
        }
      } else {
        // No user, clear token
        localStorage.removeItem("accessToken");
      }

      // Set loading false after checking everything
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

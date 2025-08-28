import ThemeContext from "@/context/ThemeContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useContext, useState } from "react";
const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);


  // password reset function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setPasswordChanged(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Password update error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-4  bg-white ${isDarkMode ? " text-gray-100" : "bg-white text-gray-800"
        }`}
    >
      <h1
        className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"
          }`}
      >
        Change password
      </h1>

      <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        Choose a unique password to protect your account
        <br />
        Choose a password that will be hard for others to guess.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
          >
            Type your current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "border-gray-300 text-gray-800  bg-white"
              }`}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
          >
            Type your new password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "border-gray-300 text-gray-800 bg-white"
              }`}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className={`block mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
          >
            Confirm your new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-800"
              }`}
            required
          />
        </div>

        <div
          className={`mb-6 p-4 rounded-md ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
            }`}
        >
          <h3
            className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : ""}`}
          >
            Your password must include:
          </h3>
          <ul
            className={`space-y-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              At least 8 characters
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              At least 1 number or special character
            </li>
            <li
              className={`italic mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Don't use your name, email, or phone.
            </li>
          </ul>
        </div>

        <hr
          className={`my-6 ${isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
        />

        <div className="flex justify-between items-center">
          <div>
            <p
              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Review services you've authorized or learn more about our
              commitment to safety
            </p>
            {passwordChanged && (
              <p
                className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Last changed:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className={`px-4 py-2 border rounded-md hover:bg-opacity-80 ${isDarkMode
                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md hover:bg-opacity-90 ${isDarkMode
                ? "bg-BgPrimary text-white hover:bg-red-700"
                : "bg-red-600 text-white hover:bg-red-700"
                }`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordSettings;

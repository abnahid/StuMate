import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

const ContactPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div
      className={`py-20 ${isDarkMode ? "bg-BgDarkPrimary text-gray-300" : "bg-gray-50"
        }`}
    >
      <div
        className={`max-w-5xl mx-auto rounded-lg shadow-lg p-8 ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
          }`}
      >
        <h2
          className={`text-4xl font-extrabold text-center mb-6 ${isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
        >
          Get in Touch
        </h2>
        <p
          className={`text-lg text-center mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          Have questions or need assistance? We're here to help you on your
          journey to finding the perfect life partner.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div
            className={`p-6 rounded-lg ${isDarkMode ? "bg-BgDarkAccent" : "bg-gray-100"
              }`}
          >
            <h3
              className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
            >
              Contact Information
            </h3>
            <p
              className={` text-sm mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}>
              Email:{" "}
              <a
                href="mailto:support@matrimonynexus.com"
                className={`${isDarkMode ? "text-blue-400" : "text-BgPrimary"
                  }`}
              >
                support@matrimonynexus.com
              </a>
            </p>
            <p className={` text-sm mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>
              Phone:{" "}
              <a
                href="tel:+880123456789"
                className={`${isDarkMode ? "text-blue-400" : "text-BgPrimary"
                  }`}
              >
                +880-123-456-789
              </a>
            </p>
            <p className={` text-sm mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>Address: Dhaka, Bangladesh</p>
            <h3
              className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`hover:${isDarkMode ? "text-gray-400" : "text-BgSecondary"
                  }`}
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a
                href="#"
                className={`hover:${isDarkMode ? "text-gray-400" : "text-BgSecondary"
                  }`}
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="#"
                className={`hover:${isDarkMode ? "text-gray-400" : "text-BgSecondary"
                  }`}
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${isDarkMode
                    ? "bg-BgDarkSecondary border-gray-600 text-gray-300 focus:ring-blue-400 focus:border-blue-400"
                    : "bg-white border-gray-300 focus:ring-BgPrimary focus:border-BgPrimary"
                    }`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${isDarkMode
                    ? "bg-BgDarkSecondary border-gray-600 text-gray-300 focus:ring-blue-400 focus:border-blue-400"
                    : "bg-white border-gray-300 focus:ring-BgPrimary focus:border-BgPrimary"
                    }`}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${isDarkMode
                    ? "bg-BgDarkSecondary border-gray-600 text-gray-300 focus:ring-blue-400 focus:border-blue-400"
                    : "bg-white border-gray-300 focus:ring-BgPrimary focus:border-BgPrimary"
                    }`}
                ></textarea>
              </div>
              <button
                type="submit"
                className={"w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 bg-custom-gradient text-white hover:text-white focus:ring-BgPrimary focus:ring-offset-2"}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
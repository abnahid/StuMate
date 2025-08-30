import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
    const { isDarkMode } = useContext(ThemeContext);


    return (
        <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="flex space-x-4 overflow-x-auto py-4">

                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium ${isActive
                            ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`
                            : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`
                    }
                >
                    Profile
                </NavLink>
                <NavLink
                    to="password"
                    className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium ${isActive
                            ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`
                            : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`
                    }
                >
                    Password
                </NavLink>

                <NavLink
                    to="billings"
                    className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium ${isActive
                            ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'} font-bold`
                            : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`
                    }
                >
                    Billings
                </NavLink>
                <NavLink
                    to="plan"
                    className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium ${isActive
                            ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`
                            : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`
                    }
                >
                    Plan
                </NavLink>

                <NavLink
                    to="notifications"
                    className={({ isActive }) =>
                        `px-3 py-2 text-sm font-medium ${isActive
                            ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`
                            : `${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`
                    }
                >
                    Notifications
                </NavLink>
            </nav>
        </div>
    );
};

export default SettingsNav;
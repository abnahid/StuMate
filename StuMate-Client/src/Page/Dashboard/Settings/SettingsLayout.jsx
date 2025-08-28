import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import SettingsNav from './SettingsNav';

const SettingsLayout = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode
            ? ' text-gray-100'
            : ' text-gray-800'
            }`}>

            <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'
                }`}>
                Settings
            </h1>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Manage your account settings and preferences.
            </p>

            <SettingsNav />

            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
};

export default SettingsLayout;
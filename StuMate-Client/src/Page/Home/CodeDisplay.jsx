import HomeImage from "../../assets/stumate-dashborad.webp";

export default function CodeDisplay() {
    return (
        <div
            className={`relative max-w-5xl mx-auto px-4 transition-all duration-500 ease-in-out`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-BgDashboard via-BgDashboard to-primary dark:from-primary dark:via-primary dark:to-primary rounded-2xl sm:rounded-3xl transform -rotate-1 scale-105 opacity-60 dark:opacity-40 transition-all duration-300"></div>

            <div className="relative bg-white dark:bg-gray-950 rounded-lg sm:rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="bg-BgDashboard dark:bg-purple-900/70 text-primary dark:text-purple-300 px-2 sm:px-3 py-1 rounded-md text-xs font-medium">
                        StuMate Dashboard
                    </div>
                </div>

                <div className="bg-gray-900">
                    <img
                        src={HomeImage}
                        alt="Code snippet for formcarry setup"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/1200x600/111827/FFFFFF?text=Image+Not+Found";
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

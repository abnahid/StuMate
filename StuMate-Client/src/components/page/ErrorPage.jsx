import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className=" min-h-screen flex items-center justify-center px-4">
            <div className=" w-full  flex flex-col items-center py-16">
                {/* Desktop Image */}
                <img
                    className="hidden md:block w-[500px] h-[500px]"

                    src="/assets/SVG/404-notfound.svg"
                    alt="Page Not Found"
                />
                {/* Mobile Image */}
                <img
                    className="md:hidden w-[300px] h-[300px] "

                    src="/assets/SVG/404-notfound.svg"
                    alt="Page Not Found"
                />
                {/* Text Content */}
                <h1 className="text-5xl font-bold text-gray-800 pt-8">OOPS!</h1>
                <p className="text-base text-gray-600 px-4 text-center mt-4">
                    No signal here! We can’t find the page you’re looking for.
                </p>
                {/* Back Button */}
                <Link to="/">
                    <button className="mt-8 px-6 py-2 bg-Primary text-white rounded-md hover:bg- orange-800 focus:outline-none focus:ring-2 focus:ring- orange-500 focus:ring-opacity-50 transition">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;

import { FaFacebookF, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer2 = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto py-12 px-6 text-center">
                <h2 className="text-2xl/relaxed sm:text-3xl/relaxed md:text-4xl/snug font-bold text-gray-900 dark:text-white mb-6 ">
                    Got ideas to make student life smarter? <br className="hidden sm:block" />
                    We’d love to hear from you!
                </h2>
                <Link to="/register">
                    <Button className="px-6 py-6 text-lg font-semibold hover:scale-105 transition-all">
                        Get Started
                    </Button>
                </Link>

            </div>

            {/* Middle Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center  py-8 px-6 gap-6">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/assets/SVG/logo.svg" alt="StuMate" className="h-12" />
                    <span className="sr-only">StuMate</span>
                </Link>

                {/* Navigation */}
                <ul className="flex flex-wrap gap-12 text-md font-medium text-gray-600 dark:text-gray-400">
                    <li><Link to="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
                    <li><Link to="/features" className="hover:text-gray-900 dark:hover:text-white">Features</Link></li>
                    <li><Link to="/works" className="hover:text-gray-900 dark:hover:text-white">Works</Link></li>
                    <li><Link to="/support" className="hover:text-gray-900 dark:hover:text-white">Support</Link></li>
                </ul>

                {/* Social Icons */}
                <div className="flex gap-5">
                    <Link to="https://x.com/xahid_420" className="hover:text-gray-900 dark:hover:text-white"><FaTwitter className="w-5 h-5" /></Link>
                    <Link to="https://facebook.com/abnahidagency" className="hover:text-gray-900 dark:hover:text-white"><FaFacebookF className="w-5 h-5" /></Link>
                    <Link to="https://github.com/abnahid" className="hover:text-gray-900 dark:hover:text-white"><FaGithub className="w-5 h-5" /></Link>
                    <Link to="https://www.linkedin.com/in/ajnahid" className="hover:text-gray-900 dark:hover:text-white"><FaLinkedin className="w-5 h-5" /></Link>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 text-center md:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} All Rights Reserved by StuMate
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Developed by</span>
                    <a href="https://abnahid.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
                        Ab Nahid
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer2;

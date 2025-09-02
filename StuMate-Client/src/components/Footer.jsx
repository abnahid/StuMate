// Footer.jsx

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const defaultFooterData = {
    brand: {
        name: "StuMate",
        logo: "/assets/SVG/logo.svg",
        description: "Innovating for a better tomorrow. We deliver high-quality solutions.",
    },
    socialLinks: {
        github: "https://github.com/abnahid",
        twitter: "https://twitter.com/@xahid_420",
        linkedin: "https://www.linkedin.com/in/ajnahid",
    },
    menus: [
        {
            title: "Quick Links",
            items: [
                { name: "Home", link: "/" },
                { name: "About", link: "/about-us" },
                { name: "Services", link: "/services" },
            ],
        },
        {
            title: "Resources",
            items: [
                { name: "Support", link: "/support" },
                { name: "FAQs", link: "/faq" },
                { name: "Privacy Policy", link: "/privacy" },
            ],
        },
        {
            title: "Contact",
            items: [
                { name: "Email", link: "mailto:info@yourbrand.com" },
                { name: "Phone", link: "tel:+15551234567" },
            ],
        },
    ],
};

const Footer = () => {
    const { brand, menus, socialLinks } = defaultFooterData;

    return (
        <footer className="pt-12 border-t bg-sidebar dark:text-gray-300 transition-colors duration-300">
            {/* Top Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-10 text-center md:text-left px-6">

                {/* Brand Section */}
                {brand && (
                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <Link to="/" className="flex items-center justify-center md:justify-start gap-2">
                            <img src={brand.logo} alt={brand.name} className="h-12" />
                            <span className="sr-only">{brand.name}</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
                            {brand.description}
                        </p>
                        <div className="flex space-x-5 pt-2 justify-center md:justify-start">
                            {socialLinks?.github && (
                                <Link to={socialLinks.github} target="_blank" rel="noreferrer" className="hover:opacity-80">
                                    <FaGithub className="w-6 h-6 hover:text-color-BgDarkAccent transition-colors" />
                                </Link>
                            )}
                            {socialLinks?.twitter && (
                                <Link to={socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:opacity-80">
                                    <FaTwitter className="w-6 h-6 hover:text-color-BgDarkAccent transition-colors" />
                                </Link>
                            )}
                            {socialLinks?.linkedin && (
                                <Link to={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80">
                                    <FaLinkedin className="w-6 h-6 hover:text-color-BgDarkAccent transition-colors" />
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Dynamic Menus */}
                {menus?.map((menu) => (
                    <div key={menu.title} className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {menu.title}
                        </h3>
                        <ul className="space-y-3">
                            {menu.items?.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom */}
            <div className="border-t border-border bg-sidebar mt-10 transition-colors duration-300">
                <div className="py-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 text-center md:text-left gap-3">
                    <p className="text-sm font-normal text-Secondary dark:text-gray-400">
                        © {new Date().getFullYear()} All Rights Reserved by {brand?.name || "Your Brand"}
                    </p>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <p className="text-sm font-normal text-BgDarkAccent dark:text-gray-400">Developed by</p>
                        <a
                            href="https://abnahid.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-lg font-semibold text-primary transition-colors cursor-pointer">
                                Ab Nahid
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

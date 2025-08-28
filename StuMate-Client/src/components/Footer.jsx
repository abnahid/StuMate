import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

    const footerLinks = {
        student: [
            { name: "Dashboard", href: "/dashboard" },
            { name: "My Classes", href: "/dashboard/classes" },
            { name: "Schedule", href: "/dashboard/schedule" },
            { name: "Reports", href: "/dashboard/reports" },
        ],
        account: [
            { name: "Profile", href: "/dashboard/profile" },
            { name: "Settings", href: "/dashboard/settings" },
            { name: "Notifications", href: "/dashboard/settings/notifications" },
            { name: "Billing", href: "/dashboard/settings/billings" },
        ],
        resources: [
            { name: "Help Center", href: "/help" },
            { name: "FAQs", href: "/help#faqs" },
            { name: "Documentation", href: "/help/docs" },
            { name: "Contact Support", href: "/help/contact" },
        ],
        community: [
            { name: "Forum", href: "/community/forum" },
            { name: "Events", href: "/community/events" },
            { name: "Blog", href: "/community/blog" },
        ],
    };

    const socialLinks = [
        { label: "Twitter", href: "#", icon: <FaTwitter /> },
        { label: "Instagram", href: "#", icon: <FaInstagram /> },
        { label: "LinkedIn", href: "#", icon: <FaLinkedin /> },
        { label: "YouTube", href: "#", icon: <FaYoutube /> },
    ];

    return (
        <footer className="w-full bg-white dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                    {/* Logo & Contact */}
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <a href="/" className="flex justify-center lg:justify-start">
                            <span className="text-2xl font-bold text-indigo-600">StudentPortal</span>
                        </a>
                        <p className="py-8 text-sm text-gray-500 dark:text-gray-400 lg:max-w-xs text-center lg:text-left">
                            Manage your classes, budgets, plans, and progress all in one place.
                        </p>
                        <a
                            href="/help/contact"
                            className="py-2.5 px-5 h-9 block w-fit bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 lg:mx-0"
                        >
                            Contact Support
                        </a>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="lg:mx-auto text-left">
                            <h4 className="text-lg text-gray-900 dark:text-white font-medium mb-7 capitalize">
                                {title}
                            </h4>
                            <ul className="text-sm transition-all duration-500">
                                {links.map((link, index) => (
                                    <li key={index} className={index === links.length - 1 ? "" : "mb-6"}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="py-7 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            © 2024 StudentPortal, All rights reserved.
                        </span>
                        <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="w-9 h-9 rounded-full bg-gray-700 dark:bg-gray-600 flex justify-center items-center hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors duration-300"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
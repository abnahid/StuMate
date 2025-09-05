import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Button = ({ children, variant = "primary", className = "", to }) => {
    const baseClasses =
        "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";

    const variants = {
        primary: `
      bg-primary 
      text-[var(--primary-foreground)] 
      hover:bg-[color-mix(in srgb, var(--primary) 85%, black)] 
      focus:ring-primary
    `,
        secondary: `
      bg-[var(--secondary)] 
      text-[var(--secondary-foreground)] 
      hover:bg-[color-mix(in srgb, var(--secondary) 85%, black)] 
      border border-[var(--border)] 
      focus:ring-[var(--secondary)]
    `,
    };

    if (to) {
        return (
            <Link to={to} className={`${baseClasses} ${variants[variant]} ${className}`}>
                {children}
            </Link>
        );
    }

    return (
        <button className={`${baseClasses} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default function Hero() {
    const { user } = useAuth();

    return (
        <section className="relative z-10 text-center py-16 sm:py-24 px-4 ">
            {/* Gradient background ONLY for Hero */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div
                    className="absolute top-[-10rem] left-[-10rem] w-[40rem] h-[40rem] rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle at top left, var(--primary, #7c3aed) 0%, transparent 70%)",
                        opacity: 0.25,
                    }}
                />
                <div
                    className="absolute bottom-[-10rem] right-[-10rem] w-[40rem] h-[40rem] rounded-full blur-3xl"
                    style={{
                        background: "radial-gradient(circle at bottom right, var(--accent, #ff80b5) 0%, transparent 70%)",
                        opacity: 0.2,
                    }}
                />
            </div>
            <div className="max-w-4xl mx-auto ">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase 
          text-primary 
          bg-BgDashboard
          dark:bg-BgDarkSecondary
          rounded-full"
                >
                    Student Hub
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight 
          text-[var(--foreground)] leading-tight"
                >
                    Tackle student challenges like
                    <span className="text-primary ml-2">never before</span>
                </h1>

                <p className="mt-6 max-w-2xl mx-auto text-lg text-[var(--muted-foreground)]">
                    Organize study plans, track budgets, prepare for exams, and stay focused with cloud-synced student tools.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {user ? (
                        <Button variant="primary" className="w-full sm:w-auto" to="/dashboard/userHome">
                            Go to Dashboard
                        </Button>
                    ) : (
                        <Button variant="primary" className="w-full sm:w-auto" to="/register">
                            Get started - for free
                        </Button>
                    )}
                    <Button variant="secondary" className="w-full sm:w-auto" to="/about">
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
    );
}



export default function AboutSection() {
    return (
        <section className="relative z-10 text-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div
                    className="absolute top-[-8rem] left-[-8rem] w-[28rem] h-[28rem] sm:w-[40rem] sm:h-[40rem] rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle at top left, var(--primary, #7c3aed) 0%, transparent 70%)",
                        opacity: 0.25,
                    }}
                />
                <div
                    className="absolute bottom-[-8rem] right-[-8rem] w-[28rem] h-[28rem] sm:w-[40rem] sm:h-[40rem] rounded-full blur-3xl"
                    style={{
                        background:
                            "radial-gradient(circle at bottom right, var(--accent, #ff80b5) 0%, transparent 70%)",
                        opacity: 0.2,
                    }}
                />
            </div>

            {/* About Badge + Heading */}
            <div className="max-w-4xl mx-auto pb-11">
                <span
                    className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase 
          text-primary bg-BgDashboard dark:bg-BgDarkSecondary rounded-full"
                >
                    About Us
                </span>

                <h1
                    className="mt-6 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight 
          text-[var(--foreground)] leading-tight"
                >
                    A smarter way to navigate
                    <span className="text-primary ml-2">student life</span>
                </h1>

                <p className="mt-6 max-w-4xl mx-auto text-lg text-muted-foreground">
                    Student Life Toolkit is designed to make learning and living easier.
                    From managing your study plans, tracking budgets, preparing for exams,
                    to staying productive — everything you need is here in one place.
                </p>
            </div>

            {/* Image */}
            <div className="max-w-5xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg">
                <img
                    src="/assets/Image/student-group.webp"
                    alt="Students collaborating with the toolkit"
                    className="w-full h-60 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover"
                />
            </div>

        </section>
    );
}

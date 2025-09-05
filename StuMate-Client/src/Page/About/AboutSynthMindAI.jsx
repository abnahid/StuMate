
const AboutSynthMindAI = () => (
    <header className="bg-sidebar text-white">

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-16">
            {/* Our Story */}
            <section className="">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-BgPrimary mb-6">Our Story</h2>
                        <p className="text-muted-foreground mb-4">
                            Stumate was created in 2025 with a bold mission: to simplify the daily struggles students face by uniting study, finance, and productivity in one seamless platform. Built by a team of developers and education enthusiasts, the app is designed to empower students to focus on what truly matters — learning and growth.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            Today, Stumate is transforming the way students plan their classes, manage budgets, and prepare for exams, serving as an essential companion for learners worldwide.
                        </p>
                        <p className="text-muted-foreground">
                            Our name reflects our vision — we unite students with their ultimate mate, a smart assistant that keeps them organized, motivated, and future-ready.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="AI Neural Network Visualization"
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </div>
                </div>
            </section>
        </main>
    </header>
);

export default AboutSynthMindAI;
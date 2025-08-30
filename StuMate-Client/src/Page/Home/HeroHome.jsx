import Navbar from "../../components/Navbar";
import CodeDisplay from "./CodeDisplay";
import Hero from "./Home";
import Testimonial from "./Testimonial";

export default function HeroHome() {
    return (
        <div className="relative w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] pt-10 pb-16 sm:pt-16 sm:pb-24">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div
                    className="w-[40rem] h-[40rem] rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle at top left, var(--primary) 0%, transparent 70%)`,
                        opacity: "0.2",
                    }}
                />
            </div>

            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none">
                <div
                    className="w-[40rem] h-[40rem] rounded-full blur-3xl"
                    style={{
                        background: `radial-gradient(circle at bottom right, var(--accent) 0%, transparent 70%)`,
                        opacity: "0.2",
                    }}
                />
            </div>

            <Navbar />
            <main>
                <Hero />
            </main>
            <CodeDisplay />

            <Testimonial />
        </div>
    );
}

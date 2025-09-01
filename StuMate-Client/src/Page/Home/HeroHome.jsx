import CodeDisplay from "./CodeDisplay";
import FeatureGrid from "./FeatureGrid";
import Hero from "./Home";
import Testimonial from "./Testimonial";

export default function HeroHome() {
    return (
        <div className="relative w-full overflow-hidden bg-background text-foreground pt-10 pb-16 sm:pt-16 sm:pb-24 space-y-24">
            <Hero />
            <CodeDisplay />

            <FeatureGrid />
            <Testimonial />
        </div>
    );
}

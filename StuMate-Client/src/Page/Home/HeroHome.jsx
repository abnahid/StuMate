import CodeDisplay from "./CodeDisplay";
import FAQSection from "./FAQSection";
import FeatureGrid from "./FeatureGrid";
import Hero from "./Home";
import Testimonial from "./Testimonial";

export default function HeroHome() {
    return (
        <div className="relative w-full overflow-hidden bg-background text-foreground pt-10 sm:pt-16  space-y-24">
            <Hero />
            <CodeDisplay />

            <FeatureGrid />
            <Testimonial />
            <FAQSection />
        </div>
    );
}

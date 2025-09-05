import AboutMe from "./AboutMe";
import AboutSection from "./AboutSection";
import AboutSynthMindAI from "./AboutSynthMindAI";

const AboutPage = () => {
    return (
        <div className="relative w-full overflow-hidden bg-background text-foreground pt-10 sm:pt-16  space-y-24">
            <AboutSection />
            <AboutSynthMindAI />
            <AboutMe />
        </div >
    );
};

export default AboutPage;
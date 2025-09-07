import { Button } from "../../components/ui/button";

export default function TargetSection() {
    return (
        <section className="flex flex-col md:flex-row  rounded-2xl overflow-hidden  max-w-screen-xl mx-auto ">
            {/* Replace the src below with your relevant image */}
            <div className="md:w-1/2 w-full h-64 md:h-auto  flex items-center justify-center">
                <img
                    src="/assets/Image/public-speaking.jpg"
                    alt="Students collaborating and organizing"
                    className="object-cover w-full h-full rounded-lg "
                />
            </div>
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-primary mb-4">Our Target</h2>
                <p className="text-muted-foreground mb-6">
                    Our focus at Stumate is to empower students by simplifying the daily challenges they face. We help students organize their classes, plan effective study sessions, manage their budgets, and prepare for exams—all in one seamless platform. With features like intelligent scheduling, cloud-synced study planners, and budgeting tools, Stumate is dedicated to eliminating missed classes, disorganized plans, and unfocused study, ensuring every student can thrive academically and personally.
                </p>
                <Button className="px-6 py-6 text-lg font-semibold hover:scale-105 transition-all w-fit">
                    Learn more
                </Button>
            </div>
        </section>
    );
}

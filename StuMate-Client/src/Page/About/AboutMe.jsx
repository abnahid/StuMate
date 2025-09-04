import { Button } from "../../components/ui/button";

export default function AboutMe() {
    return (
        <div className="pb-14 bg-sidebar">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">

                {/* Left Side: Your Picture */}
                <div className="sm:w-6/12 flex justify-center order-last sm:order-first">
                    <img
                        className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
                        src="https://i.ibb.co.com/PzV9bqx1/blob.webp"
                        alt="Abdul Jabbar Al Nahid"
                    />
                </div>

                {/* Right Side: About Me */}
                <div className="text-left mb-10 sm:ml-10 md:ml-24 sm:w-6/12 order-first sm:order-last">
                    <p className="mt-4 text-sm leading-7 text-muted-foreground font-regular uppercase">
                        About Me
                    </p>
                    <h3 className="text-3xl sm:text-5xl leading-normal font-extrabold tracking-tight text-foreground">
                        Hi, I’m <span className="text-primary">Abdul Jabbar Al Nahid</span>
                    </h3>
                    <p className="mt-4 text-md leading-7 text-muted-foreground font-light">
                        I’m a passionate{" "}
                        <span className="font-medium text-foreground">Frontend Developer</span>{" "}
                        from Sylhet, Bangladesh. Skilled in{" "}
                        <span className="text-primary">Next.js, React.js, JavaScript, Tailwind CSS, Mongodb, node.js, express.js</span>,
                        and modern web technologies.
                        <br />
                        <br />
                        I love building interactive, responsive, and user-friendly applications.
                        My goal is to continuously grow as a developer and contribute to impactful projects.
                    </p>

                    <div className="mt-6">
                        <Button
                            className="px-6 py-6 text-lg font-semibold hover:scale-105 transition-all"
                        >
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

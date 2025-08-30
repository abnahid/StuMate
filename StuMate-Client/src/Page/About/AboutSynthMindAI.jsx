
const AboutSynthMindAI = () => (
    <header className="bg-gradient-to-r from-dark to-primary-900 text-white py-20">
        <div className=" px-6 py-32 text-center bg-gradient-to-r from-[#6366f1] to-[#2563eb]">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About SynthMind AI</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Where human creativity meets artificial intelligence to solve tomorrow&apos;s challenges
            </p>
        </div>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-16">
            {/* Our Story */}
            <section className="mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-BgPrimary mb-6">Our Story</h2>
                        <p className="text-gray-700 mb-4">
                            SynthMind AI was founded in 2019 with a radical idea: that artificial intelligence should enhance human decision-making rather than replace it. Our team of neuroscientists and machine learning experts set out to create a new paradigm in AI.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Today, we&apos;re recognized as pioneers in cognitive computing, with our technology powering some of the world&apos;s most innovative companies across healthcare, finance, and creative industries.
                        </p>
                        <p className="text-gray-700">
                            Our name reflects our philosophy - we synthesize human-like understanding with machine precision to create truly intelligent systems.
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
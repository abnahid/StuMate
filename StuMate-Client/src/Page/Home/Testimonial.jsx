
function Testimonial() {
    const testimonials = [{
        name: "Arif Hasan",
        title: "Computer Science Student",
        text: "Stumate completely changed the way I manage my classes. The color-coded calendar makes it so easy to stay on track and never miss a lecture.",
        image: "https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg"
    }, {
        name: "Nadia Rahman",
        title: "IELTS Candidate",
        text: "The AI exam prep feature is a lifesaver! I can generate unlimited practice questions for my topics and it feels like I have a personal tutor on demand.",
        image: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
    }, {
        name: "Imran Chowdhury",
        title: "Business Student",
        text: "I used to struggle with keeping track of expenses during the semester. The budget tracker in Stumate helped me cut unnecessary spending and save money.",
        image: "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
    }, {
        name: "Anonymous author",
        title: "Doing something",
        text: "I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to make some changes from the original or too expensive to have. I downloaded the copy of Tailus template which is very clear to understand at the last and you could modify the codes/blocks to fit perfectly on your purpose of the page.",
        image: "https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg"
    }, {
        name: "Sophia Lee",
        title: "Junior Frontend Developer",
        text: "The study planner with Kanban boards is so intuitive. I can break down my tasks and actually see my progress—it keeps me motivated.",
        image: "https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg"
    }, {
        name: "Mahmudul Karim",
        title: "Engineering Student",
        text: "The focus mode is brilliant! Even if my browser crashes, the Pomodoro timer continues. It has boosted my productivity massively.",
        image: "https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg"
    }, {
        name: "Ananya Sen",
        title: "Medical Student",
        text: "Balancing classes, labs, and study time was overwhelming. Stumate helped me organize everything in one place and reduced my stress.",
        image: "https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg"
    }, {
        name: "Rodrigo Aguilar",
        title: "Creator, TailwindAwesome",
        text: "I love Tailus ❤️. The component blocks are well-structured, simple to use, and beautifully designed. It makes it really easy to have a good-looking website in no time.",
        image: "https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg"
    }, {
        name: "Zeki",
        title: "Founder of ChatExtend",
        text: "Using Tailkit!! has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.",
        image: "https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg"
    }, {
        name: "Eric Ampire",
        title: "Mobile Engineer at @RBPNews , @GoogleGDE/Expert for Android",
        text: "Tailus templates are the perfect solution for anyone who wants to create a beautiful, functional website without any web design experience. The templates are easy to use, customizable, and responsive, and the support team is always available to help. I highly recommend Tailus templates to anyone who is looking to create a website.",
        image: "https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg"
    }, {
        name: "Joseph Kitheka",
        title: "Fullstack Developer",
        text: "Tailur has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences. Tailus is a game-changer for modern web development!",
        image: "https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg"
    }, {
        name: "Roland Tubonge",
        title: "Software Engineer",
        text: "Tailus is so well designed that even with a very poor knowledge of web design you can do miracles. Let yourself be seduced!",
        image: "https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg"
    }, {
        name: "Jane Doe",
        title: "UX Designer",
        text: "The intuitive interface and powerful features of this platform have revolutionized my design process. Highly recommend for any creative professional!",
        image: "https://i.pinimg.com/736x/b0/7b/cc/b07bcc19e5d06dfb888c3263724b8baa.jpg"
    }, {
        name: "John Smith",
        title: "Frontend Developer",
        text: "Building responsive layouts has never been easier. This toolkit integrates seamlessly with my existing workflow, saving me countless hours.",
        image: "https://i.pinimg.com/736x/12/ec/d9/12ecd918607b1ccb9d46772435bb592f.jpg"
    }, {
        name: "Alice Johnson",
        title: "Product Manager",
        text: "The speed at which our team can prototype and launch new features is incredible. This platform is a core part of our success.",
        image: "https://i.pinimg.com/1200x/e2/f5/bc/e2f5bc45bd9d07946c9453cfb48747ea.jpg"
    }, {
        name: "Bob Williams",
        title: "Fullstack Engineer",
        text: "From backend APIs to stunning frontend components, this solution provides everything needed to build robust and beautiful applications.",
        image: "https://i.pinimg.com/1200x/50/47/d2/5047d259f0d8b3d652b7d3dfa3479139.jpg"
    }, {
        name: "Charlie Brown",
        title: "Mobile Developer",
        text: "Developing for mobile has unique challenges, but this platform's adaptive components and clear documentation make it a breeze.",
        image: "https://i.pinimg.com/736x/bb/87/18/bb87180897cb4cb694cd692966a0ab15.jpg"
    }, {
        name: "Maria Gonzales",
        title: "College Freshman",
        text: "I was new to university life and felt lost. Stumate made it so easy to set up my schedule, track expenses, and stay focused.",
        image: "https://i.pinimg.com/1200x/fb/c3/03/fbc30308d8f36a5566cbf0a535c14322.jpg"
    }, {
        name: "Eve Adams",
        title: "Data Scientist",
        text: "Visualizing complex data sets is effortless. The charting and presentation components are powerful and incredibly easy to use.",
        image: "https://i.pinimg.com/1200x/de/11/d2/de11d2f9df4295493625189e9cb829ce.jpg"
    }];
    const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
    return <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
        { }
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 dark:text-white">
            Loved by community
        </h1>

        { }
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-16">
            Harum quae dolore corrupti aut temporibus pariatur.
        </p>

        { }
        <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">

            {testimonials.map((testimonial, index) => <div key={index} className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800">
                <div className="flex items-center mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" onError={e => {
                        const target = e.target;
                        target.onerror = null;
                        target.src = anonymousFallbackImage;
                    }} />
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                    </div>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                    {testimonial.text}
                </p>
            </div>)}
        </div>
    </div>;
}
export default Testimonial;
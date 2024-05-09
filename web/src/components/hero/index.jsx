import UserInput from './userInput';
const Hero = ({ host }) => {
    return (
        <div className="hero min-h-screen bg-base-200 w-fit xl:w-full">
            <div className="hero-content flex-col lg:flex-row-reverse shrink">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold"># Welcome to QuickLink! 🚀</h1>
                    <p className="py-6">
                        **Simplify your links, track & analyze your traffic.** With QuickLink, you can turn long and complicated URLs into short, simple ones.
                        Whether you're sharing links with friends, colleagues, or promoting them on the web, a shorter URL is always more user-friendly. -
                        **Easy to Use:** Just paste your link, and we'll provide you with a shortened version in seconds. - **Track Your Links:** Understand
                        your audience with our detailed analytics. Know who is clicking your links, and what they're interested in. - **Free to Use:** QuickLink
                        is completely free. Start simplifying your links today! Get Started 🎉
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <UserInput host={host} />
                </div>
            </div>
        </div>
    );
};

export default Hero;

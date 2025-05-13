import SimpleShortner from "@/components/home/SimpleShortner.tsx";

function Hero() {
    return (
        <section className={"w-full min-h-screen flex justify-center items-center"}>
            <div className={"w-full max-w-5xl flex flex-col gap-6 items-center"}>
                <h1 className={"font-bold"}>Welcome to url.io!</h1>
                <SimpleShortner />
            </div>
        </section>
    );
}

export default Hero;
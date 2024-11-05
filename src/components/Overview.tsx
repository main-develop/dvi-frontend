import ArrowIcon from "@/assets/icons/arrow.svg";

export const Overview = () => {
  return (
    <div className="relative py-[72px] sm:py-24 bg-black text-white overview-background overflow-clip">
      {/* Radial element start */}
      <div className="absolute radial-element bg-black rounded-[100%] left-1/2 -translate-x-1/2"></div>
      {/* Radial element end */}

      <div className="container relative">
        <div className="flex justify-center items-center">
          <a
            href="#"
            className="py-1 px-2 inline-flex gap-3 rounded-lg border border-white/30"
          >
            <span className="inline-flex items-center gap-1">
              <span className="gradient-span text-transparent bg-clip-text">
                Explore the new version's functionality
              </span>
              <ArrowIcon></ArrowIcon>
            </span>
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <h1 className="inline-flex text-center text-6xl sm:text-9xl font-bold tracking-tighter">
            Data Visuals <br /> and Analysis
          </h1>
        </div>

        <div className="flex justify-center">
          <p className="mt-8 text-center text-xl max-w-lg">
            Open new possibilities for your projects! <br /> DVI provides
            easy-to-use tools for loading, visualizing, and analyzing data with
            predictive capabilities based on machine learning technologies.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="py-3 px-5 bg-white text-black rounded-lg font-medium">
            Start now
          </button>
        </div>
      </div>
    </div>
  );
};

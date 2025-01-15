"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motions";
import { useRouter } from "next/navigation";
import dashboardImage from "@/shared/assets/images/dashboard.png";

export const Overview = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignUpRedirect = () => {
    router.push("/authentication/sign-up");
  };

  const xPosition = useMotionValue(0);
  const yPosition = useMotionValue(0);
  const xSize = useMotionValue(102);

  const backgroundSize = useMotionTemplate`${xSize}% auto`;
  const backgroundPosition = useMotionTemplate`${xPosition}% ${yPosition}%`;

  const handleMouseEnter = () => {
    animate(xSize, 150, { duration: 1, ease: "easeInOut" });
    animate(xPosition, 98, {
      duration: 1,
      delay: 2,
      ease: "easeInOut",
    });
    animate(yPosition, 50, {
      duration: 1,
      delay: 4,
      ease: "easeInOut",
    });
  };

  const handleMouseLeave = () => {
    animate(xSize, 102, {
      duration: 1,
      ease: "easeInOut",
    });
    animate(xPosition, 0, {
      duration: 1,
      ease: "easeInOut",
    });
    animate(yPosition, 0, {
      duration: 1,
      ease: "easeInOut",
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex flex-col sm:flex-row items-center justify-center overflow-clip sm:h-[786px] w-full px-6 sm:px-20 py-16 sm:py-24 z-[20] -mt-20 gradient-background"
    >
      <div className="absolute left-1/2 radial-element bg-black rounded-[100%] -translate-x-1/2"></div>
      <div className="relative flex flex-col justify-center h-full w-full m-auto gap-4 sm:gap-5 text-center sm:text-start">
        <div className="flex flex-col h-auto w-auto sm:max-w-[600px] mt-6 gap-2 sm:gap-3 tracking-tighter text-4xl sm:text-6xl text-white font-semibold">
          <motion.div variants={slideInFromLeft(0.5)}>
            Data Visualization
          </motion.div>
          <motion.div variants={slideInFromLeft(0.6)}>and Analysis</motion.div>
        </div>
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="max-w-full sm:max-w-[600px] px-4 sm:px-0 my-5 text-base sm:text-lg text-gray-400"
        >
          Open new possibilities for your projects! DVI provides easy-to-use
          tools for loading, visualizing, and analyzing data with predictive
          capabilities based on machine learning technologies.
        </motion.p>
        <motion.div
          variants={slideInFromLeft(1)}
          className="w-[155px] py-2 sm:py-3 mx-auto sm:mx-0"
        >
          <div className="relative group">
            <button
              onClick={handleSignUpRedirect}
              className="relative inline-block p-px leading-6 rounded-xl text-white/90 font-medium shadow-xl drop-shadow-xl backdrop-blur-lg start-for-free-button"
            >
              <span className="absolute inset-0 p-[2px] rounded-xl gradient-span group-hover:opacity-100"></span>
              <span className="relative block px-6 py-3 z-10 rounded-xl bg-gray-950">
                <div className="relative flex items-center z-10 space-x-2">
                  <span className="select-none transition-all duration-500 group-hover:scale-105">
                    Start for Free
                  </span>
                </div>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative container w-full px-1 py-1 mt-8 sm:mt-0 border border-white/20 rounded-xl bg-black shadow-2xl drop-shadow-2xl backdrop-blur-lg"
      >
        <motion.div
          className="aspect-video bg-cover bg-center"
          style={{
            backgroundImage: `url(${dashboardImage.src})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: backgroundSize,
          }}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

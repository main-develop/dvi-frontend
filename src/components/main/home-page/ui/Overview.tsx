"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motions";
import dashboardImage from "@/shared/assets/images/dashboard.png";

export const Overview = () => {
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
      className="sm:h-[786px] relative flex flex-col sm:flex-row items-center justify-center px-6 sm:px-20 py-16 -mt-20 sm:py-24 w-full z-[20] gradient-background overflow-clip"
    >
      <div className="absolute radial-element bg-black rounded-[100%] left-1/2 -translate-x-1/2"></div>
      <div className="relative h-full w-full flex flex-col gap-4 sm:gap-5 justify-center m-auto text-center sm:text-start">
        <div className="flex flex-col gap-2 sm:gap-3 mt-6 text-4xl sm:text-6xl font-semibold text-white sm:max-w-[600px] w-auto h-auto tracking-tighter">
          <motion.div variants={slideInFromLeft(0.5)}>
            Data Visualization
          </motion.div>
          <motion.div variants={slideInFromLeft(0.6)}>and Analysis</motion.div>
        </div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-5 max-w-full sm:max-w-[600px] px-4 sm:px-0"
        >
          Open new possibilities for your projects! DVI provides easy-to-use
          tools for loading, visualizing, and analyzing data with predictive
          capabilities based on machine learning technologies.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="py-2 sm:py-3 w-[155px] mx-auto sm:mx-0"
        >
          <div className="relative group">
            <button className="relative inline-block p-px font-medium leading-6 text-white/90 shadow-xl drop-shadow-xl backdrop-blur-lg rounded-xl start-for-free-button">
              <span className="absolute inset-0 rounded-xl span-gradient-bg p-[2px] group-hover:opacity-100"></span>
              <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:scale-105">
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
        className="container relative border bg-black border-white/20 py-1 px-1 rounded-xl mt-8 sm:mt-0 w-full shadow-2xl drop-shadow-2xl backdrop-blur-lg"
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

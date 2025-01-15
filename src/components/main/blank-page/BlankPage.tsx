"use client";

import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieAnimation from "@/shared/assets/animations/exclamation-mark-black.json";

export const BlankPage = (): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition(0.4, 0.5)}
    >
      <div className="relative flex flex-col items-center justify-center overflow-clip h-[623px] sm:h-[737.6px] gradient-background">
        <div className="absolute left-1/2 rounded-[100%] radial-element -translate-x-1/2"></div>
        <h1 className="sm:hidden text-center text-xl text-white/70">
          Looks like the programmer is too lazy <br /> to add a design for this
          page... for now.
        </h1>
        <h1 className="hidden sm:flex text-center text-xl text-white/70">
          Looks like the programmer is too lazy to add a design for this page...
          for now.
        </h1>
        <DotLottieReact className="h-52" data={LottieAnimation} autoplay loop />
      </div>
    </motion.div>
  );
};

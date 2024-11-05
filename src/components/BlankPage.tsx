"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieAnimation from "@/assets/animations/exclamation-mark-black.json";

export default function BlankPage() {
  return (
    <div className="relative flex flex-col h-[623px] sm:h-[737.6px] overview-background overflow-clip items-center justify-center">
      <div className="absolute radial-element rounded-[100%] left-1/2 -translate-x-1/2"></div>
      {/* For small screens */}
      <h1 className="text-white/70 text-xl text-center sm:hidden">
        Looks like the programmer is too lazy <br /> to add a design for this
        page... for now.
      </h1>
      {/* For wide screens */}
      <h1 className="text-white/70 text-xl text-center hidden sm:flex">
        Looks like the programmer is too lazy to add a design for this page...
        for now.
      </h1>
      <DotLottieReact className="h-44" data={LottieAnimation} autoplay loop />
    </div>
  );
}

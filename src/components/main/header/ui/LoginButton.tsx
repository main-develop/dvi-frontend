"use client";

import {
  ValueAnimationTransition,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const LogInButton = (): React.JSX.Element => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/authentication/log-in");
  };

  const xPosition = useMotionValue(0);
  const yPosition = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(150px 150px at ${xPosition}% ${yPosition}%, black, transparent)`;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const { height, width } = divRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;

    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];

    const options: ValueAnimationTransition = {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
      times: times,
    };

    animate(xPosition, [0, 100, 100, 0, 0], options);
    animate(yPosition, [0, 0, 100, 100, 0], options);
  }, [xPosition, yPosition]);

  return (
    <motion.div
      ref={divRef}
      style={{ maskImage: maskImage }}
      className="inset-0 -m-px log-in-button-wrapper"
    >
      <button
        onClick={handleLoginRedirect}
        className="text-white/90 log-in-button"
      >
        <span className="absolute inset-0 p-[2px] rounded-xl group-hover:opacity-100"></span>
        <span className="relative px-4 py-2 z-10 block rounded-xl">
          <div className="relative flex items-center z-10 space-x-2">
            <span className="select-none transition-all duration-500">
              Log in
            </span>
          </div>
        </span>
      </button>
    </motion.div>
  );
};

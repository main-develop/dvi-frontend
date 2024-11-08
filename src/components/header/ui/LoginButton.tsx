"use client";

import {
  MotionValue,
  ValueAnimationTransition,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

export const LoginButton = (): JSX.Element => {
  const xPosition: MotionValue<number> = useMotionValue(0);
  const yPosition: MotionValue<number> = useMotionValue(0);
  const maskImage: MotionValue<string> = useMotionTemplate`radial-gradient(150px 150px at ${xPosition}% ${yPosition}%, black, transparent)`;
  const divRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const { height, width } = divRef.current?.getBoundingClientRect();
    const circumference: number = height * 2 + width * 2;

    const times: number[] = [
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
  }, []);

  return (
    <motion.div
      ref={divRef}
      style={{ maskImage: maskImage }}
      className="inset-0 -m-px border border-[#00406C] login-button rounded-lg hover:scale-[1.01]"
    >
      <button className="py-2 px-4 login-button text-white rounded-lg border">
        Log in
      </button>
    </motion.div>
  );
};

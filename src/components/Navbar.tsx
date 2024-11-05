"use client";
import Image from "next/image";
import Link from "next/link";
import {
  MotionValue,
  ValueAnimationTransition,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

import logoImage from "@/assets/images/logo1.png";
import MenuIcon from "@/assets/icons/menu.svg";

const pages = [
  { name: "About", href: "/about" },
  { name: "Documentation", href: "/documentation" },
  { name: "Help", href: "/help" },
];

const LoginButton = (): JSX.Element => {
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
      className="inset-0 -m-px border border-[#00406C] rounded-lg hover:scale-[1.01]"
    >
      <button className="py-2 px-4 login-button text-white rounded-lg border">
        Log in
      </button>
    </motion.div>
  );
};

export const Navbar = (): JSX.Element => {
  return (
    <header className="sticky top-0 backdrop-blur-sm shadow-lg z-50">
      <div className="px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="relative cursor-pointer">
            <div className="absolute logo-background w-full top-2 bottom-0 blur-md"></div>
            <Image
              src={logoImage}
              alt="logo"
              className="relative h-12 w-12"
            ></Image>
          </div>
        </Link>
        {/* For small screens */}
        {/* <div className="h-10 w-10 inline-flex justify-center items-center border border-white border-opacity-30 rounded-lg sm:hidden">
          <MenuIcon className="text-white"></MenuIcon>
        </div> */}
        <div className="sm:hidden">
          <LoginButton></LoginButton>
        </div>
        {/* For wide screens */}
        <nav className="items-center gap-6 hidden sm:flex">
          {pages.map(({ href, name }) => (
            <Link
              key={href}
              href={href}
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              {name}
            </Link>
          ))}
          <LoginButton></LoginButton>
        </nav>
      </div>
    </header>
  );
};

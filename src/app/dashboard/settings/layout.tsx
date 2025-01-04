"use client";

import { DM_Sans } from "next/font/google";
import "@/shared/styles/globals.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { useEffect, useState } from "react";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [wasAnimated, setWasAnimated] = useState(false);

  useEffect(() => {
    if (!wasAnimated) {
      setWasAnimated(true);
    }
  }, [wasAnimated]);

  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased", "bg-black")}>
        <motion.div
          initial={wasAnimated ? "visible" : "hidden"}
          animate="visible"
          variants={transition(0.4, 0.5)}
          className="settings-page flex h-screen text-white"
        >
          {children}
        </motion.div>
      </body>
    </html>
  );
}

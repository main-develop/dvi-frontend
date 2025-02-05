"use client";

import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [wasAnimated, setWasAnimated] = useState(false);

  useEffect(() => {
    if (!wasAnimated) {
      setWasAnimated(true);
    }
  }, [wasAnimated]);

  return (
    <motion.div
      initial={wasAnimated ? "visible" : "hidden"}
      animate="visible"
      variants={transition(0.4, 0.5)}
      className="flex h-screen w-screen"
    >
      {children}
    </motion.div>
  );
}

"use client";

import "./main-page.css";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { Overview } from "@/components/main/main-page/ui/Overview";
import { Ticker } from "@/components/main/main-page/ui/Ticker";

export const MainPage = (): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition(0.4, 0.5)}
    >
      <Overview></Overview>
      <Ticker></Ticker>
    </motion.div>
  );
};

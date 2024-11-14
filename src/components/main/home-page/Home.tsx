"use client";

import "./home.css";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { Overview } from "@/components/main/home-page/ui/Overview";
import { Ticker } from "@/components/main/home-page/ui/Ticker";

export const HomePage = (): React.JSX.Element => {
  return (
    <motion.div initial="hidden" animate="visible" variants={transition}>
      <Overview></Overview>
      <Ticker></Ticker>
    </motion.div>
  );
};

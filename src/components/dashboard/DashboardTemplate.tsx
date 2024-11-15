"use client";

import "./dashboard.css";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { Sidebar } from "./sidebar/Sidebar";

// TODO: Create Logo interface
// TODO: Make correct display of ALL PAGES on md devices

export const DashboardTemplate = (): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition}
      className="flex h-screen"
    >
      <Sidebar></Sidebar>
    </motion.div>
  );
};

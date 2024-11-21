"use client";

import "./dashboard.css";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { Sidebar } from "./sidebar/Sidebar";
import { Navbar } from "./navbar/Navbar";

// TODO: Create Logo interface
// TODO: Make correct display of ALL PAGES on md devices

export const DashboardTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition}
      className="flex h-screen"
    >
      <Sidebar></Sidebar>
      <div className="flex flex-col w-[86%]">
        <Navbar></Navbar>
        {children}
      </div>
    </motion.div>
  );
};

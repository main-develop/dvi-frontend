"use client";

import "./header.css";
import Link from "next/link";
import { Logo } from "@/shared/components/other/Logo";
import { LogInButton } from "./ui/LogInButton";
import { getCookie } from "@/utils/getCookie";
import { useEffect, useState } from "react";
import ArrowIcon from "@/shared/assets/icons/arrow.svg";
import { AnimatePresence, motion } from "framer-motion";
import { slideInOut } from "@/utils/motions";

const navigationSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Overview", href: "/overview" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help" },
      { name: "Documentation", href: "/documentation" },
    ],
  },
  {
    title: "Terms & Policies",
    links: [
      { name: "Terms of use", href: "/terms-of-use" },
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Data security", href: "/data-security" },
    ],
  },
];

export const Header = (): React.JSX.Element | undefined => {
  const accessToken = getCookie("accessToken");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openMenuSections, setOpenMenuSections] = useState(
    navigationSections.map(() => false)
  );

  const toggleSection = (index: number) => {
    const newOpenMenuSections = [...openMenuSections];
    newOpenMenuSections[index] = !newOpenMenuSections[index];
    setOpenMenuSections(newOpenMenuSections);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuVisible(true);
      document.body.style.overflowY = "hidden";

      return () => {
        document.body.style.overflowY = "auto";
        setOpenMenuSections(navigationSections.map(() => false));
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-sm shadow-lg ${mobileMenuOpen ? "bg-transparent/70" : ""}`}
      id="header"
    >
      <div className="flex px-4 py-4 justify-between items-center">
        <div className="hidden sm:block">
          <Logo className="main-logo"></Logo>
        </div>
        {/* Mobile logo logic */}
        <div onClick={() => setMobileMenuOpen(false)} className="sm:hidden">
          <Logo className="main-logo"></Logo>
        </div>
        <nav className="sm:flex items-center gap-6">
          {accessToken && (
            <Link
              key="Dashboard"
              href="/dashboard/home"
              className="sm:flex hidden text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Dashboard
            </Link>
          )}
          {["About", "Documentation", "Help"].map((name) => (
            <Link
              key={name}
              href={`/${name.toLowerCase()}`}
              className="sm:flex hidden text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              {name}
            </Link>
          ))}
          <div className="sm:flex hidden">
            <LogInButton></LogInButton>
          </div>
          {/* Mobile menu button */}
          <div className="sm:hidden pl-10">
            <label
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`
                flex flex-col relative h-8 w-[26px] items-end justify-center gap-[6px] cursor-pointer mobile-menu-button 
                ${mobileMenuOpen ? "toggled" : ""}
              `}
            >
              <div className="bar" id="top-bar"></div>
              <div className="bar" id="middle-bar"></div>
              <div className="bar" id="bottom-bar"></div>
            </label>
          </div>
        </nav>
      </div>
      {mobileMenuVisible && (
        <div>
          <motion.div
            initial="hidden"
            animate={mobileMenuOpen ? "visible" : "hidden"}
            onAnimationComplete={(definition) =>
              definition === "hidden" ? setMobileMenuVisible(false) : null
            }
            variants={slideInOut(-30, 0, 0, 0.5)}
            className="fixed sm:hidden h-screen w-full bg-transparent/80"
            id="mobile-menu"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {accessToken && (
                <div>
                  <Link
                    key="Dashboard"
                    href="/dashboard/home"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="block pb-1 text-opacity-60 text-white hover:text-opacity-100 transition"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
              {["Log in", "Start for free"].map((name) => (
                <Link
                  key={name}
                  href={`/authentication/${name === "Log in" ? "log-in" : "sign-up"}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="block pb-1 text-opacity-60 text-white hover:text-opacity-100 transition"
                >
                  {name}
                </Link>
              ))}
              <div className="separation-line authentication-section-separation-line"></div>
              <div className="flex flex-col pt-2 text-white/60 gap-4">
                {navigationSections.map((section, index) => (
                  <div key={section.title}>
                    <button
                      onClick={() => toggleSection(index)}
                      className="flex w-full items-center justify-between text-left text-lg"
                    >
                      {section.title}
                      <ArrowIcon
                        className={`relative arrow menu-arrow ${openMenuSections[index] ? "active" : ""}`}
                      ></ArrowIcon>
                    </button>
                    <AnimatePresence>
                      {openMenuSections[index] && (
                        <motion.div
                          className="flex flex-col mt-2 gap-1"
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ overflow: "hidden", position: "relative" }}
                        >
                          {section.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                              className="block text-opacity-60 text-white hover:text-opacity-100 transition"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="fixed -z-50 h-screen w-full backdrop-blur-sm"></div>
        </div>
      )}
    </header>
  );
};

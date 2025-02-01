"use client";

import "./header.css";
import Link from "next/link";
import { Logo } from "@/shared/components/other/Logo";
import { LogInButton } from "./ui/LogInButton";
import { getCookie } from "@/utils/getCookie";

export const Header = (): React.JSX.Element | undefined => {
  const accessToken = getCookie("accessToken");
  return (
    <header className="sticky z-50 top-0 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center px-4 py-4">
        <Logo className="main-logo"></Logo>
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
          <LogInButton></LogInButton>
        </nav>
      </div>
    </header>
  );
};

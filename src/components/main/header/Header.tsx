import "./header.css";
import Link from "next/link";
import { Logo } from "@/shared/components/other/Logo";
import { LogInButton } from "./ui/LogInButton";

const navigationLinks = [
  { name: "About", href: "/about" },
  { name: "Documentation", href: "/documentation" },
  { name: "Help", href: "/help" },
];

export const Header = (): React.JSX.Element => {
  return (
    <header className="sticky z-50 top-0 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center px-4 py-4">
        <Logo className="main-logo"></Logo>
        <nav className="sm:flex items-center gap-6">
          {navigationLinks.map(({ href, name }) => (
            <Link
              key={href}
              href={href}
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

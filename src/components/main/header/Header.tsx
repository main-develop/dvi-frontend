import "./header.css";
import { Logo } from "./ui/Logo";
import { PagesLinks } from "./ui/PagesLinks";
import { LoginButton } from "./ui/LoginButton";

export const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 backdrop-blur-sm shadow-lg z-50">
      <div className="px-4 py-4 flex justify-between items-center">
        <Logo></Logo>

        {/* For small screens */}
        <div className="sm:hidden">
          <LoginButton></LoginButton>
        </div>

        {/* For wide screens */}
        <nav className="items-center gap-6 hidden sm:flex">
          <PagesLinks></PagesLinks>
          <LoginButton></LoginButton>
        </nav>
      </div>
    </header>
  );
};

import Image from "next/image";
import logoImage from "@/assets/images/logo1.png";
import MenuIcon from "@/assets/icons/menu.svg";

export const Navbar = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm shadow-lg z-50">
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="relative">
          <div className="absolute logo-background w-full top-2 bottom-0 blur-md"></div>
          <Image
            src={logoImage}
            alt="logo"
            className="relative h-12 w-12"
          ></Image>
        </div>

        {/* For small screens */}
        <div className="h-10 w-10 inline-flex justify-center items-center border border-white border-opacity-30 rounded-lg sm:hidden">
          <MenuIcon className="text-white"></MenuIcon>
        </div>

        {/* For wide screens */}
        <nav className="items-center gap-6 hidden sm:flex">
          <a
            href="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition"
          >
            About
          </a>
          <a
            href="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition"
          >
            Updates
          </a>
          <a
            href="#"
            className="text-opacity-60 text-white hover:text-opacity-100 transition"
          >
            Help
          </a>
          <button className="py-2 px-4 bg-white rounded-lg">Log in</button>
        </nav>
      </div>
    </header>
  );
};

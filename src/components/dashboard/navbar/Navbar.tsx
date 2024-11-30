import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SearchIcon from "@/shared/assets/animations/search.json";
import AccountIcon from "@/shared/assets/animations/account.json";
import EditIcon from "@/shared/assets/animations/edit.json";
import SettingsIcon from "@/shared/assets/animations/settings.json";
import LogOutIcon from "@/shared/assets/animations/log-out.json";

export const Navbar = (): React.JSX.Element => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="navbar h-[52px] border-b-[2px]">
      <div className="flex items-center justify-between py-2 px-2">
        <div className="hidden md:flex bg-[#080808] items-center gap-2 px-2 rounded-full ring-[1.5px] ring-[#9ca3af]">
          <DotLottieReact
            data={SearchIcon}
            playOnHover
            className="w-[22px] h-[22px]"
          ></DotLottieReact>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-[#9ca3af] p-[5px] w-[175px] outline-none"
          />
        </div>
        <div className="flex relative items-center w-full justify-end">
          <DotLottieReact
            data={AccountIcon}
            playOnHover
            className="w-[35px] h-[35px] cursor-pointer"
            onClick={toggleDropdown}
          ></DotLottieReact>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="flex flex-col absolute account-dropdown px-3 py-4 text-[#9ca3af] border w-[200px] rounded-md shadow-lg"
            >
              <div className="flex space-x-4 items-center">
                <div className="flex mr-auto items-center space-x-[4.5px]">
                  <DotLottieReact
                    data={AccountIcon}
                    playOnHover
                    className="w-[35px] h-[35px] ml-[0.5px]"
                  ></DotLottieReact>
                  <div className="flex flex-col flex-1 truncate">
                    <div className="relative font-medium text-gray-300">
                      <span className="flex">
                        <span className="relative truncate">Full Name</span>
                      </span>
                    </div>
                    <p className="font-normal text-sm text-gray-500 truncate">
                      example@mail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full h-1 py-2">
                <div className="line" />
              </div>
              <nav className="grid gap-1 text-[#9ca3af] text-[15px]">
                <Link
                  href="#"
                  className="relative flex items-center space-x-3 h-9 w-full focus:outline-none hover:bg-[#0e0e0e] hover:text-[#c1c9d6] rounded-md"
                >
                  <DotLottieReact
                    data={EditIcon}
                    playOnHover
                    className="w-[20px] h-[20px] ml-2"
                  ></DotLottieReact>
                  <span>Edit profile</span>
                </Link>
                <Link
                  href="#"
                  className="relative flex items-center space-x-3 h-9 w-full focus:outline-none hover:bg-[#0e0e0e] hover:text-[#c1c9d6] rounded-md"
                >
                  <DotLottieReact
                    data={SettingsIcon}
                    playOnHover
                    className="w-[20px] h-[20px] ml-2"
                  ></DotLottieReact>
                  <span>Settings</span>
                </Link>
              </nav>
              <div className="flex items-center w-full h-1 py-2">
                <div className="line" />
              </div>
              <nav className="gap-1 text-[#9ca3af] text-[15px]">
                <Link
                  href="/authentication/log-in"
                  className="relative flex items-center space-x-3 h-9 w-full focus:outline-none hover:bg-[#0e0e0e] hover:text-[#c1c9d6] rounded-md"
                >
                  <DotLottieReact
                    data={LogOutIcon}
                    playOnHover
                    className="w-[20px] h-[20px] ml-2"
                  ></DotLottieReact>
                  <span>Log out</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, useRef, useEffect } from "react";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import SearchIcon from "@/shared/assets/animations/search.json";
import AccountIcon from "@/shared/assets/animations/account.json";
import AppearanceIcon from "@/shared/assets/animations/appearance.json";
import LogOutIcon from "@/shared/assets/animations/log-out.json";
import { handleLogOut } from "@/api/authentication/handleLogOut";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/getCookie";
import { getUserPersonalInformation } from "@/api/fetch-user-data/getUserPersonalInformation";
import { SectionNavigation } from "@/shared/components/navigation/SectionNavigation";

const navigationSections = [
  { name: "Account", icon: AccountIcon },
  { name: "Appearance", icon: AppearanceIcon },
];

export const Navbar = (): React.JSX.Element => {
  const router = useRouter();

  const [dotLottie, setDotLottie] = useState<DotLottie>();

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  const playIconAnimation = () => {
    if (dotLottie) {
      dotLottie.play();
    }
  };

  const [personalInformation, setPersonalInformation] = useState<{
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
  }>();

  useEffect(() => {
    async function getData() {
      const accessToken = getCookie("accessToken");

      const response = await getUserPersonalInformation(accessToken);
      if (response.success) {
        setPersonalInformation(response.personalInformation);
      }
    }

    getData();
  }, []);

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

  const navigateToSettings = (section: string) => {
    router.push(`/dashboard/settings/${section.toLowerCase()}`);
  };

  const logOut = async () => {
    const accessToken = getCookie("accessToken");
    const response = await handleLogOut(accessToken);

    if (response.success) {
      document.cookie = `accessToken=; path=/; Secure; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

      router.replace("/authentication/log-in");
    }
  };

  return (
    <div className="navbar h-[52px] border-b-[2px]">
      <div className="flex items-center justify-between py-2 px-2">
        <div
          onMouseEnter={playIconAnimation}
          className="hidden md:flex bg-[#080808] items-center gap-2 px-2 rounded-full ring-[1.5px] ring-[#9ca3af]"
        >
          <DotLottieReact
            data={SearchIcon}
            dotLottieRefCallback={dotLottieRefCallback}
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
              className="flex flex-col absolute account-dropdown px-3 py-4 text-[#9ca3af] border w-[215px] rounded-md shadow-lg"
            >
              <div className="flex space-x-4 items-center">
                <div className="flex mr-auto items-center space-x-[4.5px]">
                  <DotLottieReact
                    data={AccountIcon}
                    playOnHover
                    className="w-[35px] h-[35px] ml-[0.5px]"
                  ></DotLottieReact>
                  <div className="flex flex-col flex-1 truncate">
                    <div className="relative font-medium w-[146px] text-gray-300">
                      <span className="flex">
                        <span className="relative truncate">
                          {personalInformation?.firstName ||
                          personalInformation?.lastName
                            ? (personalInformation.firstName || "") +
                              " " +
                              (personalInformation.lastName || "")
                            : "You"}
                        </span>
                      </span>
                    </div>
                    <p className="font-normal w-[146px] text-sm text-gray-500 truncate">
                      {personalInformation
                        ? personalInformation.email
                        : "example@example.com"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full h-1 py-2">
                <div className="line" />
              </div>
              <nav className="grid gap-1 text-[#9ca3af] text-[15px]">
                {navigationSections.map((section) => (
                  <SectionNavigation
                    key={section.name}
                    onClick={() =>
                      navigateToSettings(section.name.toLowerCase())
                    }
                    data={section.icon}
                    section={section.name}
                    buttonStyle="space-x-3 h-9 rounded-md"
                    iconStyle="w-[20px] h-[20px] ml-2"
                  ></SectionNavigation>
                ))}
              </nav>
              <div className="flex items-center w-full h-1 py-2">
                <div className="line" />
              </div>
              <nav className="gap-1 text-[#9ca3af] text-[15px]">
                <SectionNavigation
                  onClick={logOut}
                  data={LogOutIcon}
                  section="Log out"
                  buttonStyle="space-x-3 h-9 rounded-md"
                  iconStyle="w-[20px] h-[20px] ml-2"
                ></SectionNavigation>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

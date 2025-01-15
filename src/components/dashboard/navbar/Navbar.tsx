"use client";

import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SearchIcon from "@/shared/assets/animations/search.json";
import AccountIcon from "@/shared/assets/animations/account.json";
import AppearanceIcon from "@/shared/assets/animations/appearance.json";
import LogOutIcon from "@/shared/assets/animations/log-out.json";
import { handleLogOut } from "@/api/authentication/handleLogOut";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/getCookie";
import { getUserPersonalInformation } from "@/api/fetch-user-data/getUserPersonalInformation";
import { SectionNavigation } from "@/shared/components/navigation/SectionNavigation";
import { useIconAnimation } from "@/utils/useIconAnimation";

const navigationSections = [
  { name: "Account", icon: AccountIcon },
  { name: "Appearance", icon: AppearanceIcon },
];

export const Navbar = (): React.JSX.Element => {
  const router = useRouter();

  const { playIconAnimation, setIconRef } = useIconAnimation();

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
        setPersonalInformation(response.data?.user);
      }
    }

    getData();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest(".account-dropdown")) {
          setDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
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
    <div className="h-[52px] border-b-[2px] navbar">
      <div className="flex items-center justify-between py-2 px-2">
        <div
          onMouseEnter={playIconAnimation}
          className="hidden md:flex items-center px-2 gap-2 rounded-full ring-[1.5px] ring-[#9ca3af] bg-[#080808]"
        >
          <DotLottieReact
            data={SearchIcon}
            dotLottieRefCallback={setIconRef}
            className="h-[22px] w-[22px]"
          ></DotLottieReact>
          <input
            type="text"
            placeholder="Search"
            className="w-[175px] p-[5px] outline-none text-sm text-[#9ca3af] bg-transparent"
          />
        </div>
        <div className="flex relative items-center justify-end w-full">
          <DotLottieReact
            data={AccountIcon}
            playOnHover
            className="h-[35px] w-[35px] cursor-pointer"
            onMouseDown={() => setDropdownOpen((prev) => !prev)}
          ></DotLottieReact>
          {dropdownOpen && (
            <div className="absolute flex flex-col w-[215px] px-3 py-4 account-dropdown text-[#9ca3af] border rounded-md shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center mr-auto space-x-[4.5px]">
                  <DotLottieReact
                    data={AccountIcon}
                    playOnHover
                    className="h-[35px] w-[35px] ml-[0.5px]"
                  ></DotLottieReact>
                  <div className="flex flex-col flex-1 truncate">
                    <div className="relative w-[146px] font-medium text-gray-300">
                      <span className="flex">
                        <span className="relative truncate">
                          {`${personalInformation?.firstName || ""} ${personalInformation?.lastName || ""}`}
                          {`${personalInformation?.firstName || personalInformation?.lastName ? "" : "You"}`}
                        </span>
                      </span>
                    </div>
                    <p className="w-[146px] truncate font-normal text-sm text-gray-500">
                      {personalInformation?.email || "example@example.com"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center h-1 w-full py-2">
                <div className="line" />
              </div>
              <nav className="grid gap-1 text-[15px] text-[#9ca3af]">
                {navigationSections.map((section) => (
                  <SectionNavigation
                    key={section.name}
                    onClick={() => navigateToSettings(section.name)}
                    data={section.icon}
                    section={section.name}
                    className="navbar-section-navigation"
                  ></SectionNavigation>
                ))}
              </nav>
              <div className="flex items-center h-1 w-full py-2">
                <div className="line" />
              </div>
              <nav className="gap-1 text-[#9ca3af] text-[15px]">
                <SectionNavigation
                  onClick={logOut}
                  data={LogOutIcon}
                  section="Log out"
                  className="navbar-section-navigation"
                ></SectionNavigation>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

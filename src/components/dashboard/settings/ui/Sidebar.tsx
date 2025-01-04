"use client";

import Link from "next/link";
import PreviousPageArrow from "@/shared/assets/animations/previous-page-arrow.json";
import AccountIcon from "@/shared/assets/animations/account.json";
import AppearanceIcon from "@/shared/assets/animations/appearance.json";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { SectionNavigation } from "@/shared/components/navigation/SectionNavigation";
import { useState } from "react";

type SidebarProperties = {
  activeSection: string;
};

const navigationSections = [
  { name: "Account", icon: AccountIcon },
  { name: "Appearance", icon: AppearanceIcon },
];

export const Sidebar = ({
  activeSection,
}: SidebarProperties): React.JSX.Element => {
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

  const handleSectionChange = (section: string) => {
    router.push(`/dashboard/settings/${section.toLowerCase()}`);
  };

  return (
    <div className="sidebar relative w-[18%] sm:w-[18%] border-r-[2px]">
      <div className="flex ml-3 mt-3">
        <Link
          href="/dashboard"
          onMouseEnter={playIconAnimation}
          className="previous-page flex items-center justify-center h-10 w-10 rounded-3xl overflow-hidden"
        >
          <span className="relative cursor-pointer rounded-full">
            <DotLottieReact
              data={PreviousPageArrow}
              dotLottieRefCallback={dotLottieRefCallback}
              className="h-[64px] w-[64px]"
            />
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-1 py-8 px-2">
            {navigationSections.map((section) => {
              const isActive = activeSection === section.name.toLowerCase();
              return (
                <li key={section.name}>
                  <SectionNavigation
                    onClick={() => handleSectionChange(section.name)}
                    isActive={isActive}
                    data={section.icon}
                    section={section.name}
                  ></SectionNavigation>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

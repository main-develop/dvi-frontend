"use client";

import Link from "next/link";
import PreviousPageArrow from "@/shared/assets/animations/previous-page-arrow.json";
import AccountIcon from "@/shared/assets/animations/account.json";
import AppearanceIcon from "@/shared/assets/animations/appearance.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { SectionNavigation } from "@/shared/components/navigation/SectionNavigation";
import { useIconAnimation } from "@/utils/useIconAnimation";

type SettingsPageSidebarProperties = {
  activeSection: string;
};

const navigationSections = [
  { name: "Account", icon: AccountIcon },
  { name: "Appearance", icon: AppearanceIcon },
];

export const SettingsPageSidebar = ({
  activeSection,
}: SettingsPageSidebarProperties): React.JSX.Element => {
  const router = useRouter();

  const { playIconAnimation, setIconRef } = useIconAnimation();

  const handleSectionChange = (section: string) => {
    router.push(`/dashboard/settings/${section.toLowerCase()}`);
  };

  return (
    <div className="relative w-[18%] sm:w-[18%] border-r-[2px] sidebar">
      <div className="flex items-center justify-center sm:justify-normal mt-3 sm:ml-3">
        <Link
          href="/dashboard/home"
          onMouseEnter={playIconAnimation}
          className="flex overflow-hidden items-center justify-center h-10 w-10 previous-page rounded-3xl "
        >
          <span className="relative cursor-pointer rounded-full">
            <DotLottieReact
              data={PreviousPageArrow}
              dotLottieRefCallback={setIconRef}
              className="h-[64px] w-[64px]"
            />
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex-grow overflow-x-hidden overflow-y-auto">
          <ul className="flex flex-col px-2 py-8 space-y-1">
            {navigationSections.map((section) => {
              const isActive = activeSection === section.name.toLowerCase();
              return (
                <li key={section.name}>
                  <SectionNavigation
                    onClick={() => handleSectionChange(section.name)}
                    isActive={isActive}
                    data={section.icon}
                    section={section.name}
                    className="settings-section-navigation"
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

"use client";

import "./settings-page.css";
import "@/shared/styles/form-components.css";
import { SettingsPageSidebar } from "./ui/SettingsPageSidebar";
import { AccountSection } from "./ui/sections/AccountSection";
import { AppearanceSection } from "./ui/sections/AppearanceSection";

type SettingsPageProperties = {
  activeSection: string | string[] | undefined;
};

export const SettingsPage = ({
  activeSection,
}: SettingsPageProperties): React.JSX.Element => {
  return (
    <>
      <SettingsPageSidebar
        activeSection={`${activeSection}`}
      ></SettingsPageSidebar>
      <div className="w-[82%] overflow-x-hidden overscroll-none">
        {activeSection === "account" && <AccountSection />}
        {activeSection === "appearance" && <AppearanceSection />}
      </div>
    </>
  );
};

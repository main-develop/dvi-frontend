"use client";

import "./settings.css";
import "@/shared/styles/form-components.css";
import { Sidebar } from "./ui/Sidebar";
import { AccountSection } from "./ui/sections/AccountSection";
import { AppearanceSection } from "./ui/sections/AppearanceSection";

type SettingsPageProperties = {
  section: string | string[] | undefined;
};

export const SettingsPage = ({
  section,
}: SettingsPageProperties): React.JSX.Element => {
  return (
    <>
      <Sidebar activeSection={`${section}`}></Sidebar>
      <div className="w-[82%] overflow-x-hidden overscroll-none">
        {section === "account" && <AccountSection />}
        {section === "appearance" && <AppearanceSection />}
      </div>
    </>
  );
};

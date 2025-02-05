"use client";

import { SettingsPage } from "@/components/dashboard/settings-page/SettingsPage";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Settings(): React.JSX.Element {
  const { activeSection } = useParams();

  useEffect(() => {
    const titles: Record<string, string> = {
      account: "Settings | Account",
      appearance: "Settings | Appearance",
    };

    document.title = titles[activeSection as string];
  }, [activeSection]);

  return <SettingsPage activeSection={activeSection}></SettingsPage>;
}

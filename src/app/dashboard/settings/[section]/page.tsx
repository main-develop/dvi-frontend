"use client";

import { SettingsPage } from "@/components/dashboard/settings/SettingsPage";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Settings(): React.JSX.Element {
  const { section } = useParams();

  useEffect(() => {
    const titles: Record<string, string> = {
      account: "Settings | Account",
      appearance: "Settings | Appearance",
    };

    document.title = titles[section as string];
  }, [section]);

  return <SettingsPage section={section}></SettingsPage>;
}

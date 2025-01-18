"use client";

import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard(): React.JSX.Element {
  const { activeSection } = useParams();

  useEffect(() => {
    const titles: Record<string, string> = {
      home: "Home",
      "data-sets": "Data sets",
      visualization: "Visualization",
      "ai-analysis": "AI analysis",
    };

    document.title = titles[activeSection as string];
  }, [activeSection]);

  return <DashboardPage activeSection={activeSection}></DashboardPage>;
}

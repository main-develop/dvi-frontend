"use client";

import "./dashboard-page.css";
import { DashboardPageSidebar } from "./dashboard-sidebar/DashboardPageSidebar";
import { DashboardPageNavbar } from "./dashboard-navbar/DashboardPageNavbar";
import { DataSetsSection } from "./dashboard-sections/DataSetsSection";
import { HomeSection } from "./dashboard-sections/HomeSection";
import { VisualizationSection } from "./dashboard-sections/VisualizationSection";
import { AIAnalysisSection } from "./dashboard-sections/AIAnalysisSection";

type DashboardPageProperties = {
  activeSection: string | string[] | undefined;
};

export const DashboardPage = ({
  activeSection,
}: DashboardPageProperties): React.JSX.Element => {
  return (
    <>
      <DashboardPageSidebar
        activeSection={`${activeSection}`}
      ></DashboardPageSidebar>
      <div className="flex flex-col w-[86%]">
        <DashboardPageNavbar></DashboardPageNavbar>
        {activeSection === "home" && <HomeSection />}
        {activeSection === "data-sets" && <DataSetsSection />}
        {activeSection === "visualization" && <VisualizationSection />}
        {activeSection === "ai-analysis" && <AIAnalysisSection />}
      </div>
    </>
  );
};

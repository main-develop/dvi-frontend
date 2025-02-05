import AnalysisIcon from "@/shared/assets/animations/analysis.json";
import FileIcon from "@/shared/assets/animations/file.json";
import HomeIcon from "@/shared/assets/animations/home.json";
import PieChartIcon from "@/shared/assets/animations/pie-chart.json";
import { Logo } from "@/shared/components/other/Logo";
import { SectionNavigation } from "@/shared/components/navigation/SectionNavigation";
import { useRouter } from "next/navigation";

type DashboardPageSidebarProperties = {
  activeSection: string;
};

const navigationSections = [
  { name: "Home", url: "home", icon: HomeIcon },
  { name: "Data sets", url: "data-sets", icon: FileIcon },
  { name: "Visualization", url: "visualization", icon: PieChartIcon },
  { name: "AI analysis", url: "ai-analysis", icon: AnalysisIcon },
];

export const DashboardPageSidebar = ({
  activeSection,
}: DashboardPageSidebarProperties): React.JSX.Element => {
  const router = useRouter();

  const handleSectionChange = (section: string) => {
    router.push(`/dashboard/${section}`);
  };

  return (
    <div className="relative w-[14%] sm:w-[14%] border-r-[2px] sidebar">
      <div className="relative flex items-center justify-center md:justify-start mt-2 sm:ml-2">
        <Logo className="dashboard-logo"></Logo>
        <h1 className="flex-grow hidden lg:block text-center text-xl text-[#9ca3af] font-medium truncate">
          {navigationSections.find((s) => s.url === activeSection)?.name}
        </h1>
      </div>
      <div className="flex flex-col antialiased">
        <div className="flex-grow overflow-x-hidden overflow-y-auto">
          <ul className="flex flex-col px-1 py-8 space-y-1">
            <li className="px-4">
              <div className="flex flex-row items-center h-8">
                <div className="hidden lg:block text-gray-500">Menu</div>
              </div>
            </li>
            {navigationSections.map((section) => {
              const isActive =
                activeSection === section.name.replace(" ", "-").toLowerCase();
              return (
                <li key={section.name}>
                  <SectionNavigation
                    onClick={() => handleSectionChange(section.url)}
                    isActive={isActive}
                    data={section.icon}
                    section={section.name}
                    className="dashboard-section-navigation"
                  ></SectionNavigation>
                  {/* <span className="hidden lg:block px-2 py-0.5 ml-auto mr-[10px] rounded-full text-xs text-[#06568c] font-medium tracking-wide bg-[#00416c3c]">
                    15
                  </span> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

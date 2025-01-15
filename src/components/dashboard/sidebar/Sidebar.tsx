import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AnalysisIcon from "@/shared/assets/animations/analysis.json";
import FileIcon from "@/shared/assets/animations/file.json";
import HomeIcon from "@/shared/assets/animations/home.json";
import PieChartIcon from "@/shared/assets/animations/pie-chart.json";
import { Logo } from "@/shared/components/other/Logo";

const navigationSections = [
  { name: "Dashboard", href: "", icon: HomeIcon },
  { name: "Data sets", href: "", icon: FileIcon },
  { name: "Visualization", href: "", icon: PieChartIcon },
  { name: "AI Analysis", href: "", icon: AnalysisIcon },
];

export const Sidebar = (): React.JSX.Element => {
  return (
    <div className="relative w-[14%] sm:w-[14%] border-r-[2px] sidebar">
      <div className="relative flex items-center justify-center md:justify-start mt-2 sm:ml-2">
        <Logo className="dashboard-logo"></Logo>
        <h1 className="flex-grow hidden lg:block text-center text-xl text-[#9ca3af] font-medium truncate">
          Dashboard
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
            {navigationSections.map((section) => (
              <li key={section.name}>
                <Link
                  href={section.href}
                  className="relative flex flex-row items-center h-11 rounded-lg focus:outline-none hover:bg-[#0e0e0e] text-[#9ca3af] hover:text-[#c1c9d6] transition-all duration-500"
                >
                  <span className="inline-flex justify-center items-center ml-3">
                    <DotLottieReact
                      data={section.icon}
                      playOnHover
                      className="w-[25px] h-[25px]"
                    ></DotLottieReact>
                  </span>
                  <span className="hidden lg:block ml-2 truncate">
                    {section.name}
                  </span>
                  <span className="hidden lg:block px-2 py-0.5 ml-auto mr-[10px] rounded-full text-xs text-[#06568c] font-medium tracking-wide bg-[#00416c3c]">
                    15
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

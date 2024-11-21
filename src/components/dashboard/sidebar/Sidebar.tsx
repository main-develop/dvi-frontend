import Link from "next/link";
import Image from "next/image";
import logoImage from "@/shared/assets/images/logo1.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AnalysisIcon from "@/shared/assets/animations/analysis.json";
import FileIcon from "@/shared/assets/animations/file.json";
import HomeIcon from "@/shared/assets/animations/home.json";
import PieChartIcon from "@/shared/assets/animations/pie-chart.json";

// TODO: Optimize list

const navigationSections = [
  { name: "Dashboard", href: "", icon: HomeIcon },
  { name: "Data sets", href: "", icon: FileIcon },
  { name: "Visualization", href: "", icon: PieChartIcon },
  { name: "AI Analysis", href: "", icon: AnalysisIcon },
];

export const Sidebar = (): React.JSX.Element => {
  return (
    <div className="sidebar relative w-[14%] sm:w-[14%] border-r-[2px]">
      <div className="flex items-center ml-2 mt-2">
        <Link href="/home">
          <div className="relative cursor-pointer flex-grow">
            <div className="absolute logo-background w-10 top-2 bottom-0 blur-md"></div>
            <Image
              src={logoImage}
              alt="logo"
              className="relative h-10 w-10"
            ></Image>
          </div>
        </Link>
        <h1 className="flex-grow hidden lg:block text-xl text-[#9ca3af] font-medium text-center">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-col antialiased">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-1 py-8 px-1">
            <li className="px-4">
              <div className="flex flex-row items-center h-8">
                <div className="hidden lg:block text-gray-500">Menu</div>
              </div>
            </li>
            {navigationSections.map((section) => (
              <li key={section.name}>
                <Link
                  href={section.href}
                  className="relative flex flex-row items-center h-11 rounded-lg focus:outline-none hover:bg-[#0e0e0e] text-[#9ca3af] hover:text-[#c1c9d6]"
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
                  <span className="hidden lg:block px-2 py-0.5 ml-auto mr-[10px] text-xs font-medium tracking-wide text-[#06568c] bg-[#00416c3c] rounded-full">
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

import { Data, DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

type SectionNavigationProperties = {
  onClick: () => void | Promise<void>;
  data: Data | undefined;
  section: string;
  isActive?: boolean;
  buttonStyle?: string;
  iconStyle?: string;
};

export const SectionNavigation = ({
  onClick,
  data,
  section,
  isActive,
  buttonStyle,
  iconStyle,
}: SectionNavigationProperties): React.JSX.Element => {
  const [dotLottie, setDotLottie] = useState<DotLottie>();

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  const playIconAnimation = () => {
    if (dotLottie && !isActive) {
      dotLottie.play();
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={playIconAnimation}
      className={`relative flex flex-row items-center w-full transition-all duration-500 
        ${buttonStyle ? buttonStyle : "h-11 rounded-lg "} 
        ${
          isActive
            ? "bg-[#0b0b0bcf] text-[#9ca3afc5]"
            : "hover:bg-[#0e0e0ed2] text-[#9ca3af] hover:text-[#c1c9d6] active:bg-[#010101]"
        }`}
    >
      <DotLottieReact
        data={data}
        dotLottieRefCallback={dotLottieRefCallback}
        className={`${iconStyle ? iconStyle : "w-[25px] h-[25px] ml-3"}`}
      ></DotLottieReact>
      <span className="hidden lg:block ml-2 truncate select-none">
        {section}
      </span>
    </button>
  );
};

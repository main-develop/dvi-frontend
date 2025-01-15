import { Data, DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

type SectionNavigationProperties = {
  onClick: () => void | Promise<void>;
  data: Data | undefined;
  section: string;
  isActive?: boolean;
  className?: string;
};

export const SectionNavigation = ({
  onClick,
  data,
  section,
  isActive,
  className,
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
      className={`relative flex flex-row items-center w-full section-navigation transition-all duration-500  
        ${className ? className : ""} 
        ${isActive ? "active" : "not-active"}`}
    >
      <DotLottieReact
        data={data}
        dotLottieRefCallback={dotLottieRefCallback}
        className={className ? `${className}-icon` : undefined}
      ></DotLottieReact>
      <span className="ml-2 truncate select-none">{section}</span>
    </button>
  );
};

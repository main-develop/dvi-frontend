import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SuccessIcon from "@/shared/assets/animations/success.json";
import FailIcon from "@/shared/assets/animations/fail.json";
import { useState } from "react";

type AnimatedMessageProperties = {
  message: string;
  success: boolean;
  section?: string;
};

export const AnimatedMessage = ({
  message,
  success,
  section,
}: AnimatedMessageProperties): React.JSX.Element => {
  const [messageAnimation, setMessageAnimation] = useState("visible");

  setTimeout(() => {
    setMessageAnimation("fadeOut");
  }, 1000);

  return (
    <motion.div
      initial="hidden"
      animate={messageAnimation}
      variants={transition(0, 0.2, 0, 4)}
      className={`${section === "deleteAccount" ? "px-4 sm:px-6" : ""}`}
    >
      <div
        className={`flex flex-row items-center ${section !== "deleteAccount" ? "mt-2 sm:mt-7 sm:ml-9" : ""}`}
      >
        <DotLottieReact
          data={success ? SuccessIcon : FailIcon}
          autoplay={true}
          className={`w-[25px] h-[25px] ${section !== "deleteAccount" ? "w-[33px] h-[33px] sm:w-[25px] sm:h-[25px]" : ""}`}
        ></DotLottieReact>
        <span
          className={`ml-1 text-sm pointer-events-none select-none ${success ? "text-green-600" : "text-red-800"}`}
        >
          {message}
        </span>
      </div>
    </motion.div>
  );
};

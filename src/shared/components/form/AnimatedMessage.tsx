import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SuccessIcon from "@/shared/assets/animations/success.json";
import FailIcon from "@/shared/assets/animations/fail.json";
import { useEffect, useState } from "react";

type AnimatedMessageProperties = {
  message: string;
  success: boolean;
  className?: string;
};

export const AnimatedMessage = ({
  message,
  success,
  className,
}: AnimatedMessageProperties): React.JSX.Element => {
  const [messageAnimation, setMessageAnimation] = useState("visible");

  useEffect(() => {
    const timer = setTimeout(() => setMessageAnimation("fadeOut"), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate={messageAnimation}
      variants={transition(0, 0.2, 0, 4)}
      className={`animated-message-wrapper ${className ? className : ""}`}
    >
      <div className="flex flex-row items-center mt-2 sm:mt-7 sm:ml-9">
        <DotLottieReact
          data={success ? SuccessIcon : FailIcon}
          autoplay={true}
          className={`h-[33px] sm:h-[25px] w-[33px] sm:w-[25px] ${className ? className + "-icon" : ""}`}
        ></DotLottieReact>
        <span
          className={`ml-1 text-sm select-none pointer-events-none ${success ? "text-green-600" : "text-red-800"}`}
        >
          {message}
        </span>
      </div>
    </motion.div>
  );
};

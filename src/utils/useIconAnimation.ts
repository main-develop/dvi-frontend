import { DotLottie } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export function useIconAnimation() {
  const [dotLottie, setDotLottie] = useState<DotLottie>();

  const setIconRef = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  const playIconAnimation = () => {
    if (dotLottie) {
      dotLottie.play();
    }
  };

  return { playIconAnimation, setIconRef };
}

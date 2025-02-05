export function slideInFromLeft(delay: number) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
}

export function slideInFromRight(delay: number) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
}

export function slideInOut(
  hiddenY: number,
  visibleY: number,
  delay: number,
  duration: number
) {
  return {
    hidden: { y: hiddenY, opacity: 0 },
    visible: {
      y: visibleY,
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
      },
    },
  };
}

export function transition(
  delay: number,
  duration: number,
  fadeOutOpacity: number = 1,
  fadeOutDelay: number = 0
) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
    fadeOut: {
      opacity: fadeOutOpacity,
      transition: {
        delay: fadeOutDelay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  };
}

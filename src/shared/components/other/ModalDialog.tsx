import { transition } from "@/utils/motions";
import { motion } from "framer-motion";
import { useEffect } from "react";

type ModalDialogProperties = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const ModalDialog = ({
  isOpen,
  children,
}: ModalDialogProperties): React.JSX.Element | null => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition(0, 0.2)}
    >
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-[#212223ac] backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        ></div>
        {children}
      </div>
    </motion.div>
  );
};

"use client";

import "./authentication-template.css";
import "@/shared/styles/form-components.css";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import { Logo } from "@/shared/components/other/Logo";
import Link from "next/link";

type AuthenticationTemplateProperties = {
  title: string;
  formComponent: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

export const AuthenticationTemplate = ({
  title,
  formComponent,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthenticationTemplateProperties): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transition(0.4, 0.5)}
      className="overflow-x-hidden overscroll-x-none"
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="form-container-wrapper neon-lighting">
          <div className="w-[336px] sm:w-[360px] p-6 sm:p-8 rounded-xl form-container">
            <div className="relative flex items-center justify-center">
              <Logo className="authentication-logo"></Logo>
            </div>
            <p className="mt-7 text-center text-2xl font-bold">{title}</p>
            {formComponent}
            <div className="flex items-center pt-5 pb-4">
              <div className="separation-line authentication-section-separation-line" />
            </div>
            <p className="text-center text-[13px] sign-up">
              {footerText}
              <Link
                rel="noopener noreferrer"
                href={footerLinkHref}
                className="ml-[6px] hover:text-[#f3f4f6da] underline transition"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

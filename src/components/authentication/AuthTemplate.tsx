"use client";

import "./auth-template.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { transition } from "@/utils/motions";
import logoImage from "@/shared/assets/images/logo1.png";

interface AuthTemplateProps {
  title: string;
  form: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export const AuthTemplate = ({
  title,
  form,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthTemplateProps): React.JSX.Element => {
  return (
    <motion.div initial="hidden" animate="visible" variants={transition}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="form-container-wrapper neon-lighting">
          <div className="form-container sm:w-[360px] p-6 sm:p-8 rounded-xl">
            <div className="flex items-center justify-center">
              <div className="absolute logo-background h-16 w-16 blur-md"></div>
              <Link href="/home">
                <Image
                  src={logoImage}
                  alt="logo"
                  className="relative h-14 w-14"
                ></Image>
              </Link>
            </div>

            <p className="mt-7 text-center text-2xl font-bold">{title}</p>

            {form}

            <div className="flex items-center pt-5 pb-4">
              <div className="line" />
            </div>

            <p className="sign-up text-center text-[13px]">
              {footerText}
              <a
                rel="noopener noreferrer"
                href={footerLinkHref}
                className="hover:text-[#f3f4f6da] transition"
              >
                {footerLinkText}
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

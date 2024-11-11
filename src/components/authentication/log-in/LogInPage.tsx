// "use client";

import "./log-in.css";
import { Logo } from "./ui/Logo";
import { LogInForm } from "./ui/LogInForm";

export const LogInPage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="form-container-wrapper neon-lighting">
        <div className="form-container w-[342px] p-8 rounded-xl">
          <Logo></Logo>

          <p className="mt-7 text-center text-2xl font-bold">Welcome back!</p>

          <LogInForm></LogInForm>

          <div className="flex items-center pt-5 pb-4">
            <div className="line" />
          </div>

          <p className="sign-up text-center text-[13px]">
            Don't have an account?&nbsp;
            <a
              rel="noopener noreferrer"
              href="/"
              className="hover:text-[#f3f4f6da] transition"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

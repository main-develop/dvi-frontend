import YouTubeIcon from "@/assets/icons/youtube.svg";
import TelegramIcon from "@/assets/icons/telegram.svg";
import GitHubIcon from "@/assets/icons/github.svg";

export const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container sm:px-10">
        <nav className="flex flex-col md:flex-row md:justify-center gap-7 mt-6 md:gap-12 text-left">
          <div className="flex flex-col w-[140px]">
            <span className="text-lg">Company</span>
            <div className="flex flex-col mt-3 gap-2">
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                About
              </a>
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Overview
              </a>
            </div>
          </div>
          <div className="flex flex-col w-[140px]">
            <span className="text-lg">Resources</span>
            <div className="flex flex-col mt-3 gap-2">
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Help
              </a>
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Documentation
              </a>
            </div>
          </div>
          <div className="flex flex-col w-[140px]">
            <span className="text-lg">Terms & Policies</span>
            <div className="flex flex-col mt-3 gap-2">
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Terms of use
              </a>
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="text-opacity-60 text-white hover:text-opacity-100 transition"
              >
                Data security
              </a>
            </div>
          </div>
        </nav>
        <div className="flex flex-col gap-4 mt-12 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            DVI &copy; 2024. All rights reserved.
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <YouTubeIcon></YouTubeIcon>
            </li>
            <li>
              <TelegramIcon></TelegramIcon>
            </li>
            <li>
              <GitHubIcon></GitHubIcon>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

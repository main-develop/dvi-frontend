import InstaIcon from "@/assets/icons/insta.svg";
import X from "@/assets/icons/x-social.svg";
import YouTubeIcon from "@/assets/icons/youtube.svg";

export const Footer = () => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">DVI © 2024. All rights reserved.</div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <YouTubeIcon></YouTubeIcon>
            </li>
            <li>
              <X></X>
            </li>
            <li>
              <InstaIcon></InstaIcon>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

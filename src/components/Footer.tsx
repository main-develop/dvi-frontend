import Link from "next/link";
import YouTubeIcon from "@/assets/icons/youtube.svg";
import TelegramIcon from "@/assets/icons/telegram.svg";
import GitHubIcon from "@/assets/icons/github.svg";

const navigationSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Overview", href: "/overview" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help" },
      { name: "Documentation", href: "/documentation" },
    ],
  },
  {
    title: "Terms & Policies",
    links: [
      { name: "Terms of use", href: "/terms-of-use" },
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Data security", href: "/data-security" },
    ],
  },
];

const socials = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: <YouTubeIcon></YouTubeIcon>,
  },
  {
    name: "Telegram",
    href: "https://telegram.org/",
    icon: <TelegramIcon></TelegramIcon>,
  },
  {
    name: "GitHub",
    href: "https://github.com/main-develop",
    icon: <GitHubIcon></GitHubIcon>,
  },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container sm:px-10">
        <nav className="flex flex-col md:flex-row md:justify-center gap-7 mt-6 md:gap-12 text-left">
          {navigationSections.map((section) => (
            <div key={section.title} className="flex flex-col w-[140px]">
              <span className="text-lg">{section.title}</span>
              <div className="flex flex-col mt-3 gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-opacity-60 text-white hover:text-opacity-100 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-4 mt-12 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            DVI &copy; 2024. All rights reserved.
          </div>
          <ul className="flex justify-center gap-2.5">
            {socials.map(({ name, href, icon }) => (
              <li key={name}>
                <a href={href} className="hover:text-white transition">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

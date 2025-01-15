import YouTubeIcon from "@/shared/assets/icons/youtube.svg";
import TelegramIcon from "@/shared/assets/icons/telegram.svg";
import GitHubIcon from "@/shared/assets/icons/github.svg";
import Link from "next/link";

const navigationSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about", width: "max-w-min" },
      { name: "Overview", href: "/overview", width: "max-w-min" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/help", width: "max-w-min" },
      { name: "Documentation", href: "/documentation", width: "max-w-min" },
    ],
  },
  {
    title: "Terms & Policies",
    links: [
      { name: "Terms of use", href: "/terms-of-use", width: "w-[95px]" },
      { name: "Privacy policy", href: "/privacy-policy", width: "w-[104px]" },
      { name: "Data security", href: "/data-security", width: "w-[100px]" },
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

export const Footer = (): React.JSX.Element => {
  return (
    <footer className="border-t py-5 bg-black text-white/60 border-white/20">
      <div className="sm:px-10 container">
        <nav className="flex flex-col md:flex-row md:justify-center mt-6 gap-7 md:gap-12 text-left">
          {navigationSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <span className="text-lg">{section.title}</span>
              <div className="flex flex-col mt-3 gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${link.width} text-opacity-60 text-white hover:text-opacity-100 transition`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-12 gap-4">
          <div className="text-center sm:text-left">
            DVI &copy; 2024. All rights reserved.
          </div>
          <ul className="flex justify-center gap-2.5">
            {socials.map(({ name, href, icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
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

import { ReactNode } from "react";

interface SocialLinkProperties {
  href: string;
  icon: ReactNode;
}

export const SocialLink = ({
  href,
  icon,
}: SocialLinkProperties): React.JSX.Element => {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition"
      >
        {icon}
      </a>
    </li>
  );
};

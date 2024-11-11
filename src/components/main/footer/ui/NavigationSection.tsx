import Link from "next/link";

interface NavigationSectionProperties {
  title: string;
  links: { name: string; href: string }[];
}

export const NavigationSection = ({
  title,
  links,
}: NavigationSectionProperties): JSX.Element => {
  return (
    <div className="flex flex-col w-[140px]">
      <span className="text-lg">{title}</span>
      <div className="flex flex-col mt-3 gap-2">
        {links.map((link) => (
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
  );
};

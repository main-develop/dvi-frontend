import Link from "next/link";

const pages = [
  { name: "About", href: "/about" },
  { name: "Documentation", href: "/documentation" },
  { name: "Help", href: "/help" },
];

export const PagesLinks = (): React.JSX.Element => {
  return (
    <>
      {pages.map(({ href, name }) => (
        <Link
          key={href}
          href={href}
          className="text-opacity-60 text-white hover:text-opacity-100 transition"
        >
          {name}
        </Link>
      ))}
    </>
  );
};

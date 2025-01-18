import { DM_Sans } from "next/font/google";
import "@/shared/styles/globals.css";
import clsx from "clsx";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased bg-black")}>
        {children}
      </body>
    </html>
  );
}

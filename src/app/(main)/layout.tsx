import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/shared/styles/globals.css";
import clsx from "clsx";
import { Header } from "@/components/main/header/Header";
import { Footer } from "@/components/main/footer/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DVI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, "antialiased", "bg-black")}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}

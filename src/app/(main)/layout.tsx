import type { Metadata } from "next";
import { Header } from "@/components/main/header/Header";
import { Footer } from "@/components/main/footer/Footer";

export const metadata: Metadata = {
  title: "DVI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}

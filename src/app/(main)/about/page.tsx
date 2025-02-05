import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | About",
};

export default function About(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

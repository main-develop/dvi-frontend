import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Data security",
};

export default function DataSecurity(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

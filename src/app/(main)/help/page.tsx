import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Help",
};

export default function Help(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

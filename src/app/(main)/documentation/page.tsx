import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Documentation",
};

export default function Documentation(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

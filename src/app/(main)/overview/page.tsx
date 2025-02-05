import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Overview",
};

export default function Overview(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

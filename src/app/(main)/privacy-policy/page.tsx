import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Privacy policy",
};

export default function PrivacyPolicy(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

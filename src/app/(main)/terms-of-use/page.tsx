import type { Metadata } from "next";
import { BlankPage } from "@/components/main/blank-page/BlankPage";

export const metadata: Metadata = {
  title: "DVI | Terms of use",
};

export default function TermsOfUse(): React.JSX.Element {
  return <BlankPage></BlankPage>;
}

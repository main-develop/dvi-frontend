import type { Metadata } from "next";
import { LogInPage } from "@/components/authentication/log-in/LogInPage";

export const metadata: Metadata = {
  title: "DVI | Log In",
};

export default function LogIn(): React.JSX.Element {
  return <LogInPage></LogInPage>;
}

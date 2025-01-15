import type { Metadata } from "next";
import { SignUpPage } from "@/components/authentication/sign-up/SignUpPage";

export const metadata: Metadata = {
  title: "DVI | Sign up",
};

export default function SignUp(): React.JSX.Element {
  return <SignUpPage></SignUpPage>;
}

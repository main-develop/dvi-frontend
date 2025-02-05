import { AuthenticationTemplate } from "../AuthenticationTemplate";
import { SignUpForm } from "./ui/SignUpForm";

export const SignUpPage = (): React.JSX.Element => {
  return (
    <AuthenticationTemplate
      title="Create an account"
      formComponent={<SignUpForm />}
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/authentication/log-in"
    ></AuthenticationTemplate>
  );
};

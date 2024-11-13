import { AuthTemplate } from "../AuthTemplate";
import { SignUpForm } from "./ui/SignUpForm";

export const SignUpPage = (): React.JSX.Element => {
  return (
    <AuthTemplate
      title="Create an account"
      form={<SignUpForm />}
      footerText="Already have an account? "
      footerLinkText="Log in"
      footerLinkHref="/authentication/log-in"
    ></AuthTemplate>
  );
};

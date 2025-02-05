import { AuthenticationTemplate } from "../AuthenticationTemplate";
import { LogInForm } from "./ui/LogInForm";

export const LogInPage = (): React.JSX.Element => {
  return (
    <AuthenticationTemplate
      title="Welcome back!"
      formComponent={<LogInForm />}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/authentication/sign-up"
    ></AuthenticationTemplate>
  );
};

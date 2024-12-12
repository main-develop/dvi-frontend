import { AuthTemplate } from "../AuthTemplate";
import { LogInForm } from "./ui/LogInForm";

export const LogInPage = (): React.JSX.Element => {
  return (
    <AuthTemplate
      title="Welcome back!"
      form={<LogInForm />}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/authentication/sign-up"
    ></AuthTemplate>
  );
};

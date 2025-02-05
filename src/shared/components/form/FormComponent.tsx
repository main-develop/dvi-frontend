import { getUserPersonalInformation } from "@/api/data-requests/getUserPersonalInformation";
import { getCookie } from "@/utils/getCookie";
import { logAuthenticationAction } from "@/utils/logging/logAuthenticationAction";
import { logSettingsAction } from "@/utils/logging/logSettingsAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import zod from "zod";

export type Response = {
  message: string;
  success: boolean;
  type:
    | "validationError"
    | "serverError"
    | "unexpectedError"
    | "successResponse";
  data?: Record<string, unknown>;
  user?: Record<string, unknown>;
  expires?: string;
};

type FormComponentProperties<TSchema extends zod.ZodTypeAny> = {
  schema: TSchema;
  defaultValues: zod.infer<TSchema>;
  onSubmit: (data: zod.infer<TSchema>) => Promise<Response>;
  children: (
    form: UseFormReturn<zod.infer<TSchema>>,
    response: Response | undefined,
    isLoading: boolean
  ) => React.ReactNode;
  formName: string;
};

export const FormComponent = <TSchema extends zod.ZodTypeAny>({
  schema,
  onSubmit,
  defaultValues,
  children,
  formName,
}: FormComponentProperties<TSchema>): React.JSX.Element => {
  const isInfoRequired = ["changePersonalInformation", "changeEmail"].includes(
    formName
  );

  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<zod.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const logOtherActions = (
    formName: string,
    response: Response,
    data: zod.infer<TSchema>
  ) => {
    switch (formName) {
      case "signUp":
        logAuthenticationAction("sign_up", response);
        break;
      case "logIn":
        // The timeout is necessary to retrieve the user's id.
        setTimeout(() => logAuthenticationAction("log_in", response), 1000);
        break;
      case "changePassword":
      case "deleteAccount":
        logSettingsAction(
          formName === "changePassword" ? "change_password" : "delete_account",
          response,
          data
        );
        break;
    }
  };

  const handleSubmit = async (data: zod.infer<TSchema>) => {
    setResponse(undefined);
    setIsLoading(true);

    try {
      let previousInfo;
      if (isInfoRequired) {
        // Logs for change_personal_information and change_email actions
        // require additional new_info and previous_info objects.
        const info = await getUserPersonalInformation(getCookie("accessToken"));
        previousInfo = info.data?.user;
      }

      const response = await onSubmit(data);
      if (response.success && formName !== "changePersonalInformation") {
        form.reset();
      }

      if (isInfoRequired) {
        logSettingsAction(
          formName === "changePersonalInformation"
            ? "change_personal_information"
            : "change_email",
          response,
          data,
          previousInfo
        );
      } else {
        logOtherActions(formName, response, data);
      }

      setResponse(response);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {children(form, response, isLoading)}
    </form>
  );
};

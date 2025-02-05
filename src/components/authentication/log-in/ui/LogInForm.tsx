"use client";

import { submitLogInForm } from "@/api/authentication-requests/submitLogInForm";
import {
  Response,
  FormComponent,
} from "@/shared/components/form/FormComponent";
import { InputField } from "@/shared/components/form/InputField";
import {
  logInFields,
  LogInSchema,
  logInSchema,
} from "@/schemes/authentication-schemes/logInSchema";
import { useRouter } from "next/navigation";
import { LoadingText } from "@/shared/components/other/LoadingText";
import { AnimatedMessage } from "@/shared/components/form/AnimatedMessage";

export const LogInForm = () => {
  const router = useRouter();

  const handleSuccessfulLogIn = (response: Response) => {
    document.cookie = `accessToken=${response.data?.accessToken}; path=/; Secure; SameSite=Strict${response.expires ? `; Expires=${response.expires}` : ""}`;
    router.replace("/dashboard/home");
  };

  return (
    <FormComponent
      schema={LogInSchema}
      defaultValues={{ email: "", password: "", rememberMe: false }}
      onSubmit={async (data) => submitLogInForm(data)}
      formName="logIn"
    >
      {(form, response, isLoading) => {
        if (response?.success && response.data?.accessToken)
          handleSuccessfulLogIn(response);
        return (
          <div className="mt-6">
            {logInFields.map((field) => (
              <div key={field.id} className="mb-3">
                <InputField<logInSchema>
                  form={form}
                  type={field.type}
                  id={field.id}
                  label={field.label}
                  className="w-[100%] authentication-section-input-group"
                ></InputField>
              </div>
            ))}
            <div className="flex flex-row justify-between mt-[14px]">
              <div className="flex flex-row">
                <label className="mb-[14px] cursor-pointer">
                  <input
                    {...form.register("rememberMe")}
                    type="checkbox"
                    id="rememberMe"
                    className="hidden"
                  />
                  <svg
                    viewBox="0 0 64 64"
                    height="14px"
                    width="14px"
                    className="overflow-visible"
                  >
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    ></path>
                  </svg>
                </label>
                <label className="pl-[6px] -mt-[2px] text-[13px]">
                  Remember me
                </label>
              </div>
              <div className="-mt-[5.3px]">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="forgot-password text-[13px] hover:text-[#f3f4f6da] transition"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {response?.message && response.type === "serverError" && (
              <AnimatedMessage
                message={response.message}
                success={response.success}
                className="authentication-section"
              ></AnimatedMessage>
            )}
            {response?.message &&
              ["validationError", "unexpectedError"].includes(
                response.type
              ) && (
                <p className="text-[13px] text-red-800">{response.message}</p>
              )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-[100%] p-3 mt-8 authentication-log-in-button rounded-md"
            >
              <span className="flex items-center justify-center select-none font-medium transition-all duration-500">
                <LoadingText
                  isLoading={isLoading}
                  primaryText="Log in"
                  loadingText="Logging in"
                  className="ml-[0.7px] sm:ml-[0.5px] w-[14px] authentication"
                ></LoadingText>
              </span>
            </button>
          </div>
        );
      }}
    </FormComponent>
  );
};

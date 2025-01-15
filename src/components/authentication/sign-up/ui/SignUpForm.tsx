"use client";

import {
  mainInputFields,
  optionalInputFields,
  SignUpSchema,
  signUpSchema,
} from "@/schemes/authentication/signUpSchema";
import { submitSignUpForm } from "@/api/authentication/submitSignUpForm";
import { GenderSelect } from "@/shared/components/form/GenderSelect";
import { InputField } from "@/shared/components/form/InputField";
import { FormComponent } from "@/shared/components/form/FormComponent";
import { useRouter } from "next/navigation";
import { LoadingText } from "@/shared/components/other/LoadingText";
import { AnimatedMessage } from "@/shared/components/form/AnimatedMessage";

export const SignUpForm = (): React.JSX.Element => {
  const router = useRouter();

  return (
    <FormComponent
      schema={SignUpSchema}
      defaultValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "Rather not say",
      }}
      onSubmit={async (data) => submitSignUpForm(data)}
    >
      {(form, response, isLoading) => {
        if (response?.success) {
          router.replace("/authentication/log-in");
        }
        return (
          <div className="mt-6">
            <div className="flex flex-row justify-between space-x-2">
              {optionalInputFields.map((field) => (
                <div key={field.id} className="mt-1">
                  <InputField<signUpSchema>
                    form={form}
                    type="text"
                    id={field.id}
                    label={field.label}
                    className="w-[140px] authentication-section-input-group"
                  ></InputField>
                </div>
              ))}
            </div>
            <div className="mb-1">
              {mainInputFields.map((field) => (
                <div key={field.id} className="mt-3">
                  <InputField<signUpSchema>
                    form={form}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    className="w-[100%] authentication-section-input-group"
                    message={
                      field.id === "email" ? response?.message : undefined
                    }
                  ></InputField>
                </div>
              ))}
              <div className="mt-3">
                <GenderSelect
                  form={form}
                  className="authentication-section-gender-select"
                />
              </div>
            </div>
            {response?.message &&
              ["serverError", "unexpectedError"].includes(response.type) && (
                <AnimatedMessage
                  message={response.message}
                  success={response.success}
                  className="authentication-section"
                ></AnimatedMessage>
              )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center w-[100%] mt-8 p-3 sign-up-button rounded-md"
            >
              <span className="flex items-center justify-center select-none font-medium transition-all duration-500">
                <LoadingText
                  isLoading={isLoading}
                  primaryText="Sign up"
                  loadingText="Signing up"
                  className="w-3 ml-[0.5px] sm:ml-[1px] authentication"
                ></LoadingText>
              </span>
            </button>
          </div>
        );
      }}
    </FormComponent>
  );
};

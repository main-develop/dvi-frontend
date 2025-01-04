"use client";

import { useEffect, useState } from "react";
import {
  personalInformationSchema,
  PersonalInformationSchema,
} from "@/types/settings/personalInformationSchema";
import {
  changeEmailSchema,
  ChangeEmailSchema,
} from "@/types/settings/changeEmailSchema";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/types/settings/changePasswordSchema";
import {
  deleteAccountSchema,
  DeleteAccountSchema,
} from "@/types/settings/deleteAccountSchema";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SuccessIcon from "@/shared/assets/animations/success.json";
import { transition } from "@/utils/motions";
import { submitChangePersonalInformationForm } from "@/api/settings/submitChangePersonalInformationForm";
import { submitChangeEmailForm } from "@/api/settings/submitChangeEmailForm";
import { submitChangePasswordForm } from "@/api/settings/submitChangePasswordForm";
import { submitDeleteAccountForm } from "@/api/settings/submitDeleteAccountForm";
import { AnimatedMessage } from "@/shared/components/form/AnimatedMessage";
import { Message, FormComponent } from "@/shared/components/form/FormComponent";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";
import zod from "zod";
import { SectionWrapper } from "@/shared/components/settings-page/SectionWrapper";
import { InputField } from "@/shared/components/form/InputField";
import { GenderSelect } from "@/shared/components/form/GenderSelect";
import { getUserPersonalInformation } from "@/api/fetch-user-data/getUserPersonalInformation";

export const AccountSection = (): React.JSX.Element => {
  const router = useRouter();

  const [personalInformation, setPersonalInformation] = useState<{
    firstName: string;
    lastName: string;
    gender: "Male" | "Female" | "Rather not say";
    email: string;
  }>();

  useEffect(() => {
    async function getData() {
      const accessToken = getCookie("accessToken");

      const response = await getUserPersonalInformation(accessToken);
      if (response.success) {
        setPersonalInformation(response.personalInformation);
      }
    }

    getData();
  }, []);

  const handleFormSubmit = async (
    submitFunction: (
      data: zod.infer<zod.ZodTypeAny>,
      accessToken: string | null
    ) => Promise<Message>,
    data: zod.infer<zod.ZodTypeAny>
  ) => {
    const accessToken = getCookie("accessToken");

    return await submitFunction(data, accessToken);
  };

  const [successfullyDeletedMessage, setSuccessfullyDeletedMessage] =
    useState("");

  const [dialogState, setDialogState] = useState({
    deleteAccountDialogOpen: false,
    successfullyDeletedDialogOpen: false,
  });

  const toggleDialog = (key: PropertyKey, value: boolean) => {
    setDialogState((prev) => ({ ...prev, [key]: value }));
  };

  const handleRedirect = (message: Message) => {
    setSuccessfullyDeletedMessage(message.message);
    toggleDialog("deleteAccountDialogOpen", false);
    toggleDialog("successfullyDeletedDialogOpen", true);

    document.cookie = `accessToken=; path=/; Secure; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    setTimeout(() => {
      router.replace("/home");
    }, 5000);
  };

  return (
    <div className="flex flex-col relative py-3">
      <FormComponent
        formName="personalInformation"
        schema={PersonalInformationSchema}
        defaultValues={{
          firstName: "",
          lastName: "",
          gender: "Rather not say",
        }}
        onSubmit={(data) =>
          handleFormSubmit(submitChangePersonalInformationForm, data)
        }
      >
        {(form, message) => (
          <SectionWrapper
            title="Personal Information"
            description="These fields are optional, but you can always add, change or
                      delete your personal information here."
          >
            <div className="flex flex-col sm:flex-row justify-between w-[350px] space-x-0 sm:space-x-4 mt-5">
              <div className="input-group mt-1 text-sm">
                <InputField<personalInformationSchema>
                  form={form}
                  type="text"
                  id="firstName"
                  label="First name"
                  defaultValue={personalInformation?.firstName || ""}
                />
              </div>
              <div className="input-group mt-[17px] sm:mt-1 text-sm">
                <InputField<personalInformationSchema>
                  form={form}
                  type="text"
                  id="lastName"
                  label="Last name"
                  defaultValue={personalInformation?.lastName || ""}
                />
              </div>
            </div>
            <GenderSelect
              form={form}
              defaultValue={personalInformation?.gender || "Gender"}
            ></GenderSelect>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                className="submit-button p-2 mt-7 w-[145px] rounded-lg"
              >
                <span className="text-sm text-[#026191] select-none font-medium transition-all duration-500">
                  Submit
                </span>
              </button>
              {message?.message && (
                <AnimatedMessage
                  message={message.message}
                  success={message.success}
                ></AnimatedMessage>
              )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="line" />
      </div>
      <FormComponent
        schema={ChangeEmailSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={(data) => handleFormSubmit(submitChangeEmailForm, data)}
      >
        {(form, message) => (
          <SectionWrapper
            title="Change Email"
            description={
              <>
                You can update your email address here.
                <br />A confirmation email will be sent to the new address to
                complete the update.
              </>
            }
          >
            <div className="flex flex-row justify-between w-[350px] space-x-4 mt-5">
              <div className="input-group mt-1 text-sm">
                <InputField<changeEmailSchema>
                  form={form}
                  type="text"
                  id="email"
                  label="New email"
                  message={message}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between w-[350px] space-x-4 mt-3">
              <div className="input-group mt-1 text-sm">
                <InputField<changeEmailSchema>
                  form={form}
                  type="password"
                  id="password"
                  label="Confirm with the current password"
                  message={message}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                className="submit-button p-2 mt-7 w-[145px] rounded-lg"
              >
                <span className="text-sm text-[#026191] select-none font-medium transition-all duration-500">
                  Change email
                </span>
              </button>
              {message?.message &&
                message.message !== "Invalid password" &&
                message.message !== "This email address is already taken" && (
                  <AnimatedMessage
                    message={message.message}
                    success={message.success}
                  ></AnimatedMessage>
                )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="line" />
      </div>
      <FormComponent
        schema={ChangePasswordSchema}
        defaultValues={{ newPassword: "", oldPassword: "" }}
        onSubmit={(data) => handleFormSubmit(submitChangePasswordForm, data)}
      >
        {(form, message) => (
          <SectionWrapper
            title="Change Password"
            description={
              <>
                For better safety, it is recommended to write down your new
                password or use a password manager. <br />
                If you forget your new password, you will need to use the
                password recovery process.
              </>
            }
          >
            <div className="flex flex-row justify-between w-[350px] space-x-4 mt-5">
              <div className="input-group mt-1 text-sm">
                <InputField<changePasswordSchema>
                  form={form}
                  type="password"
                  id="newPassword"
                  label="New password"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between w-[350px] space-x-4 mt-3">
              <div className="input-group mt-1 text-sm">
                <InputField<changePasswordSchema>
                  form={form}
                  type="password"
                  id="oldPassword"
                  label="Confirm with the current password"
                  message={message}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                className="submit-button p-2 mt-7 w-[145px] rounded-lg"
              >
                <span className="text-sm text-[#026191] select-none font-medium transition-all duration-500">
                  Change password
                </span>
              </button>
              {message?.message && message.message !== "Invalid password" && (
                <AnimatedMessage
                  message={message.message}
                  success={message.success}
                ></AnimatedMessage>
              )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="line" />
      </div>
      <SectionWrapper
        title="Delete Account"
        description={
          <>
            By deleting your account, your personal information will no longer
            be stored on the servers, <br className="hidden sm:block"></br> as
            well as other information, including uploaded datasets. Make sure
            you have saved your datasets <br className="hidden sm:block"></br>
            locally.
          </>
        }
      >
        <p className="text-[15px] text-red-600">
          Once deleted, it will be impossible to recover the data.
        </p>
        <button
          onClick={() => toggleDialog("deleteAccountDialogOpen", true)}
          type="button"
          className="delete-account-button p-2 mt-6 w-[145px] rounded-lg"
        >
          <span className="text-sm text-[#db0b0b] select-none font-medium transition-all duration-500">
            Delete my account
          </span>
        </button>
        {(dialogState.deleteAccountDialogOpen ||
          dialogState.successfullyDeletedDialogOpen) && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={transition(0, 0.2)}
          >
            <div
              className="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="fixed inset-0 bg-[#212223ac] backdrop-blur-sm transition-opacity duration-300"
                aria-hidden="true"
              ></div>
              {dialogState.deleteAccountDialogOpen && (
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-[#131516] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                              className="h-6 w-6 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                              />
                            </svg>
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3
                              className="text-base font-semibold text-[#9ca3af]"
                              id="modal-title"
                            >
                              Delete Account
                            </h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete your account?
                                This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <FormComponent
                        schema={DeleteAccountSchema}
                        defaultValues={{ password: "" }}
                        onSubmit={(data) =>
                          handleFormSubmit(submitDeleteAccountForm, data)
                        }
                      >
                        {(form, message) => {
                          if (message && message.success) {
                            handleRedirect({
                              message: message.message,
                              success: message.success,
                            });
                          }
                          return (
                            <>
                              <div className="sm:flex justify-center items-center mt-3 mb-2 px-4 sm:px-6">
                                <div className="input-group w-full text-sm">
                                  <InputField<deleteAccountSchema>
                                    form={form}
                                    type="password"
                                    id="password"
                                    label="Confirm with the current password"
                                    message={message}
                                    className="border border-solid rounded-md outline-none w-full"
                                  />
                                </div>
                              </div>
                              {message?.message &&
                                message.message !== "Invalid password" && (
                                  <AnimatedMessage
                                    message={message.message}
                                    success={false}
                                    section="deleteAccount"
                                  ></AnimatedMessage>
                                )}
                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="submit"
                                  className="delete-account-button inline-flex w-full sm:w-auto sm:ml-3 justify-center rounded-lg px-4 py-2 shadow-sm"
                                >
                                  <span className="text-sm text-[#db0b0b] select-none font-medium transition-all duration-500">
                                    Delete
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    toggleDialog(
                                      "deleteAccountDialogOpen",
                                      false
                                    )
                                  }
                                  type="button"
                                  className="cancel-button mt-3 sm:mt-0 inline-flex w-full sm:w-auto justify-center rounded-lg px-4 py-2 shadow-sm"
                                >
                                  <span className="text-sm text-[#1b1c1d] select-none font-medium transition-all duration-500">
                                    Cancel
                                  </span>
                                </button>
                              </div>
                            </>
                          );
                        }}
                      </FormComponent>
                    </div>
                  </div>
                </div>
              )}
              {dialogState.successfullyDeletedDialogOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={transition(0, 0.2)}
                >
                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                      <div className="relative transform overflow-hidden rounded-lg bg-[#131516] shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[300px]">
                        <div className="flex flex-col items-center justify-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <DotLottieReact
                            data={SuccessIcon}
                            autoplay={true}
                            className="w-[55px] h-[55px]"
                          ></DotLottieReact>
                          <span className="mt-4 text-lg text-green-500 select-none">
                            {successfullyDeletedMessage &&
                              successfullyDeletedMessage}
                          </span>
                          <div className="flex flex-row mt-5 mb-1">
                            <span className="text-sm text-gray-500 select-none">
                              Redirecting you to the home page
                            </span>
                            <div className="flex items-center justify-center mt-1 ml-[3px]">
                              <div className="loading-circle"></div>
                              <div className="loading-circle"></div>
                              <div className="loading-circle"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </SectionWrapper>
    </div>
  );
};

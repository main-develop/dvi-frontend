"use client";

import { useEffect, useState } from "react";
import {
  personalInformationFields,
  personalInformationSchema,
  PersonalInformationSchema,
} from "@/schemes/settings/personalInformationSchema";
import {
  changeEmailFields,
  changeEmailSchema,
  ChangeEmailSchema,
} from "@/schemes/settings/changeEmailSchema";
import {
  changePasswordFields,
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/schemes/settings/changePasswordSchema";
import {
  deleteAccountSchema,
  DeleteAccountSchema,
} from "@/schemes/settings/deleteAccountSchema";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SuccessIcon from "@/shared/assets/animations/success.json";
import { transition } from "@/utils/motions";
import { submitChangePersonalInformationForm } from "@/api/settings/submitChangePersonalInformationForm";
import { submitChangeEmailForm } from "@/api/settings/submitChangeEmailForm";
import { submitChangePasswordForm } from "@/api/settings/submitChangePasswordForm";
import { submitDeleteAccountForm } from "@/api/settings/submitDeleteAccountForm";
import { AnimatedMessage } from "@/shared/components/form/AnimatedMessage";
import {
  Response,
  FormComponent,
} from "@/shared/components/form/FormComponent";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/navigation";
import { SectionWrapper } from "@/shared/components/settings-page/SectionWrapper";
import { InputField } from "@/shared/components/form/InputField";
import { GenderSelect } from "@/shared/components/form/GenderSelect";
import { getUserPersonalInformation } from "@/api/fetch-user-data/getUserPersonalInformation";
import { LoadingText } from "@/shared/components/other/LoadingText";
import { ModalDialog } from "@/shared/components/other/ModalDialog";

export const AccountSection = (): React.JSX.Element => {
  const router = useRouter();
  const accessToken = getCookie("accessToken");

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
        setPersonalInformation(response.data?.user);
      }
    }

    getData();
  }, []);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const [successfullyDeletedMessage, setSuccessfullyDeletedMessage] =
    useState("");

  const handleRedirect = (response: Response) => {
    setSuccessfullyDeletedMessage(response.message);
    setDeleteDialogOpen(false);
    setDeletedSuccessfully(true);

    document.cookie = `accessToken=; path=/; Secure; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    setTimeout(() => {
      router.replace("/");
    }, 3000);
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
        onSubmit={async (data) =>
          submitChangePersonalInformationForm(data, accessToken)
        }
      >
        {(form, response, isLoading) => (
          <SectionWrapper
            title="Personal Information"
            description="These fields are optional, but you can always add, change or
                      delete your personal information here."
          >
            <div className="flex flex-col sm:flex-row justify-between w-[260px] space-x-0 sm:space-x-4 mt-5">
              {personalInformationFields.map((field) => (
                <div
                  key={field.id}
                  className="mt-1 last:mt-[15px] last:sm:mt-1"
                >
                  <InputField<personalInformationSchema>
                    form={form}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    defaultValue={personalInformation?.[field.id] || ""}
                    className="settings-section-input-group w-[260px]"
                  ></InputField>
                </div>
              ))}
            </div>
            <div className="mt-4 w-[260px]">
              <GenderSelect
                form={form}
                defaultValue={personalInformation?.gender || "Gender"}
                className="settings-section-gender-select"
              ></GenderSelect>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button flex p-2 mt-7 w-[145px] h-10 rounded-lg items-center justify-center"
              >
                <span className="flex text-sm text-[#026191] select-none font-medium items-center justify-center transition-all duration-500">
                  <LoadingText
                    isLoading={isLoading}
                    primaryText="Submit"
                    loadingText="Processing"
                    className="submit ml-[1px]"
                  ></LoadingText>
                </span>
              </button>
              {response?.message && (
                <AnimatedMessage
                  message={response.message}
                  success={response.success}
                ></AnimatedMessage>
              )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="separation-line settings-section-separation-line" />
      </div>
      <FormComponent
        schema={ChangeEmailSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={async (data) => submitChangeEmailForm(data, accessToken)}
      >
        {(form, response, isLoading) => (
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
            <div className="flex flex-col justify-between w-[350px] mt-5">
              {changeEmailFields.map((field) => (
                <div key={field.id} className="mt-1 last:mt-4">
                  <InputField<changeEmailSchema>
                    form={form}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    message={response?.message}
                    className="settings-section-input-group w-[260px]"
                  ></InputField>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button flex p-2 mt-7 w-[145px] h-10 rounded-lg items-center justify-center"
              >
                <span className="flex text-sm text-[#026191] select-none font-medium items-center justify-center transition-all duration-500">
                  <LoadingText
                    isLoading={isLoading}
                    primaryText="Change email"
                    loadingText="Processing"
                    className="submit ml-[1px]"
                  ></LoadingText>
                </span>
              </button>
              {response?.message && response.type !== "validationError" && (
                <AnimatedMessage
                  message={response.message}
                  success={response.success}
                ></AnimatedMessage>
              )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="separation-line settings-section-separation-line" />
      </div>
      <FormComponent
        schema={ChangePasswordSchema}
        defaultValues={{ newPassword: "", oldPassword: "" }}
        onSubmit={async (data) => submitChangePasswordForm(data, accessToken)}
      >
        {(form, response, isLoading) => (
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
            <div className="flex flex-col justify-between w-[260px] mt-5">
              {changePasswordFields.map((field) => (
                <div key={field.id} className="mt-1 last:mt-4">
                  <InputField<changePasswordSchema>
                    form={form}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    className="settings-section-input-group w-[260px]"
                  ></InputField>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button flex p-2 mt-7 w-[145px] h-10 rounded-lg items-center justify-center"
              >
                <span className="flex text-sm text-[#026191] select-none font-medium items-center justify-center transition-all duration-500">
                  <LoadingText
                    isLoading={isLoading}
                    primaryText="Change password"
                    loadingText="Processing"
                    className="submit ml-[1px]"
                  ></LoadingText>
                </span>
              </button>
              {response?.message && response.type !== "validationError" && (
                <AnimatedMessage
                  message={response.message}
                  success={response.success}
                ></AnimatedMessage>
              )}
            </div>
          </SectionWrapper>
        )}
      </FormComponent>
      <div className="flex items-center px-7 py-10">
        <div className="separation-line settings-section-separation-line" />
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
          onClick={() => setDeleteDialogOpen(true)}
          type="button"
          className="delete-account-button p-2 mt-6 w-[145px] rounded-lg"
        >
          <span className="text-sm text-[#db0b0b] select-none font-medium transition-all duration-500">
            Delete my account
          </span>
        </button>
        <ModalDialog isOpen={isDeleteDialogOpen || isDeletedSuccessfully}>
          {isDeleteDialogOpen && (
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
                            Are you sure you want to delete your account? This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FormComponent
                    schema={DeleteAccountSchema}
                    defaultValues={{ password: "" }}
                    onSubmit={async (data) =>
                      submitDeleteAccountForm(data, accessToken)
                    }
                  >
                    {(form, response, isLoading) => {
                      if (response && response.success) {
                        handleRedirect({
                          success: response.success,
                          message: response.message,
                          type: "successResponse",
                        });
                      }
                      return (
                        <div>
                          <div className="sm:flex justify-center items-center mt-3 mb-2 px-4 sm:px-6">
                            <div className="w-full">
                              <InputField<deleteAccountSchema>
                                form={form}
                                type="password"
                                id="password"
                                label="Confirm with the current password"
                                message={response?.message}
                                className="settings-section-input-group w-full"
                              ></InputField>
                            </div>
                          </div>
                          {response?.message &&
                            response.type !== "validationError" && (
                              <AnimatedMessage
                                message={response.message}
                                success={false}
                                className="delete-account-section"
                              ></AnimatedMessage>
                            )}
                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="delete-account-button inline-flex w-full sm:w-auto sm:ml-3 items-center justify-center rounded-lg px-4 py-2 shadow-sm"
                            >
                              <span className="flex text-sm text-[#db0b0b] select-none font-medium items-center justify-center transition-all duration-500">
                                <LoadingText
                                  isLoading={isLoading}
                                  primaryText="Delete"
                                  loadingText="Deleting"
                                  className="delete ml-[1px]"
                                ></LoadingText>
                              </span>
                            </button>
                            <button
                              onClick={() => setDeleteDialogOpen(false)}
                              type="button"
                              className="cancel-button mt-3 sm:mt-0 inline-flex w-full sm:w-auto justify-center rounded-lg px-4 py-2 shadow-sm"
                            >
                              <span className="text-sm text-[#1b1c1d] select-none font-medium transition-all duration-500">
                                Cancel
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    }}
                  </FormComponent>
                </div>
              </div>
            </div>
          )}
          {isDeletedSuccessfully && (
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
                        <div className="mt-1 ml-[2px]">
                          <LoadingText isLoading={true}></LoadingText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </ModalDialog>
      </SectionWrapper>
    </div>
  );
};

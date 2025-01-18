"use server";

import { changePasswordSchema } from "@/schemes/settings-schemes/changePasswordSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitChangePasswordForm(
  formData: changePasswordSchema,
  accessToken: string | undefined
) {
  return makeApiRequest<undefined>(
    `${process.env.API_CHANGE_PASSWORD_URL}`,
    "PUT",
    formData,
    accessToken
  );
}

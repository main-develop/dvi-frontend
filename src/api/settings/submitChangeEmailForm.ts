"use server";

import { changeEmailSchema } from "@/schemes/settings/changeEmailSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitChangeEmailForm(
  formData: changeEmailSchema,
  accessToken: string | undefined
) {
  return makeApiRequest<undefined>(
    `${process.env.API_CHANGE_EMAIL_URL}`,
    "PUT",
    formData,
    accessToken
  );
}

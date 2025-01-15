"use server";

import { deleteAccountSchema } from "@/schemes/settings/deleteAccountSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitDeleteAccountForm(
  formData: deleteAccountSchema,
  accessToken: string | undefined
) {
  return makeApiRequest<undefined>(
    `${process.env.API_DELETE_ACCOUNT_URL}`,
    "DELETE",
    formData,
    accessToken
  );
}

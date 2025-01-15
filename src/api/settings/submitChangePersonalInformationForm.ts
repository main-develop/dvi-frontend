"use server";

import { personalInformationSchema } from "@/schemes/settings/personalInformationSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitChangePersonalInformationForm(
  formData: personalInformationSchema,
  accessToken: string | undefined
) {
  return makeApiRequest<undefined>(
    `${process.env.API_CHANGE_PERSONAL_INFORMATION_URL}`,
    "PUT",
    formData,
    accessToken
  );
}

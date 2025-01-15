"use server";

import { logInSchema } from "@/schemes/authentication/logInSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitLogInForm(formData: logInSchema) {
  return makeApiRequest<{ accessToken: string }>(
    `${process.env.API_LOGIN_URL}`,
    "POST",
    formData
  ).then((result) => {
    if (result.success && result.data?.accessToken) {
      const expires = formData.rememberMe
        ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toUTCString()
        : undefined;

      return { ...result, expires };
    }

    return result;
  });
}

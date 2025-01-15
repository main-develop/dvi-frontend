"use server";

import { signUpSchema } from "@/schemes/authentication/signUpSchema";
import { makeApiRequest } from "../makeApiRequest";

export async function submitSignUpForm(formData: signUpSchema) {
  return makeApiRequest<undefined>(
    `${process.env.API_REGISTER_URL}`,
    "POST",
    formData
  );
}

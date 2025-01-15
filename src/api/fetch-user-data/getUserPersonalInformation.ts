"use server";

import { makeApiRequest } from "../makeApiRequest";

export async function getUserPersonalInformation(
  accessToken: string | undefined
) {
  return makeApiRequest<{
    user: {
      firstName: string;
      lastName: string;
      gender: "Male" | "Female" | "Rather not say";
      email: string;
    };
  }>(
    `${process.env.API_GET_USER_PERSONAL_INFORMATION_URL}`,
    "GET",
    null,
    accessToken
  );
}

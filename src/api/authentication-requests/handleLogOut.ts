"use server";

import { makeApiRequest } from "../makeApiRequest";

export async function handleLogOut(accessToken: string | undefined) {
  return makeApiRequest<undefined>(
    `${process.env.API_LOGOUT_URL}`,
    "POST",
    null,
    accessToken
  );
}

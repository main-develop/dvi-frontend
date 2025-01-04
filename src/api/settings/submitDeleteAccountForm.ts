"use server";

import { deleteAccountSchema } from "@/types/settings/deleteAccountSchema";

export async function submitDeleteAccountForm(
  formData: deleteAccountSchema,
  accessToken: string | null
) {
  try {
    const response = await fetch(`${process.env.API_DELETE_ACCOUNT_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        password: formData.password,
      }),
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Account successfully deleted",
      };
    } else if (response.status === 403) {
      return {
        success: false,
        message: "Invalid password",
      };
    } else {
      return {
        success: false,
        message:
          "An error occurred while processing the data. Please try again.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "The server is unavailable or there is no internet connection.",
    };
  }
}

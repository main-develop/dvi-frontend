"use server";

import { changeEmailSchema } from "@/types/settings/changeEmailSchema";

export async function submitChangeEmailForm(
  formData: changeEmailSchema,
  accessToken: string | null
) {
  try {
    const response = await fetch(`${process.env.API_CHANGE_EMAIL_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.status === 200) {
      return { success: true, message: "A confirmation email has been sent." };
    } else if (response.status === 403) {
      return {
        success: false,
        message: "Invalid password",
      };
    } else if (response.status === 400) {
      return {
        success: false,
        message: "This email address is already taken",
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

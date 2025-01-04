"use server";

import { changePasswordSchema } from "@/types/settings/changePasswordSchema";

export async function submitChangePasswordForm(
  formData: changePasswordSchema,
  accessToken: string | null
) {
  try {
    const response = await fetch(`${process.env.API_CHANGE_PASSWORD_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      }),
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Password has been successfully changed.",
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

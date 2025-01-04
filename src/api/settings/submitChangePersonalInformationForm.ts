"use server";

import { personalInformationSchema } from "@/types/settings/personalInformationSchema";

export async function submitChangePersonalInformationForm(
  formData: personalInformationSchema,
  accessToken: string | null
) {
  try {
    const response = await fetch(
      `${process.env.API_CHANGE_PERSONAL_INFORMATION_URL}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName || null,
          lastName: formData.lastName || null,
          gender: formData.gender,
        }),
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Personal information has been successfully changed.",
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

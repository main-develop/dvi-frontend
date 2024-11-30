"use server";

import { signUpSchema } from "@/types/authentication/signUpSchema";

export async function submitSignUpForm(formData: signUpSchema) {
  try {
    const response = await fetch(
      "http://api:5000/dvi-api/authentication/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName || null,
          lastName: formData.lastName || null,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
        }),
      }
    );

    if (response.status === 201) {
      console.log("Sign up successful:", formData);

      return { success: true, status: response.status };
    } else {
      const errorResponse = await response.json();
      console.log(
        `Sign up failed with status: ${response.status}. ${errorResponse.error}`
      );

      return {
        success: false,
        status: response.status,
        error: errorResponse.error,
      };
    }
  } catch (error) {
    console.log("An error occurred:", error);

    return {
      success: false,
      status: null,
      error: "Network error or server not reachable.",
    };
  }
}

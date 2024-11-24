"use server";

import { logInSchema } from "@/types/authentication/logInSchema";

export async function submitLogInForm(formData: logInSchema) {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/dvi-api/authentication/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    if (response.status === 200) {
      console.log("Log in successful:", formData);

      return { success: true, status: response.status };
    } else {
      const errorResponse = await response.json();
      console.log(
        `Log in failed with status: ${response.status}. ${errorResponse.error}`
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

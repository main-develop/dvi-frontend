"use server";

import { signUpSchema } from "@/types/authentication/signUpSchema";

export async function submitSignUpForm(formData: signUpSchema) {
  try {
    const response = await fetch(`${process.env.API_REGISTER_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
      }),
    });

    if (response.status === 201) {
      return { success: true, message: "" };
    } else {
      return {
        success: false,
        message: "This email address is already taken.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Network error or server not reachable.",
    };
  }
}

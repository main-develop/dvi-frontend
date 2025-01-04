"use server";

export async function getUserPersonalInformation(accessToken: string | null) {
  try {
    const response = await fetch(
      `${process.env.API_GET_USER_PERSONAL_INFORMATION_URL}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      const responsePersonalInformation = await response.json();
      return {
        success: true,
        personalInformation: responsePersonalInformation.user,
      };
    } else {
      return {
        success: false,
        message: "An error occurred while fetching the data.",
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

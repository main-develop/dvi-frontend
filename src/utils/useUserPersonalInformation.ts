import { useEffect, useState } from "react";
import { getCookie } from "./getCookie";
import { getUserPersonalInformation } from "@/api/data-requests/getUserPersonalInformation";

export function useUserPersonalInformation() {
  const [userPersonalInformation, setUserPersonalInformation] = useState<{
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
  }>();

  useEffect(() => {
    async function getData() {
      const accessToken = getCookie("accessToken");

      const response = await getUserPersonalInformation(accessToken);
      if (response.success) {
        setUserPersonalInformation(response.data?.user);
      }
    }

    getData();
  }, []);

  return userPersonalInformation;
}

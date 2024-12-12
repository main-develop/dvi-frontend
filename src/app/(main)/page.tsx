"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeRedirect(): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return <div></div>;
}

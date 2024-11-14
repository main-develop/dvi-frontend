import Link from "next/link";
import Image from "next/image";
import logoImage from "@/shared/assets/images/logo1.png";

export const Logo = (): JSX.Element => {
  return (
    <Link href="/home">
      <div className="relative cursor-pointer">
        <div className="absolute logo-background w-full top-2 bottom-0 blur-md"></div>
        <Image
          src={logoImage}
          alt="logo"
          className="relative h-12 w-12"
        ></Image>
      </div>
    </Link>
  );
};

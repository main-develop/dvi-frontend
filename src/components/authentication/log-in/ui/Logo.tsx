import Image from "next/image";
import Link from "next/link";
import logoImage from "@/shared/assets/images/logo1.png";

export const Logo = (): React.JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div className="absolute logo-background h-16 w-16 blur-md"></div>
      <Link href="/home">
        <Image
          src={logoImage}
          alt="logo"
          className="relative h-14 w-14"
        ></Image>
      </Link>
    </div>
  );
};

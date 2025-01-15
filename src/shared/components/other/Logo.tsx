import Image from "next/image";
import Link from "next/link";
import logoImage from "@/shared/assets/images/logo1.png";

type LogoProperties = {
  className: string;
};

export const Logo = ({ className }: LogoProperties): React.JSX.Element => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className={`absolute logo-background blur-md ${className}`}></div>
      <Image
        src={logoImage}
        alt="logo"
        className={`relative select-none ${className}-image`}
      ></Image>
    </Link>
  );
};

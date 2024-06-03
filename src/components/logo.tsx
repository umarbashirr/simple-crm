"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  type?: "light" | "dark";
}

const Logo = ({ className, type = "dark" }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Image
        src={type === "dark" ? "/icons/logo.svg" : "/icons/white-logo.svg"}
        alt="Simple CRM Logo"
        width={142}
        height={32}
      />
    </Link>
  );
};

export default Logo;

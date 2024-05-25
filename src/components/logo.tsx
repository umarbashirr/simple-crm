"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Image
        src="/icons/logo.svg"
        alt="Simple CRM Logo"
        width={142}
        height={32}
      />
    </Link>
  );
};

export default Logo;

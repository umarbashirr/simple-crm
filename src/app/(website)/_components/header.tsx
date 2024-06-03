"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 border-b flex items-center justify-start w-full">
      <div className="container mx-auto px-5 w-full h-full flex items-center justify-between">
        <Logo />
        <nav className="flex items-center justify-end">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="link" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Signup</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

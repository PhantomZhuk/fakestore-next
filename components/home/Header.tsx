"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import Cart from "./Cart";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import Link from "next/link";

function Header() {
  const { isMobile, mounted } = useMaxWidth(768);

  return (
    <header
      className={`w-full h-[10vh] bg-black flex items-center justify-between ${
        isMobile ? "px-5" : "px-10"
      } shadow-md`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" width={35} height={35} />
        <h2 className="text-white text-xl font-[Montserrat] font-bold">
          Fake Store
        </h2>
      </Link>
      {mounted && (isMobile ? null : <Nav />)}
      <div className="flex items-center gap-4">
        {mounted && (isMobile ? <MobileNav /> : null)}
        <Cart />
      </div>
    </header>
  );
}

export default Header;

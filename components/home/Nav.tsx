import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className="absolute left-[50%] translate-x-[-50%]">
      <ul className="flex gap-4">
        <li className="text-white text-lg font-[Montserrat] font-medium cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="text-white text-lg font-[Montserrat] font-medium cursor-pointer">
          <Link href="/">About</Link>
        </li>
        <li className="text-white text-lg font-[Montserrat] font-medium cursor-pointer">
          <Link href="/">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

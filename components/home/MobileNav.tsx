import { MenuIcon, X } from "lucide-react";
import React, { useState } from "react";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      <MenuIcon onClick={() => setIsOpen(!isOpen)} />
      <nav
        className={`absolute top-0 left-0 w-full h-[100dvh] bg-black text-white items-center justify-center z-50 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={40} />
        </button>
        <ul className="flex flex-col gap-10">
          <li className="text-5xl font-bold">
            <a href="/">Home</a>
          </li>
          <li className="text-5xl font-bold">
            <a href="/">About</a>
          </li>
          <li className="text-5xl font-bold">
            <a href="/">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileNav;

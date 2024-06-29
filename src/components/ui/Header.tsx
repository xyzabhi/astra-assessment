// components/Header.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/lib/constants";

const Header = () => {
  const renderLink = () =>
    routes.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="hover:text-black transition duration-300 hover:bg-yellow-500 p-1 rounded"
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="flex justify-between flex-col items-center p-5 bg-black text-yellow-500">
      <div className="flex items-center mb-5">
        <Image
          src="/images/star_wars_logo.png"
          alt="Star Wars Logo"
          width={80}
          height={50}
        />
      </div>
      <nav className=" space-x-5 text-xl font-star-wars">
       {renderLink()}
      </nav>
    </header>
  );
};

export default Header;

"use client";

import useCart from "@/lib/hooks/useCart";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="sticky shadow-md top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={180} height={150} />
        {/* <div className="text-3xl">

        <h1 className="font-extrabold hover:text-blue-500 ">ElectroElite Store</h1>
        </div> */}
      </Link>

      <div className="flex gap-4 font-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-blue-500  ${
            pathname === "/" && "text-blue-500"
          }`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-blue-500 ${
            pathname === "/wishlist" && "text-blue-500"
          }`}
        >
          Wishlist
        </Link>
        {/* <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-blue-500 ${
            pathname === "/orders" && "text-blue-500"
          }`}
        >
          Orders
        </Link> */}
        <Link
          href={user ? "/chatbot" : "/sign-in"}
          className={`hover:text-blue-500 ${
            pathname === "/chatbot" && "text-blue-500"
          }`}
        >
          ChatBot
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-blue-500" />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-blue-500 hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="font-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white font-bold lg:hidden">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-blue-500"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-blue-500 hover:text-white"
            >
              <ShoppingCart />
              <p className="font-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

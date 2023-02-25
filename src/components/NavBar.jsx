import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="relative bg-white shadow flex-shrink: 0">
      <div className="container px-6 py-2 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <Link href="/">
            <p className="w-24 text-xl font-semibold">
              ED <span className="text-blue-500">SURGE</span>
            </p>
          </Link>

          <div className="flex lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              {open && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}

              {!open && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="absolute text-sm inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
            <Link
              href="/"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2"
            >
              Home
            </Link>
            <Link
              href="/admin/login"
              className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2"
            >
              Admin Panel
            </Link>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span>Maruf Hosen</span>
            <Image
              width={500}
              height={500}
              className="object-cover w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import CashflowLogo from "../components/CashflowLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-expenses", label: "All Expenses" },
  { href: "/budget-alert", label: "Budget Alert" },
  { href: "/#features", label: "Features" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="w-full h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <CashflowLogo />
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">
              FinSight
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Finance & Insights
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg xl:text-xl font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/signin"
            className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl text-gray-700"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="flex flex-col px-6 py-5 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                {label}
              </Link>
            ))}

            <hr />

            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 py-3 text-center text-lg font-semibold text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
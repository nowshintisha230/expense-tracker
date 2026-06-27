import Link from "next/link";
import CashflowLogo from "../components/CashflowLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-expenses", label: "All Expenses" },
  { href: "/#reviews", label: "Review" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center px-2 sm:px-6 h-10 sm:h-14 border-b border-gray-200 bg-white gap-2 sm:gap-4">

      <Link href="/" className="flex items-center gap-1.5 font-medium text-sm shrink-0">
        <CashflowLogo size={28} />
        <div className="flex flex-col leading-tight">
          <div className="text-sm font-medium text-gray-900">
            Fin<em className="italic text-blue-500 font-normal">Sight</em>
          </div>
          <span className="hidden sm:inline text-[10px] text-gray-400 tracking-wide">Finance & Insights</span>
        </div>
      </Link>


      <div className="flex items-center flex-1 min-w-0 overflow-x-auto scrollbar-none">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-[10px] sm:text-sm px-1.5 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-gray-100 text-gray-600 whitespace-nowrap"
          >
            {label}
          </Link>
        ))}
      </div>


      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Link
          href="/signin"
          className="text-[10px] sm:text-sm px-1.5 sm:px-3 py-0.5 sm:py-1.5 border border-gray-300 rounded hover:bg-blue-100 whitespace-nowrap"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="text-[10px] sm:text-sm px-1.5 sm:px-3 py-0.5 sm:py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
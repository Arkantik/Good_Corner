import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function HeaderAdmin() {
  const navLinks = [
    { label: "Annonces", href: "/admin" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Tags", href: "/admin/tags" },
  ];

  return (
    <header className="flex flex-col justify-between h-full min-w-[200px] p-6 bg-slate-200">
      <div>
        <Link href={"/admin"}>
          <h1 className="text-xl mb-4">Admin TGC</h1>
        </Link>

        <div className="flex flex-col">
          {navLinks.map((l) => (
            <ActiveLink
              key={l.href}
              href={l.href}
              className="p-2 rounded-md"
              activeClassName="bg-slate-400"
            >
              {l.label}
            </ActiveLink>
          ))}
        </div>
      </div>
      <Link href="/" className="button link-button hover:bg-[#fff2df] duration-100">
        <p>The Good Corner</p>
        <ChevronDoubleRightIcon className="h-6 w-6 text-[#ffa41b] animate-pulse" />
      </Link>
    </header >
  );
}
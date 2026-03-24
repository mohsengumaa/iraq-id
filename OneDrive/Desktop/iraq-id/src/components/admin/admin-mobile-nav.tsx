"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "الرئيسية" },
  { href: "/admin/residents", label: "المستخدمون" },
  { href: "/admin/messages", label: "الرسائل" },
] as const;

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-[var(--rm-border)] bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-lg justify-around px-2 py-2">
        {links.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[4.5rem] flex-col items-center rounded-lg px-2 py-1 text-xs font-medium ${
                active
                  ? "text-[var(--rm-navy)]"
                  : "text-[var(--rm-muted)]"
              }`}
            >
              <span
                className={`mb-0.5 h-1 w-8 rounded-full ${
                  active ? "bg-[var(--rm-navy)]" : "bg-transparent"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/resident", label: "الرئيسية" },
  { href: "/resident/bills", label: "الفواتير" },
  { href: "/resident/dues", label: "العائدات" },
  { href: "/resident/maintenance", label: "الصيانة" },
  { href: "/resident/announcements", label: "الإعلانات" },
] as const;

export function ResidentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--rm-border)] bg-white/95 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur">
      <div className="mx-auto flex max-w-lg justify-between px-1">
        {links.map((item) => {
          const active =
            item.href === "/resident"
              ? pathname === "/resident"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center rounded-lg px-1 py-1.5 text-center ${
                active ? "text-[var(--rm-navy)]" : "text-[var(--rm-muted)]"
              }`}
            >
              <span className="text-[11px] font-semibold leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

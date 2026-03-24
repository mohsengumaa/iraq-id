"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/residents", label: "السكان والحسابات" },
  { href: "/admin/bills", label: "الفواتير" },
  { href: "/admin/dues", label: "العائدات الشهرية" },
  { href: "/admin/announcements", label: "الإعلانات" },
  { href: "/admin/messages", label: "الرسائل والإذاعة" },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-e border-[var(--rm-border)] bg-white md:flex">
      <div className="border-b border-[var(--rm-border)] px-4 py-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--rm-grey)]">
          لوحة الإدارة
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--rm-navy)]">
          مركز التحكم
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {links.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[var(--rm-navy)] text-white"
                  : "text-[var(--rm-navy)] hover:bg-[var(--rm-grey-light)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

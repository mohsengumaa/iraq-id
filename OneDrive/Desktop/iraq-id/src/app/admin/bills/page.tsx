import { AddBillForm } from "@/components/admin/add-bill-form";
import { AdminFlashAdded } from "@/components/admin/admin-flash";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

const categoryAr: Record<string, string> = {
  ELECTRICITY: "كهرباء",
  WATER: "ماء",
  GAS: "غاز",
  INTERNET: "إنترنت",
  OTHER: "أخرى",
};

export default async function AdminBillsPage() {
  const [residents, bills] = await Promise.all([
    prisma.user.findMany({
      where: { role: Role.RESIDENT },
      orderBy: { username: "asc" },
      select: { id: true, username: true },
    }),
    prisma.bill.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: { user: { select: { username: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <AdminFlashAdded />
      </Suspense>

      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">الفواتير</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          أضف فاتورة مع مرفق PDF أو صورة (حتى 8 ميجابايت).
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          إضافة فاتورة
        </h3>
        {residents.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">
            أضف ساكناً أولاً من صفحة السكان والحسابات.
          </p>
        ) : (
          <AddBillForm residents={residents} />
        )}
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          آخر الفواتير
        </h3>
        {bills.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">لا توجد فواتير بعد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-[var(--rm-border)] text-[var(--rm-muted)]">
                  <th className="py-2 pe-3 text-start font-medium">الساكن</th>
                  <th className="py-2 pe-3 text-start font-medium">البند</th>
                  <th className="py-2 pe-3 text-start font-medium">المبلغ</th>
                  <th className="py-2 text-start font-medium">مرفق</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b.id} className="border-b border-[var(--rm-border)]/80">
                    <td className="py-2 pe-3" dir="ltr">
                      {b.user.username}
                    </td>
                    <td className="py-2 pe-3">
                      <span className="text-[var(--foreground)]">{b.title}</span>
                      <span className="mt-0.5 block text-xs text-[var(--rm-muted)]">
                        {categoryAr[b.category] ?? b.category}
                      </span>
                    </td>
                    <td className="py-2 pe-3 tabular-nums" dir="ltr">
                      {Number(b.amount).toLocaleString("ar-IQ")}
                    </td>
                    <td className="py-2">
                      {b.attachmentUrl ? (
                        <Link
                          href={b.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--rm-navy)] underline"
                        >
                          عرض
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

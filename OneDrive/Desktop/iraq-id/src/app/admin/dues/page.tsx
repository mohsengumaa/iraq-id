import { AddMonthlyDueForm } from "@/components/admin/add-monthly-due-form";
import { AdminFlashAdded } from "@/components/admin/admin-flash";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Suspense } from "react";

export default async function AdminDuesPage() {
  const [residents, dues] = await Promise.all([
    prisma.user.findMany({
      where: { role: Role.RESIDENT },
      orderBy: { username: "asc" },
      select: { id: true, username: true },
    }),
    prisma.monthlyDue.findMany({
      orderBy: { dueDate: "desc" },
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
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">
          العائدات الشهرية
        </h2>
        <p className="text-sm text-[var(--rm-muted)]">
          تسجيل اشتراك أو عائد متكرر لكل وحدة.
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          إضافة عائد
        </h3>
        {residents.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">
            أضف ساكناً أولاً من صفحة السكان والحسابات.
          </p>
        ) : (
          <AddMonthlyDueForm residents={residents} />
        )}
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          آخر السجلات
        </h3>
        {dues.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">لا توجد عائدات بعد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <thead>
                <tr className="border-b border-[var(--rm-border)] text-[var(--rm-muted)]">
                  <th className="py-2 pe-3 text-start font-medium">الساكن</th>
                  <th className="py-2 pe-3 text-start font-medium">البند</th>
                  <th className="py-2 pe-3 text-start font-medium">الفترة</th>
                  <th className="py-2 text-start font-medium">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {dues.map((d) => (
                  <tr key={d.id} className="border-b border-[var(--rm-border)]/80">
                    <td className="py-2 pe-3" dir="ltr">
                      {d.user.username}
                    </td>
                    <td className="py-2 pe-3">{d.label}</td>
                    <td className="py-2 pe-3" dir="ltr">
                      {d.period}
                    </td>
                    <td className="py-2 tabular-nums" dir="ltr">
                      {Number(d.amount).toLocaleString("ar-IQ")}
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

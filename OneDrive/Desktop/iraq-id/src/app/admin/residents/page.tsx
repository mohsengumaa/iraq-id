import { AddResidentForm } from "@/components/admin/add-resident-form";
import { AdminFlashAdded } from "@/components/admin/admin-flash";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Suspense } from "react";

export default async function AdminResidentsPage() {
  const residents = await prisma.user.findMany({
    where: { role: Role.RESIDENT },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      subscriptionValidUntil: true,
    },
  });

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <AdminFlashAdded />
      </Suspense>

      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">
          السكان والحسابات
        </h2>
        <p className="text-sm text-[var(--rm-muted)]">
          إنشاء حسابات جديدة بدون تسجيل ذاتي. يمكن رفع الملفات من صفحات الفواتير
          والإعلانات.
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          إضافة ساكن
        </h3>
        <AddResidentForm />
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          قائمة السكان
        </h3>
        {residents.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">لا يوجد سكان بعد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-sm">
              <thead>
                <tr className="border-b border-[var(--rm-border)] text-[var(--rm-muted)]">
                  <th className="py-2 pe-4 text-start font-medium">المستخدم</th>
                  <th className="py-2 pe-4 text-start font-medium">الحالة</th>
                  <th className="py-2 text-start font-medium">الاشتراك حتى</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--rm-border)]/80">
                    <td className="py-2 pe-4">
                      <span className="font-medium text-[var(--foreground)]" dir="ltr">
                        {r.username}
                      </span>
                      {r.email && (
                        <span className="mt-0.5 block text-xs text-[var(--rm-muted)]" dir="ltr">
                          {r.email}
                        </span>
                      )}
                    </td>
                    <td className="py-2 pe-4">
                      {r.isActive ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-900">
                          نشط
                        </span>
                      ) : (
                        <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-800">
                          معطّل
                        </span>
                      )}
                    </td>
                    <td className="py-2 text-[var(--rm-muted)]">
                      {r.subscriptionValidUntil
                        ? r.subscriptionValidUntil.toLocaleDateString("ar-IQ")
                        : "—"}
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

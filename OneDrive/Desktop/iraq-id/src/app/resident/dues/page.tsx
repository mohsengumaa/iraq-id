import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function ResidentDuesPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const dues = await prisma.monthlyDue.findMany({
    where: { userId },
    orderBy: { dueDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">العائدات</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          الاشتراكات الشهرية وسجل المدفوعات.
        </p>
      </div>

      {dues.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--rm-border)] bg-white p-8 text-center text-sm text-[var(--rm-muted)]">
          لا توجد عائدات مسجّلة بعد.
        </div>
      ) : (
        <ul className="space-y-3">
          {dues.map((d) => (
            <li
              key={d.id}
              className="rounded-2xl border border-[var(--rm-border)] bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{d.label}</p>
                  <p className="text-xs text-[var(--rm-muted)]">
                    الفترة: <span dir="ltr">{d.period}</span> · الاستحقاق:{" "}
                    {d.dueDate.toLocaleDateString("ar-IQ")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    d.status === "PAID"
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {d.status === "PAID" ? "مدفوع" : "غير مدفوع"}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold tabular-nums text-[var(--rm-navy)]" dir="ltr">
                {Number(d.amount).toLocaleString("ar-IQ")} د.ع
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

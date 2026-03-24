import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const categoryAr: Record<string, string> = {
  ELECTRICITY: "كهرباء",
  WATER: "ماء",
  GAS: "غاز",
  INTERNET: "إنترنت",
  OTHER: "أخرى",
};

export default async function ResidentBillsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const bills = await prisma.bill.findMany({
    where: { userId },
    orderBy: { dueDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">الفواتير</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          الكهرباء، الماء، والخدمات الأخرى مع المرفقات.
        </p>
      </div>

      {bills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--rm-border)] bg-white p-8 text-center text-sm text-[var(--rm-muted)]">
          لا توجد فواتير مسجّلة بعد.
        </div>
      ) : (
        <ul className="space-y-3">
          {bills.map((b) => (
            <li
              key={b.id}
              className="rounded-2xl border border-[var(--rm-border)] bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{b.title}</p>
                  <p className="text-xs text-[var(--rm-muted)]">
                    {categoryAr[b.category] ?? b.category} · استحقاق{" "}
                    {b.dueDate.toLocaleDateString("ar-IQ")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    b.status === "PAID"
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {b.status === "PAID" ? "مدفوع" : "غير مدفوع"}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold tabular-nums text-[var(--rm-navy)]" dir="ltr">
                {Number(b.amount).toLocaleString("ar-IQ")} د.ع
              </p>
              {b.notes && (
                <p className="mt-2 text-sm text-[var(--rm-muted)]">{b.notes}</p>
              )}
              {b.attachmentUrl && (
                <Link
                  href={b.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded-lg border border-[var(--rm-border)] px-3 py-1.5 text-sm font-medium text-[var(--rm-navy)]"
                >
                  عرض المرفق
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

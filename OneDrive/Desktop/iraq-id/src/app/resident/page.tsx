import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import Link from "next/link";

export default async function ResidentHomePage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const [billAgg, dueAgg] = await Promise.all([
    prisma.bill.aggregate({
      where: { userId, status: PaymentStatus.UNPAID },
      _sum: { amount: true },
    }),
    prisma.monthlyDue.aggregate({
      where: { userId, status: PaymentStatus.UNPAID },
      _sum: { amount: true },
    }),
  ]);

  const billsDue = Number(billAgg._sum.amount ?? 0);
  const duesDue = Number(dueAgg._sum.amount ?? 0);
  const total = billsDue + duesDue;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-[var(--rm-grey)]">
          إجمالي المستحقات
        </p>
        <p className="mt-2 text-3xl font-semibold tabular-nums text-[var(--rm-navy)]">
          {formatMoney(total)}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-[var(--rm-surface)] px-3 py-2">
            <p className="text-xs text-[var(--rm-muted)]">الفواتير</p>
            <p className="font-semibold text-[var(--rm-navy)] tabular-nums">
              {formatMoney(billsDue)}
            </p>
          </div>
          <div className="rounded-xl bg-[var(--rm-surface)] px-3 py-2">
            <p className="text-xs text-[var(--rm-muted)]">العائدات</p>
            <p className="font-semibold text-[var(--rm-navy)] tabular-nums">
              {formatMoney(duesDue)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href="/resident/bills"
            className="flex-1 rounded-lg bg-[var(--rm-navy)] py-2 text-center text-sm font-semibold text-white"
          >
            الفواتير
          </Link>
          <Link
            href="/resident/dues"
            className="flex-1 rounded-lg border border-[var(--rm-border)] py-2 text-center text-sm font-semibold text-[var(--rm-navy)]"
          >
            العائدات
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-[var(--rm-navy)]">
          مستجدات المبنى
        </h2>
        <p className="mt-2 text-sm text-[var(--rm-muted)]">
          الإعلانات وطلبات الصيانة ستظهر هنا.
        </p>
      </section>
    </div>
  );
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("ar-IQ", {
    style: "currency",
    currency: "IQD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}

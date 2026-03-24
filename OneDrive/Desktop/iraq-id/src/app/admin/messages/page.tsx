import { BroadcastForm } from "@/components/admin/broadcast-form";
import { AdminFlashSent } from "@/components/admin/admin-flash";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function AdminMessagesPage() {
  const recent = await prisma.broadcastMessage.findMany({
    orderBy: { sentAt: "desc" },
    take: 15,
    include: { sentBy: { select: { username: true } } },
  });

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <AdminFlashSent />
      </Suspense>

      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">
          الرسائل والإذاعة
        </h2>
        <p className="text-sm text-[var(--rm-muted)]">
          حفظ رسالة جماعية في السجل (ربط الإشعارات الفورية لاحقاً).
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          إرسال للجميع
        </h3>
        <BroadcastForm />
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          السجل الأخير
        </h3>
        {recent.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">لا توجد رسائل بعد.</p>
        ) : (
          <ul className="space-y-3">
            {recent.map((m) => (
              <li
                key={m.id}
                className="rounded-xl border border-[var(--rm-border)] bg-[var(--rm-surface)] p-4"
              >
                <p className="font-semibold text-[var(--foreground)]">{m.title}</p>
                <p className="mt-1 text-sm text-[var(--rm-muted)]">{m.body}</p>
                <p className="mt-2 text-xs text-[var(--rm-muted)]">
                  {m.sentAt.toLocaleString("ar-IQ")} ·{" "}
                  <span dir="ltr">{m.sentBy.username}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

import { AddAnnouncementForm } from "@/components/admin/add-announcement-form";
import { AdminFlashAdded } from "@/components/admin/admin-flash";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Suspense } from "react";

export default async function AdminAnnouncementsPage() {
  const items = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
    take: 15,
    include: { createdBy: { select: { username: true } } },
  });

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <AdminFlashAdded />
      </Suspense>

      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">الإعلانات</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          نشر نص مع صورة اختيارية؛ تُخزّن الصور تحت{" "}
          <code className="rounded bg-[var(--rm-grey-light)] px-1 text-xs" dir="ltr">
            /uploads/announcements
          </code>
          .
        </p>
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          إعلان جديد
        </h3>
        <AddAnnouncementForm />
      </section>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-[var(--rm-navy)]">
          المنشورات الأخيرة
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-[var(--rm-muted)]">لا توجد إعلانات بعد.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((a) => (
              <li
                key={a.id}
                className="border-b border-[var(--rm-border)] pb-4 last:border-0 last:pb-0"
              >
                <p className="font-semibold text-[var(--foreground)]">{a.title}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--rm-muted)]">
                  {a.body}
                </p>
                {a.imageUrl && (
                  <Image
                    src={a.imageUrl}
                    alt=""
                    width={800}
                    height={400}
                    unoptimized
                    className="mt-3 h-auto max-h-48 w-auto max-w-full rounded-lg border border-[var(--rm-border)] object-contain"
                  />
                )}
                <p className="mt-2 text-xs text-[var(--rm-muted)]">
                  {a.publishedAt.toLocaleString("ar-IQ")} · بواسطة{" "}
                  <span dir="ltr">{a.createdBy.username}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

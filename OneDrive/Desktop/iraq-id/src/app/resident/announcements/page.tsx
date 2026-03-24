import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ResidentAnnouncementsPage() {
  const items = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">الإعلانات</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          التعاميم والأخبار الرسمية من الإدارة.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--rm-border)] bg-white p-8 text-center text-sm text-[var(--rm-muted)]">
          لا توجد إعلانات بعد.
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-[var(--rm-border)] bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-[var(--foreground)]">{a.title}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[var(--rm-muted)]">
                {a.body}
              </p>
              {a.imageUrl && (
                <Image
                  src={a.imageUrl}
                  alt=""
                  width={800}
                  height={450}
                  unoptimized
                  className="mt-3 h-auto max-h-56 w-full rounded-lg border border-[var(--rm-border)] object-contain"
                />
              )}
              <p className="mt-3 text-xs text-[var(--rm-muted)]">
                {a.publishedAt.toLocaleString("ar-IQ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

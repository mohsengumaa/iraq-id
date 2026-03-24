import Link from "next/link";

export default function SuspendedPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md rounded-2xl border border-[var(--rm-border)] bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-[var(--rm-navy)]">
          الحساب غير مفعّل
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--rm-muted)]">
          الاشتراك الشهري غير محدّث أو تم تعطيل حسابك. يرجى مراجعة إدارة العقار
          لاستعادة الوصول.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-lg bg-[var(--rm-navy)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)]"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
}

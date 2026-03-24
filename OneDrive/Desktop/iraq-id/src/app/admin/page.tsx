import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--rm-navy)]">نظرة عامة</h2>
        <p className="text-sm text-[var(--rm-muted)]">
          إنشاء حسابات السكان، نشر الإعلانات، وإرسال الرسائل الجماعية.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="السكان"
          value="—"
          hint="الوحدات النشطة"
          href="/admin/residents"
        />
        <DashboardCard
          title="فواتير غير مسددة"
          value="—"
          hint="خدمات المرافق"
          href="/admin/bills"
        />
        <DashboardCard
          title="الإذاعات"
          value="—"
          hint="الرسائل الجماعية"
          href="/admin/messages"
        />
      </div>

      <section className="rounded-2xl border border-[var(--rm-border)] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[var(--rm-navy)]">
          إجراءات سريعة
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          <QuickAction href="/admin/residents">إضافة حساب ساكن</QuickAction>
          <QuickAction href="/admin/announcements">إعلان جديد</QuickAction>
          <QuickAction href="/admin/messages">إرسال رسالة للجميع</QuickAction>
        </ul>
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  hint,
  href,
}: {
  title: string;
  value: string;
  hint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-[var(--rm-border)] bg-white p-4 shadow-sm transition hover:border-[var(--rm-navy)]"
    >
      <p className="text-xs font-medium tracking-wide text-[var(--rm-grey)]">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[var(--rm-navy)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--rm-muted)]">{hint}</p>
    </Link>
  );
}

function QuickAction({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[var(--rm-border)] bg-[var(--rm-surface)] px-3 py-1.5 font-medium text-[var(--rm-navy)] hover:bg-[var(--rm-grey-light)]"
    >
      {children}
    </Link>
  );
}

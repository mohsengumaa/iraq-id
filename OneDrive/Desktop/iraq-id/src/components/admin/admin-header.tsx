import { auth } from "@/auth";
import { SignOutForm } from "@/components/shared/sign-out-form";

export async function AdminHeader() {
  const session = await auth();
  const name = session?.user?.name ?? "مدير";

  return (
    <header className="flex items-center justify-between border-b border-[var(--rm-border)] bg-white px-4 py-3 md:px-6">
      <div>
        <h1 className="text-base font-semibold text-[var(--rm-navy)] md:text-lg">
          إدارة المجمع السكني
        </h1>
        <p className="text-xs text-[var(--rm-muted)]">
          مسجّل الدخول كـ <span className="font-medium">{name}</span>
        </p>
      </div>
      <SignOutForm />
    </header>
  );
}

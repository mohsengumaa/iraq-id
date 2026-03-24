import { auth } from "@/auth";
import { SignOutForm } from "@/components/shared/sign-out-form";

export async function ResidentHeader() {
  const session = await auth();
  const name = session?.user?.name ?? "ساكن";

  return (
    <header className="flex items-center justify-between border-b border-[var(--rm-border)] bg-white px-4 py-3">
      <div>
        <p className="text-xs font-semibold tracking-wide text-[var(--rm-grey)]">
          منزلي
        </p>
        <p className="text-sm font-semibold text-[var(--rm-navy)]">{name}</p>
      </div>
      <SignOutForm />
    </header>
  );
}

import { signOut } from "@/auth";

export function SignOutForm({ label = "تسجيل الخروج" }: { label?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-[var(--rm-border)] px-3 py-1.5 text-sm font-medium text-[var(--rm-navy)] hover:bg-[var(--rm-grey-light)]"
      >
        {label}
      </button>
    </form>
  );
}

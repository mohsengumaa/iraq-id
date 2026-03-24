"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";
  const errorParam = searchParams.get("error");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setPending(false);

    if (res?.error) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة.");
      return;
    }

    let dest =
      callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : null;
    if (!dest) {
      const session = await getSession();
      dest =
        session?.user?.role === "ADMIN" ? "/admin" : "/resident";
    }
    router.replace(dest);
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-[var(--rm-border)] bg-white p-8 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--rm-navy)]">
          تسجيل الدخول
        </h1>
        <p className="text-sm text-[var(--rm-muted)]">
          يتم إنشاء الحسابات من قِبل إدارة العقار فقط، ولا يتوفر التسجيل الذاتي.
        </p>
      </div>

      {(error || errorParam) && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {error ?? "تعذّر تسجيل الدخول."}
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm font-medium text-[var(--rm-navy)]">
        اسم المستخدم
        <input
          name="username"
          dir="ltr"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-[var(--rm-border)] px-3 py-2 text-start text-base font-normal outline-none ring-[var(--rm-accent)] focus:ring-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[var(--rm-navy)]">
        كلمة المرور
        <input
          name="password"
          dir="ltr"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-[var(--rm-border)] px-3 py-2 text-start text-base font-normal outline-none ring-[var(--rm-accent)] focus:ring-2"
          required
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-[var(--rm-navy)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري تسجيل الدخول…" : "متابعة"}
      </button>
    </form>
  );
}

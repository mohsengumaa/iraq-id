"use client";

import { createResident, type ActionState } from "@/app/admin/actions";
import { useActionState } from "react";

const initial: ActionState = null;

const field =
  "mt-1 w-full rounded-lg border border-[var(--rm-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--rm-accent)] focus:ring-2";

export function AddResidentForm() {
  const [state, formAction, pending] = useActionState(createResident, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          اسم المستخدم
        </label>
        <input name="username" required className={field} dir="ltr" autoComplete="off" />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          كلمة المرور
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className={field}
          dir="ltr"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          البريد (اختياري)
        </label>
        <input name="email" type="email" className={field} dir="ltr" />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          مدة الاشتراك بالأشهر
        </label>
        <input
          name="subscriptionMonths"
          type="number"
          min={1}
          max={120}
          defaultValue={12}
          className={field}
          dir="ltr"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--rm-navy)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري الحفظ…" : "إنشاء الحساب"}
      </button>
    </form>
  );
}

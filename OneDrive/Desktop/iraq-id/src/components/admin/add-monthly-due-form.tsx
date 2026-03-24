"use client";

import { createMonthlyDue, type ActionState } from "@/app/admin/actions";
import type { User } from "@prisma/client";
import { useActionState } from "react";

const initial: ActionState = null;

const field =
  "mt-1 w-full rounded-lg border border-[var(--rm-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--rm-accent)] focus:ring-2";

export function AddMonthlyDueForm({ residents }: { residents: Pick<User, "id" | "username">[] }) {
  const [state, formAction, pending] = useActionState(createMonthlyDue, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">الساكن</label>
        <select name="userId" required className={field}>
          <option value="">— اختر —</option>
          {residents.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">البند</label>
        <input name="label" required placeholder="مثال: عائدات صيانة" className={field} />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">الفترة</label>
        <input name="period" required placeholder="مثال: 2026-03" className={field} dir="ltr" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-[var(--foreground)]">المبلغ (د.ع)</label>
          <input name="amount" type="number" step="0.01" min="0" required className={field} dir="ltr" />
        </div>
        <div>
          <label className="text-sm font-medium text-[var(--foreground)]">تاريخ الاستحقاق</label>
          <input name="dueDate" type="date" required className={field} dir="ltr" />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--rm-navy)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري الحفظ…" : "إضافة عائد"}
      </button>
    </form>
  );
}

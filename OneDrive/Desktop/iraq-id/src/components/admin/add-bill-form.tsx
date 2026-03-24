"use client";

import { createBill, type ActionState } from "@/app/admin/actions";
import type { User } from "@prisma/client";
import { useActionState } from "react";

const initial: ActionState = null;

const field =
  "mt-1 w-full rounded-lg border border-[var(--rm-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--rm-accent)] focus:ring-2";

const categories: { value: string; label: string }[] = [
  { value: "ELECTRICITY", label: "كهرباء" },
  { value: "WATER", label: "ماء" },
  { value: "GAS", label: "غاز" },
  { value: "INTERNET", label: "إنترنت" },
  { value: "OTHER", label: "أخرى" },
];

export function AddBillForm({ residents }: { residents: Pick<User, "id" | "username">[] }) {
  const [state, formAction, pending] = useActionState(createBill, initial);

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
        <label className="text-sm font-medium text-[var(--foreground)]">التصنيف</label>
        <select name="category" required className={field}>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">العنوان</label>
        <input name="title" required className={field} />
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

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          مرفق (PDF أو صورة)
        </label>
        <input
          name="attachment"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="mt-1 block w-full text-sm text-[var(--rm-muted)] file:me-3 file:rounded-lg file:border-0 file:bg-[var(--rm-grey-light)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--rm-navy)]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">ملاحظات</label>
        <textarea name="notes" rows={2} className={field} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--rm-navy)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري الحفظ…" : "إضافة الفاتورة"}
      </button>
    </form>
  );
}

"use client";

import { sendBroadcast, type ActionState } from "@/app/admin/actions";
import { useActionState } from "react";

const initial: ActionState = null;

const field =
  "mt-1 w-full rounded-lg border border-[var(--rm-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--rm-accent)] focus:ring-2";

export function BroadcastForm() {
  const [state, formAction, pending] = useActionState(sendBroadcast, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">عنوان الرسالة</label>
        <input name="title" required className={field} />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">نص الرسالة</label>
        <textarea name="body" required rows={5} className={field} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--rm-navy)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري الإرسال…" : "إرسال للجميع"}
      </button>
    </form>
  );
}

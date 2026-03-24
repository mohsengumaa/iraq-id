"use client";

import { createAnnouncement, type ActionState } from "@/app/admin/actions";
import { useActionState } from "react";

const initial: ActionState = null;

const field =
  "mt-1 w-full rounded-lg border border-[var(--rm-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--rm-accent)] focus:ring-2";

export function AddAnnouncementForm() {
  const [state, formAction, pending] = useActionState(createAnnouncement, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">العنوان</label>
        <input name="title" required className={field} />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">النص</label>
        <textarea name="body" required rows={5} className={field} />
      </div>

      <div>
        <label className="text-sm font-medium text-[var(--foreground)]">
          صورة للإعلان (اختياري)
        </label>
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mt-1 block w-full text-sm text-[var(--rm-muted)] file:me-3 file:rounded-lg file:border-0 file:bg-[var(--rm-grey-light)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--rm-navy)]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[var(--rm-navy)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--rm-navy-soft)] disabled:opacity-60"
      >
        {pending ? "جاري النشر…" : "نشر الإعلان"}
      </button>
    </form>
  );
}

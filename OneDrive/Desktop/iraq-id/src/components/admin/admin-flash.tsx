"use client";

import { useSearchParams } from "next/navigation";

const box =
  "mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900";

export function AdminFlashAdded() {
  const q = useSearchParams();
  if (q.get("added") !== "1") return null;
  return <p className={box}>تم الحفظ بنجاح.</p>;
}

export function AdminFlashSent() {
  const q = useSearchParams();
  if (q.get("sent") !== "1") return null;
  return <p className={box}>تم إرسال الرسالة إلى جميع السكان (سجلّ داخلي).</p>;
}

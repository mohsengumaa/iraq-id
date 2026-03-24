export default function ResidentMaintenancePage() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-[var(--rm-navy)]">الصيانة</h2>
      <p className="text-sm text-[var(--rm-muted)]">
        تقديم الطلبات ومتابعة الحالة (مفتوح → قيد التنفيذ → مكتمل).
      </p>
      <div className="mt-6 rounded-2xl border border-dashed border-[var(--rm-border)] bg-white p-8 text-center text-sm text-[var(--rm-muted)]">
        نموذج الطلب وقائمة التذاكر ستظهر هنا.
      </div>
    </div>
  );
}

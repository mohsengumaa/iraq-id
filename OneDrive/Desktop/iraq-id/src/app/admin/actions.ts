"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadFile } from "@/lib/upload";
import { BillCategory, PaymentStatus, Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = { error?: string } | null;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return null;
  }
  return session;
}

export async function createResident(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();
  if (!session) return { error: "غير مصرّح." };

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const emailRaw = String(formData.get("email") ?? "").trim();
  const email = emailRaw ? emailRaw : null;
  const months = Number(formData.get("subscriptionMonths") ?? 12);

  if (username.length < 2) {
    return { error: "اسم المستخدم قصير جداً." };
  }
  if (password.length < 6) {
    return { error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل." };
  }

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return { error: "اسم المستخدم مستخدم مسبقاً." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const subscriptionValidUntil = new Date();
  subscriptionValidUntil.setMonth(subscriptionValidUntil.getMonth() + months);

  await prisma.user.create({
    data: {
      username,
      passwordHash,
      email,
      role: Role.RESIDENT,
      isActive: true,
      subscriptionValidUntil,
    },
  });

  revalidatePath("/admin/residents");
  redirect("/admin/residents?added=1");
}

export async function createBill(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();
  if (!session) return { error: "غير مصرّح." };

  const userId = String(formData.get("userId") ?? "");
  const category = String(formData.get("category") ?? "") as BillCategory;
  const title = String(formData.get("title") ?? "").trim();
  const amountStr = String(formData.get("amount") ?? "");
  const dueRaw = String(formData.get("dueDate") ?? "");
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const file = formData.get("attachment") as File | null;

  if (!userId || !title || !amountStr || !dueRaw) {
    return { error: "يرجى تعبئة الحقول المطلوبة." };
  }
  if (!Object.values(BillCategory).includes(category)) {
    return { error: "تصنيف غير صالح." };
  }

  const dueDate = new Date(dueRaw);
  if (Number.isNaN(dueDate.getTime())) {
    return { error: "تاريخ غير صالح." };
  }

  let attachmentUrl: string | null = null;
  if (file && file.size > 0) {
    try {
      attachmentUrl = await saveUploadFile(file, "bills");
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "فشل رفع الملف.",
      };
    }
  }

  await prisma.bill.create({
    data: {
      userId,
      category,
      title,
      amount: new Prisma.Decimal(amountStr),
      dueDate,
      status: PaymentStatus.UNPAID,
      attachmentUrl,
      notes,
    },
  });

  revalidatePath("/admin/bills");
  revalidatePath("/resident/bills");
  redirect("/admin/bills?added=1");
}

export async function createAnnouncement(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();
  if (!session?.user?.id) return { error: "غير مصرّح." };

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const file = formData.get("image") as File | null;

  if (!title || !body) {
    return { error: "العنوان والنص مطلوبان." };
  }

  let imageUrl: string | null = null;
  if (file && file.size > 0) {
    try {
      imageUrl = await saveUploadFile(file, "announcements");
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "فشل رفع الصورة.",
      };
    }
  }

  await prisma.announcement.create({
    data: {
      title,
      body,
      imageUrl,
      createdById: session.user.id,
    },
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/resident/announcements");
  redirect("/admin/announcements?added=1");
}

export async function createMonthlyDue(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();
  if (!session) return { error: "غير مصرّح." };

  const userId = String(formData.get("userId") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const amountStr = String(formData.get("amount") ?? "");
  const period = String(formData.get("period") ?? "").trim();
  const dueRaw = String(formData.get("dueDate") ?? "");

  if (!userId || !label || !amountStr || !period || !dueRaw) {
    return { error: "يرجى تعبئة جميع الحقول." };
  }

  const dueDate = new Date(dueRaw);
  if (Number.isNaN(dueDate.getTime())) {
    return { error: "تاريخ غير صالح." };
  }

  await prisma.monthlyDue.create({
    data: {
      userId,
      label,
      amount: new Prisma.Decimal(amountStr),
      period,
      dueDate,
      status: PaymentStatus.UNPAID,
    },
  });

  revalidatePath("/admin/dues");
  revalidatePath("/resident/dues");
  redirect("/admin/dues?added=1");
}

export async function sendBroadcast(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();
  if (!session?.user?.id) return { error: "غير مصرّح." };

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !body) {
    return { error: "العنوان والنص مطلوبان." };
  }

  await prisma.broadcastMessage.create({
    data: {
      title,
      body,
      sentById: session.user.id,
      targetAll: true,
    },
  });

  revalidatePath("/admin/messages");
  redirect("/admin/messages?sent=1");
}

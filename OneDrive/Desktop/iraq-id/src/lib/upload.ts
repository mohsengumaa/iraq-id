import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export async function saveUploadFile(
  file: File,
  subfolder: "bills" | "announcements",
): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("لم يُرفع ملف.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("حجم الملف يتجاوز 8 ميجابايت.");
  }
  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_MIME.has(mime)) {
    throw new Error("يُسمح بصور (JPG, PNG, Webp) أو PDF فقط.");
  }

  const orig = file.name || "file";
  const ext = path.extname(orig).slice(0, 12) || ".bin";
  const safeExt = ext.match(/^\.[a-z0-9]+$/i) ? ext : ".bin";
  const name = `${randomUUID()}${safeExt}`;

  const dir = path.join(process.cwd(), "public", "uploads", subfolder);
  await mkdir(dir, { recursive: true });

  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), buf);

  return `/uploads/${subfolder}/${name}`;
}

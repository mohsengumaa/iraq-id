import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: { passwordHash, isActive: true },
    create: {
      username: "admin",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  const residentHash = await bcrypt.hash("Resident123!", 12);
  await prisma.user.upsert({
    where: { username: "resident_demo" },
    update: { passwordHash: residentHash, isActive: true },
    create: {
      username: "resident_demo",
      passwordHash: residentHash,
      role: "RESIDENT",
      isActive: true,
      subscriptionValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

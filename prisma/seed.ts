import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma  = new PrismaClient({ adapter });

async function main() {
  const email    = process.env.ADMIN_EMAIL    ?? "admin@jeevanasrihospitals.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@12345";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.adminUser.create({ data: { email, password: hashed, name: "Super Admin" } });
  console.log(`✓ Admin created: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

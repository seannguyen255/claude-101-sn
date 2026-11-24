import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

const categories = [
  { name: "Ăn uống", icon: "Utensils" },
  { name: "Di chuyển", icon: "Car" },
  { name: "Mua sắm", icon: "ShoppingCart" },
  { name: "Nhà ở", icon: "Home" },
  { name: "Hóa đơn", icon: "Receipt" },
  { name: "Giải trí", icon: "Clapperboard" },
  { name: "Sức khỏe", icon: "HeartPulse" },
  { name: "Giáo dục", icon: "GraduationCap" },
  { name: "Khác", icon: "MoreHorizontal" },
];

async function main() {
  await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: { email: "demo@example.com", name: "Demo User" },
  });

  for (const c of categories) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: { icon: c.icon },
      create: c,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

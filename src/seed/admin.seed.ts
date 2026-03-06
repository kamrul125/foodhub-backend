import bcrypt from "bcrypt";
import prisma from "../config/prisma";

async function seedAdmin() {
  try {
    const adminEmail = "admin2@foodhub.com";

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("🎉 Admin created successfully");
    console.log({
      email: admin.email,
      password: "admin123",
      role: admin.role,
    });
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
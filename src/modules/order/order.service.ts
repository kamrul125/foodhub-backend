import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ১. নতুন অর্ডার তৈরি করার ফাংশন
export const createOrder = async (userId: number, foodIds: number[]) => {
  // খাবারগুলোর দাম বের করা (টোটাল অ্যামাউন্ট ক্যালকুলেট করতে)
  const selectedFoods = await prisma.food.findMany({
    where: { id: { in: foodIds.map(id => Number(id)) } }
  });
  
  const total = selectedFoods.reduce((sum, food) => sum + food.price, 0);

  // অর্ডার তৈরি
  return await prisma.order.create({
    data: {
      userId: Number(userId),
      status: "PENDING",
      totalAmount: total,
      foods: {
        connect: foodIds.map((id) => ({ id: Number(id) })),
      },
    },
    include: { foods: true }
  });
};

// ২. নির্দিষ্ট ইউজারের নিজের অর্ডারগুলো দেখার ফাংশন
export const getMyOrders = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: { foods: true },
    orderBy: { createdAt: "desc" }
  });
};

// ✅ ৩. অ্যাডমিনদের জন্য সব ইউজারের সব অর্ডার দেখার ফাংশন (নতুন যোগ করা)
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      foods: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOrder = async (userId: number, foodIds: number[]) => {
  const selectedFoods = await prisma.food.findMany({
    where: { id: { in: foodIds.map(id => Number(id)) } }
  });
  
  const total = selectedFoods.reduce((sum, food) => sum + food.price, 0);

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

export const getMyOrders = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: { foods: true },
    orderBy: { createdAt: "desc" }
  });
};

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      foods: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// ✅ নতুন যোগ করা: স্ট্যাটাস আপডেট লজিক
export const updateOrderStatus = async (orderId: number, status: string) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
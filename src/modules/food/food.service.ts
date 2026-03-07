import prisma from "../../config/prisma";

// ১. Create Food
export const createFood = async (sellerId: number, title: string, price: number) => {
  if (!title || !price) {
    throw new Error("Title and price are required");
  }
  return prisma.food.create({
    data: {
      title,
      price: Number(price),
      sellerId,
    },
  });
};

// ২. Get All Foods
export const getAllFoods = async () => {
  return prisma.food.findMany({
    include: {
      seller: {
        select: { id: true, name: true, email: true },
      },
    },
  });
};

// ৩. Update Food (FIXED)
export const updateFood = async (
  foodId: number,
  sellerId: number,
  data: { title?: string; price?: number }
) => {
  // ডাটাবেস থেকে আগে খাবারটি খুঁজে বের করা
  const food = await prisma.food.findUnique({
    where: { id: Number(foodId) },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  // ওনারশিপ চেক: যে সেলার তৈরি করেছে সেই কি আপডেট করছে?
  if (food.sellerId !== sellerId) {
    throw new Error("You are not authorized to update this food");
  }

  // শুধুমাত্র title এবং price আপডেট করা (Prisma-তে id পাঠানো যাবে না)
  return prisma.food.update({
    where: { id: Number(foodId) },
    data: {
      title: data.title || food.title,
      price: data.price ? Number(data.price) : food.price,
    },
  });
};

// ৪. Delete Food
export const deleteFood = async (foodId: number, sellerId: number) => {
  const food = await prisma.food.findUnique({
    where: { id: Number(foodId) },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  if (food.sellerId !== sellerId) {
    throw new Error("You are not allowed to delete this food");
  }

  return prisma.food.delete({
    where: { id: Number(foodId) },
  });
};
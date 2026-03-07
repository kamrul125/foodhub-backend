import prisma from "../../config/prisma";

// Create Food (SELLER)
export const createFood = async (
  sellerId: number,
  title: string,
  price: number
) => {
  if (!title || !price) {
    throw new Error("title and price are required");
  }

  return prisma.food.create({
    data: {
      title,
      price: Number(price), // নিশ্চিত করা হচ্ছে এটি সংখ্যা
      sellerId,
    },
  });
};

// Get All Foods (Public)
export const getAllFoods = async () => {
  return prisma.food.findMany({
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

// Update Food (SELLER – own food only)
export const updateFood = async (
  foodId: number,
  sellerId: number,
  data: { title?: string; price?: number }
) => {
  // ১. খাবারটি ডাটাবেসে আছে কি না এবং এটি এই সেলারের কি না তা চেক করা
  const food = await prisma.food.findUnique({
    where: { id: foodId },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  if (food.sellerId !== sellerId) {
    throw new Error("You are not allowed to update this food");
  }

  // ২. শুধুমাত্র title এবং price ফিল্ড দুটি নিয়ে আপডেট করা
  // এতে data অবজেক্টে অন্য কোনো আজেবাজে ফিল্ড থাকলেও এরর আসবে না
  const updatePayload: any = {};
  if (data.title) updatePayload.title = data.title;
  if (data.price) updatePayload.price = Number(data.price);

  return prisma.food.update({
    where: { id: foodId },
    data: updatePayload,
  });
};

// Delete Food (SELLER – own food only)
export const deleteFood = async (foodId: number, sellerId: number) => {
  const food = await prisma.food.findUnique({
    where: { id: foodId },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  if (food.sellerId !== sellerId) {
    throw new Error("You are not allowed to delete this food");
  }

  return prisma.food.delete({
    where: { id: foodId },
  });
};
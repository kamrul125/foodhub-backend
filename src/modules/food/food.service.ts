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
      price,
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
  const food = await prisma.food.findUnique({
    where: { id: foodId },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  if (food.sellerId !== sellerId) {
    throw new Error("You are not allowed to update this food");
  }

  return prisma.food.update({
    where: { id: foodId },
    data,
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
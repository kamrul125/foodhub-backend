import prisma from "../../config/prisma";

// ১. Create Food (SELLER)
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
      price: Number(price),
      sellerId,
    },
  });
};

// ২. Get All Foods (Public)
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

// ৩. Update Food (SELLER – own food only)
export const updateFood = async (
  foodId: number,
  sellerId: number,
  data: { title?: string; price?: number }
) => {
  // ডাটাবেসে খাবারটি আছে কি না চেক করা
  const food = await prisma.food.findUnique({
    where: { id: foodId },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  // চেক করা যে এই খাবারটি এই সেলারের কি না
  if (food.sellerId !== sellerId) {
    throw new Error("You are not allowed to update this food");
  }

  // গুরুত্বপূর্ণ: শুধু title এবং price কে আলাদা করে নেওয়া
  // এতে ফ্রন্টএন্ড থেকে id বা অন্য কিছু আসলেও প্রিজমা এরর দিবে না
  const updateData: any = {};
  if (data.title) updateData.title = data.title;
  if (data.price) updateData.price = Number(data.price);

  return prisma.food.update({
    where: { id: foodId },
    data: updateData,
  });
};

// ৪. Delete Food (SELLER – own food only)
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
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
      sellerId: Number(sellerId), // নিশ্চিত করা হচ্ছে এটি নাম্বার
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

// ৩. Get Single Food by ID (এডিট পেজের জন্য প্রয়োজন)
export const getFoodById = async (id: number) => {
  return prisma.food.findUnique({
    where: { id: Number(id) },
  });
};

// ৪. Update Food (FIXED WITH TYPE CHECKING)
export const updateFood = async (
  foodId: number,
  sellerId: number,
  data: { title?: string; price?: number }
) => {
  // ডাটাবেস থেকে খাবারটি খুঁজে বের করা
  const food = await prisma.food.findUnique({
    where: { id: Number(foodId) },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  // ডিবাগিং: যদি আবার এরর আসে, আপনার ব্যাকএন্ড টার্মিনালে এই দুটি মান চেক করুন
  console.log(`Comparing IDs -> DB: ${food.sellerId} (${typeof food.sellerId}), Token: ${sellerId} (${typeof sellerId})`);

  // ওনারশিপ চেক: টাইপ মিসম্যাচ এড়াতে উভয়কে Number এ রূপান্তর করা হয়েছে
  if (Number(food.sellerId) !== Number(sellerId)) {
    throw new Error("You are not authorized to update this food");
  }

  // ডাটা আপডেট করা
  return prisma.food.update({
    where: { id: Number(foodId) },
    data: {
      title: data.title || food.title,
      price: data.price ? Number(data.price) : food.price,
    },
  });
};

// ৫. Delete Food (FIXED WITH TYPE CHECKING)
export const deleteFood = async (foodId: number, sellerId: number) => {
  const food = await prisma.food.findUnique({
    where: { id: Number(foodId) },
  });

  if (!food) {
    throw new Error("Food not found");
  }

  // ডিলিট করার আগেও ওনারশিপ চেক
  if (Number(food.sellerId) !== Number(sellerId)) {
    throw new Error("You are not allowed to delete this food");
  }

  return prisma.food.delete({
    where: { id: Number(foodId) },
  });
};
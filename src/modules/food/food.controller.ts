import { Request, Response } from "express";
import * as foodService from "./food.service";

// Create Food
export const createFood = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const { title, price } = req.body;

    const food = await foodService.createFood(
      req.user.id,
      title,
      price
    );

    res.status(201).json(food);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create food",
    });
  }
};

// Get All Foods (Public)
export const getAllFoods = async (_req: Request, res: Response) => {
  try {
    const foods = await foodService.getAllFoods();
    res.json(foods);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to fetch foods",
    });
  }
};

// Update Food
export const updateFood = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const foodId = Number(req.params.id);

    const food = await foodService.updateFood(
      foodId,
      req.user.id,
      req.body
    );

    res.json(food);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to update food",
    });
  }
};

// Delete Food
export const deleteFood = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    const foodId = Number(req.params.id);

    await foodService.deleteFood(foodId, req.user.id);

    res.json({ message: "Food deleted successfully" });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to delete food",
    });
  }
};
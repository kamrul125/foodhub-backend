import { Request, Response } from "express";
import * as orderService from "./order.service";

export const createOrder = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { foodIds } = req.body;
    const order = await orderService.createOrder(req.user.id, foodIds);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const myOrders = async (req: Request & { user?: any }, res: Response) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const allOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ নতুন যোগ করা: অ্যাডমিন স্ট্যাটাস আপডেট করার কন্ট্রোলার
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(Number(id), status);
    res.json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
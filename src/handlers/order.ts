import express, { Request, Response } from "express";
import { Order, Orders } from "../models/order";

const order = new Orders();

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await order.getAllOrders();
  res.json(orders);
};
const showOrderById = async (req: Request, res: Response) => {
  const orderById = await order.showOrderById(req.params.id);
  res.json(orderById);
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const createdOrder = await order.createOrder(newOrder);
    res.json(createdOrder);
  } catch (err) {
    res.json(`Could not create order ${err} `);
  }
};
const deleteOrderById = async (req: Request, res: Response) => {
  const deleted = await order.deleteOrderById(req.params.id);
  res.json(deleted);
};
const orderRoutes = (app: express.Application) => {
  app.get("/orders", getAllOrders);
  app.get("/orders/:id", showOrderById);
  app.post("/orders", createOrder);
  app.delete("/orders/:id", deleteOrderById);
};
export default orderRoutes;

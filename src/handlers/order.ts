import express, { Request, Response } from "express";
import { Order, Orders } from "../models/order";
import jwt from "jsonwebtoken";
const order = new Orders();

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await order.getAllOrders();
  res.json(orders);
};
const showOrderById = async (req: Request, res: Response) => {
  const orderById = await order.showOrderById(req.params.id);
  res.json(orderById);
};

const updateOrderById = async (req: Request, res: Response) => {
  try {
    const updateOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    try {
      jwt.verify(req.body.token, process.env.JWT!);
    } catch (err) {
      res.status(401);
      res.json("Invalid token");
      return;
    }
    const updatedOrder = await order.updateOrderById(
      updateOrder,
      req.params.id
    );
    res.json(updatedOrder);
  } catch (err) {
    res.json(`Could not update order ${err} `);
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    try {
      jwt.verify(req.body.token, process.env.JWT!);
    } catch (err) {
      res.status(401);
      res.json("Invalid token");
      return;
    }

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
  app.put("/orders/:id", updateOrderById);
  app.post("/orders", createOrder);
  app.delete("/orders/:id", deleteOrderById);
};
export default orderRoutes;

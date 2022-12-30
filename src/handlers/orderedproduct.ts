import express, { Request, Response } from "express";
import { OrderedProduct, OrderedProducts } from "../models/orderedproduct";

const orderedproduct = new OrderedProducts();

const getAllOrderedProducts = async (req: Request, res: Response) => {
  const orderedProducts = await orderedproduct.getAllOrderedProducts();
  res.json(orderedProducts);
};
const showOrderedProductById = async (req: Request, res: Response) => {
  const orderedProducts = await orderedproduct.showOrderedProductById(
    req.params.id
  );
  res.json(orderedProducts);
};

const createOrderedProduct = async (req: Request, res: Response) => {
  try {
    const newOrderedProduct: OrderedProduct = {
      orderId: req.body.id,
      productId: req.body.product_id,
      quantity: req.body.quantity,
    };
    const createdOrderedProduct = await orderedproduct.createOrderedProduct(
      newOrderedProduct
    );
    res.json(createdOrderedProduct);
  } catch (err) {
    res.json(`Could not create ordered product ${err} `);
  }
};
const deleteOrderedProductById = async (req: Request, res: Response) => {
  const deleted = await orderedproduct.deleteOrderedProductById(req.params.id);
  res.json(deleted);
};
const orderedProductRoutes = (app: express.Application) => {
  app.get("/ordered/product", getAllOrderedProducts);
  app.get("/ordered/product/:id", showOrderedProductById);
  app.post("/ordered/product", createOrderedProduct);
  app.delete("/ordered/product:id", deleteOrderedProductById);
};
export default orderedProductRoutes;

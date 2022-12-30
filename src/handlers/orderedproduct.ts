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
const updateOrderedProductById = async (req: Request, res: Response) => {
  try {
    const updateOrderedProduct: OrderedProduct = {
      orderId: req.body.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    };
    const updatedOrderedProduct = await orderedproduct.updateOrderdProductById(
      updateOrderedProduct,
      req.params.id
    );
    res.json(updatedOrderedProduct);
  } catch (err) {
    res.json(`Could not update ordered product ${err} `);
  }
};

const createOrderedProduct = async (req: Request, res: Response) => {
  try {
    const newOrderedProduct: OrderedProduct = {
      orderId: req.body.orderId,
      productId: req.body.productId,
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
  app.put("/ordered/product/:id", updateOrderedProductById);
  app.post("/ordered/product", createOrderedProduct);
  app.delete("/ordered/product/:id", deleteOrderedProductById);
};
export default orderedProductRoutes;

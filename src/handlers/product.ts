import express, { Request, Response } from "express";
import { Product, Products } from "../models/product";

const product = new Products();

const getAllProducts = async (req: Request, res: Response) => {
  const products = await product.getAllProducts();
  res.json(products);
};
const showProductById = async (req: Request, res: Response) => {
  const productById = await product.showProductById(req.params.id);
  res.json(productById);
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const createdProduct = await product.createProduct(newProduct);
    res.json(createProduct);
  } catch (err) {
    res.json(`Could not create product ${err} `);
  }
};
const deletedProductById = async (req: Request, res: Response) => {
  const deleted = await product.deleteProductById(req.params.id);
  res.json(deleted);
};

const productRoutes = (app: express.Application) => {
  app.get("/products", getAllProducts);
  app.get("/products/:id", showProductById);
  app.post("/products", createProduct);
  app.delete("/products/:id", deletedProductById);
};
export default productRoutes;

import express, { Request, Response } from "express";
import { Product, Products } from "../models/product";
import jwt from "jsonwebtoken";
const product = new Products();

const getAllProducts = async (req: Request, res: Response) => {
  const products = await product.getAllProducts();
  res.json(products);
};
const showProductById = async (req: Request, res: Response) => {
  const productById = await product.showProductById(req.params.id);
  res.json(productById);
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const updateProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const updatedProduct = await product.updateProductById(
      updateProduct,
      req.params.id
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json(`Could not update product ${err} `);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    try {
      jwt.verify(req.body.token, process.env.JWT!);
    } catch (err) {
      res.status(401);
      res.json("Invalid token");
      return;
    }
    const createdProduct = await product.createProduct(newProduct);
    res.json(createdProduct);
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
  app.put("/products/:id", updateProductById);
  app.post("/products", createProduct);
  app.delete("/products/:id", deletedProductById);
};
export default productRoutes;

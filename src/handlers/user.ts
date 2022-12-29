import express, { Request, Response } from "express";
import { User, Users } from "../models/user";

const user = new Users();

const getAllUsers = async (req: Request, res: Response) => {
  const users = await user.getAllUsers();
  res.json(users);
};

const showUserById = async (req: Request, res: Response) => {
  const userById = await user.getUserById(req.params.id);
  res.json(userById);
};

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const createdUser = await user.createProduct(newUser);
    res.json(createdUser);
  } catch (err) {
    res.json(`Could not create user ${err} `);
  }
};
const deleteUserById = async (req: Request, res: Response) => {
  const deleted = await user.deleteUserById(req.params.id);
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", getAllUsers);
  app.get("/users/:id", showUserById);
  app.post("/users", createUser);
  app.delete("/users/:id", deleteUserById);
};
export default userRoutes;

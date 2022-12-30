import express, { Request, Response } from "express";
import { User, Users } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../bcrypt";
const user = new Users();

const getAllUsers = async (req: Request, res: Response) => {
  const users = await user.getAllUsers();
  try {
    jwt.verify(req.body.token, process.env.JWT!);
  } catch (err) {
    res.status(401);
    res.json("Invalid token");
    return;
  }
  res.json(users);
};
const updateUserById = async (req: Request, res: Response) => {
  try {
    const updateUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    try {
      jwt.verify(req.body.token, process.env.JWT!);
    } catch (err) {
      res.status(401);
      res.json("Invalid token");
      return;
    }

    const updatedUser = await user.updateUserById(updateUser, req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.json(`Could not update user ${err} `);
  }
};

const showUserById = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.JWT!);
  } catch (err) {
    res.status(401);
    res.json("Invalid token");
    return;
  }
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

    const createdUser = await user.createUser(newUser);
    var token = jwt.sign({ newUser: createdUser }, process.env.JWT!);
    res.json(token);
  } catch (err) {
    res.json(`Could not create user ${err} `);
  }
};
const deleteUserById = async (req: Request, res: Response) => {
  const deleted = await user.deleteUserById(req.params.id);
  res.json(deleted);
};

const authenticateUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const authenticatedUser = await user.authenticateUser(id, password);
    const webToken = jwt.sign(
      { authenticatedUser },
      config.jsonWebToken as unknown as string
    );
    if (!authenticatedUser) {
      res.json("Unauthenticated user");
    }
    res.json({ ...authenticatedUser, webToken });
  } catch (err) {
    res.json(` ${err} `);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", getAllUsers);
  app.get("/users/:id", showUserById);
  app.post("/users", createUser);
  app.put("/users/:id", updateUserById);
  app.delete("/users/:id", deleteUserById);
  app.post("/users/authenticate", authenticateUser);
};
export default userRoutes;

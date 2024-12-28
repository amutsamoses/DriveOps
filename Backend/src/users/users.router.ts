import { Hono } from "hono";
import { cors } from "hono/cors";
import {
  fetchAllUserController,
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "./user.controller";

export const userRouter = new Hono();
// Get all users - /api/users
userRouter.get("/users", fetchAllUserController);

// Get user by id - /api/users/:id
userRouter.get("/users/:id", getUserByIdController);

// Create user - /api/users
userRouter.post("/users", createUserController);

// Update user by id - /api/users/:id
userRouter.put("/users/:id", updateUserController);

// Delete user by id - /api/users/:id
userRouter.delete("/users/:id", deleteUserController);

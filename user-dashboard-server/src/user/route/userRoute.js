import { Router } from "express";
import {
  registerUserController,
  signinUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  getUserController,
} from "../controller/userController.js";
import verifyToken from "../../middleware.js"; 

const userRouter = Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/signin", signinUserController);

userRouter.get("/users/:id", verifyToken, getUserByIdController);
userRouter.patch("/users/:id", verifyToken, updateUserByIdController);
userRouter.delete("/users/:id", verifyToken, deleteUserByIdController);
userRouter.get("/users", verifyToken, getUserController);

export default userRouter;

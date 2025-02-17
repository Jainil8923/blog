import { Router } from "express";
import {
  registerUserController,
  signinUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  getUserController,
} from "../controller/userController.js";
import verifyToken from "../../../middleware/authMiddleware.js";
import { validateData } from "../../../middleware/validationMiddleware.js";
import {
  userSignupSchema,
  userUpdateSchema,
  userSigninSchema,
} from "../../validation/userValidation.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateData(userSignupSchema),
  registerUserController,
);
userRouter.post(
  "/signin",
  validateData(userSigninSchema),
  signinUserController,
);

userRouter.get("/:id", verifyToken, getUserByIdController);
userRouter.patch(
  "/:id",
  verifyToken,
  validateData(userUpdateSchema),
  updateUserByIdController,
);
userRouter.delete("/:id", verifyToken, deleteUserByIdController);
userRouter.get("/", verifyToken, getUserController);

export default userRouter;

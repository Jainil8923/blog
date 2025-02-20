import { Router } from "express";
import {
  registerUserController,
  signinUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  getUserController,
  verifyUserController,
  activateUserController,
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

userRouter.patch("/:id/activate", verifyToken, activateUserController);

userRouter.get("/:id", verifyToken, getUserByIdController);
userRouter.patch(
  "/:id",
  verifyToken,
  validateData(userUpdateSchema),
  updateUserByIdController,
);
userRouter.delete("/:id", verifyToken, deleteUserByIdController);
userRouter.get("/", verifyToken, getUserController);
userRouter.get("/verifyToken", verifyUserController);

export default userRouter;

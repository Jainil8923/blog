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

userRouter.patch("/:id/activate", verifyToken, (req, res) => {
  const userId = req.params.id;
  activateUserController(userId)
    .then(() =>
      res.status(200).json({ message: "User activated successfully" }),
    )
    .catch((error) => res.status(500).json({ error: error.message }));
});

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

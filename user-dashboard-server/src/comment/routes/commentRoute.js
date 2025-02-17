import { Router } from "express";
import verifyToken from "../../../middleware/authMiddleware.js";
import {
  getCommentsController,
  createCommentController,
  updateCommentController,
} from "../controller/commentController.js";
import { validateData } from "../../../middleware/validationMiddleware.js";
import { commentSchema } from "../../validation/commentValidation.js";

const commentRouter = Router();

commentRouter.get("/api/blogs/:blogId/comments", getCommentsController);

commentRouter.post(
  "/api/blogs/:blogId/comments",
  verifyToken,
  validateData(commentSchema),
  createCommentController,
);

commentRouter.patch(
  "/api/comments/:id",
  verifyToken,
  validateData(commentSchema),
  updateCommentController,
);

export default commentRouter;

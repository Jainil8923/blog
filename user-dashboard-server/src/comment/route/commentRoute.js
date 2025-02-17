import { Router } from "express";
import verifyToken from "../../middleware.js";
import {
  getCommentsController,
  createCommentController,
  updateCommentController,
} from "../controller/commentController.js";

const commentRouter = Router();

commentRouter.get("/api/blogs/:blogId/comments", getCommentsController);

commentRouter.post(
  "/api/blogs/:blogId/comments",
  verifyToken,
  createCommentController,
);

commentRouter.patch("/api/comments/:id", verifyToken, updateCommentController);

export default commentRouter;

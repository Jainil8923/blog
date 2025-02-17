import { Router } from "express";
import verifyToken from "../../../middleware/authMiddleware.js";
import {
  getBlogsController,
  getSingleBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} from "../controller/blogController.js";
import { validateData } from "../../../middleware/validationMiddleware.js";
import { blogSchema } from "../../validation/blogValidation.js";

const blogRouter = Router();
blogRouter.get("/", getBlogsController);
blogRouter.get("/:id", getSingleBlogController);
blogRouter.post(
  "/",
  verifyToken,
  validateData(blogSchema),
  createBlogController,
);
blogRouter.patch(
  "/:id",
  verifyToken,
  validateData(blogSchema),
  updateBlogController,
);
blogRouter.delete("/:id", verifyToken, deleteBlogController);

export default blogRouter;

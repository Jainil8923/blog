import { Router } from "express";
import verifyToken from "../../middleware.js";
import {
  getBlogsController,
  getSingleBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} from "../controller/blogController.js";

const blogRouter = Router();
blogRouter.get("/", getBlogsController);
blogRouter.get("/:id", getSingleBlogController);
blogRouter.post("/", verifyToken, createBlogController);
blogRouter.patch("/:id", verifyToken, updateBlogController);
blogRouter.delete("/:id", verifyToken, deleteBlogController);

export default blogRouter;

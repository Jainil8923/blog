import { Router } from "express";
import {
  addOrUpdateReactionController,
  getReactionCountsController,
} from "../controller/interactionController.js";
import verifyToken from "../../../middleware/authMiddleware.js";

const reactionRouter = Router();

reactionRouter.post(
  "/api/blogs/:blogId/reactions",
  verifyToken,
  addOrUpdateReactionController,
);

reactionRouter.get("/api/blogs/:blogId/reactions", getReactionCountsController);

export default reactionRouter;

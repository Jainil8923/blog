import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./user/route/userRoute.js";
import blogRouter from "./blog/route/blogRoute.js";
import commentRouter from "./comment/route/commentRoute.js";
import reactionRouter from "./interation/route/interactionRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/", commentRouter);
app.use("/", reactionRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

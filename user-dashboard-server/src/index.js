import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./user/route/userRoute.js";
import blogRouter from "./blog/route/blogRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

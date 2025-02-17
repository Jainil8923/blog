import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(10),
  content: z.string().trim().min(30),
});

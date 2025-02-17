import { db } from "../../db/index.js";
import { commentsTable } from "../../db/schema.ts";
import { eq } from "drizzle-orm";

export async function getCommentsByBlogId(blogId) {
  try {
    return await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.post_id, blogId));
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Database error while fetching comments");
  }
}

export async function createComment(userId, blogId, commentText) {
  try {
    const [newComment] = await db
      .insert(commentsTable)
      .values({
        user_id: userId,
        post_id: blogId,
        content: commentText,
        created_at: new Date(),
      })
      .returning();

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Database error while adding a comment");
  }
}

export async function updateComment(commentId, userId, updatedText) {
  try {
    const [comment] = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.id, commentId));

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.user_id !== userId) {
      throw new Error("Unauthorized to update this comment");
    }

    const [updatedComment] = await db
      .update(commentsTable)
      .set({ content: updatedText, updated_at: new Date() })
      .where(eq(commentsTable.id, commentId))
      .returning();

    return updatedComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Database error while updating comment");
  }
}

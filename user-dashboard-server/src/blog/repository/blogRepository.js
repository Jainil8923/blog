import { db } from "../../db/index.js";
import {
  postsTable,
  commentsTable,
  interactionsTable,
} from "../../db/schema.ts";
import { desc, eq, and, count } from "drizzle-orm";

export async function getBlogsRepository(page = 1, per_page = 10) {
  try {
    const offset = (page - 1) * per_page;
    const blogs = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.is_deleted, false))
      .orderBy(desc(postsTable.created_at))
      .limit(per_page)
      .offset(offset);

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Database error while fetching blogs");
  }
}

export async function getSingleBlogRepository(blogId) {
  try {
    const blog = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.id, blogId), eq(postsTable.is_deleted, false)));

    if (!blog.length) return null;

    const comments = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.post_id, blogId));

    const likeCount = await db
      .select({ count: count() })
      .from(interactionsTable)
      .where(
        and(
          eq(interactionsTable.post_id, blogId),
          eq(interactionsTable.liked, true),
        ),
      );

    const dislikeCount = await db
      .select({ count: count() })
      .from(interactionsTable)
      .where(
        and(
          eq(interactionsTable.post_id, blogId),
          eq(interactionsTable.liked, false),
        ),
      );

    return {
      ...blog[0],
      comments,
      likes: likeCount[0].count,
      dislikes: dislikeCount[0].count,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Database error while fetching blog details");
  }
}

export async function createBlogRepository(userId, title, content) {
  try {
    const newBlog = await db
      .insert(postsTable)
      .values({ user_id: userId, title, content })
      .returning();

    return newBlog[0];
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Database error while creating blog");
  }
}

export async function updateBlogRepository(userId, blogId, title, content) {
  try {
    const existingBlog = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.id, blogId), eq(postsTable.user_id, userId)));

    if (!existingBlog.length) {
      return null;
    }

    const updatedBlog = await db
      .update(postsTable)
      .set({ title, content, updated_at: new Date() })
      .where(eq(postsTable.id, blogId))
      .returning();

    return updatedBlog[0];
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Database error while updating blog");
  }
}

export async function deleteBlogRepository(userId, blogId) {
  try {
    const existingBlog = await db
      .select()
      .from(postsTable)
      .where(and(eq(postsTable.id, blogId), eq(postsTable.user_id, userId)));

    if (!existingBlog.length) {
      return null;
    }

    await db
      .update(postsTable)
      .set({ is_deleted: true, deleted_at: new Date() })
      .where(eq(postsTable.id, blogId));

    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw new Error("Database error while deleting blog");
  }
}

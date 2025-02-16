import { db } from "../../db/index.js";
import { interactionsTable } from "../../db/schema.ts";
import { eq, and, isNull, count } from "drizzle-orm";

export async function addOrUpdateReactionRepository(
  userId,
  blogId,
  reactionType,
) {
  try {
    const existingReaction = await db
      .select()
      .from(interactionsTable)
      .where(
        and(
          eq(interactionsTable.user_id, userId),
          eq(interactionsTable.post_id, blogId),
        ),
      );

    if (existingReaction.length > 0) {
      const currentReaction = existingReaction[0].liked;

      if (
        (currentReaction === true && reactionType === "like") ||
        (currentReaction === false && reactionType === "dislike")
      ) {
        await db
          .update(interactionsTable)
          .set({ liked: null })
          .where(
            and(
              eq(interactionsTable.user_id, userId),
              eq(interactionsTable.post_id, blogId),
            ),
          );

        return { message: "Reaction removed successfully" };
      } else {
        await db
          .update(interactionsTable)
          .set({ liked: reactionType === "like" ? true : false })
          .where(
            and(
              eq(interactionsTable.user_id, userId),
              eq(interactionsTable.post_id, blogId),
            ),
          );

        return { message: "Reaction updated successfully" };
      }
    } else {
      await db.insert(interactionsTable).values({
        user_id: userId,
        post_id: blogId,
        liked: reactionType === "like" ? true : false,
      });

      return { message: "Reaction added successfully" };
    }
  } catch (error) {
    console.error("Error adding/updating reaction:", error);
    throw new Error("Database error while processing reaction");
  }
}

export async function getReactionCountsRepository(blogId) {
  try {
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

    const noReactionCount = await db
      .select({ count: count() })
      .from(interactionsTable)
      .where(
        and(
          eq(interactionsTable.post_id, blogId),
          isNull(interactionsTable.liked),
        ),
      );

    return {
      likes: likeCount[0].count || 0,
      dislikes: dislikeCount[0].count || 0,
      noReaction: noReactionCount[0].count || 0,
    };
  } catch (error) {
    console.error("Error fetching reaction counts:", error);
    throw new Error("Database error while fetching reaction counts");
  }
}

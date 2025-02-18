import { db } from "../../db/index.js";
import { interactionsTable, postsTable, usersTable } from "../../db/schema.ts";
import { eq } from "drizzle-orm";

export async function registerUserRepository(
  email,
  password,
  firstname,
  lastname,
) {
  try {
    return await db.insert(usersTable).values({
      email,
      password,
      first_name: firstname,
      last_name: lastname,
    });
  } catch (err) {
    console.error("Error in registerUserRepository:", err.message);
    throw new Error("User registration failed");
  }
}

export async function findUser(email) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    console.log("User found:", user);

    return user;
  } catch (err) {
    console.error("Error finding user:", err.message);
  }
}

export async function getUserByIdRepository(userid) {
  try {
    return await db.select().from(usersTable).where(eq(usersTable.id, userid));
  } catch (err) {
    console.error("Error in getUserByIdRepository:", err.message);
    throw new Error("User retrieval failed");
  }
}

export async function updateUserByIdRepository(userid, updateData) {
  try {
    return await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userid));
  } catch (err) {
    console.error("Error in updateUserByIdRepository:", err.message);
    throw new Error("User update failed");
  }
}

export async function deleteUserByIdRepository(userId) {
  try {
    return await db
      .update(usersTable)
      .set({ is_active: false, deleted_at: new Date() })
      .where(eq(usersTable.id, userId));
  } catch (err) {
    console.error("Error in deleteUserByIdRepository:", err.message);
    throw new Error("User deletion failed");
  }
}

export async function getUsersRepository() {
  try {
    const users = await db
      .select({
        ...usersTable,
        totalPosts: db.$count(
          postsTable,
          eq(postsTable.user_id, usersTable.id),
        ),
        totalLikes: db.$count(
          interactionsTable,
          eq(interactionsTable.user_id, usersTable.id),
        ),
      })
      .from(usersTable);

    return users;
  } catch (err) {
    console.error("Error in getUsersRepository:", err.message);
    throw new Error("Failed to retrieve users");
  }
}


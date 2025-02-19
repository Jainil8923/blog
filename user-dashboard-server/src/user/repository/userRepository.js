import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.ts";
import { eq, and, count } from "drizzle-orm";

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
      .where(and(eq(usersTable.email, email), eq(usersTable.is_active, true)));

    console.log("User found:", user);

    return user;
  } catch (err) {
    console.error("Error finding user:", err.message);
    throw new Error("User retrieval failed");
  }
}

export async function getUserByIdRepository(userid) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userid))
      .where(and(eq(usersTable.id, userid), eq(usersTable.is_active, true)));
    return user;
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
      .where(eq(usersTable.id, userid))
      .andWhere(eq(usersTable.is_active, true));
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
        // totalPosts: await db.execute(sql`select count(*) from posts where posts.user_id = usersTable.id`),
        // totalLikes: await db.execute(sql`select * from ${usersTable} where ${usersTable.id} = ${id}`)
      })
      .from(usersTable);

    return users;
  } catch (err) {
    console.error("Error in getAllUsersRepository:", err.message);
    throw new Error("Failed to retrieve all users");
  }
}

export async function getPaginatedUsersRepository(limit, offset) {
  try {
    limit = Number(limit);
    offset = Number(offset);
    const users = await db
      .select({
        ...usersTable,
      })
      .from(usersTable)
      .where(eq(usersTable.is_active, true))
      .limit(limit)
      .offset(offset);
    const totalUsersdata = await db.select({ count: count() }).from(usersTable);
    const totalUsers = totalUsersdata[0].count;

    return {
      users,
      pagination: {
        totalUsers,
        currentPage: offset / limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    };
  } catch (err) {
    console.error("Error in getPaginatedUsersRepository:", err.message);
    throw new Error("Failed to retrieve paginated users");
  }
}

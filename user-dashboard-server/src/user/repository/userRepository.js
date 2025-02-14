import client from "../../database/config/dbconfig";

export async function getUsers() {
  try {
    await client.connect();
    const data = await client.query("select * from users");
    return data;
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.end();
  }
}

export async function getUserByChunk(offset, limit) {
  try {
    await client.connect();
    const data = await client.query("select * from user limit $1 offset $2", [
      limit,
      offset,
    ]);
    return data;
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.end();
  }
}

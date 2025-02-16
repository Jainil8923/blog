import { faker } from "@faker-js/faker";
import { db } from "./db/index.js";
import { usersTable, postsTable } from "./db/schema.ts";
import bcrypt from "bcrypt";

const NUM_USERS = 1000;
const NUM_BLOGS = 2000;

const seedUsersAndBlogs = async () => {
  const users = [];
  const blogs = [];

  console.log("Seeding users...");

  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    const rawPassword = firstName.charAt(0).toUpperCase() + "@8765";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    users.push({
      id: faker.string.uuid(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      user_image: faker.image.avatar(),
      background_image: faker.image.url(),
      instagram_url: faker.internet.url(),
      facebook_url: faker.internet.url(),
      is_active: true,
      registered_at: new Date(),
    });
  }

  try {
    await db.insert(usersTable).values(users);
    console.log("1000 users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err.message);
    return;
  }

  console.log("Seeding blogs...");

  for (let i = 0; i < NUM_BLOGS; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    blogs.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(6),
      content: faker.lorem.paragraphs(3),
      user_id: randomUser.id,
      is_deleted: false,
      created_at: new Date(),
    });
  }

  try {
    await db.insert(postsTable).values(blogs);
    console.log("2000 blogs seeded successfully!");
  } catch (err) {
    console.error("Error seeding blogs:", err.message);
  }
};

seedUsersAndBlogs();

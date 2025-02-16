import { faker } from "@faker-js/faker";
import { db } from "./db/index.js";
import { usersTable } from "./db/schema.ts";
import bcrypt from "bcrypt";

const seedUsers = async () => {
  const users = [];

  for (let i = 0; i < 1000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    const rawPassword = firstName.charAt(0).toUpperCase() + "@8765";

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    users.push({
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
  }
};

seedUsers();

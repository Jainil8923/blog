import { faker } from "@faker-js/faker";
import { db } from "./db/index.js";
import {
  usersTable,
  postsTable,
  commentsTable,
  interactionsTable,
} from "./db/schema.ts";
import bcrypt from "bcrypt";

const NUM_USERS = 100;
const POSTS_PER_USER = 3;
const COMMENTS_PER_POST = 5;
const INTERACTIONS_PER_POST = 7;

const seedUsers = async () => {
  const users = [];

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

  await db.insert(usersTable).values(users);
  console.log("Users seeded successfully!");
  return users;
};

const seedPosts = async (users) => {
  const posts = [];

  users.forEach((user) => {
    for (let i = 0; i < POSTS_PER_USER; i++) {
      posts.push({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        user_id: user.id,
        is_deleted: false,
        created_at: new Date(),
      });
    }
  });

  await db.insert(postsTable).values(posts);
  console.log(" Posts (blogs) seeded successfully!");
  return posts;
};

const seedComments = async (posts, users) => {
  const comments = [];

  posts.forEach((post) => {
    for (let i = 0; i < COMMENTS_PER_POST; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      comments.push({
        id: faker.string.uuid(),
        post_id: post.id,
        user_id: randomUser.id,
        content: faker.lorem.sentence(),
        created_at: new Date(),
      });
    }
  });

  await db.insert(commentsTable).values(comments);
  console.log(" Comments seeded successfully!");
};

const seedInteractions = async (posts, users) => {
  const interactions = [];

  posts.forEach((post) => {
    for (let i = 0; i < INTERACTIONS_PER_POST; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const reaction = Math.random() < 0.5 ? true : false;

      interactions.push({
        id: faker.string.uuid(),
        post_id: post.id,
        user_id: randomUser.id,
        liked: reaction,
      });
    }
  });

  await db.insert(interactionsTable).values(interactions);
  console.log("Reactions (likes/dislikes) seeded successfully!");
};
const seedDatabase = async () => {
  try {
    console.log("Seeding data...");

    const users = await seedUsers();
    const posts = await seedPosts(users);
    await seedComments(posts, users);
    await seedInteractions(posts, users);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
};

seedDatabase();

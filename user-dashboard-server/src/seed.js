import { faker } from "@faker-js/faker";
import pg from "pg";
const { Client } = pg;

const client = new Client({
  user: "postgres",
  password: "Jj@89aik12",
  host: "localhost",
  port: 5433,
  database: "users",
});

const seed = async () => {
  await client.connect();
  try {
    let users = [];
    for (let i = 0; i < 1000; i++) {
      const randomName = faker.person.fullName();
      const newUser = {
        name: randomName,
        jobtitle: faker.person.jobTitle(),
        avatar: faker.image.avatar(),
        backgroundimage: faker.image.urlPicsumPhotos({ blur: 4 }),
        follower: faker.number.float({ min: 10, max: 100, fractionDigits: 1 }),
        following: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
        totalpost: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
      };
      users.push(newUser);
    }
    for (const user of users) {
      await client.query(
        `INSERT INTO users (name, jobtitle, avatar, backgroundimage, follower, following, totalpost) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          user.name,
          user.jobtitle,
          user.avatar,
          user.backgroundimage,
          user.follower,
          user.following,
          user.totalpost,
        ]
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

seed();

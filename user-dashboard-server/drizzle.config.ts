import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({path:"./env"});

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://postgres:Jj@89aik12@localhost:5433/users",
  },
});

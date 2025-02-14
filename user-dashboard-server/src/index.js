import express from "express";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "Jj@89aik12",
  host: "localhost",
  port: 5433,
  database: "users",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 1000;
  const offset = parseInt(req.query.offset, 10) || 0;
  console.log(`Limit: ${limit}, Offset: ${offset}`);

  try {
    const client = await pool.connect();
    const data = await client.query("SELECT * FROM users LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
    res.status(200).json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

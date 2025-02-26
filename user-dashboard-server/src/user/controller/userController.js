import {
  deleteUserByIdRepository,
  findUser,
  getUsersRepository,
  getUserByIdRepository,
  registerUserRepository,
  updateUserByIdRepository,
  // getUserStatsRepository,
  getPaginatedUsersRepository,
} from "../repository/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function registerUserController(req, res) {
  try {
    const { email, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await registerUserRepository(email, hashedPassword, firstname, lastname);
    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function signinUserController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const userData = user[0];

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

export async function getUserController(req, res) {
  try {
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;
    let users;
    if (page !== undefined && limit !== undefined) {
      console.log(limit, offset);
      users = await getPaginatedUsersRepository(limit, offset);
    } else {
      users = await getUsersRepository();
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error while fetching user data");
  }
}

export async function getUserByIdController(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    console.log("called");
    const user = await getUserByIdRepository(userId);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserByIdController(req, res) {
  try {
    const userId = req.params.id;
    let updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    updateData.updated_at = new Date();

    await updateUserByIdRepository(userId, updateData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .send("Internal server error while updating user data by ID");
  }
}

export async function deleteUserByIdController(req, res) {
  try {
    const userId = req.params.id;
    const deletionData = {
      is_active: false,
      deleted_at: new Date(),
    };

    await deleteUserByIdRepository(userId, deletionData);

    res.status(200).json({ message: "User soft deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Internal server error while soft deleting user");
  }
}

export async function verifyUserController(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await getUserByIdRepository(userId);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User verified successfully", user: user[0] });
  } catch (err) {
    console.error("Error verifying user:", err);
    res.status(401).json({ error: "User verification failed" });
  }
}

export async function activateUserController(req, res) {
  try {
    const userId = req.params.id;
    const activationData = {
      is_active: true,
      activated_at: new Date(),
    };

    await updateUserByIdRepository(userId, activationData);

    res.status(200).json({ message: "User activated successfully" });
  } catch (err) {
    console.error("Error activating user:", err);
    res.status(500).send("Internal server error while activating user");
  }
}

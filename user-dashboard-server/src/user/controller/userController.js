import { getUserByChunk, getUsers } from "../repository/userRepository"

export async function getUserController(req, res) {
    try {
        const users = getUsers();
        res.status(200).send(users.json());
    }
    catch(err) {
        res.status(500).send("Internal server error while fetching user data");
    }
}

export async function getUserByChunkController(req, res) {
    try{
        const offset = parseInt(req.query.offset, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10
        console.log(`offset: ${offset} limit: ${limit}`);
        const rangeduser = getUserByChunk(offset, limit);
        res.status(200).send(rangeduser.json())
    }
    catch(err) {
        res.status(500).send("Internal server error while fetching user data by chunk")
    }
}
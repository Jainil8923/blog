import {
  addOrUpdateReactionRepository,
  getReactionCountsRepository,
} from "../repository/interactionRepository.js";

export async function addOrUpdateReactionController(req, res) {
  try {
    const userId = req.userId;
    const { blogId } = req.params;
    const { reaction_type } = req.body;

    if (!["like", "dislike"].includes(reaction_type)) {
      return res.status(400).json({ error: "Invalid reaction type" });
    }

    const response = await addOrUpdateReactionRepository(
      userId,
      blogId,
      reaction_type,
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in addOrUpdateReactionController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getReactionCountsController(req, res) {
  try {
    const { blogId } = req.params;
    const counts = await getReactionCountsRepository(blogId);
    return res.status(200).json(counts);
  } catch (error) {
    console.error("Error in getReactionCountsController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

import {
  getCommentsByBlogId,
  createComment,
  updateComment,
} from "../repository/commentRepository.js";

export async function getCommentsController(req, res) {
  try {
    console.log("called");
    const { blogId } = req.params;
    const comments = await getCommentsByBlogId(blogId);
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createCommentController(req, res) {
  try {
    const { blogId } = req.params;
    const { comment_text } = req.body;
    const userId = req.userId;

    if (!comment_text) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const newComment = await createComment(userId, blogId, comment_text);
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateCommentController(req, res) {
  try {
    const { id } = req.params;
    const { comment_text } = req.body;
    const userId = req.userId;

    if (!comment_text) {
      return res
        .status(400)
        .json({ error: "Updated comment text is required" });
    }

    const updatedComment = await updateComment(id, userId, comment_text);
    res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

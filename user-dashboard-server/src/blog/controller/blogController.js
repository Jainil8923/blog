import {
  getBlogsRepository,
  getSingleBlogRepository,
  createBlogRepository,
  updateBlogRepository,
  deleteBlogRepository,
} from "../repository/blogRepository.js";

export async function getBlogsController(req, res) {
  try {
    const { page = 1, per_page = 10 } = req.query;
    const blogs = await getBlogsRepository(Number(page), Number(per_page));

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getSingleBlogController(req, res) {
  try {
    const { id } = req.params;
    const blog = await getSingleBlogRepository(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createBlogController(req, res) {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }

    const newBlog = await createBlogRepository(userId, title, content);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateBlogController(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be updated",
      });
    }

    const updatedBlog = await updateBlogRepository(userId, id, title, content);

    if (!updatedBlog) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update this blog" });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function deleteBlogController(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const deleted = await deleteBlogRepository(userId, id);

    if (!deleted) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this blog" });
    }

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

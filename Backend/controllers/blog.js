import Post from "../models/blog.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  if (!authorId) {
    return res
      .status(400)
      .json({ message: "Unauthorized, author ID is missing" });
  }

  try {
    const newPost = new Post({ title, content, authorId });
    await newPost.save();
    res.status(200).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPosts = async (req, res) => {
  // if (!req.user || !req.user.id) {
  //   return res
  //     .status(400)
  //     .json({ message: "Unauthorized, user ID is missing" });
  // }
  try {
    const posts = await Post.find().populate("authorId", "name email");
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPostById = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const post = await Post.findById(postId).populate("authorId", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post retrieved successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const authorId = req.user.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  if (!authorId) {
    return res
      .status(400)
      .json({ message: "Unauthorized, author ID is missing" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const authorId = req.user.id;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  if (!authorId) {
    return res
      .status(400)
      .json({ message: "Unauthorized, author ID is missing" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getPostsByAuthor = async (req, res) => {
  const authorId = req.user.id;

  if (!authorId) {
    return res.status(400).json({ message: "Author ID is required" });
  }

  try {
    const posts = await Post.find({ authorId }).populate(
      "authorId",
      "name email"
    );
    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this author" });
    }
    res.status(200).json({
      message: "Posts by author retrieved successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

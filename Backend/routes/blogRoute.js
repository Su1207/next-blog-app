import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getPostsByAuthor,
  updatePost,
} from "../controllers/blog.js";
import { tokenCheck } from "../middleware/tokenCheck.js";

const router = express.Router();

router.post("/post", tokenCheck, createPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);
router.delete("/post/:id", tokenCheck, deletePost);
router.put("/post/:id", tokenCheck, updatePost);
router.get("/getPost", tokenCheck, getPostsByAuthor);

export default router;

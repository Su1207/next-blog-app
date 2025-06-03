import express from "express";
import { getAuthors, loginUser, registerUser } from "../controllers/user.js";
import { tokenCheck } from "../middleware/tokenCheck.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/authors", tokenCheck, getAuthors);

export default router;

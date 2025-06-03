import express from "express";
import { getAuthors, loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/authors", getAuthors);

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import userRoutes from "./routes/userRoute.js";
import blogRoutes from "./routes/blogRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

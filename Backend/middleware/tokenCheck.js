import jwt from "jsonwebtoken";

export const tokenCheck = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header
  if (!token) {
    return res
      .status(400)
      .json({ message: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded;
    // console.log("Token verified successfully:", req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" }); // Handle invalid token
  }
};

import express from "express";
import { Register, Login, getMe } from "../controller/userController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

// Uncomment if you want registration
// router.post("/register", Register);

router.post("/login", Login);

router.get("/me", protect, getMe);

export default router;

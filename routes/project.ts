import express from "express";
import protect from "../middleware/authMiddleware";
import { addProject } from "../controller/projectController";
const router = express.Router();

router.post("/add", addProject);

export default router;

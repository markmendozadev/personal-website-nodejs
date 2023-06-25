import express from "express";
import protect from "../middleware/authMiddleware";
import {
  addProject,
  removeProject,
  getAllProject,
  getProject,
  editProject,
} from "../controller/projectController";
const router = express.Router();

router.post("/add", addProject);
router.delete("/remove", removeProject);
router.get("/getAll", getAllProject);
router.get("/getProject/:id", getProject);
router.patch("/editProject", editProject);

export default router;

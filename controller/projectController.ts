import { Request, Response } from "express";
const cloudinary = require("../utils/cloudinary");
import Project from "../models/projectModel";

const addProject = async (req: Request, res: Response) => {
  const { name, image, description, url, tags } = req.body;

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "projects",
    });

    const project = await Project.create({
      name,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      url,
      tags,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export { addProject };

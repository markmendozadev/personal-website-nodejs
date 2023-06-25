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

const removeProject = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const findProject = await Project.findById(id);
    if (findProject) {
      await cloudinary.uploader.destroy(findProject.image.public_id);
      await Project.findByIdAndDelete(findProject.id);
      res.status(201).json({
        success: true,
        message: "Project Deleted",
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Project Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getAllProject = async (req: Request, res: Response) => {
  try {
    const getProjects = await Project.find();
    if (getProjects) {
      res.status(200).json({
        success: true,
        projects: getProjects,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Project Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getProject = await Project.find({ _id: id });
    if (getProject) {
      res.status(200).json({
        success: true,
        projects: getProject,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Project Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const editProject = async (req: Request, res: Response) => {
  const { id, name, image, description, url, tags } = req.body;
  try {
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "projects",
      });
    }
    const getProject = await Project.updateOne(
      { _id: id },
      { name, image, description, url, tags }
    );
    if (getProject) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Project Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export { addProject, removeProject, getAllProject, getProject, editProject };

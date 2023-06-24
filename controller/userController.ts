import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { loginSchema, registrationSchema } from "../utils/validations";
import { Schema } from "mongoose";
import { UserRequest } from "../utils/types";

const Register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const { error } = await registrationSchema.validateAsync(req.body);
    if (!error) {
      await user.save();
      res.status(200).json({
        username,
        email,
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      errorMessage: error.details[0].message,
    });
  }
};

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  const isValidUser = await bcrypt.compare(password, user.password);

  if (!isValidUser) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (!error) {
      return res.status(200).json({
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      errorMessage: error.details[0].message,
    });
  }
};

const getMe = async (req: UserRequest, res: Response) => {
  res.status(200).json(req.user);
};

const generateToken = (id: Schema.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { Register, Login, getMe };

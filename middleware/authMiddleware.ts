import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { UserRequest } from "../utils/types";

const protect = async (req: UserRequest, res: Response, next: NextFunction) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const userData = await User.findById(decoded.id).select("-password");
      req.user = {
        email: userData.email,
        username: userData.username,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
        error: error,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

export default protect;

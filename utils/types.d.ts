import { Request } from "express";

export interface UserRequest extends Request {
  // Use `user?:` here instead of `user:`.
  user?: any;
}

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user";
import projectRoute from "./routes/project";

import ConnectDB from "./config/db";
const app: Express = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

ConnectDB();
app.use(
  express.json({ limit: "50mb" }),
  cors(),
  express.urlencoded({ extended: true, parameterLimit: 100000, limit: "50mb" })
);

app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});

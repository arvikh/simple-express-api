import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { router as userRouter } from "./routes/user.route.js";
dotenv.config();
// to load env

const app = express();

app.use(express.json());
// to accept json

app.use(cors());
// to allow cross origin request

app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URI);
console.log("db connected");
// to connect to DB
let port = process.env.PORT || 3000;
// get port from env

app.get("/health", (req, res) => {
  res.json({ message: "The application health is good" });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

import dotenv from "dotenv";
import express, { Router } from "express";
import { userModel } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullname, username, password } = req.body;
  const isUsernameExist = await userModel.findOne({ username });
  if (isUsernameExist) {
    return res.status(409).json({ message: "username already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    fullname,
    username,
    password: hashedPassword,
  });
  newUser.save();
  res.status(201).json({ message: "user successfully created" });
});

export { router };

import dotenv from "dotenv";
import express from "express";
import { userModel } from "../models/user.js";
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.json({ message: "user not found" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "invalid username or password" });
  }
  // when user logs in we create a token using jwt and we will pass user data and secret to create jwt which we can access when we verify jwt
  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  return res.status(200).json({ token, user: user._id });
});

function verifyJsonWebToken(req, res, next) {
  //get token from header
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  //split token and get only the jwt token
  const token = authHeader && authHeader.split(" ")[1];
  // if there is token then
  if (token) {
    const isVerified = jwt.verify(token, process.env.SECRET);
    // verify with jwt lib using secret and get the payload we sent
    if (isVerified) {
      // if we have data in payload
      req.id = isVerified.id;
      // modify the global req and store the user id
      next();
      // as the verify gone succesful go the route
    } else {
      // if not user is not authorized
      return res.status(400).json({ message: "unauthorized to access" });
    }
  }
}
export { router, verifyJsonWebToken };

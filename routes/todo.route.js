import express from "express";
import { todoModel } from "../models/todo.model.js";
import { verifyJsonWebToken } from "./user.route.js";
const router = express.Router();
router.post("/create", verifyJsonWebToken, async (req, res) => {
  const userId = req.id;
  const { name } = req.body;
  const newTodo = new todoModel({ name, user: userId });
  newTodo.save();
  return res.status(201).json("successfully created");
});

//To do
// get all todos by your id
// take your id and get all your todos as a list
// update(put) your isdone to true
// with todo_id change the isdone to tru
// delete a to do
// delete todo by its id
// get todo by id

export { router };

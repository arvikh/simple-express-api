import express from "express";
import { todoModel } from "../models/todo.model.js";
import { userModel } from "../models/user.js";
import { verifyJsonWebToken } from "./user.route.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
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
router.get("/gettask", verifyJsonWebToken, async (req, res) => {
  const {userId} = req.body;
  const tasksList = [];
  const tasks = (await todoModel.find()).forEach((eachTask) => {
    if (eachTask.user.toString() === userId){
      tasksList.push(eachTask.name);
    }
  });
  return res.status(201).json(tasksList);
});

// update(put) your isdone to true
// with todo_id change the isdone to true
router.put("/update", verifyJsonWebToken, async (req, res) => {
  const { todoId } = req.body;
  const getTask = await todoModel.findOne({ _id: todoId });
  getTask.isDone = true;
  getTask.save();
  return res.status(201).json(getTask);
});

// delete a to do
// delete todo by its id
router.delete("/delete", verifyJsonWebToken, async (req, res) => {
  const { todoId } = req.body;
  // const tasks = await todoModel.find();
  const deletedTask = await todoModel.findByIdAndDelete({ _id: todoId });
  if (!deletedTask) {
    return res
      .status(404)
      .json({ message: "Product deleted successfully", deletedTask });
  }
});

// get todo by id
router.get("/findTodo", verifyJsonWebToken, async (req, res) => {
  const { todoId } = req.body;
  const todo = await todoModel.findOne({ _id: todoId });
  return res.status(201).json(todo);
});

export { router };

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const todoModel = mongoose.model("todos", todoSchema);

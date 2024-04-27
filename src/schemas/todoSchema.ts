import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  done: { type: Boolean, default: false },
});

const TodoModel = mongoose.model("todos", todoSchema);

export default TodoModel;

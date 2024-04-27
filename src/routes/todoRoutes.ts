import { Router, Request, Response } from "express";
import TodoModel from "../schemas/todoSchema";

const router = Router();

/**
 * @swagger
 * /todos:
 *  get:
 *    responses:
 *      200:
 *        description: The list of the todos
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const todoDatas = await TodoModel.find();
    res.json(todoDatas);
  } catch (err) {
    res.send(err.message);
  }
});

/**
 * @swagger
 * /todos/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *    responses:
 *      200:
 *        description: todo by id
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todoData = await TodoModel.findById(id);
    if (!todoData)
      return res.status(404).json({ message: `Todo (${id}) not found` });
    res.json(todoData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /todos/:
 *  post:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      201:
 *        description: todo created
 */
router.post("/", async (req: Request, res: Response) => {
  const todo = req.body;
  try {
    const newTodo = new TodoModel(todo);
    await newTodo.save();
    res.status(201).json({ message: "Todo Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *  put:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - done
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              done:
 *                type: boolean
 *    responses:
 *      204:
 *        description: todo updated
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo);
    if (!updatedTodo)
      return res.status(404).json({ message: `Todo (${id}) not found` });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *    responses:
 *      204:
 *        description: todo deleted
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo)
      return res.status(404).json({ message: `Todo (${id}) not found` });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

const express = require("express");
const router = express.Router();
const db = require("../db/database");

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - dueDateTime
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDateTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", (req, res) => {
  const { title, description = "", status, dueDateTime } = req.body;
  if (!title || !status || !dueDateTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const stmt = db.prepare(
    "INSERT INTO tasks (title, description, status, dueDateTime) VALUES (?, ?, ?, ?)"
  );
  const info = stmt.run(title, description, status, dueDateTime);
  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(newTask);
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks (with optional pagination)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tasks to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of tasks to skip
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get("/", (req, res) => {
  let { limit, offset } = req.query;

  limit = parseInt(limit);
  offset = parseInt(offset);

  if (isNaN(limit)) limit = null;
  if (isNaN(offset)) offset = 0;

  let query = "SELECT * FROM tasks ORDER BY dueDateTime ASC";
  if (limit !== null) {
    query += " LIMIT ? OFFSET ?";
    const tasks = db.prepare(query).all(limit, offset);
    res.json(tasks);
  } else {
    const tasks = db.prepare(query).all();
    res.json(tasks);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task object
 *       404:
 *         description: Task not found
 */
router.get("/:id", (req, res) => {
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update the status of a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Missing status" });

  const result = db
    .prepare("UPDATE tasks SET status = ? WHERE id = ?")
    .run(status, req.params.id);
  if (result.changes === 0)
    return res.status(404).json({ error: "Task not found" });

  const updatedTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);
  res.json(updatedTask);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete("/:id", (req, res) => {
  const result = db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0)
    return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
});

module.exports = router;

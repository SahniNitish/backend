const express = require("express");
const mongoose = require("mongoose");
const { z } = require("zod");
const cors = require("cors")

const app = express();
app.use(express.json());

app.use(cors());


// Mongoose Connection
mongoose.connect("mongodb+srv://admin:hello@cluster0.pkcgr.mongodb.net/")

// Define Mongoose Model
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Zod Schema for Input Validation
const createTodo = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});

// Create a New Todo
app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "You sent the wrong inputs" });
    }

    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });

    res.json({ msg: "Todo created" });
});

// Get All Todos
app.get("/todos", async function (req, res) {
    const todos = await Todo.find({});
    res.json({ todos });
});

// Mark Todo as Completed
app.put("/completed", async function (req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "Missing todo ID" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });

    if (!updatedTodo) {
        return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo marked as completed", todo: updatedTodo });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

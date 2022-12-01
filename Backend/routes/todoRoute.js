const express = require("express");
const { createTodo, getTodos, searchTodos, updateTodo, deleteTodo, getTodoById } = require("../controllers/todo");
const userAuth = require("../middleware/userAuth")
const route = express.Router();



route.get("/sam", userAuth, (req, res) => {
    const user = req.user;
    res.json({
        user: user
    })
})
route.get("/getTodos", userAuth, getTodos);
route.post("/createTodo", userAuth, createTodo);
route.put("/editTodo/:todoId", userAuth, updateTodo);
route.delete('/deleteTodo/:todoId', userAuth, deleteTodo);
route.get('/searchTodos', userAuth, searchTodos);
route.get('/getTodo/:todoId', userAuth, getTodoById)




module.exports = route;
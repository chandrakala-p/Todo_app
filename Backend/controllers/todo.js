const Todo = require("../model/todo");


exports.createTodo = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        if (!user)
            throw new Error("user not found and you are not allowed");


        const { title, color } = req.body;
        if (!title)
            throw new Error("title can't be empty");

        const todo = new Todo({
            title,
            color,
            user: user.id
        })
        const savedTodo = await todo.save();
        res.status(200).json({
            success: true,
            message: "successfully retrieved",
            todo: savedTodo
        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}



exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id })

        res.status(200).json({
            success: true,
            message: "fetched all the Todos successfully",
            todos
        })

    } catch (error) {
        console.log("Failed to get all the Todo")
        console.log("ERROR: ", error)
        res.status(401).json({
            success: false,
            Message: "Failed to get all the Todo",
            Error: error
        })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const { todoId } = req.params

        if (!todoId) {
            req.status(401).json({ msg: "Todo ID is required to fetch the todo" })
        }

        const todo = await Todo.findById(todoId)

        res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            todo
        })
    } catch (error) {
        console.log("Failed to get the Todo")
        console.log("ERROR: ", error)
        res.status(401).json({
            success: false,
            Message: "Failed to get the Todo",
            Error: error
        })
    }
}


exports.deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params

        if (!todoId) {
            throw new Error("Todo ID is required to fetch the todo")
        }

        const todo = await Todo.findByIdAndDelete(todoId)

        res.status(200).json({
            success: true,
            Message: "Todo deleted successfully",
            deletedTodo: todo
        })
    } catch (error) {
        console.log("Error in deleting the todo")
        console.log("ERROR: ", error)
        res.status(401).json({
            success: false,
            Message: "Error in deleting the todo",
            error
        })
    }
}



exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        if (!todoId) {
            throw new Error("Todo ID is required to fetch the todo")
        }

        const existingTodo = await Todo.findById(todoId);
        if (!existingTodo)
            throw new Error("NO such todo exists");

        const { title, color } = req.body;


        existingTodo.title = title;
        existingTodo.color = color;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, existingTodo)

        res.status(200).json({
            success: true,
            Message: "Todo updated successfully",
            updatedTodo: updatedTodo
        })

    } catch (error) {
        console.log("Error in updating the todo")
        console.log("ERROR: ", error)
        res.status(401).json({
            success: false,
            Message: "Error in updating the todo",
            error
        })
    }
}


exports.searchTodos = async (req, res) => {
    try {

        const { search } = req.query

        if (!search) {
            throw new Error("Search value  is required to fetch the todos")
        }

        const todos = await Todo.find({ $or: [{ title: new RegExp(search, 'i') }, { tasks: new RegExp(search, 'i') }] })

        res.status(200).json({
            success: true,
            todos
        })
    } catch (error) {
        console.log("Error in search todos controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in search todos controller",
            error
        })
    }
}

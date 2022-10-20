const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let todoList = [];


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('addTodo', (todo) => {
        console.log(todo);
        todoList.unshift(todo);
        socket.emit("todos", todoList);
    });

    socket.on('deleteToDo', (id) => {
        // todoList = todoList.filter((todo) => todo.id !== id)
        todoList = todoList.filter((todo) => todo.id !== id);
        socket.emit("todos", todoList);
    });

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('🔥: A user disconnected');
    });

});


app.get("/api", (req, res) => {
    res.json(todoList);
});

http.listen(PORT, () => {
    console.log(`server listening on ${PORT} ...`);
});
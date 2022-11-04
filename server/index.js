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
let usersList = [];


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

    socket.on('addNewUser', (userName) => {
        usersList.push(userName);
        socket.emit('users', usersList);
    });

    socket.on('viewComments', (commentId) => {
        for (const todo of todoList) {
            if (todo.id === commentId)
                socket.emit("commentReceived", todo);
        }
    })

    socket.on('updateComment', (data) => {
        const { user, todoId, comment } = data;
        for(const todo of todoList){
            if(todo.id === todoId ){
                todo.comments.push({name: user, text: comment})
                socket.emit("commentReceived", todo);
            }
        }
    })

    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('🔥: A user disconnected');
    });

});

app.get("/api", (req, res) => {
    res.json(todoList);
});
app.get("/users", (req, res) => {
    res.json(usersList);
});

http.listen(PORT, () => {
    console.log(`server listening on ${PORT} ...`);
});
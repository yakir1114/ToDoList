import React, { useEffect, useState } from "react";
import { Nav } from "./exports";

const Main = ({ socket }) => {

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const generateID = () => Math.random().toString(36).substring(2, 10);

    const deleteToDoTask = (id) => {
        socket.emit("deleteToDo", id);
    }

    const handleAddTodo = (e) => {
        e.preventDefault();
        socket.emit("addTodo", {
            id: generateID(),
            todo,
            comments: [],
        });
        setTodo("");
    };

    useEffect(() => {
        function fetchTodos() {
            fetch("http://localhost:4000/api")
                .then((res) => res.json())
                .then((data) => setTodoList(data))
                .catch((err) => console.error(err));
        }
        fetchTodos();
        socket.on("todos", (data) => {setTodoList(data); console.log(data)});
    }, [socket]);

    return (
        <div className="main">
            <Nav />
            <form className="form" onSubmit={handleAddTodo}>
                <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="input"
                    required>
                </input>
                <button className="form__cta">Add Todo</button>
            </form>
            <div className='todo__container'>
                {todoList.map((item) => (
                    <div className='todo__item' key={item.id}>
                        <p>{item.todo}</p>
                        <div>
                            <button className='commentsBtn'>View Comments</button>
                            <button className='deleteBtn' onClick={() => deleteToDoTask(item.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main;
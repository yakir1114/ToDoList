import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (socket) => {
    //create username & usernameList variables
    const [username, setUsername] = useState("");
    const [usernameList, setUsernameList] = useState([]);
    // create navigation throw the components
    const navigate = useNavigate();
    //handler for submiting the form
    const handleSubmit = (e) => {
        // preventing from the user to enter empty usrname
        e.preventDefault();
        //save the entered username in the local storage
        localStorage.setItem("_username", username);
        // then navigate to app(Main component)
        navigate("/app");
    }

    useEffect(() => {
        function fetchUsers() {
            fetch("http://localhost:4000/users")
                .then((res) => res.json())
                .then((data) => setUsernameList(data))
                .catch((err) => console.error(err));
        }
        fetchUsers();
        // socket.on("users", (data) => {setUsernameList(data); console.log(data)});
    }, [socket]);



    // making a Sign in form - for new users
    return (
        <div className="home">
            <h2>Sign in to your todo-List</h2>
            <form onSubmit={handleSubmit} className='home__form'>
                <lable htmlFor='username'> Your Username</lable> 
                <input value={username} required 
                onChange={(e) =>setUsername(e.target.value)}
                className="input" />
                <button>Sign IN</button>
            </form>
        </div>
    )
}

export default Home
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    //create username variable 
    const [username, setUsername] = useState("");
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
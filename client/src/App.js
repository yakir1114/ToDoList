import './App.css';
import React from "react";
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Home }  from "./components/Exports";

const socket = socketIO.connect("http://localhost:4000");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket}/>} />
        <Route path='/app' element={<Main socket={socket} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

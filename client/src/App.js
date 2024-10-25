import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/auth/Login";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<>register</>}></Route>
    </Routes>
  );
};

export default App;

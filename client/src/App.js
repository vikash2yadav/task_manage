import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./page/auth/Login"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;

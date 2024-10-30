import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./page/auth/Login"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const NotFound = lazy(()=> import("./page/NotFound"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;

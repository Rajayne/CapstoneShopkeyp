import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Admin from "./Admin";
import Shop from "./Shop";
import Profile from "./Profile";
import Login from "./Login";
import Error404 from "./Error404";
import Register from './Register';

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/shop" element={<Shop/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="*" element={<Error404/>} />
    </Routes>
  );
};

export default Router;
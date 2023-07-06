import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home";
import Admin from "../Admin/Admin";
import Items from '../Items/Items';
import Shop from "../Shop";
import Profile from "../Users/User";
import Login from "../Login/Login";
import Logout from '../Logout/Logout';
import Error404 from "../Error404";
import Register from '../Register/Register';
import User from '../Users/User';
import Transaction from '../Transactions/Transaction';
import UpdateUserForm from '../Users/UserForm';


const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/admin/:tab" element={<Admin/>} />
      <Route exact path="/admin/users/:username" element={<User/>} />
      <Route exact path="/admin/transactions/:transactionId" element={<Transaction/>} />
      <Route exact path="/shop" element={<Shop/>} />
      <Route exact path="/shop/items" element={<Items/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/profile/:tab" element={<Profile/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/logout" element={<Logout/>} />
      <Route exact path="*" element={<Error404/>} />
    </Routes>
  );
};

export default Router;
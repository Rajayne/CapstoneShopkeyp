import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home";
import Admin from "../Admin/Admin";
import Items from '../Items/Items';
import Shop from "../Shop";
import Profile from "../Users/User";
import Login from "../Login/Login";
import Error404 from "../Error404";
import Register from '../Register/Register';
import Transactions from '../Transactions/Transactions';
import Users from '../Users/Users';
import User from '../Users/User';
import Item from '../Items/Item';
import Transaction from '../Transactions/Transaction';


const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/admin/users/:username" element={<User/>} />
      <Route exact path="/admin/users" element={<Users/>} />
      <Route exact path="/admin/items/:itemId" element={<Item/>} />
      <Route exact path="/admin/items" element={<Items/>} />
      <Route exact path="/admin/transactions/:transactionId" element={<Transaction/>} />
      <Route exact path="/admin/transactions" element={<Transactions/>} />
      <Route exact path="/shop" element={<Shop/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="*" element={<Error404/>} />
    </Routes>
  );
};

export default Router;
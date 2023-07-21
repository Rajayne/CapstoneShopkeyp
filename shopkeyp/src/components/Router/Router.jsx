import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../Home";
import Admin from "../Admin/Admin";
import Shop from "../Shop/Shop";
import Profile from "../Users/User";
import Login from "../Login/Login";
import Logout from '../Logout/Logout';
import Error404 from "../Error404";
import Register from '../Register/Register';
import ItemDetails from '../Shop/Items/ItemDetails';
import ItemUpdateForm from '../Admin/ItemUpdate';
import UserUpdateForm from '../Users/UserUpdateForm';
import TransactionDetails from '../Transactions/TransactionDetails';
import UserProfile from '../Admin/UserProfile';
import ItemNewForm from '../Admin/ItemNew';


const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/admin" element={<Admin/>} />
      <Route exact path="/admin/:tab" element={<Admin/>} />
      <Route exact path="/admin/users/:username" element={<UserProfile/>} />
      <Route exact path="/admin/users/:username/:tab" element={<UserProfile/>} />
      <Route exact path="/admin/items/new" element={<ItemNewForm />} />
      <Route exact path="/admin/items/:itemId/edit" element={<ItemUpdateForm />} />
      <Route exact path="/transactions/:transactionId" element={<TransactionDetails/>} />
      <Route exact path="/shop" element={<Shop/>} />
      <Route exact path="/shop/items/:itemId" element={<ItemDetails/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/profile/edit" element={<UserUpdateForm/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/logout" element={<Logout/>} />
      <Route exact path="*" element={<Error404/>} />
    </Routes>
  );
};

export default Router;
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './Admin.css'
import Users from '../Admin/Users';
import Items from '../Items/Items';
import Transactions from '../Transactions/Transactions';
import UserContext from '../Hooks/UserContext';
import jwt_decode from "jwt-decode"
import ShopkeypApi from '../Api/Api';
import AdminContext from '../Hooks/AdminContext';

const Admin = () => {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const authHeader = localStorage.getItem('token')
  const {users, items, transactions} = useContext(AdminContext);
  const [userData, setUserData] = users;
  const [itemData, setItemData] = items;
  const [transactionData, setTransactionData] = transactions;
  console.log("USERS", userData)
  console.log("ITEMS", itemData)
  console.log("TRANSACTIONS", transactionData)

  useEffect(() => {
    if (!user && authHeader) {
      setUser(jwt_decode(authHeader))
      return;
    }
    if (!user) {
      console.log(!user, user)
      alert("You must be an admin to view this page.")
      navigate('/', {state: {message:'You must be an admin to view this page.'}})
      return;
    }
  }, [user, navigate, authHeader, setUser])

  useEffect(() => {
    async function getUsers() {
      const res = await ShopkeypApi.allUsers(authHeader);
      setUserData(await res);
    }
    async function getItems() {
      const res = await ShopkeypApi.allItems(authHeader);
      setItemData(await res);
    }
    async function getTransactions() {
      const res = await ShopkeypApi.allTransactions(authHeader);
      setTransactionData(await res);
    }
    if (user) {
      getUsers();
      getItems();
      getTransactions();
    }
    setIsLoading(false);
  }, [authHeader, navigate, setItemData, setTransactionData, setUser, setUserData, user]);

  const {tab} = useParams();

  const currentTab = () => {
    switch(tab) {
      case "users": return <Users users={userData}/>;
      case "items": return <Items items={itemData}/>;
      case "transactions": return <Transactions transactions={transactionData}/>;
      default: return <p>Admin Stats</p>
    }
  }

  if (user && user.isAdmin) {
    return (
      <>
        <h1>Admin Page</h1>
        <table className="Admin-table">
          <tbody className="Admin-body">
            <tr className="Admin-title">
              <td><NavLink className="Admin-link" to="/admin/users">Users</NavLink></td>
              <td><NavLink className="Admin-link" to="/admin/transactions">Transactions</NavLink></td>
              <td><NavLink className="Admin-link" to="/admin/items">Items</NavLink></td>
            </tr>
          </tbody>
        </table>
        {currentTab()}
      </>
    );
  }
};

export default Admin;
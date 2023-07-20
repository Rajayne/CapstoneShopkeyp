import React, { useContext, useEffect, useState } from "react";
import UserItem from './UserItem';
import './Users.css'
import UserContext from '../Hooks/UserContext';
import AdminContext from '../Hooks/AdminContext';
import ShopkeypApi from '../Api/Api';

const Users = () => {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);

  const authHeader = localStorage.getItem('token')
  const {users} = useContext(AdminContext);
  const [userData, setUserData] = users;

  useEffect(() => {
    async function getUsers() {
      const res = await ShopkeypApi.allUsers(authHeader);
      setUserData(await res);
    }
    if (user) {
      getUsers();
    }
  }, [authHeader, setUserData, user]);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData])

  if (!isLoading) {
    return (
      <>
        <table className="Users-table">
          <tbody className="Users-body">
          <tr className="Users-title">
            <td className="Users-icon"></td>
            <td className="Users-user">Username</td>
            <td className="Users-balance">Balance</td>
            <td className="Users-active">Active</td>
            <td className="Users-created">Account Created</td>
            <td></td>
          </tr>
          {userData.map((userObj) => (
            <tr className="UserItem" key={userObj.userId}>
              <UserItem userObj={userObj}/>
            </tr>
          ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Users;
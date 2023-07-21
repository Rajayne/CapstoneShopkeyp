import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'
import UserDetails from './UserDetails';
import EditUserButton from './EditUserButton';

const UserItem = ({userObj}) => {
  const authHeader = localStorage.getItem('token')
  const [user, setUser] = useState([]);

  useEffect(() => {
      async function getUser() {
        const userData = await ShopkeypApi.getUser(userObj.username, authHeader);
        setUser(userData);
      }
      getUser();
  }, [authHeader, userObj.username]);

  const date = Moment(user.dateCreated).format('MM-DD-YYYY')
  
  return (
    <>
      <td className="UserItem-icon"><img className="UserItem-profileImg" src={user.profileImage} alt=""></img></td>
      <td className="UserItem-username">{user.username}</td>
      <td className="UserItem-balance">{user.balance}gp</td>
      <td>{user.active === true ? '✓' : '✗'}</td>
      <td>{date}</td>
      <td><UserDetails username={user.username}/></td>
      <td className="UserItem-updateBalance"><EditUserButton username={user.username}/></td>
    </>
  );
};

export default UserItem;
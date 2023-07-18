import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'
import UserDetails from './UserDetails';

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
     <td>{user.userId}</td>
     <td className="UserItem-user">
        <img className="UserItem-profileImg" src={user.profileImage} alt=""></img>
        <div className="UserItem-username">{user.username}</div>    
      </td>
      <td>{user.balance}gp</td>
      <td>{user.active === true ? '✓' : '✗'}</td>
      <td>{date}</td>
      <td><UserDetails username={user.username}/></td>
    </>
  );
};

export default UserItem;
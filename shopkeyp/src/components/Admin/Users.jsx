import React from "react";
import UserItem from './UserItem';
import './Users.css'

const Users = ({users}) => {
  return (
    <>
      <table className="Users-table">
        <tbody className="Users-body">
        <tr className="Users-title">
          <td>ID</td>
          <td>User</td>
          <td>Balance</td>
          <td>Inventory</td>
          <td>Transactions</td>
          <td>Active</td>
          <td>Account Created</td>
        </tr>
        {users.map((userObj) => (
          <tr className="UserItem" key={userObj.userId}>
            <UserItem userObj={userObj}/>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
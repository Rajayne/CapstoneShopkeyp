import React from "react";
const AdminHome = ({users, items, transactions}) => {
  return (
    <>
      <table className="AdminHome-table">
        <tbody>
        <tr className="AdminHome-row">
          <td>Active Users</td>
          <td>Total Users</td>
          <td>Purchasable Items</td>
          <td>Total Items</td>
        </tr>
        <tr className="AdminHome-row">
          <td>{users.length}</td>
          <td>{users.length}</td>
          <td>{items.length}</td>
          <td>{items.length}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
};

export default AdminHome;
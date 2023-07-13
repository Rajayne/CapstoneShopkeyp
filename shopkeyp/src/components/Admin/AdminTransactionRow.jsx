import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'

const AdminTransactionRow = ({transactionId}) => {
  const authHeader = localStorage.getItem('token')
  const [transaction, setTransaction] = useState([]);
  const [toUser, setToUser] = useState([]);
  const [fromUser, setFromUser] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
      async function getTransaction() {
        const transactionData = await ShopkeypApi.getTransaction(transactionId, authHeader);
        setTransaction(transactionData);
      }
      getTransaction();

      
  }, [authHeader, transactionId]);

  useEffect(() => {
    async function getItem() {
      const itemData = await ShopkeypApi.getItem(transaction.itemId, authHeader);
      setItem(itemData);
    }
    async function getToUser(userId) {
      const userData = await ShopkeypApi.getUserById(userId, authHeader);
      setToUser(userData);
    }
    async function getFromUser(userId) {
      const userData = await ShopkeypApi.getUserById(userId, authHeader);
      setFromUser(userData);
    }
    
    if (transaction.itemId) {
      getItem();
    }

    if (transaction.toUser) {
      getToUser(transaction.toUser)
    }

    if (transaction.fromUser) {
      setFromUser(getFromUser(transaction.fromUser))
    }
    
  }, [authHeader, transaction]);


  const date = Moment(transaction.transactionDate).format('MM-DD-YYYY')

  return (
    <>
      <td>{transaction.action}</td>
      <td>{toUser ? toUser.username : ""}</td>
      <td>{fromUser.username === "Shopkeyp" || transaction.fromUser === null ? "Shop" : fromUser.username }</td>
      <td>{item.name}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.total}</td>
      <td>{date}</td>
    </>
  );
};

export default AdminTransactionRow;
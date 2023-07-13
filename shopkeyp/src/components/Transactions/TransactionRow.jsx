import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'

const TransactionRow = ({transactionId}) => {
  const authHeader = localStorage.getItem('token')
  const [transaction, setTransaction] = useState([]);
  const [item, setItem] = useState([]);
  console.log("TRANSACTION", transaction)

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
    if (transaction.itemId) {
      getItem();
    }
  }, [authHeader, transaction]);

  const date = Moment(transaction.dateCreated).format('MM-DD-YYYY')

  return (
    <>
      <td>{transaction.action}</td>
      <td>{item.name}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.total}</td>
      <td>{date}</td>
    </>
  );
};

export default TransactionRow;
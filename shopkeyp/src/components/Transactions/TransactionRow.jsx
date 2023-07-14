import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'
import DetailsButton from './DetailsButton';

const TransactionRow = ({transactionId}) => {
  const authHeader = localStorage.getItem('token')
  const [transaction, setTransaction] = useState([]);
  console.log(transaction)

  useEffect(() => {
      async function getTransaction() {
        const transactionData = await ShopkeypApi.getTransaction(transactionId, authHeader);
        setTransaction(transactionData);
      }
      getTransaction();
  }, [authHeader, transactionId]);

  const date = Moment(transaction.dateCreated).format('MM-DD-YYYY')

  return (
    <>
      <td id="id">{transaction.transactionId}</td>
      <td id="date">{date}</td>
      <td id="type">{transaction.action}</td>
      <td id="total">{transaction.total ? `${transaction.total}gp` : "-"}</td>
      <td id="details"><DetailsButton transactionId={transaction.transactionId}/></td>
    </>
  );
};

export default TransactionRow;
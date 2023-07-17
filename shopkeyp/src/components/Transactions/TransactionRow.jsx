import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'
import DetailsButton from './DetailsButton';

const TransactionRow = ({transactionId}) => {
  const authHeader = localStorage.getItem('token')
  const [transaction, setTransaction] = useState([]);

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
      <td className="TransactionRow-id">{transaction.transactionId}</td>
      <td className="TransactionRow-date">{date}</td>
      <td className="TransactionRow-type">{transaction.action}</td>
      <td className="TransactionRow-total">{transaction.total ? `${transaction.total}gp` : "-"}</td>
      <td className="TransactionRow-details"><DetailsButton transactionId={transaction.transactionId}/></td>
    </>
  );
};

export default TransactionRow;
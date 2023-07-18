import React, { useEffect, useState } from "react";
import ShopkeypApi from '../Api/Api';
import Moment from 'moment'
import DetailsButton from '../Transactions/DetailsButton';

const AdminTransactionRow = ({transactionId}) => {
  const authHeader = localStorage.getItem('token')
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
      async function getTransaction() {
        const transactionData = await ShopkeypApi.getTransaction(transactionId, authHeader);
        setTransaction(transactionData);
      }
      getTransaction();
  }, [authHeader, transactionId]);


  const date = Moment(transaction.transactionDate).format('MM-DD-YYYY')

  return (
    <>
      <td className="TransactionRow-id">{transaction.transactionId}</td>
      <td className="TransactionRow-date">{date}</td>
      <td className="TransactionRow-type">{transaction.action}</td>
      <td className="TransactionRow-total">{transaction.total ? `${transaction.total}gp` : "-"}</td>
      <td className="TransactionRow-details"><DetailsButton transactionId={transactionId}/></td>
    </>
  );
};

export default AdminTransactionRow;
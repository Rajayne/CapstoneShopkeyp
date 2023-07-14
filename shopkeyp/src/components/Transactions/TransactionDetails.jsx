import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ShopkeypApi from '../Api/Api';
import { Button, Card, CardActions } from '@mui/material';
import Moment from 'moment';
import './TransactionDetails.css'
import BackButton from '../BackButton';

const TransactionDetails = () => {
  const {transactionId} = useParams();
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
      <h3>Transaction Details</h3>
      <div className="TransactionDetails">
        <div className="TransactionDetails-body">
          <div className="title" id="id">ID</div>
          <div className="text" id="id">{transaction.transactionId}</div>
          <div className="title">Date</div>
          <div className="text">{date}</div>
          <div className="title">Type</div>
          <div className="text">{transaction.action}</div>
          <div className="title">Item</div>
          <div className="text">{transaction.itemId}</div>
          <div className="title">Quantity</div>
          <div className="text">{transaction.quantity}</div>
          <div className="title">Total</div>
          <div className="text">{transaction.total}</div>
        </div>
        <div className="TransactionDetails-button">
            <Button variant="outlined">Request Refund</Button>
            <BackButton/>
          </div>
      </div>
    </>
  );
};

export default TransactionDetails;
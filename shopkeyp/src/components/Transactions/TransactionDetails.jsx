import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ShopkeypApi from '../Api/Api';
import { Button, Card, CardActions } from '@mui/material';
import Moment from 'moment';
import './TransactionDetails.css'
import BackButton from '../BackButton';

const TransactionDetails = () => {
  const {transactionId} = useParams();
  const authHeader = localStorage.getItem('token')
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)
  const [transaction, setTransaction] = useState([]);
  const [item, setItem] = useState([]);
  const [toUserData, setToUserData] = useState([]);
  const [fromUserData, setFromUserData] = useState([]);

  useEffect(() => {
      async function getTransaction() {
        const transactionData = await ShopkeypApi.getTransaction(transactionId, authHeader);
        setTransaction(transactionData);
      }
      getTransaction();
  }, [authHeader, transactionId]);

  useEffect(() => {
    async function getToUser(userId) {
      const toUser = await ShopkeypApi.getUserById(userId, authHeader);
      setToUserData(toUser);
    }
    if (transaction.toUser) {
      getToUser(transaction.toUser);
    }
}, [authHeader, transaction.toUser, transactionId]);

useEffect(() => {
  async function getFromUser(userId) {
    const fromUser = await ShopkeypApi.getUserById(userId, authHeader);
    setFromUserData(fromUser);
  }
  if (transaction.fromUser) {
    getFromUser(transaction.fromUser);
  }
}, [authHeader, transaction.fromUser, transactionId]);

  useEffect(() => {
    async function getItem(itemId) {
      const itemData = await ShopkeypApi.getItem(itemId, authHeader);
      setItem(itemData);
    }
    if (transaction.itemId) {
      getItem(transaction.itemId);
    }
}, [authHeader, transaction.itemId, transactionId]);

useEffect(() => {
  if (transaction && toUserData && item) {
    setIsLoading(false);
  }
}, [authHeader, item, toUserData, transaction, transaction.itemId, transactionId]);

  const date = Moment(transaction.dateCreated).format('MM-DD-YYYY')

  if (isLoading) {
    return (<h1>Loading...</h1>)
  }


  return (
    <>
      <h3>Transaction Details</h3>
      <div className="TransactionDetails">
        <div className="TransactionDetails-body">
          <div className="even" id="id"><b>ID:</b> {transaction.transactionId}</div>
          <div className="odd"><b>Date:</b> {date}</div>
          <div className="even"><b>To:</b> {toUserData.username || transaction.toUser}</div>
          <div className="odd"><b>From:</b> {fromUserData.username ? fromUserData.username : "Shop"}</div>
          <div className="even" id="action"><b>Type:</b> {transaction.action}</div>
          <div className="odd item"><b>Item:</b> {item.name ? item.name : "N/A"}</div>
          <div className="even" id="quantity"><b>Quantity:</b> {transaction.quantity}</div>
          <div className="odd"><b>Total:</b> {transaction.total ? transaction.total : 0}gp</div>
        </div>
        <div className="TransactionDetails-button">
          <BackButton/>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
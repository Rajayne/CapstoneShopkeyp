import React from "react";
import TransactionRow from './TransactionRow';
import './TransactionsTable.css'

const TransactionsTable = ({transactions}) => {
  console.log("transactions arr", transactions)
  return (
    <table className="Transactions-table">
      <tbody>
        <tr className="Transactions-title">
          <td id="id">ID</td>
          <td id="date">Date</td>
          <td id="type">Type</td>
          <td id="total">Total</td>
          <td id="details"></td>
        </tr >
        {transactions.map((transactionId) => (
          <tr className="TransactionRow" key={transactionId}>
            <TransactionRow transactionId={transactionId}/>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
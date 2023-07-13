import React from "react";
import TransactionRow from './TransactionRow';
import './TransactionsTable.css'

const TransactionsTable = ({transactions}) => {
  console.log("transactions arr", transactions)
  return (
    <table className="Transactions-table">
      <tbody>
        <tr className="Transactions-title">
          <td>Type</td>
          <td>Item</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Date</td>
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
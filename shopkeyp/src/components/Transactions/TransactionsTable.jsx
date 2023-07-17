import React from "react";
import TransactionRow from './TransactionRow';
import './TransactionsTable.css'

const TransactionsTable = ({transactions}) => {
if (transactions.length) {
  return (
    <table className="Transactions-table">
      <tbody>
        <tr className="Transactions-title">
          <td className="Transactions-id">ID</td>
          <td className="Transactions-date">Date</td>
          <td className="Transactions-type">Type</td>
          <td className="Transactions-total">Total</td>
          <td className="Transactions-details"></td>
        </tr >
        {transactions.map((transactionId) => (
          <tr className="TransactionRow" key={transactionId}>
            <TransactionRow transactionId={transactionId}/>
          </tr>
        ))}
      </tbody>
    </table>
  );
} else {
  return (
    <>
      <div id="empty">No Transactions</div>
    </>
  )
}
};

export default TransactionsTable;
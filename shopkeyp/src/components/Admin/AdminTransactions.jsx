import React from "react";
import AdminTransactionRow from './AdminTransactionRow';
import '../Transactions/TransactionsTable.css'

const AdminTransactions = ({transactions}) => {
  return (
    <table className="Transactions-table">
      <tbody>
        <tr className="Transactions-title">
          <td>Type</td>
          <td>To User</td>
          <td>From User</td>
          <td>Item</td>
          <td>Quantity</td>
          <td>Total GP</td>
          <td>Date</td>
        </tr >
        {transactions.map(({transactionId}) => (
            <tr className="TransactionRow" key={transactionId}>
              <AdminTransactionRow transactionId={transactionId}/>
            </tr>
          ))}
        </tbody>
    </table>
  );
};

export default AdminTransactions;
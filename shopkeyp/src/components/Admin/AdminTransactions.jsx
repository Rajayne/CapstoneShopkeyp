import React, { useContext, useEffect, useState } from "react";
import AdminTransactionRow from './AdminTransactionRow';
import '../Transactions/TransactionsTable.css'
import ShopkeypApi from '../Api/Api';
import AdminContext from '../Hooks/AdminContext';
import UserContext from '../Hooks/UserContext';

const AdminTransactions = () => {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true);

  const authHeader = localStorage.getItem('token')
  const {transactions} = useContext(AdminContext);
  const [transactionData, setTransactionData] = transactions;

  useEffect(() => {
    async function getTransactions() {
      const res = await ShopkeypApi.allTransactions(authHeader);
      setTransactionData(await res);
    }
    if (user) {
      getTransactions();
    }
  }, [authHeader, setTransactionData, user]);

    useEffect(() => {
    if (transactionData) {
      setIsLoading(false);
    }
  }, [transactionData])

  if (!isLoading) {
    return (
      <table className="Transactions-table">
        <tbody>
          <tr className="Transactions-title">
            <td>ID</td>
            <td className="Transactions-type">Type</td>
            <td>To User</td>
            <td>From User</td>
            <td>Item</td>
            <td>Quantity</td>
            <td>Total GP</td>
            <td>Date</td>
          </tr >
          {transactionData.map(({transactionId}) => (
              <tr className="TransactionRow" key={transactionId}>
                <AdminTransactionRow transactionId={transactionId}/>
              </tr>
            ))}
          </tbody>
      </table>
    );
  };
};

export default AdminTransactions;
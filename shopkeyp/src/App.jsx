import './App.css';
import {Card, CardContent} from '@mui/material'
import NavBar from "./components/NavBar/NavBar";
import Router from "./components/Router/Router"
import UserContext from './components/Hooks/UserContext';
import { useState } from 'react';
import AdminContext from './components/Hooks/AdminContext';

function App() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [itemData, setItemData] = useState(null)
  const [transactionData, setTransactionData] = useState(null)

  return (
    <div className='App'>
      <UserContext.Provider value={[user, setUser]}>
        <AdminContext.Provider value={{ users: [userData, setUserData], items: [itemData, setItemData], transactions: [transactionData, setTransactionData] }}>
        <Card className='App-wrapper' sx={{
      width: {
        sx: 1.0
      },
    }}>
          <NavBar className='App-nav'/>
          <CardContent className='App-content'>
            <Router />
          </CardContent>
        </Card>
        </AdminContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

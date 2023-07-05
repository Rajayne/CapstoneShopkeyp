import './App.css';
import {Card, CardContent, Toolbar} from '@mui/material'
import NavBar from "./components/NavBar";
import Router from "./components/Router/Router"
import UserContext from './components/Hooks/UserContext';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className='App'>
      <UserContext.Provider value={[user, setUser]}>
      <Card className='App-wrapper' sx={{
    width: {
      sx: 1.0
    },
  }}>
        <NavBar />
        <Toolbar />
        <CardContent>
          <Router />
        </CardContent>
      </Card>
      </UserContext.Provider>
    </div>
  );
}

export default App;

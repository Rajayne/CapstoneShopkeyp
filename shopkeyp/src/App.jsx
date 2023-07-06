import './App.css';
import {Card, CardContent} from '@mui/material'
import NavBar from "./components/NavBar/NavBar";
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
        <NavBar className='App-nav'/>
        <CardContent className='App-content'>
          <Router />
        </CardContent>
      </Card>
      </UserContext.Provider>
    </div>
  );
}

export default App;

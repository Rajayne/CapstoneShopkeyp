import './App.css';
import {Card, CardContent, Toolbar} from '@mui/material'
import NavBar from "./components/NavBar";
import Router from "./components/Router/Router"

function App() {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;

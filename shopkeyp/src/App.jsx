import './App.css';
import {Card, CardContent, Toolbar} from '@mui/material'
import NavBar from "./components/NavBar";
import Router from "./components/Router"

function App() {
  return (
    <div className='App'>
      <Card className='App-wrapper'>
        <NavBar />
        <Toolbar />
        <Router />
      </Card>
    </div>
  );
}

export default App;

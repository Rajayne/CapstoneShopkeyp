import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <div className='App'>
      <div className='App-wrapper'>
        <header>Shopkeyp</header>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
